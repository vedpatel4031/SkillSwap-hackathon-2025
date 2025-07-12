import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import UserCard from './components/UserCard';
import AdvancedFilters from './components/AdvancedFilters';
import SortDropdown from './components/SortDropdown';
import SkeletonCard from './components/SkeletonCard';

const SkillSearchBrowse = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const [filters, setFilters] = useState({
    location: '',
    radius: '',
    categories: [],
    availability: [],
    rating: '',
    verifiedOnly: false,
    onlineOnly: false,
    recentlyActive: false
  });

  const [activeFilters, setActiveFilters] = useState([]);
  const [users, setUsers] = useState([]);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 24,
      skillsOffered: ['Web Development', 'React', 'JavaScript', 'UI/UX Design'],
      availability: 'weekends',
      isVerified: true,
      isOnline: true,
      lastActive: new Date()
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 18,
      skillsOffered: ['Graphic Design', 'Adobe Creative Suite', 'Branding'],
      availability: 'evenings',
      isVerified: true,
      isOnline: false,
      lastActive: new Date(Date.now() - 86400000)
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 31,
      skillsOffered: ['Photography', 'Photo Editing', 'Lightroom'],
      availability: 'flexible',
      isVerified: true,
      isOnline: true,
      lastActive: new Date()
    },
    {
      id: 4,
      name: 'David Kim',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.4,
      reviewCount: 12,
      skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy'],
      availability: 'weekdays',
      isVerified: false,
      isOnline: true,
      lastActive: new Date()
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 22,
      skillsOffered: ['Video Editing', 'Motion Graphics', 'After Effects'],
      availability: 'weekends',
      isVerified: true,
      isOnline: false,
      lastActive: new Date(Date.now() - 172800000)
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4.5,
      reviewCount: 16,
      skillsOffered: ['Data Analysis', 'Python', 'Machine Learning'],
      availability: 'evenings',
      isVerified: true,
      isOnline: true,
      lastActive: new Date()
    }
  ];

  // Debounced search function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      performSearch(searchTerm);
    }, 300),
    [filters, sortBy]
  );

  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      performSearch('');
    }
  }, [searchValue, debouncedSearch]);

  useEffect(() => {
    updateActiveFilters();
  }, [filters]);

  const performSearch = (searchTerm) => {
    setLoading(true);
    setPage(1);
    
    // Simulate API call
    setTimeout(() => {
      let filteredUsers = [...mockUsers];
      
      // Apply search filter
      if (searchTerm) {
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.skillsOffered.some(skill => 
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      // Apply other filters
      filteredUsers = applyFilters(filteredUsers);
      
      // Apply sorting
      filteredUsers = applySorting(filteredUsers);
      
      setUsers(filteredUsers);
      setHasMore(filteredUsers.length >= 6);
      setLoading(false);
    }, 500);
  };

  const applyFilters = (userList) => {
    let filtered = [...userList];
    
    if (filters.verifiedOnly) {
      filtered = filtered.filter(user => user.isVerified);
    }
    
    if (filters.onlineOnly) {
      filtered = filtered.filter(user => user.isOnline);
    }
    
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(user => user.rating >= minRating);
    }
    
    if (filters.availability.length > 0) {
      filtered = filtered.filter(user =>
        filters.availability.includes(user.availability)
      );
    }
    
    return filtered;
  };

  const applySorting = (userList) => {
    const sorted = [...userList];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return sorted.sort((a, b) => b.lastActive - a.lastActive);
      case 'distance':
        // Mock distance sorting
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  };

  const updateActiveFilters = () => {
    const active = [];
    
    if (filters.location) {
      active.push({
        type: 'location',
        value: filters.location,
        radius: filters.radius || '10'
      });
    }
    
    filters.categories.forEach(category => {
      active.push({
        type: 'category',
        value: category.label || category
      });
    });
    
    filters.availability.forEach(availability => {
      active.push({
        type: 'availability',
        value: availability.label || availability
      });
    });
    
    if (filters.rating) {
      active.push({
        type: 'rating',
        value: filters.rating
      });
    }
    
    if (filters.verifiedOnly) {
      active.push({
        type: 'verification',
        value: 'Verified only'
      });
    }
    
    setActiveFilters(active);
  };

  const handleRemoveFilter = (filterToRemove) => {
    const newFilters = { ...filters };
    
    switch (filterToRemove.type) {
      case 'location':
        newFilters.location = '';
        newFilters.radius = '';
        break;
      case 'category':
        newFilters.categories = newFilters.categories.filter(
          cat => (cat.label || cat) !== filterToRemove.value
        );
        break;
      case 'availability':
        newFilters.availability = newFilters.availability.filter(
          avail => (avail.label || avail) !== filterToRemove.value
        );
        break;
      case 'rating':
        newFilters.rating = '';
        break;
      case 'verification':
        newFilters.verifiedOnly = false;
        break;
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      location: '',
      radius: '',
      categories: [],
      availability: [],
      rating: '',
      verifiedOnly: false,
      onlineOnly: false,
      recentlyActive: false
    });
  };

  const handleRequestSwap = (user) => {
    navigate('/swap-requests-management', { 
      state: { 
        action: 'create',
        targetUser: user 
      } 
    });
  };

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    // Simulate loading more results
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
      // For demo, stop loading more after page 2
      if (page >= 2) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, page]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="py-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Discover Skills
            </h1>
            <p className="text-muted-foreground">
              Find people to exchange skills with in your area
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <SearchBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onSearch={performSearch}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setShowFilters(true)}
              className="lg:hidden"
            >
              Filters
            </Button>
            
            {/* Desktop Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              iconName="SlidersHorizontal"
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex"
            >
              Advanced Filters
            </Button>
          </div>

          {/* Active Filter Chips */}
          <div className="mb-4">
            <FilterChips
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              {showFilters && (
                <div className="sticky top-24">
                  <AdvancedFilters
                    isOpen={true}
                    onClose={() => setShowFilters(false)}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApplyFilters={() => performSearch(searchValue)}
                    onClearFilters={handleClearAllFilters}
                  />
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Results Count */}
              <SortDropdown
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultCount={users.length}
              />

              {/* Results Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : users.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {users.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onRequestSwap={handleRequestSwap}
                      />
                    ))}
                  </div>

                  {/* Load More Indicator */}
                  {loadingMore && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                      {[...Array(3)].map((_, index) => (
                        <SkeletonCard key={`loading-${index}`} />
                      ))}
                    </div>
                  )}

                  {/* End of Results */}
                  {!hasMore && users.length > 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You've reached the end of the results
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Advanced Filters */}
      <AdvancedFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={() => performSearch(searchValue)}
        onClearFilters={handleClearAllFilters}
      />

      <TabNavigation />
    </div>
  );
};

export default SkillSearchBrowse;