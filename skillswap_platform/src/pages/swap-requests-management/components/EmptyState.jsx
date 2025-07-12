import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const EmptyState = ({ type, onRefresh }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'pending':
        return {
          icon: 'Clock',
          title: 'No Pending Requests',
          description: 'You don\'t have any pending swap requests at the moment.',
          action: {
            text: 'Browse Skills',
            link: '/skill-search-browse',
            icon: 'Search'
          }
        };
      case 'active':
        return {
          icon: 'CheckCircle',
          title: 'No Active Swaps',
          description: 'You don\'t have any active skill swaps in progress.',
          action: {
            text: 'Find Skills to Learn',
            link: '/skill-search-browse',
            icon: 'Search'
          }
        };
      case 'completed':
        return {
          icon: 'Star',
          title: 'No Completed Swaps',
          description: 'You haven\'t completed any skill swaps yet.',
          action: {
            text: 'Start Learning',
            link: '/skill-search-browse',
            icon: 'BookOpen'
          }
        };
      case 'sent':
        return {
          icon: 'Send',
          title: 'No Sent Requests',
          description: 'You haven\'t sent any swap requests yet.',
          action: {
            text: 'Discover Skills',
            link: '/skill-search-browse',
            icon: 'Compass'
          }
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'No swap requests match your search criteria. Try adjusting your filters.',
          action: {
            text: 'Clear Filters',
            onClick: onRefresh,
            icon: 'RotateCcw'
          }
        };
      default:
        return {
          icon: 'ArrowLeftRight',
          title: 'No Swap Requests',
          description: 'You don\'t have any swap requests yet.',
          action: {
            text: 'Start Exploring',
            link: '/skill-search-browse',
            icon: 'Compass'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content.icon} size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        {content.description}
      </p>
      
      {content.action.link ? (
        <Link to={content.action.link}>
          <Button
            variant="default"
            iconName={content.action.icon}
            iconPosition="left"
          >
            {content.action.text}
          </Button>
        </Link>
      ) : (
        <Button
          variant="default"
          iconName={content.action.icon}
          iconPosition="left"
          onClick={content.action.onClick}
        >
          {content.action.text}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;