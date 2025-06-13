import React from 'react';
import { FaSearch } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import styles from './Dashboard.module.css';

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onAddTask: () => void;
  sidebarToggled?: boolean;
  onSidebarToggle?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddTask,
  sidebarToggled = false,
  onSidebarToggle,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

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
        {onSidebarToggle && (
          <button 
            className={styles.iconButton} 
            aria-label="Toggle Sidebar"
            onClick={onSidebarToggle}
          >
            <HiMenuAlt2 className={styles.icon} />
          </button>
        )}
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