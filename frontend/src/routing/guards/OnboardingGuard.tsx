import React, { useEffect } from 'react';
import { useRouting } from '../../hooks/useRouting';
import { ROUTE_PATHS } from '../routeConfig';

interface OnboardingGuardProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

/**
 * OnboardingGuard ensures users complete the splash screen/onboarding
 * before accessing certain routes like sign-in or sign-up
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