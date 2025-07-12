import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onApplyFilters, 
  onClearFilters 
}) => {
  const skillCategories = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'creative', label: 'Creative Arts' },
    { value: 'language', label: 'Languages' },
    { value: 'fitness', label: 'Health & Fitness' },
    { value: 'music', label: 'Music' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'crafts', label: 'Crafts & DIY' }
  ];

  const availabilityOptions = [
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'weekends', label: 'Weekends' },
    { value: 'evenings', label: 'Evenings' },
    { value: 'mornings', label: 'Mornings' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const ratingOptions = [
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleApply = () => {
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed lg:static inset-x-0 bottom-0 lg:inset-auto bg-card border border-border rounded-t-xl lg:rounded-lg shadow-modal lg:shadow-elevated z-50 lg:z-auto max-h-[80vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-none">
          <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city or area"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Radius (km)"
              value={filters.radius || ''}
              onChange={(e) => handleFilterChange('radius', e.target.value)}
              min="1"
              max="100"
            />
          </div>

          {/* Skill Categories */}
          <div>
            <Select
              label="Skill Categories"
              placeholder="Select categories"
              multiple
              searchable
              options={skillCategories}
              value={filters.categories || []}
              onChange={(value) => handleFilterChange('categories', value)}
            />
          </div>

          {/* Availability */}
          <div>
            <Select
              label="Availability"
              placeholder="Select availability"
              multiple
              options={availabilityOptions}
              value={filters.availability || []}
              onChange={(value) => handleFilterChange('availability', value)}
            />
          </div>

          {/* Rating */}
          <div>
            <Select
              label="Minimum Rating"
              placeholder="Select minimum rating"
              options={ratingOptions}
              value={filters.rating || ''}
              onChange={(value) => handleFilterChange('rating', value)}
            />
          </div>

          {/* Verification Status */}
          <div>
            <Checkbox
              label="Verified users only"
              checked={filters.verifiedOnly || false}
              onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
            />
          </div>

          {/* Online Status */}
          <div>
            <Checkbox
              label="Currently online"
              checked={filters.onlineOnly || false}
              onChange={(e) => handleFilterChange('onlineOnly', e.target.checked)}
            />
          </div>

          {/* Recently Active */}
          <div>
            <Checkbox
              label="Active in last 7 days"
              checked={filters.recentlyActive || false}
              onChange={(e) => handleFilterChange('recentlyActive', e.target.checked)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilters;