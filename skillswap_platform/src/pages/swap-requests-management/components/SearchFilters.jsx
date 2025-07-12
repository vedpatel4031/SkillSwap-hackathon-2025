import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onSearch, onFilter, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const skillOptions = [
    { value: '', label: 'All Skills' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'language', label: 'Language' },
    { value: 'music', label: 'Music' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'photography', label: 'Photography' },
  ];

  const dateOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSkillFilter = (value) => {
    setSkillFilter(value);
    onFilter({ skill: value, date: dateFilter });
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    onFilter({ skill: skillFilter, date: value });
  };

  const handleClear = () => {
    setSearchTerm('');
    setSkillFilter('');
    setDateFilter('');
    onClear();
  };

  const hasActiveFilters = searchTerm || skillFilter || dateFilter;

  return (
    <div className="bg-card border-b border-border">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search by partner name or skill..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-12"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-smooth ${
              showFilters || hasActiveFilters
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Filter" size={16} />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-4 pb-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Select
              label="Filter by Skill"
              options={skillOptions}
              value={skillFilter}
              onChange={handleSkillFilter}
              placeholder="Select skill category"
            />
            <Select
              label="Filter by Date"
              options={dateOptions}
              value={dateFilter}
              onChange={handleDateFilter}
              placeholder="Select time period"
            />
          </div>
          
          {hasActiveFilters && (
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleClear}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && !showFilters && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Search: {searchTerm}
                <button
                  onClick={() => handleSearch('')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {skillFilter && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Skill: {skillOptions.find(opt => opt.value === skillFilter)?.label}
                <button
                  onClick={() => handleSkillFilter('')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {dateFilter && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Date: {dateOptions.find(opt => opt.value === dateFilter)?.label}
                <button
                  onClick={() => handleDateFilter('')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;