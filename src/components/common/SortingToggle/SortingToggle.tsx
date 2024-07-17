import React, { useState, KeyboardEvent } from "react";
import './SortingToggle.css';

interface SortingDropdownProps {
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortingDropdownProps> = ({ onChange }) => {
  const [isAscending, setIsAscending] = useState(true);

  const handleToggle = () => {
    const newSort = !isAscending;
    setIsAscending(newSort);
    onChange(newSort ? "asc" : "desc");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="sort-switch">
      <span className={`sort-label ${isAscending ? 'active' : ''}`}>A-Z</span>
      <button
        className={`sort-toggle-button ${isAscending ? 'asc' : 'desc'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-pressed={!isAscending}
        type="button"
      >
        <span className="sort-toggle-inner"></span>
        <span className="visually-hidden">
          {isAscending ? 'Sort A to Z' : 'Sort Z to A'}
        </span>
      </button>
      <span className={`sort-label ${!isAscending ? 'active' : ''}`}>Z-A</span>
    </div>
  );
};

export default SortDropdown;