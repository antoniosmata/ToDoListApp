// Centralized route configuration
export interface RouteConfig {
  path: string;
  component: string;
  requiresAuth?: boolean;
  requiresOnboarding?: boolean;
  isPublic?: boolean;
  redirectTo?: string;
}

export const ROUTE_PATHS = {
  // Public routes
  SPLASH: '/',
  ONBOARDING: '/onboarding',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  
  // Protected routes
  DASHBOARD: '/tasks',
  
  // Fallbacks
  NOT_FOUND: '/404',
  CATCH_ALL: '*'
} as const;

export const routeConfig: RouteConfig[] = [
  // Splash/Onboarding - Always accessible
  {
    path: ROUTE_PATHS.SPLASH,
    component: 'OnboardingFlow',
    isPublic: true,
    requiresOnboarding: false,
    requiresAuth: false
  },
  
  // Authentication routes - Require onboarding completion
  {
    path: ROUTE_PATHS.SIGNIN,
    component: 'AnimatedLogin',
    isPublic: true,
    requiresOnboarding: true,
    requiresAuth: false
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    component: 'AnimatedSignUp',
    isPublic: true,
    requiresOnboarding: true,
    requiresAuth: false
  },
  
  // Protected application routes
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: 'TaskDashboard',
    requiresAuth: true,
    requiresOnboarding: true,
    isPublic: false
  },
  
  // Catch-all for invalid routes
  {
    path: ROUTE_PATHS.CATCH_ALL,
    component: 'NotFound',
    redirectTo: ROUTE_PATHS.SPLASH,
    isPublic: true,
    requiresOnboarding: false,
    requiresAuth: false
  }
];

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];