import React from 'react';
import { FaSearch } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import styles from './Dashboard.module.css';

/**
 * Props for the DashboardHeader component
 * @interface DashboardHeaderProps
 * @property searchTerm - Current search term value
 * @property onSearchChange - Callback when search term changes
 * @property onAddTask - Callback when add task button is clicked
 * @property onSidebarToggle - Callback to toggle sidebar visibility
 */
interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onAddTask: () => void;
  onSidebarToggle: () => void;
}

/**
 * Header component for the dashboard containing search and navigation controls
 * Includes mobile menu toggle and keyboard shortcuts for search
 * @param props - Component props
 * @param props.searchTerm - Current search term
 * @param props.onSearchChange - Called when search input changes
 * @param props.onAddTask - Called when add task is triggered
 * @param props.onSidebarToggle - Called when sidebar toggle is clicked
 * @returns JSX element representing the dashboard header
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddTask,
  onSidebarToggle,
}) => {
  /**
   * Handles search input changes
   * @param e - Input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  /**
   * Handles keyboard shortcuts for search input
   * Supports Cmd/Ctrl + / to focus search
   * @param e - Keyboard event
   */
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle keyboard shortcuts
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      e.preventDefault();
      (e.target as HTMLInputElement).focus();
    }
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerLeft}>
        <button 
          className={`${styles.iconButton} ${styles.mobileMenuButton}`} 
          aria-label="Toggle Sidebar"
          onClick={onSidebarToggle}
        >
          <HiMenuAlt2 className={styles.icon} />
        </button>
        <span className={styles.headerTitle}>Welcome back! How far will you leap today?</span>
      </div>
      
      <div className={styles.headerRight}>
        <div className={styles.searchBar}>
          <FaSearch className={`${styles.icon} ${styles.searchIcon}`} />
          <input 
            type="search" 
            placeholder="Search tasks..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <span className={styles.shortcut}>⌘/</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;