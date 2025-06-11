import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Task Manager</h1>
        
        {isAuthenticated && (
          <div className="header-actions">
            <span className="user-email">Welcome, {user?.fullName || `${user?.firstName} ${user?.lastName}`}</span>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;