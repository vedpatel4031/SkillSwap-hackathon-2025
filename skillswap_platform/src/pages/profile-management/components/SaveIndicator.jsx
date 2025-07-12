import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const SaveIndicator = ({ isSaving, lastSaved, hasChanges }) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  if (isSaving) {
    return (
      <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-elevated z-50">
        <div className="flex items-center space-x-2">
          <Icon name="Loader2" size={16} className="text-primary animate-spin" />
          <span className="text-sm text-foreground">Saving changes...</span>
        </div>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="fixed bottom-4 right-4 bg-success border border-success/20 rounded-lg px-4 py-2 shadow-elevated z-50 animate-in slide-in-from-bottom-2">
        <div className="flex items-center space-x-2">
          <Icon name="Check" size={16} className="text-success-foreground" />
          <span className="text-sm text-success-foreground">Changes saved</span>
        </div>
      </div>
    );
  }

  if (hasChanges) {
    return (
      <div className="fixed bottom-4 right-4 bg-warning/10 border border-warning/20 rounded-lg px-4 py-2 shadow-elevated z-50">
        <div className="flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-warning" />
          <span className="text-sm text-warning">Unsaved changes</span>
        </div>
      </div>
    );
  }

  return null;
};

export default SaveIndicator;