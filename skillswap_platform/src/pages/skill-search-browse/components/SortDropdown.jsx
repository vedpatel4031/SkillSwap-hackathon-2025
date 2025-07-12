import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, resultCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' },
    { value: 'recent', label: 'Recently Active', icon: 'Clock' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpDown' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount > 0 ? (
          <span>{resultCount.toLocaleString()} {resultCount === 1 ? 'result' : 'results'} found</span>
        ) : (
          <span>No results found</span>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md text-sm font-medium text-card-foreground hover:bg-muted transition-smooth"
        >
          <Icon name={currentSort.icon} size={16} className="text-muted-foreground" />
          <span>Sort: {currentSort.label}</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-smooth ${
                    sortBy === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={sortBy === option.value ? 'text-primary-foreground' : 'text-muted-foreground'} 
                  />
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    <Icon name="Check" size={16} className="ml-auto text-primary-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;