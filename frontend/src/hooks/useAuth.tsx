import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, SignInDto, SignUpDto } from '../types';
import { apiService } from '../services/api';

/**
 * Type definition for the authentication context
 * @interface AuthContextType
 * @property user - Current authenticated user or null
 * @property loading - Whether authentication state is being loaded
 * @property signIn - Function to sign in a user
 * @property signUp - Function to register a new user
 * @property signOut - Function to sign out the current user
 * @property isAuthenticated - Whether a user is currently authenticated
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 * Must be used within an AuthProvider
 * @returns Authentication context object
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Props for the AuthProvider component
 * @interface AuthProviderProps
 * @property children - Child components to wrap with auth context
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component that manages user state and auth operations
 * Handles token storage, session validation, and automatic logout on server restart
 * @param props - Component props
 * @param props.children - Child components to provide auth context to
 * @returns JSX element wrapping children with authentication context
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  // Periodic session validation for server restart detection
  useEffect(() => {
    if (!user) return;

    const validateSession = async () => {
      try {
        const { valid } = await apiService.validateSession();
        if (!valid) {
          // Session invalid - likely server restart
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          window.location.href = '/';
        }
      } catch (error) {
        // Network error or server unreachable - don't logout
        console.error('Session validation error:', error);
      }
    };

    // Validate immediately when user logs in
    validateSession();

    // Set up periodic validation every 10 minutes
    const interval = setInterval(validateSession, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  /**
   * Signs in a user with email and password
   * Stores token and user data in localStorage
   * @param data - Sign-in credentials
   * @throws {AxiosError} When authentication fails
   */
  const signIn = async (data: SignInDto) => {
    try {
      const response = await apiService.signIn(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Registers and signs in a new user
   * Stores token and user data in localStorage
   * @param data - User registration data
   * @throws {AxiosError} When registration fails
   */
  const signUp = async (data: SignUpDto) => {
    try {
      const response = await apiService.signUp(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Signs out the current user
   * Calls API to invalidate session and clears local storage
   * Continues with logout even if API call fails
   */
  const signOut = async () => {
    try {
      await apiService.signOut();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Sign out error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};