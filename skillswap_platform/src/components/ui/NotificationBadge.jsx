import React from 'react';

const NotificationBadge = ({ count, variant = 'default', size = 'default', className = '' }) => {
  if (!count || count <= 0) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3 text-[10px] min-w-[12px]';
      case 'lg':
        return 'h-6 w-6 text-sm min-w-[24px]';
      default:
        return 'h-4 w-4 text-xs min-w-[16px]';
    }
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <span
      className={`
        absolute -top-1 -right-1 
        ${getVariantClasses()} 
        ${getSizeClasses()} 
        font-medium rounded-full 
        flex items-center justify-center 
        transition-smooth
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;