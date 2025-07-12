import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegister from "pages/login-register";
import DashboardHome from "pages/dashboard-home";
import SwapRequestsManagement from "pages/swap-requests-management";
import ProfileManagement from "pages/profile-management";
import MessagingSystem from "pages/messaging-system";
import SkillSearchBrowse from "pages/skill-search-browse";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/swap-requests-management" element={<SwapRequestsManagement />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/messaging-system" element={<MessagingSystem />} />
        <Route path="/skill-search-browse" element={<SkillSearchBrowse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;