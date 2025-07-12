import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const PULL_THRESHOLD = 80;
  const MAX_PULL_DISTANCE = 120;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchCurrentY = 0;

    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        touchStartY = e.touches[0].clientY;
        startY.current = touchStartY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling || container.scrollTop > 0) {
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      touchCurrentY = e.touches[0].clientY;
      currentY.current = touchCurrentY;
      
      const distance = Math.max(0, touchCurrentY - touchStartY);
      const dampedDistance = Math.min(distance * 0.5, MAX_PULL_DISTANCE);
      
      setPullDistance(dampedDistance);

      if (dampedDistance > 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = async () => {
      if (isPulling && pullDistance >= PULL_THRESHOLD) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setIsRefreshing(false);
        }
      }
      
      setIsPulling(false);
      setPullDistance(0);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, onRefresh]);

  const getRefreshIndicatorStyle = () => {
    const opacity = Math.min(pullDistance / PULL_THRESHOLD, 1);
    const scale = Math.min(pullDistance / PULL_THRESHOLD, 1);
    const rotation = (pullDistance / PULL_THRESHOLD) * 360;

    return {
      opacity,
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transition: isPulling ? 'none' : 'all 0.3s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-auto"
      style={{
        transform: `translateY(${Math.min(pullDistance * 0.3, 40)}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
        style={{
          height: `${Math.min(pullDistance, MAX_PULL_DISTANCE)}px`,
          marginTop: `-${Math.min(pullDistance, MAX_PULL_DISTANCE)}px`,
        }}
      >
        <div
          className="flex flex-col items-center text-muted-foreground"
          style={getRefreshIndicatorStyle()}
        >
          <Icon
            name={isRefreshing ? 'Loader2' : 'RotateCcw'}
            size={24}
            className={isRefreshing ? 'animate-spin' : ''}
          />
          <span className="text-xs mt-1">
            {isRefreshing
              ? 'Refreshing...'
              : pullDistance >= PULL_THRESHOLD
              ? 'Release to refresh' :'Pull to refresh'
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-full">
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;