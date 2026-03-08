import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CustomerDetail from "./pages/CustomerDetail";
import RiskAnalytics from "./pages/RiskAnalytics";
import ComplaintMonitoring from "./pages/ComplaintMonitoring";
import CampaignManager from "./pages/CampaignManager";
import AIInsights from "./pages/AIInsights";
import RecommendedActions from "./pages/RecommendedActions";
import InteractionHistory from "./pages/InteractionHistory";
import SentimentAlerts from "./pages/SentimentAlerts";
import SupportTickets from "./pages/SupportTickets";
import ResolutionHistory from "./pages/ResolutionHistory";
import SystemSettings from "./pages/SystemSettings";
import UserManagement from "./pages/UserManagement";
import SystemArchitecture from "./pages/SystemArchitecture";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customer/:id" element={<CustomerDetail />} />
              <Route path="customers" element={<Dashboard />} />
              <Route path="risk" element={<RiskAnalytics />} />
              <Route path="complaints" element={<ComplaintMonitoring />} />
              <Route path="campaigns" element={<CampaignManager />} />
              <Route path="insights" element={<AIInsights />} />
              <Route path="actions" element={<RecommendedActions />} />
              <Route path="history" element={<InteractionHistory />} />
              <Route path="sentiment" element={<SentimentAlerts />} />
              <Route path="tickets" element={<SupportTickets />} />
              <Route path="resolutions" element={<ResolutionHistory />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
