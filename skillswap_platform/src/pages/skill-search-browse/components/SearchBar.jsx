import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchValue, onSearchChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState([
    'Web Development',
    'Graphic Design',
    'Photography',
    'Digital Marketing',
    'Data Analysis'
  ]);
  
  const searchRef = useRef(null);

  const suggestions = [
    'Web Development',
    'Mobile App Development',
    'Graphic Design',
    'UI/UX Design',
    'Photography',
    'Video Editing',
    'Digital Marketing',
    'Content Writing',
    'Data Analysis',
    'Machine Learning',
    'Language Teaching',
    'Music Production',
    'Cooking',
    'Fitness Training',
    'Public Speaking'
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchValue.toLowerCase()) && 
    suggestion.toLowerCase() !== searchValue.toLowerCase()
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search skills, people, or expertise..."
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                setShowSuggestions(false);
              }}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="Search" size={16} />
          </button>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-80 overflow-y-auto">
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth flex items-center"
                >
                  <Icon name="Search" size={14} className="mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {searchValue.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Recent Searches
              </div>
              {recentSearches.slice(0, 5).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth flex items-center"
                >
                  <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;