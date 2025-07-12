import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecommendedSkills = ({ recommendations }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recommended for You</h2>
        <Link 
          to="/skill-search-browse" 
          className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
        >
          View All
        </Link>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {recommendations.map((skill) => (
          <div
            key={skill.id}
            className="flex-shrink-0 w-64 bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-smooth"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={skill.user.avatar}
                  alt={skill.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground truncate">
                  {skill.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">{skill.user.location}</p>
              </div>
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="Star" size={14} fill="currentColor" />
                <span className="text-sm font-medium">{skill.user.rating}</span>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="font-medium text-card-foreground mb-1">{skill.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span className="text-xs">{skill.duration}</span>
              </div>
              <Link
                to={`/skill-search-browse?user=${skill.user.id}`}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-smooth"
              >
                Connect
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSkills;