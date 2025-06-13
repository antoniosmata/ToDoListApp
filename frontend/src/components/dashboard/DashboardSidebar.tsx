import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TASK_CATEGORIES } from '../../types';
import { IoMdLogOut } from "react-icons/io";
import { FaTasks, FaTag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './Dashboard.module.css';

/**
 * Props for the DashboardSidebar component
 * @interface DashboardSidebarProps
 * @property selectedCategory - Currently selected task category filter
 * @property onCategoryChange - Callback when category filter changes
 * @property activeView - Currently active view (overview or tasks)
 * @property onViewChange - Callback when view changes
 * @property isOpen - Whether sidebar is open (for mobile)
 * @property onClose - Callback to close sidebar (for mobile)
 */
interface DashboardSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  activeView: 'overview' | 'tasks';
  onViewChange: (view: 'overview' | 'tasks') => void;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Sidebar component for dashboard navigation and filtering
 * Includes user profile, navigation menu, category filters, and sign out
 * @param props - Component props
 * @param props.selectedCategory - Current category filter
 * @param props.onCategoryChange - Called when category filter changes
 * @param props.activeView - Current active view
 * @param props.onViewChange - Called when view changes
 * @param props.isOpen - Sidebar open state for mobile
 * @param props.onClose - Called to close sidebar on mobile
 * @returns JSX element representing the dashboard sidebar
 */
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  activeView,
  onViewChange,
  isOpen = false,
  onClose,
}) => {
  const { user, signOut } = useAuth();

  /**
   * Generates user initials from first and last name
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @returns Uppercase initials (e.g., "JD" for John Doe)
   */
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  /**
   * Handles user sign out with confirmation dialog
   * Shows confirmation dialog before signing out
   */
  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  /**
   * Handles category filter changes
   * Closes sidebar on mobile after selection
   * @param category - Selected category name (empty string for all tasks)
   */
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    // Close sidebar on mobile when selection is made
    if (onClose) {
      onClose();
    }
  };

  /**
   * Handles view changes between overview and tasks
   * Closes sidebar on mobile after selection
   * @param view - Selected view type
   */
  const handleViewChange = (view: 'overview' | 'tasks') => {
    onViewChange(view);
    // Close sidebar on mobile when selection is made
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
              onClick={() => handleViewChange('tasks')}
            >
              <FaTasks className={styles.icon} />
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
              onClick={() => handleCategoryChange('')}
            >
              <GiHamburgerMenu className={styles.icon} />
              All Tasks
            </button>
          </li>
          {TASK_CATEGORIES.map(category => (
            <li key={category}>
              <button 
                className={`${styles.navItem} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                <FaTag className={styles.icon} />
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
                <IoMdLogOut className={styles.icon} />
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