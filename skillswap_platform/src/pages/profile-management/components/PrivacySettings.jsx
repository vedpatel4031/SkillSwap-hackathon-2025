import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettings = ({ privacy, onPrivacyUpdate }) => {
  const handleProfileVisibilityChange = (checked) => {
    onPrivacyUpdate({
      ...privacy,
      profilePublic: checked
    });
  };

  const handleContactInfoChange = (checked) => {
    onPrivacyUpdate({
      ...privacy,
      showContactInfo: checked
    });
  };

  const handleLocationChange = (checked) => {
    onPrivacyUpdate({
      ...privacy,
      showLocation: checked
    });
  };

  const handleSwapHistoryChange = (checked) => {
    onPrivacyUpdate({
      ...privacy,
      showSwapHistory: checked
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Privacy Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <Checkbox
            label="Make my profile public"
            description="Allow other users to discover and view your profile"
            checked={privacy.profilePublic}
            onChange={(e) => handleProfileVisibilityChange(e.target.checked)}
          />
          
          {!privacy.profilePublic && (
            <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Private Profile</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your profile won't appear in search results. You can still send swap requests to others.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <Checkbox
            label="Show contact information"
            description="Display email and other contact details on your profile"
            checked={privacy.showContactInfo}
            onChange={(e) => handleContactInfoChange(e.target.checked)}
          />
        </div>

        {/* Location */}
        <div>
          <Checkbox
            label="Show location"
            description="Display your city and region to help with local connections"
            checked={privacy.showLocation}
            onChange={(e) => handleLocationChange(e.target.checked)}
          />
        </div>

        {/* Swap History */}
        <div>
          <Checkbox
            label="Show swap history"
            description="Allow others to see your completed swaps and ratings"
            checked={privacy.showSwapHistory}
            onChange={(e) => handleSwapHistoryChange(e.target.checked)}
          />
        </div>

        {/* Privacy Summary */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium text-foreground mb-3">Privacy Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Profile visibility:</span>
              <span className={`font-medium ${privacy.profilePublic ? 'text-success' : 'text-warning'}`}>
                {privacy.profilePublic ? 'Public' : 'Private'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contact info visible:</span>
              <span className={`font-medium ${privacy.showContactInfo ? 'text-success' : 'text-muted-foreground'}`}>
                {privacy.showContactInfo ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location visible:</span>
              <span className={`font-medium ${privacy.showLocation ? 'text-success' : 'text-muted-foreground'}`}>
                {privacy.showLocation ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;