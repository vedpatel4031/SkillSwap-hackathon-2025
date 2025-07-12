import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import AvailabilitySection from './components/AvailabilitySection';
import PrivacySettings from './components/PrivacySettings';
import ProfilePreview from './components/ProfilePreview';
import SaveIndicator from './components/SaveIndicator';

const ProfileManagement = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    memberSince: "Jan 2024",
    skillsOffered: [
      { id: 1, name: "JavaScript", level: "Expert", experience: "5+ years" },
      { id: 2, name: "React", level: "Advanced", experience: "3-4 years" },
      { id: 3, name: "Photography", level: "Intermediate", experience: "2-3 years" }
    ],
    skillsWanted: [
      { id: 1, name: "Python", level: "Beginner", experience: "0-1 years" },
      { id: 2, name: "Design", level: "Intermediate", experience: "1-2 years" }
    ],
    availability: {
      weekends: true,
      evenings: true,
      timeSlots: ['evening', 'morning'],
      timezone: "Pacific Standard Time (PST)",
      responseTime: "Usually responds within 2 hours"
    }
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showContactInfo: true,
    showLocation: true,
    showSwapHistory: true
  });

  const [basicInfo, setBasicInfo] = useState({
    name: profile.name,
    email: profile.email,
    location: profile.location,
    bio: `Passionate developer and photographer looking to expand my skills through meaningful exchanges. I love teaching what I know and learning from others in the community.`
  });

  // Auto-save functionality
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [profile, privacy, basicInfo, hasChanges]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setLastSaved(new Date());
    setHasChanges(false);
  };

  const handleProfileUpdate = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSkillsOfferedUpdate = (skills) => {
    setProfile(prev => ({ ...prev, skillsOffered: skills }));
    setHasChanges(true);
  };

  const handleSkillsWantedUpdate = (skills) => {
    setProfile(prev => ({ ...prev, skillsWanted: skills }));
    setHasChanges(true);
  };

  const handleAvailabilityUpdate = (availability) => {
    setProfile(prev => ({ ...prev, availability }));
    setHasChanges(true);
  };

  const handlePrivacyUpdate = (newPrivacy) => {
    setPrivacy(newPrivacy);
    setHasChanges(true);
  };

  const handleBasicInfoUpdate = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePhotoUpdate = (newPhoto) => {
    setProfile(prev => ({ ...prev, photo: newPhoto }));
    setHasChanges(true);
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: 'User' },
    { id: 'skills', label: 'Skills', icon: 'Star' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  return (
    <div className="min-h-screen bg-background pt-16 pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard-home" className="hover:text-foreground transition-smooth">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Profile Management</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Profile Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your skills, availability, and profile settings
              </p>
            </div>
            
            <div className="hidden sm:flex items-center space-x-3">
              <Link to="/skill-search-browse">
                <Button variant="outline">
                  <Icon name="Search" size={16} className="mr-2" />
                  Browse Skills
                </Button>
              </Link>
              <Link to="/dashboard-home">
                <Button>
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Section Navigation */}
        <div className="lg:hidden mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-smooth ${
                  activeSection === section.id
                    ? 'bg-card text-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <ProfileHeader 
              profile={profile} 
              onPhotoUpdate={handlePhotoUpdate}
            />

            {/* Basic Information */}
            {(activeSection === 'basic' || window.innerWidth >= 1024) && (
              <div className="bg-card rounded-lg p-6 shadow-subtle">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="User" size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) => handleBasicInfoUpdate('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => handleBasicInfoUpdate('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  
                  <div className="sm:col-span-2">
                    <Input
                      label="Location"
                      type="text"
                      value={basicInfo.location}
                      onChange={(e) => handleBasicInfoUpdate('location', e.target.value)}
                      placeholder="City, State/Country"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bio
                    </label>
                    <textarea
                      value={basicInfo.bio}
                      onChange={(e) => handleBasicInfoUpdate('bio', e.target.value)}
                      placeholder="Tell others about yourself and what you're passionate about..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Skills Offered */}
            {(activeSection === 'skills' || window.innerWidth >= 1024) && (
              <>
                <SkillsSection
                  title="Skills I Can Offer"
                  skills={profile.skillsOffered}
                  onSkillsUpdate={handleSkillsOfferedUpdate}
                  placeholder="Add a skill you can teach..."
                  icon="Star"
                />

                {/* Skills Wanted */}
                <SkillsSection
                  title="Skills I Want to Learn"
                  skills={profile.skillsWanted}
                  onSkillsUpdate={handleSkillsWantedUpdate}
                  placeholder="Add a skill you want to learn..."
                  icon="BookOpen"
                />
              </>
            )}

            {/* Availability */}
            {(activeSection === 'availability' || window.innerWidth >= 1024) && (
              <AvailabilitySection
                availability={profile.availability}
                onAvailabilityUpdate={handleAvailabilityUpdate}
              />
            )}

            {/* Privacy Settings */}
            {(activeSection === 'privacy' || window.innerWidth >= 1024) && (
              <PrivacySettings
                privacy={privacy}
                onPrivacyUpdate={handlePrivacyUpdate}
              />
            )}
          </div>

          {/* Right Column - Profile Preview (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProfilePreview profile={profile} privacy={privacy} />
            </div>
          </div>
        </div>
      </div>

      {/* Save Indicator */}
      <SaveIndicator 
        isSaving={isSaving}
        lastSaved={lastSaved}
        hasChanges={hasChanges}
      />
    </div>
  );
};

export default ProfileManagement;