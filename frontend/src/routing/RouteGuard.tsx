import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig, ROUTE_PATHS } from './routeConfig';
import OnboardingGuard from './guards/OnboardingGuard';
import AuthGuard from './guards/AuthGuard';
import NotFoundGuard from './guards/NotFoundGuard';

// Component imports
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import AnimatedLogin from '../components/auth/AnimatedLogin';
import AnimatedSignUp from '../components/auth/AnimatedSignUp';
import TaskDashboard from '../components/dashboard/TaskDashboard';

/**
 * Component mapping for route configuration
 */
const componentMap = {
  OnboardingFlow,
  AnimatedLogin,
  AnimatedSignUp,
  TaskDashboard,
  NotFound: NotFoundGuard
};

/**
 * RouteGuard - Master routing controller that applies all necessary guards
 */
const RouteGuard: React.FC = () => {
  /**
   * Wrap a component with the appropriate guards based on route config
   */
  const wrapWithGuards = (
    Component: React.ComponentType, 
    config: typeof routeConfig[0]
  ): React.ReactElement => {
    let WrappedComponent = <Component />;

    // Apply AuthGuard if authentication is required
    if (config.requiresAuth) {
      WrappedComponent = (
        <AuthGuard requiresAuth={config.requiresAuth}>
          {WrappedComponent}
        </AuthGuard>
      );
    }

    // Apply OnboardingGuard if onboarding is required
    if (config.requiresOnboarding) {
      WrappedComponent = (
        <OnboardingGuard requiresOnboarding={config.requiresOnboarding}>
          {WrappedComponent}
        </OnboardingGuard>
      );
    }

    return WrappedComponent;
  };

  return (
    <Routes>
      {routeConfig.map((config) => {
        const Component = componentMap[config.component as keyof typeof componentMap];
        
        if (!Component) {
          console.error(`Component ${config.component} not found for route ${config.path}`);
          return null;
        }

        // Handle catch-all route specially
        if (config.path === ROUTE_PATHS.CATCH_ALL) {
          return (
            <Route 
              key={config.path} 
              path={config.path} 
              element={<NotFoundGuard />} 
            />
          );
        }

        return (
          <Route
            key={config.path}
            path={config.path}
            element={wrapWithGuards(Component, config)}
          />
        );
      })}
    </Routes>
  );
};

export default RouteGuard;