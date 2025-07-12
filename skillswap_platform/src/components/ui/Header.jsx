import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(2);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    // Logout logic here
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard-home" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">SkillSwap</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search skills, people, or topics..."
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Icon - Mobile only */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Bell" size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Messages */}
          <Link
            to="/messaging-system"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="MessageCircle" size={20} />
            {messages > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {messages}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 p-1 rounded-md hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-secondary-foreground" />
              </div>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-muted-foreground transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevated z-1010">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-popover-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile-management"
                    className="flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </Link>
                  <Link
                    to="/dashboard-home"
                    className="flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="BarChart3" size={16} className="mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/swap-requests-management"
                    className="flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="ArrowLeftRight" size={16} className="mr-3" />
                    My Swaps
                  </Link>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;