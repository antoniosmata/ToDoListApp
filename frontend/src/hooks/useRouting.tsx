import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { ROUTE_PATHS, type RoutePath } from '../routing/routeConfig';

// Constants for storage keys
const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';
const APP_VERSION_KEY = 'app_version';

// Current app version - increment this when you want to force re-onboarding
const APP_VERSION = '1.0.0';

export interface RoutingState {
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  currentPath: string;
}

export const useRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if onboarding has been completed
  const hasCompletedOnboarding = useCallback((): boolean => {
    try {
      const completed = sessionStorage.getItem(ONBOARDING_COMPLETED_KEY);
      const storedVersion = sessionStorage.getItem(APP_VERSION_KEY);
      
      // Force re-onboarding if app version has changed (server restart)
      if (storedVersion !== APP_VERSION) {
        sessionStorage.removeItem(ONBOARDING_COMPLETED_KEY);
        sessionStorage.setItem(APP_VERSION_KEY, APP_VERSION);
        return false;
      }
      
      return completed === 'true';
    } catch {
      return false;
    }
  }, []);

  // Mark onboarding as completed
  const markOnboardingCompleted = useCallback((): void => {
    try {
      sessionStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      sessionStorage.setItem(APP_VERSION_KEY, APP_VERSION);
    } catch {
      // Fallback if sessionStorage is not available
      console.warn('SessionStorage not available, onboarding state may not persist');
    }
  }, []);

  // Clear onboarding state (useful for testing or forced reset)
  const clearOnboardingState = useCallback((): void => {
    try {
      sessionStorage.removeItem(ONBOARDING_COMPLETED_KEY);
      sessionStorage.removeItem(APP_VERSION_KEY);
    } catch {
      // Silent fail
    }
  }, []);

  // Navigate to route with proper error handling
  const navigateToRoute = useCallback((path: RoutePath, options?: { replace?: boolean; state?: any }) => {
    try {
      navigate(path, options);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to splash screen on navigation errors
      navigate(ROUTE_PATHS.SPLASH, { replace: true });
    }
  }, [navigate]);

  // Get the appropriate redirect path based on current state
  const getRedirectPath = useCallback((isAuthenticated: boolean, hasOnboarding: boolean): RoutePath => {
    // If not completed onboarding, always go to splash
    if (!hasOnboarding) {
      return ROUTE_PATHS.SPLASH;
    }
    
    // If completed onboarding but not authenticated, go to signin
    if (!isAuthenticated) {
      return ROUTE_PATHS.SIGNIN;
    }
    
    // If authenticated and onboarded, go to dashboard
    return ROUTE_PATHS.DASHBOARD;
  }, []);

  // Check if current path is valid
  const isValidPath = useCallback((path: string): boolean => {
    const validPaths = Object.values(ROUTE_PATHS);
    return validPaths.includes(path as RoutePath) || path === ROUTE_PATHS.CATCH_ALL;
  }, []);

  // Effect to handle app version changes (server restarts)
  useEffect(() => {
    const storedVersion = sessionStorage.getItem(APP_VERSION_KEY);
    if (storedVersion && storedVersion !== APP_VERSION) {
      clearOnboardingState();
      // Only redirect if not already on splash screen
      if (location.pathname !== ROUTE_PATHS.SPLASH) {
        navigateToRoute(ROUTE_PATHS.SPLASH, { replace: true });
      }
    }
  }, [location.pathname, clearOnboardingState, navigateToRoute]);

  return {
    // State checks
    hasCompletedOnboarding: hasCompletedOnboarding(),
    currentPath: location.pathname,
    isValidPath,
    
    // Navigation methods
    navigateToRoute,
    getRedirectPath,
    
    // Onboarding state management
    markOnboardingCompleted,
    clearOnboardingState,
    
    // Utilities
    location,
    navigate
  };
};