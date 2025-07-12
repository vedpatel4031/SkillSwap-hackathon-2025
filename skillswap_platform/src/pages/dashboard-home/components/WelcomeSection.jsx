import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, stats }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-blue-700 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {getGreeting()}, {user.name}!
          </h1>
          <p className="text-primary-foreground/80">
            Ready to exchange some skills today?
          </p>
        </div>
        <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="Zap" size={32} className="text-primary-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.activeSwaps}</div>
          <div className="text-sm text-primary-foreground/80">Active Swaps</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.pendingRequests}</div>
          <div className="text-sm text-primary-foreground/80">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.profileViews}</div>
          <div className="text-sm text-primary-foreground/80">Profile Views</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;