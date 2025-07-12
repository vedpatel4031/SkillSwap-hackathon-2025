import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onRequestSwap }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/profile-management', { state: { userId: user.id } });
  };

  const handleRequestSwap = (e) => {
    e.stopPropagation();
    onRequestSwap(user);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth cursor-pointer group"
    >
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} className="text-success-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground truncate group-hover:text-primary transition-smooth">
            {user.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span className="truncate">{user.location}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {renderStars(user.rating)}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({user.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Skills Offered */}
      <div className="mb-3">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Skills Offered
        </div>
        <div className="flex flex-wrap gap-1">
          {user.skillsOffered.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
            >
              {skill}
            </span>
          ))}
          {user.skillsOffered.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">
              +{user.skillsOffered.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Available {user.availability}</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        size="sm"
        fullWidth
        iconName="ArrowLeftRight"
        iconPosition="left"
        onClick={handleRequestSwap}
        className="group-hover:border-primary group-hover:text-primary"
      >
        Request Swap
      </Button>
    </div>
  );
};

export default UserCard;