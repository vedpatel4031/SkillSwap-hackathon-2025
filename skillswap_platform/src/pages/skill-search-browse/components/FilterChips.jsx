import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterDisplay = (filter) => {
    switch (filter.type) {
      case 'location':
        return `${filter.value} (${filter.radius}km)`;
      case 'availability':
        return filter.value;
      case 'category':
        return filter.value;
      case 'rating':
        return `${filter.value}+ stars`;
      case 'verification':
        return 'Verified only';
      default:
        return filter.value;
    }
  };

  const getFilterIcon = (type) => {
    switch (type) {
      case 'location':
        return 'MapPin';
      case 'availability':
        return 'Clock';
      case 'category':
        return 'Tag';
      case 'rating':
        return 'Star';
      case 'verification':
        return 'Shield';
      default:
        return 'Filter';
    }
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap"
          >
            <Icon 
              name={getFilterIcon(filter.type)} 
              size={14} 
              className="text-primary" 
            />
            <span>{getFilterDisplay(filter)}</span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="ml-1 text-primary hover:text-primary/80 transition-smooth"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        {activeFilters.length > 1 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 bg-muted text-muted-foreground border border-border rounded-full px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-smooth whitespace-nowrap"
          >
            <Icon name="X" size={14} />
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;