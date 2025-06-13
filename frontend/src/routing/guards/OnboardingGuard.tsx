import React, { useEffect } from 'react';
import { useRouting } from '../../hooks/useRouting';
import { ROUTE_PATHS } from '../routeConfig';

/**
 * Props for the OnboardingGuard component
 * @interface OnboardingGuardProps
 * @property children - Child components to render when onboarding is completed
 * @property requiresOnboarding - Whether this route requires completed onboarding
 */
interface OnboardingGuardProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

/**
 * Guard component that ensures users complete the onboarding flow
 * Redirects users to splash screen if they haven't completed onboarding
 * Used to protect routes like sign-in and sign-up that require onboarding completion
 * @param props - Component props
 * @param props.children - Components to render when onboarding requirements are met
 * @param props.requiresOnboarding - Whether onboarding completion is required (defaults to true)
 * @returns JSX element with children or null during redirect
 */
const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ 
  children, 
  requiresOnboarding = true 
}) => {
  const { hasCompletedOnboarding, navigateToRoute, currentPath } = useRouting();

  useEffect(() => {
    // If this route requires onboarding but user hasn't completed it
    if (requiresOnboarding && !hasCompletedOnboarding) {
      // Don't redirect if already on splash screen (prevents infinite loop)
      if (currentPath !== ROUTE_PATHS.SPLASH) {
        navigateToRoute(ROUTE_PATHS.SPLASH, { replace: true });
      }
    }
  }, [requiresOnboarding, hasCompletedOnboarding, currentPath, navigateToRoute]);

  // If onboarding is required but not completed, don't render children
  if (requiresOnboarding && !hasCompletedOnboarding) {
    return null;
  }

  // Render children if onboarding requirements are met
  return <>{children}</>;
};

export default OnboardingGuard;