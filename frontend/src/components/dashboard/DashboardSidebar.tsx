import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TASK_CATEGORIES } from '../../types';
import styles from './Dashboard.module.css';

interface DashboardSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  activeView: 'overview' | 'tasks';
  onViewChange: (view: 'overview' | 'tasks') => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  activeView,
  onViewChange,
}) => {
  const { user, signOut } = useAuth();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarUser}>
        <div className={styles.avatar}>
          {user ? getInitials(user.firstName, user.lastName) : 'U'}
        </div>
        <span className={styles.username}>
          {user ? `${user.firstName} ${user.lastName}` : 'User'}
        </span>
      </div>
      
      <nav className={styles.mainNav}>
        <h2 className={styles.menuTitle}>Menu</h2>
        <ul>
          <li>
            <button 
              className={`${styles.navItem} ${activeView === 'tasks' ? styles.active : ''}`}
              onClick={() => onViewChange('tasks')}
            >
              <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.25 1.88H3.75C2.71 1.88 1.88 2.71 1.88 3.75V16.25C1.88 17.29 2.71 18.12 3.75 18.12H16.25C17.29 18.12 18.12 17.29 18.12 16.25V3.75C18.12 2.71 17.29 1.88 16.25 1.88Z"/>
              </svg>
              Tasks
            </button>
          </li>
        </ul>
      </nav>

      {/* Category Filter */}
      <nav className={styles.mainNav}>
        <h2 className={styles.menuTitle}>Categories</h2>
        <ul>
          <li>
            <button 
              className={`${styles.navItem} ${selectedCategory === '' ? styles.active : ''}`}
              onClick={() => onCategoryChange('')}
            >
              <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              All Tasks
            </button>
          </li>
          {TASK_CATEGORIES.map(category => (
            <li key={category}>
              <button 
                className={`${styles.navItem} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Actions */}
      <div style={{ marginTop: 'auto' }}>
        <nav className={styles.mainNav}>
          <ul>
            <li>
              <button 
                className={styles.navItem}
                onClick={handleSignOut}
              >
                <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;