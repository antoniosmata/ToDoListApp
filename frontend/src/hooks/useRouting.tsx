import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { ROUTE_PATHS, type RoutePath } from '../routing/routeConfig';

/**
 * Storage key for onboarding completion status
 * @constant ONBOARDING_COMPLETED_KEY
 */
const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

/**
 * Storage key for app version tracking
 * @constant APP_VERSION_KEY
 */
const APP_VERSION_KEY = 'app_version';

/**
 * Current app version - increment to force re-onboarding
 * @constant APP_VERSION
 */
const APP_VERSION = '1.0.0';

/**
 * Interface representing the current routing state
 * @interface RoutingState
 * @property hasCompletedOnboarding - Whether user has completed onboarding
 * @property isAuthenticated - Whether user is currently authenticated
 * @property currentPath - Current URL path
 */
export interface RoutingState {
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  currentPath: string;
}

/**
 * Hook for managing application routing and navigation
 * Handles onboarding state, authentication-based routing, and app version tracking
 * @returns Object containing routing utilities and state
 */
export const useRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Checks if user has completed onboarding
   * Resets onboarding state if app version has changed
   * @returns Whether onboarding has been completed
   */
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

  /**
   * Marks onboarding as completed in session storage
   * Also stores current app version
   */
  const markOnboardingCompleted = useCallback((): void => {
    try {
      sessionStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      sessionStorage.setItem(APP_VERSION_KEY, APP_VERSION);
    } catch {
      // Fallback if sessionStorage is not available
      console.warn('SessionStorage not available, onboarding state may not persist');
    }
  }, []);

  /**
   * Clears onboarding state from session storage
   * Useful for testing or forced reset
   */
  const clearOnboardingState = useCallback((): void => {
    try {
      sessionStorage.removeItem(ONBOARDING_COMPLETED_KEY);
      sessionStorage.removeItem(APP_VERSION_KEY);
    } catch {
      // Silent fail
    }
  }, []);

  /**
   * Navigates to a route with error handling
   * Falls back to splash screen on navigation errors
   * @param path - Route path to navigate to
   * @param options - Navigation options (replace, state)
   */
  const navigateToRoute = useCallback((path: RoutePath, options?: { replace?: boolean; state?: any }) => {
    try {
      navigate(path, options);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to splash screen on navigation errors
      navigate(ROUTE_PATHS.SPLASH, { replace: true });
    }
  }, [navigate]);

  /**
   * Determines the appropriate redirect path based on user state
   * @param isAuthenticated - Whether user is authenticated
   * @param hasOnboarding - Whether user has completed onboarding
   * @returns Appropriate route path for the user's state
   */
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

  /**
   * Validates if a given path is a valid application route
   * @param path - URL path to validate
   * @returns Whether the path is valid
   */
  const isValidPath = useCallback((path: string): boolean => {
    const validPaths = Object.values(ROUTE_PATHS);
    return validPaths.includes(path as RoutePath) || path === ROUTE_PATHS.CATCH_ALL;
  }, []);

  /**
   * Effect to handle app version changes (server restarts)
   * Clears onboarding state and redirects to splash when version changes
   */
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