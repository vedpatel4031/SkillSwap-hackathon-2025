import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAcceptRequest = (activityId) => {
    console.log('Accepting swap request:', activityId);
    // Handle accept logic here
  };

  const handleDeclineRequest = (activityId) => {
    console.log('Declining swap request:', activityId);
    // Handle decline logic here
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth disabled:opacity-50"
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            className={isRefreshing ? 'animate-spin' : ''} 
          />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Recent Activity</h3>
            <p className="text-muted-foreground mb-4">
              Start connecting with others to see your activity here
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;