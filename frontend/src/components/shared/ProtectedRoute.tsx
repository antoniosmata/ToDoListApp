import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Props for the ProtectedRoute component
 * @interface ProtectedRouteProps
 * @property children - Child components to render when user is authenticated
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route protection component that requires user authentication
 * Redirects unauthenticated users to the sign-in page with return URL
 * Shows loading state while authentication status is being determined
 * @param props - Component props
 * @param props.children - Child components to render for authenticated users
 * @returns JSX element with protected content or redirect
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to signin page with return URL
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;