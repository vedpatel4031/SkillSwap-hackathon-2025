import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'pending',
      label: 'Pending',
      icon: 'Clock',
      count: counts.pending || 0,
    },
    {
      id: 'active',
      label: 'Active',
      icon: 'CheckCircle',
      count: counts.active || 0,
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'Star',
      count: counts.completed || 0,
    },
    {
      id: 'sent',
      label: 'Sent',
      icon: 'Send',
      count: counts.sent || 0,
    },
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-smooth border-b-2 ${
              activeTab === tab.id
                ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTabs;