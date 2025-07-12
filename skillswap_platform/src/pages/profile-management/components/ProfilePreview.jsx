import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePreview = ({ profile, privacy }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Eye" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Profile Preview</h2>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
          How others see you
        </span>
      </div>

      {/* Preview Card */}
      <div className="border border-border rounded-lg p-4 bg-background">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={profile.photo}
              alt={`${profile.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{profile.name}</h3>
              {profile.isVerified && (
                <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
              )}
            </div>
            
            {privacy.showLocation && (
              <div className="flex items-center space-x-1 text-muted-foreground mb-2">
                <Icon name="MapPin" size={14} />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{profile.skillsOffered.length} skills offered</span>
              <span>•</span>
              <span>{profile.skillsWanted.length} skills wanted</span>
            </div>
          </div>
        </div>

        {/* Skills Offered */}
        {profile.skillsOffered.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Skills Offered</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered.slice(0, 6).map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
              {profile.skillsOffered.length > 6 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  +{profile.skillsOffered.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Skills Wanted */}
        {profile.skillsWanted.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Skills Wanted</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.slice(0, 6).map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
              {profile.skillsWanted.length > 6 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  +{profile.skillsWanted.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Availability</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {profile.availability.weekends && (
              <span className="bg-success/10 text-success px-2 py-1 rounded-full">
                Weekends
              </span>
            )}
            {profile.availability.evenings && (
              <span className="bg-success/10 text-success px-2 py-1 rounded-full">
                Evenings
              </span>
            )}
            {profile.availability.timeSlots.length > 0 && (
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full">
                {profile.availability.timeSlots.length} time slots
              </span>
            )}
          </div>
        </div>

        {/* Contact Info */}
        {privacy.showContactInfo && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Mail" size={14} />
              <span>{profile.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Profile Visibility</p>
            <p className="text-xs text-muted-foreground mt-1">
              {privacy.profilePublic 
                ? "Your profile is public and can be discovered by other users." :"Your profile is private and won't appear in search results."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;