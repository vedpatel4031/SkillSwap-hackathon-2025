import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ProfileDropdown = ({ user = null, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Default user data if none provided
  const defaultUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    initials: 'JD',
  };

  const currentUser = user || defaultUser;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path) => {
    setIsOpen(false);
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    setIsOpen(false);
    // Implement logout logic here
    console.log('Logging out...');
    navigate('/login-register');
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      path: '/profile-management',
    },
    {
      label: 'Dashboard',
      icon: 'BarChart3',
      path: '/dashboard-home',
    },
    {
      label: 'My Swaps',
      icon: 'ArrowLeftRight',
      path: '/swap-requests-management',
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: null, // Could be external link or modal
    },
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 p-1 rounded-md hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-secondary-foreground">
              {currentUser.initials}
            </span>
          )}
        </div>

        {/* Chevron */}
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-elevated z-1010 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-base font-medium text-secondary-foreground">
                    {currentUser.initials}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-popover-foreground truncate">
                  {currentUser.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
                className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth focus:outline-none focus:bg-muted"
              >
                <Icon name={item.icon} size={16} className="mr-3 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-1"></div>

          {/* Logout */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth focus:outline-none focus:bg-muted"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;