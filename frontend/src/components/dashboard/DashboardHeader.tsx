import React from 'react';
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
            <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.5 3.75h15V5h-15V3.75zm0 6.25h15v1.25h-15v-1.25zm0 6.25h15V17.5h-15v-1.25z" />
            </svg>
          </button>
        )}
        <span className={styles.headerTitle}>Leap - Your Personal Task Managing App</span>
      </div>
      
      <div className={styles.headerRight}>
        <div className={styles.searchBar}>
          <svg className={`${styles.icon} ${styles.searchIcon}`} viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
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