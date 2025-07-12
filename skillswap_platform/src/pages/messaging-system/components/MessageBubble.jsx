import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isOwn, showAvatar, showTimestamp }) => {
  const [imageError, setImageError] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Icon name="Clock" size={12} className="text-muted-foreground" />;
      case 'sent':
        return <Icon name="Check" size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={12} className="text-muted-foreground" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} className="text-primary" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        );

      case 'image':
        return (
          <div className="max-w-xs">
            {!imageError ? (
              <Image
                src={message.content}
                alt="Shared image"
                className="rounded-md max-w-full h-auto cursor-pointer hover:opacity-90 transition-smooth"
                onError={() => setImageError(true)}
                onClick={() => {
                  // Handle image preview/modal
                  console.log('Open image preview:', message.content);
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-48 h-32 bg-muted rounded-md border border-border">
                <div className="text-center">
                  <Icon name="ImageOff" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Image unavailable</p>
                </div>
              </div>
            )}
            {message.caption && (
              <p className="text-sm mt-2 whitespace-pre-wrap break-words">
                {message.caption}
              </p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-md border border-border max-w-xs">
            <div className="flex-shrink-0">
              <Icon name="FileText" size={24} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {message.fileName || 'Document'}
              </p>
              <p className="text-xs text-muted-foreground">
                {message.fileSize || 'Unknown size'}
              </p>
            </div>
            <button className="flex-shrink-0 p-1 text-primary hover:text-primary/80 transition-smooth">
              <Icon name="Download" size={16} />
            </button>
          </div>
        );

      case 'system':
        return (
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block">
              {message.content}
            </p>
          </div>
        );

      default:
        return (
          <p className="text-sm text-muted-foreground italic">
            Unsupported message type
          </p>
        );
    }
  };

  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        {renderMessageContent()}
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary">
              <Image
                src={message.senderAvatar}
                alt={message.senderName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Sender Name (for group chats or non-own messages) */}
          {!isOwn && showAvatar && (
            <p className="text-xs text-muted-foreground mb-1 px-1">
              {message.senderName}
            </p>
          )}

          {/* Message Bubble */}
          <div
            className={`px-3 py-2 rounded-2xl ${
              isOwn
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            }`}
          >
            {renderMessageContent()}
          </div>

          {/* Timestamp and Status */}
          {showTimestamp && (
            <div className={`flex items-center mt-1 px-1 space-x-1 ${
              isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
              {isOwn && getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;