import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouting } from '../../hooks/useRouting';
import { ROUTE_PATHS } from '../routeConfig';

/**
 * Props for the AuthGuard component
 * @interface AuthGuardProps
 * @property children - Child components to render if authentication requirements are met
 * @property requiresAuth - Whether authentication is required to access the route (defaults to true)
 */
interface AuthGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

/**
 * Authentication guard component that protects routes requiring user authentication
 * Handles automatic redirects based on authentication and onboarding state
 * Provides loading states during authentication verification
 * @param props - Component props
 * @param props.children - Components to render if user is authenticated
 * @param props.requiresAuth - Whether the route requires authentication (defaults to true)
 * @returns JSX element with protected content or loading/redirect state
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requiresAuth = true 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasCompletedOnboarding, navigateToRoute, getRedirectPath, currentPath } = useRouting();

  useEffect(() => {
    // Don't redirect while auth is loading
    if (loading) return;

    // If this route requires auth but user is not authenticated
    if (requiresAuth && !isAuthenticated) {
      // Get the appropriate redirect path based on onboarding state
      const redirectPath = getRedirectPath(isAuthenticated, hasCompletedOnboarding);
      
      // Don't redirect if already on the target path
      if (currentPath !== redirectPath) {
        // Save the current path to redirect back after authentication
        const returnTo = currentPath !== ROUTE_PATHS.SPLASH ? currentPath : ROUTE_PATHS.DASHBOARD;
        navigateToRoute(redirectPath, { 
          replace: true, 
          state: { returnTo } 
        });
      }
    }
  }, [
    requiresAuth, 
    isAuthenticated, 
    loading, 
    hasCompletedOnboarding, 
    currentPath, 
    navigateToRoute, 
    getRedirectPath
  ]);

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If auth is required but user is not authenticated, don't render children
  if (requiresAuth && !isAuthenticated) {
    return null;
  }

  // Render children if auth requirements are met
  return <>{children}</>;
};

export default AuthGuard;