import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import RequestCard from './components/RequestCard';
import StatusTabs from './components/StatusTabs';
import SearchFilters from './components/SearchFilters';
import EmptyState from './components/EmptyState';
import RatingModal from './components/RatingModal';
import PullToRefresh from './components/PullToRefresh';

const SwapRequestsManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ skill: '', date: '' });
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for swap requests
  const [swapRequests] = useState([
    {
      id: 1,
      type: 'received',
      status: 'pending',
      partner: {
        id: 101,
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        location: 'San Francisco, CA'
      },
      theirSkill: 'React Development',
      yourSkill: 'UI/UX Design',
      duration: '2 hours/week for 4 weeks',
      preferredTime: 'Weekends',
      format: 'Video calls',
      message: 'Hi! I\'d love to learn UI/UX design from you. I have 3 years of React experience and can help you build modern web applications.',
      createdAt: new Date('2025-07-10T10:30:00'),
      rated: false
    },
    {
      id: 2,
      type: 'received',
      status: 'pending',
      partner: {
        id: 102,
        name: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Austin, TX'
      },
      theirSkill: 'Spanish Language',
      yourSkill: 'Guitar Playing',
      duration: '1 hour/week for 8 weeks',
      preferredTime: 'Evenings',
      format: 'In-person meetups',
      message: 'I\'m a native Spanish speaker and would love to learn guitar. I can help you become conversational in Spanish!',
      createdAt: new Date('2025-07-09T14:15:00'),
      rated: false
    },
    {
      id: 3,
      type: 'active',
      status: 'active',
      partner: {
        id: 103,
        name: 'Emily Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        location: 'New York, NY'
      },
      theirSkill: 'Photography',
      yourSkill: 'Digital Marketing',
      duration: '3 hours/week for 6 weeks',
      preferredTime: 'Weekends',
      format: 'Mixed (online + in-person)',
      message: 'Excited to start our skill exchange! I\'ll teach you portrait and landscape photography techniques.',
      createdAt: new Date('2025-07-05T09:00:00'),
      rated: false
    },
    {
      id: 4,
      type: 'active',
      status: 'active',
      partner: {
        id: 104,
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        location: 'Seattle, WA'
      },
      theirSkill: 'Python Programming',
      yourSkill: 'Data Analysis',
      duration: '2 hours/week for 5 weeks',
      preferredTime: 'Evenings',
      format: 'Video calls',
      message: 'Looking forward to learning data analysis techniques while helping you with Python!',
      createdAt: new Date('2025-07-01T16:45:00'),
      rated: false
    },
    {
      id: 5,
      type: 'completed',
      status: 'completed',
      partner: {
        id: 105,
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        location: 'Los Angeles, CA'
      },
      theirSkill: 'Cooking (Italian)',
      yourSkill: 'Yoga Instruction',
      duration: '2 hours/week for 4 weeks',
      preferredTime: 'Weekends',
      format: 'In-person',
      message: 'Completed our amazing skill exchange! Lisa taught me authentic Italian cooking.',
      createdAt: new Date('2025-06-15T11:30:00'),
      rated: false
    },
    {
      id: 6,
      type: 'completed',
      status: 'completed',
      partner: {
        id: 106,
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        location: 'Chicago, IL'
      },
      theirSkill: 'Graphic Design',
      yourSkill: 'Content Writing',
      duration: '3 hours/week for 3 weeks',
      preferredTime: 'Evenings',
      format: 'Video calls',
      message: 'Great experience learning graphic design fundamentals!',
      createdAt: new Date('2025-06-01T13:20:00'),
      rated: true
    },
    {
      id: 7,
      type: 'sent',
      status: 'sent',
      partner: {
        id: 107,
        name: 'Anna Martinez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        location: 'Miami, FL'
      },
      theirSkill: 'Salsa Dancing',
      yourSkill: 'Web Development',
      duration: '2 hours/week for 6 weeks',
      preferredTime: 'Weekends',
      format: 'In-person',
      message: 'Hi Anna! I\'d love to learn salsa dancing. I can help you build a professional website in return.',
      createdAt: new Date('2025-07-11T08:15:00'),
      rated: false
    },
    {
      id: 8,
      type: 'sent',
      status: 'sent',
      partner: {
        id: 108,
        name: 'Robert Taylor',
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
        location: 'Denver, CO'
      },
      theirSkill: 'Woodworking',
      yourSkill: 'Financial Planning',
      duration: '4 hours/week for 5 weeks',
      preferredTime: 'Weekends',
      format: 'In-person',
      message: 'Interested in learning woodworking basics. I can help you with personal finance and investment strategies.',
      createdAt: new Date('2025-07-08T15:45:00'),
      rated: false
    }
  ]);

  // Filter requests based on active tab
  const getFilteredRequests = useCallback(() => {
    let filtered = swapRequests.filter(request => {
      if (activeTab === 'pending') {
        return request.status === 'pending' && request.type === 'received';
      }
      if (activeTab === 'sent') {
        return request.status === 'sent' || (request.status === 'pending' && request.type === 'sent');
      }
      return request.status === activeTab;
    });

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.theirSkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.yourSkill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply skill filter
    if (filters.skill) {
      filtered = filtered.filter(request =>
        request.theirSkill.toLowerCase().includes(filters.skill.toLowerCase()) ||
        request.yourSkill.toLowerCase().includes(filters.skill.toLowerCase())
      );
    }

    // Apply date filter
    if (filters.date) {
      const now = new Date();
      const filterDate = new Date(request.createdAt);
      
      filtered = filtered.filter(request => {
        const requestDate = new Date(request.createdAt);
        
        switch (filters.date) {
          case 'today':
            return requestDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return requestDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return requestDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return requestDate >= quarterAgo;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [swapRequests, activeTab, searchTerm, filters]);

  // Get counts for each tab
  const getCounts = useCallback(() => {
    return {
      pending: swapRequests.filter(r => r.status === 'pending' && r.type === 'received').length,
      active: swapRequests.filter(r => r.status === 'active').length,
      completed: swapRequests.filter(r => r.status === 'completed').length,
      sent: swapRequests.filter(r => r.status === 'sent' || (r.status === 'pending' && r.type === 'sent')).length,
    };
  }, [swapRequests]);

  const filteredRequests = getFilteredRequests();
  const counts = getCounts();

  // Handle actions
  const handleAccept = async (requestId, message = '') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Accepting request:', requestId, 'with message:', message);
      // Update request status in real app
    } catch (error) {
      console.error('Failed to accept request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async (requestId, message = '') => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Declining request:', requestId, 'with message:', message);
    } catch (error) {
      console.error('Failed to decline request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (requestId) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Canceling request:', requestId);
    } catch (error) {
      console.error('Failed to cancel request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (requestId) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Marking complete:', requestId);
    } catch (error) {
      console.error('Failed to mark complete:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = (partnerId) => {
    navigate(`/messaging-system?user=${partnerId}`);
  };

  const handleRate = (requestId) => {
    const request = swapRequests.find(r => r.id === requestId);
    setSelectedRequest(request);
    setIsRatingModalOpen(true);
  };

  const handleSubmitRating = async (ratingData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitting rating:', ratingData);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Refreshing swap requests...');
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ skill: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="px-4 py-6 border-b border-border bg-card">
            <h1 className="text-2xl font-bold text-foreground mb-2">Swap Requests</h1>
            <p className="text-muted-foreground">
              Manage your skill exchange requests and track your learning journey
            </p>
          </div>

          {/* Status Tabs */}
          <StatusTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Search and Filters */}
          <SearchFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            onClear={handleClearFilters}
          />

          {/* Content */}
          <div className="bg-background min-h-[60vh]">
            <PullToRefresh onRefresh={handleRefresh}>
              {filteredRequests.length === 0 ? (
                <EmptyState
                  type={searchTerm || filters.skill || filters.date ? 'search' : activeTab}
                  onRefresh={handleClearFilters}
                />
              ) : (
                <div className="p-4 space-y-4">
                  {filteredRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onAccept={handleAccept}
                      onDecline={handleDecline}
                      onCancel={handleCancel}
                      onMarkComplete={handleMarkComplete}
                      onMessage={handleMessage}
                      onRate={handleRate}
                    />
                  ))}
                </div>
              )}
            </PullToRefresh>
          </div>
        </div>
      </main>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        request={selectedRequest}
        onSubmit={handleSubmitRating}
      />

      {/* Bottom Navigation */}
      <TabNavigation />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 shadow-modal">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-foreground">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapRequestsManagement;