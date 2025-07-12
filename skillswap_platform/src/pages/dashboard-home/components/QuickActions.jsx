import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      title: 'Find Skills',
      description: 'Discover new skills to learn',
      icon: 'Search',
      path: '/skill-search-browse',
      color: 'bg-primary text-primary-foreground',
    },
    {
      title: 'Manage Swaps',
      description: 'View your active exchanges',
      icon: 'ArrowLeftRight',
      path: '/swap-requests-management',
      color: 'bg-success text-success-foreground',
    },
    {
      title: 'Messages',
      description: 'Chat with your connections',
      icon: 'MessageCircle',
      path: '/messaging-system',
      color: 'bg-accent text-accent-foreground',
    },
    {
      title: 'Profile',
      description: 'Update your skills & info',
      icon: 'User',
      path: '/profile-management',
      color: 'bg-secondary text-secondary-foreground',
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <Icon name={action.icon} size={20} />
            </div>
            <h3 className="font-medium text-card-foreground mb-1 group-hover:text-primary transition-smooth">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;