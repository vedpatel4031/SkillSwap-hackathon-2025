import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UpcomingSessions = ({ sessions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Upcoming Sessions</h2>
        <Link 
          to="/swap-requests-management" 
          className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No upcoming sessions</p>
          </div>
        ) : (
          sessions.slice(0, 3).map((session) => (
            <div
              key={session.id}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={session.partner.avatar}
                  alt={session.partner.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground text-sm truncate">
                  {session.skill}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  with {session.partner.name}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(session.scheduledAt)}
                  </span>
                </div>
              </div>

              <Link
                to="/messaging-system"
                className="p-2 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Icon name="MessageCircle" size={16} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;