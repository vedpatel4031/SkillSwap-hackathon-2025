import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = () => {
  return (
    <Link
      to="/skill-search-browse"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-modal hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center z-50"
      aria-label="Find Skills"
    >
      <Icon name="Search" size={24} />
    </Link>
  );
};

export default FloatingActionButton;