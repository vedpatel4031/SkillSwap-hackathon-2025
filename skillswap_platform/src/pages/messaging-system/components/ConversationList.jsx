import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, activeConversationId, onConversationSelect, searchQuery, onSearchChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredConversations = conversations.filter(conversation =>
    conversation.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.swapContext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
      return diffInMinutes < 1 ? 'now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInHours < 48) {
      return 'yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Messages</h2>
        
        {/* Search */}
        <div className={`relative transition-smooth ${isSearchFocused ? 'ring-2 ring-ring' : ''} rounded-md`}>
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? 'Try a different search term' : 'Start a conversation with a skill partner'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`p-4 cursor-pointer transition-smooth hover:bg-muted ${
                  activeConversationId === conversation.id ? 'bg-muted border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                      <Image
                        src={conversation.partnerAvatar}
                        alt={conversation.partnerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.partnerName}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatTimestamp(conversation.lastMessageTime)}
                      </span>
                    </div>

                    {/* Swap Context */}
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <Icon name="ArrowLeftRight" size={12} className="mr-1" />
                      <span className="truncate">{conversation.swapContext}</span>
                    </div>

                    {/* Last Message */}
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        conversation.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'
                      }`}>
                        {conversation.isTyping ? (
                          <span className="flex items-center text-primary">
                            <Icon name="MoreHorizontal" size={16} className="mr-1 animate-pulse" />
                            typing...
                          </span>
                        ) : (
                          <>
                            {conversation.lastMessageSender === 'You' && (
                              <span className="text-muted-foreground mr-1">You: </span>
                            )}
                            {conversation.lastMessage}
                          </>
                        )}
                      </p>
                      
                      {/* Unread Badge */}
                      {conversation.unreadCount > 0 && (
                        <div className="flex-shrink-0 ml-2">
                          <span className="bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                            {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;