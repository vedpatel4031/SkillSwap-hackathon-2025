import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onPhotoUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          onPhotoUpdate(e.target.result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted">
            <Image
              src={profile.photo}
              alt={`${profile.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Photo Upload Overlay */}
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {isUploading ? (
              <Icon name="Loader2" size={20} className="text-white animate-spin" />
            ) : (
              <Icon name="Camera" size={20} className="text-white" />
            )}
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{profile.name}</h1>
            {profile.isVerified && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
                <Icon name="CheckCircle" size={16} />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center sm:justify-start space-x-1 text-muted-foreground mb-2">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">{profile.location}</span>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-muted-foreground">
            <span>{profile.skillsOffered.length} Skills Offered</span>
            <span>•</span>
            <span>{profile.skillsWanted.length} Skills Wanted</span>
            <span>•</span>
            <span>Member since {profile.memberSince}</span>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;