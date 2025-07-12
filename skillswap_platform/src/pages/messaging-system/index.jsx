import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ConversationList from './components/ConversationList';
import ChatHeader from './components/ChatHeader';
import ChatArea from './components/ChatArea';

const MessagingSystem = () => {
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);
  const [messages, setMessages] = useState([]);

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      partnerName: 'Sarah Chen',
      partnerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      swapContext: 'React Development ↔ UI/UX Design',
      lastMessage: 'Great! I can help you with the component architecture. When would be a good time to start?',
      lastMessageSender: 'Sarah Chen',
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      isTyping: false
    },
    {
      id: '2',
      partnerName: 'Michael Rodriguez',
      partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      swapContext: 'Spanish Language ↔ Guitar Lessons',
      lastMessage: 'Perfect! I have my guitar ready. Should we start with basic chords?',
      lastMessageSender: 'You',
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    },
    {
      id: '3',
      partnerName: 'Emma Thompson',
      partnerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      swapContext: 'Photography ↔ Content Writing',
      lastMessage: 'I love your portfolio! The lighting in your portraits is amazing.',
      lastMessageSender: 'Emma Thompson',
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 1,
      isOnline: true,
      isTyping: true
    },
    {
      id: '4',
      partnerName: 'David Kim',
      partnerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      swapContext: 'Data Science ↔ Web Development',
      lastMessage: 'Thanks for the Python tutorial! The pandas examples were really helpful.',
      lastMessageSender: 'David Kim',
      lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    },
    {
      id: '5',
      partnerName: 'Lisa Wang',
      partnerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      swapContext: 'Digital Marketing ↔ Graphic Design',
      lastMessage: 'The brand guidelines look fantastic! Can we schedule a call to discuss the campaign strategy?',
      lastMessageSender: 'Lisa Wang',
      lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
      isOnline: true,
      isTyping: false
    }
  ];

  // Mock messages data
  const mockMessages = [
    {
      id: '1',
      conversationId: '1',
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Hi! I saw your request for React development help. I\'d love to learn UI/UX design from you in exchange.',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '1',
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'That sounds perfect! I\'ve been wanting to improve my design skills. What specific areas of React are you looking to learn?',
      timestamp: new Date(Date.now() - 86400000 * 2 + 300000).toISOString(),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '1',
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: `I'm particularly interested in:\n• Component architecture and best practices\n• State management with Redux\n• Performance optimization techniques\n• Testing strategies`,
      timestamp: new Date(Date.now() - 86400000 * 2 + 600000).toISOString(),
      status: 'read'
    },
    {
      id: '4',conversationId: '1',senderId: 'current-user',senderName: 'You',senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',type: 'text',content: 'Excellent! I can definitely help with all of those. In return, I\'d love to learn about user research, wireframing, and design systems.',
      timestamp: new Date(Date.now() - 86400000 * 2 + 900000).toISOString(),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '1',
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      caption: 'Here\'s a design system I created for a recent project. We could use this as a starting point for our lessons!',
      timestamp: new Date(Date.now() - 86400000 + 300000).toISOString(),
      status: 'read'
    },
    {
      id: '6',
      conversationId: '1',
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Wow, that looks really professional! I love the color palette and typography choices. This will be a great reference.',
      timestamp: new Date(Date.now() - 86400000 + 600000).toISOString(),
      status: 'read'
    },
    {
      id: '7',
      conversationId: '1',
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Great! I can help you with the component architecture. When would be a good time to start?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'delivered'
    },
    {
      id: '8',
      conversationId: '2',
      senderId: 'michael-rodriguez',
      senderName: 'Michael Rodriguez',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: '¡Hola! I\'m excited to help you learn Spanish. What\'s your current level?',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'read'
    },
    {
      id: '9',
      conversationId: '2',
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'I\'m a complete beginner! I know some basic phrases but that\'s about it. I\'m really excited to learn though.',
      timestamp: new Date(Date.now() - 86400000 + 300000).toISOString(),
      status: 'read'
    },
    {
      id: '10',
      conversationId: '2',
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Perfect! I have my guitar ready. Should we start with basic chords?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'read'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    // On mobile, hide conversation list when a chat is selected
    if (window.innerWidth < 1024) {
      setShowConversationList(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversationList(true);
    setActiveConversationId(null);
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      ...messageData,
      id: Date.now().toString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-16 lg:pb-0">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Conversation List - Mobile: Full screen, Desktop: Sidebar */}
          <div className={`${
            showConversationList ? 'flex' : 'hidden'
          } lg:flex lg:w-80 flex-shrink-0`}>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onConversationSelect={handleConversationSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Chat Area - Mobile: Full screen when active, Desktop: Main area */}
          <div className={`flex-1 flex flex-col ${
            showConversationList && !activeConversationId ? 'hidden lg:flex' : 'flex'
          }`}>
            <ChatHeader
              conversation={activeConversation}
              onBack={handleBackToConversations}
            />
            <ChatArea
              conversation={activeConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>

      <TabNavigation />
    </div>
  );
};

export default MessagingSystem;