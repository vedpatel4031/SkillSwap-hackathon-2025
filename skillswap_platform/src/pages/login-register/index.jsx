import React, { useState } from 'react';
import AuthHeader from './components/AuthHeader';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Image from '../../components/AppImage';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Background Image - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="People collaborating and sharing skills"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Exchange Skills, Build Community
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Connect with like-minded learners and share your expertise in a collaborative environment where everyone grows together.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">10k+</span>
                </div>
                <span className="text-sm">Active Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">500+</span>
                </div>
                <span className="text-sm">Skills Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Welcome Text */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome back!' : 'Join SkillSwap'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to continue your learning journey' :'Start exchanging skills with our community'
                }
              </p>
            </div>

            {/* Auth Toggle */}
            <AuthToggle activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Forms */}
            <div className="transition-all duration-300 ease-in-out">
              {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <button
                  onClick={() => alert('Privacy Policy would open here')}
                  className="hover:text-foreground transition-smooth"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  onClick={() => alert('Terms of Service would open here')}
                  className="hover:text-foreground transition-smooth"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button
                  onClick={() => alert('Help Center would open here')}
                  className="hover:text-foreground transition-smooth"
                >
                  Help
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} SkillSwap Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;