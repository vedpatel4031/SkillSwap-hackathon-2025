import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const AvailabilitySection = ({ availability, onAvailabilityUpdate }) => {
  const timeSlots = [
    { id: 'morning', label: 'Morning (6AM - 12PM)', value: 'morning' },
    { id: 'afternoon', label: 'Afternoon (12PM - 6PM)', value: 'afternoon' },
    { id: 'evening', label: 'Evening (6PM - 10PM)', value: 'evening' },
    { id: 'night', label: 'Night (10PM - 12AM)', value: 'night' }
  ];

  const handleWeekendChange = (checked) => {
    onAvailabilityUpdate({
      ...availability,
      weekends: checked
    });
  };

  const handleEveningChange = (checked) => {
    onAvailabilityUpdate({
      ...availability,
      evenings: checked
    });
  };

  const handleTimeSlotChange = (timeSlot, checked) => {
    const updatedTimeSlots = checked
      ? [...availability.timeSlots, timeSlot]
      : availability.timeSlots.filter(slot => slot !== timeSlot);
    
    onAvailabilityUpdate({
      ...availability,
      timeSlots: updatedTimeSlots
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Availability</h2>
      </div>

      <div className="space-y-6">
        {/* General Availability */}
        <div>
          <h3 className="font-medium text-foreground mb-3">General Availability</h3>
          <div className="space-y-3">
            <Checkbox
              label="Available on weekends"
              description="Saturday and Sunday availability"
              checked={availability.weekends}
              onChange={(e) => handleWeekendChange(e.target.checked)}
            />
            <Checkbox
              label="Available on weekday evenings"
              description="Monday to Friday after 6PM"
              checked={availability.evenings}
              onChange={(e) => handleEveningChange(e.target.checked)}
            />
          </div>
        </div>

        {/* Preferred Time Slots */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Preferred Time Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Checkbox
                key={slot.id}
                label={slot.label}
                checked={availability.timeSlots.includes(slot.value)}
                onChange={(e) => handleTimeSlotChange(slot.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Timezone</h3>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{availability.timezone}</span>
          </div>
        </div>

        {/* Response Time */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Typical Response Time</h3>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
            <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{availability.responseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySection;