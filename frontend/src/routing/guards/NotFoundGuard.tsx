import React, { useEffect } from 'react';
import { useRouting } from '../../hooks/useRouting';
import { ROUTE_PATHS } from '../routeConfig';

interface NotFoundGuardProps {
  children?: React.ReactNode;
}

/**
 * NotFoundGuard handles invalid/unknown routes
 * Redirects to splash screen for unknown URLs
 */
const NotFoundGuard: React.FC<NotFoundGuardProps> = ({ children }) => {
  const { navigateToRoute, currentPath, isValidPath } = useRouting();

  useEffect(() => {
    // If current path is not valid and not already on splash screen
    if (!isValidPath(currentPath) && currentPath !== ROUTE_PATHS.SPLASH) {
      console.warn(`Invalid route accessed: ${currentPath}, redirecting to splash screen`);
      navigateToRoute(ROUTE_PATHS.SPLASH, { replace: true });
    }
  }, [currentPath, isValidPath, navigateToRoute]);

  // If path is invalid, don't render anything (redirect is happening)
  if (!isValidPath(currentPath)) {
    return null;
  }

  // If children are provided, render them; otherwise render a simple not found message
  if (children) {
    return <>{children}</>;
  }

  // Default not found component
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', color: '#356247', marginBottom: '1rem' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <button 
        onClick={() => navigateToRoute(ROUTE_PATHS.SPLASH)}
        style={{
          padding: '0.875rem 2rem',
          background: '#356247',
          color: 'white',
          border: 'none',
          borderRadius: '0.625rem',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundGuard;