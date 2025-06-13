import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouting } from '../../hooks/useRouting';
import { ROUTE_PATHS } from '../routeConfig';

interface AuthGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

/**
 * AuthGuard protects routes that require authentication
 * Redirects to appropriate route based on authentication state
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