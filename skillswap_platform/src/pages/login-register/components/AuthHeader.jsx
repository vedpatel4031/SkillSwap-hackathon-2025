import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/login-register" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-foreground">SkillSwap</span>
          </Link>

          {/* SSL Indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;