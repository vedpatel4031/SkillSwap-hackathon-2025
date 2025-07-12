import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatHeader = ({ conversation, onBack, onMenuToggle }) => {
  const [showMenu, setShowMenu] = useState(false);

  if (!conversation) {
    return (
      <div className="h-16 border-b border-border bg-card flex items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
    if (onMenuToggle) onMenuToggle(!showMenu);
  };

  return (
    <div className="relative bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Back Button (Mobile) */}
          <button
            onClick={onBack}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>

          {/* Partner Info */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                <Image
                  src={conversation.partnerAvatar}
                  alt={conversation.partnerName}
                  className="w-full h-full object-cover"
                />
              </div>
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
              )}
            </div>

            <div className="min-w-0">
              <Link
                to="/profile-management"
                className="font-medium text-foreground hover:text-primary transition-smooth"
              >
                {conversation.partnerName}
              </Link>
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon name="ArrowLeftRight" size={12} className="mr-1" />
                <span className="truncate">{conversation.swapContext}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Video Call */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Video" size={20} />
          </button>

          {/* Voice Call */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Phone" size={20} />
          </button>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="p-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="MoreVertical" size={20} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated z-1010">
                <div className="py-1">
                  <Link
                    to="/profile-management"
                    className="flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    View Profile
                  </Link>
                  <Link
                    to="/swap-requests-management"
                    className="flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon name="ArrowLeftRight" size={16} className="mr-3" />
                    View Swap Details
                  </Link>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon name="Search" size={16} className="mr-3" />
                    Search Messages
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-warning hover:bg-muted transition-smooth"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon name="Flag" size={16} className="mr-3" />
                    Report User
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon name="UserX" size={16} className="mr-3" />
                    Block User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      {conversation.isTyping && (
        <div className="px-4 pb-2">
          <div className="flex items-center text-xs text-primary">
            <Icon name="MoreHorizontal" size={14} className="mr-1 animate-pulse" />
            {conversation.partnerName} is typing...
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;