import React, { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Icon from '../../../components/AppIcon';

const ChatArea = ({ conversation, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8 text-center">
        <div className="max-w-md">
          <Icon name="MessageCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Welcome to SkillSwap Messaging
          </h3>
          <p className="text-muted-foreground mb-6">
            Select a conversation from the sidebar to start messaging with your skill exchange partners.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Secure end-to-end messaging</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Real-time message delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Share files and resources</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const conversationMessages = messages.filter(msg => msg.conversationId === conversation.id);

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateString === today) return 'Today';
    if (dateString === yesterday) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const shouldShowAvatar = (message, index, messages) => {
    if (message.senderId === 'current-user') return false;
    if (index === messages.length - 1) return true;
    
    const nextMessage = messages[index + 1];
    return !nextMessage || nextMessage.senderId !== message.senderId;
  };

  const shouldShowTimestamp = (message, index, messages) => {
    if (index === messages.length - 1) return true;
    
    const nextMessage = messages[index + 1];
    if (!nextMessage || nextMessage.senderId !== message.senderId) return true;
    
    const timeDiff = new Date(nextMessage.timestamp) - new Date(message.timestamp);
    return timeDiff > 300000; // 5 minutes
  };

  const messageGroups = groupMessagesByDate(conversationMessages);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {Object.entries(messageGroups).map(([date, dayMessages]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex justify-center my-6">
              <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                {formatDateHeader(date)}
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === 'current-user'}
                showAvatar={shouldShowAvatar(message, index, dayMessages)}
                showTimestamp={shouldShowTimestamp(message, index, dayMessages)}
              />
            ))}
          </div>
        ))}

        {/* Empty State */}
        {conversationMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start the conversation
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Send your first message to {conversation.partnerName} about your skill exchange.
            </p>
            <div className="bg-muted rounded-lg p-4 max-w-md">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Icon name="ArrowLeftRight" size={16} className="mr-2" />
                <span>Swap Context</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {conversation.swapContext}
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-20 right-6">
          <button
            onClick={scrollToBottom}
            className="bg-primary text-primary-foreground p-2 rounded-full shadow-elevated hover:bg-primary/90 transition-smooth"
          >
            <Icon name="ChevronDown" size={20} />
          </button>
        </div>
      )}

      {/* Message Input */}
      <MessageInput
        onSendMessage={(messageData) => {
          const newMessage = {
            id: Date.now().toString(),
            conversationId: conversation.id,
            senderId: 'current-user',
            senderName: 'You',
            senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            ...messageData,
            status: 'sending'
          };
          onSendMessage(newMessage);
        }}
        placeholder={`Message ${conversation.partnerName}...`}
      />
    </div>
  );
};

export default ChatArea;