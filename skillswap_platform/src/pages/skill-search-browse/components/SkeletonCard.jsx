import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-muted rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-muted rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-muted rounded w-8 ml-1"></div>
          </div>
        </div>
      </div>

      {/* Skills Offered */}
      <div className="mb-3">
        <div className="h-3 bg-muted rounded w-20 mb-2"></div>
        <div className="flex flex-wrap gap-1">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-14"></div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <div className="h-3 bg-muted rounded w-24"></div>
      </div>

      {/* Action Button */}
      <div className="h-8 bg-muted rounded"></div>
    </div>
  );
};

export default SkeletonCard;