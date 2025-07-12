import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const location = useLocation();
  const [swapRequests] = React.useState(2);
  const [messages] = React.useState(3);

  const navigationItems = [
    {
      name: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null,
    },
    {
      name: 'Discover',
      path: '/skill-search-browse',
      icon: 'Search',
      badge: null,
    },
    {
      name: 'Swaps',
      path: '/swap-requests-management',
      icon: 'ArrowLeftRight',
      badge: swapRequests,
    },
    {
      name: 'Messages',
      path: '/messaging-system',
      icon: 'MessageCircle',
      badge: messages,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-999">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-smooth ${
                isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={20} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Header Navigation */}
      <nav className="hidden lg:block">
        <div className="flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={18} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;