import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity, onAccept, onDecline }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'swap_request':
        return 'ArrowLeftRight';
      case 'swap_accepted':
        return 'CheckCircle';
      case 'swap_completed':
        return 'Trophy';
      case 'new_connection':
        return 'UserPlus';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'swap_request':
        return 'text-primary';
      case 'swap_accepted':
        return 'text-success';
      case 'swap_completed':
        return 'text-warning';
      case 'new_connection':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={activity.user.avatar}
            alt={activity.user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Icon 
              name={getActivityIcon()} 
              size={16} 
              className={getActivityColor()} 
            />
            <span className="text-sm text-muted-foreground">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>

          <h3 className="font-medium text-card-foreground mb-1">
            {activity.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {activity.description}
          </p>

          {activity.skills && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activity.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link
              to={`/profile-management?user=${activity.user.id}`}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              View Profile
            </Link>

            {activity.type === 'swap_request' && activity.actions && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDecline(activity.id)}
                >
                  Decline
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAccept(activity.id)}
                >
                  Accept
                </Button>
              </div>
            )}

            {activity.type === 'swap_accepted' && (
              <Link to="/messaging-system">
                <Button variant="default" size="sm">
                  Message
                </Button>
              </Link>
            )}

            {activity.type === 'swap_completed' && !activity.rated && (
              <Button variant="outline" size="sm">
                Rate Experience
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;