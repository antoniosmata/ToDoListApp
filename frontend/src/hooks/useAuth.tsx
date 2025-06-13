import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, SignInDto, SignUpDto } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

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