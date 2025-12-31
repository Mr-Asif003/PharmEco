import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Header } from "@/components/layout/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import ExpiryAlertsTable from "./components/inventory/ExpiryAlertsTable";
import POSCounter from "./pages/sales/POSCounter";
import AIRecommendations from "./pages/ai/AIRecommendations";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/landingPages/LandingPage";
import { InventorySidebarLayout } from "./components/layout/InventorySidebarLayout";
//from inventory folder
import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import ItemManagement from "./pages/inventory/ItemManagement";
import ExpiryAlerts from "./pages/inventory/ExpiryAlerts";
import StockSummary from "./pages/inventory/StockSummary";
//auth folder
import Auth from "./pages/auth/Auth";
//store sidebar layout
import { StoreSidebarLayout } from "./components/layout/StoreSidebarLayout";
import StoreHome from "./pages/store/StoreHome";
import MedicalStoreRegistration from "./pages/registration/MedicalStoreRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<Auth />} />
           <Route path="/register/store" element={<MedicalStoreRegistration />} />

      {/* store home route */}
          <Route path="/storeHome" 
          element={ 
            <StoreSidebarLayout>
              <StoreHome />
            </StoreSidebarLayout>
          } 
          />  






         <Route
  path="/inventory/*"
  element={
    <InventorySidebarLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<InventoryDashboard />} />
        <Route path="summary" element={<StockSummary />} />
        <Route path="expiry" element={<ExpiryAlerts />} />
        <Route path="sales/pos" element={<POSCounter />} />
        <Route path="ai/recommendations" element={<AIRecommendations />} />
        {/* Item Management */}
        <Route path="items" element={<ItemManagement />} />
        {/* Other inventory sub-routes */}
        <Route path="adjustment" element={<Dashboard />} />
        <Route path="transfer" element={<Dashboard />} />
        <Route path="reorder" element={<Dashboard />} />
        <Route path="barcode" element={<Dashboard />} />
        {/* Nested modules */}
        <Route path="purchase/*" element={<ItemManagement />} />
        <Route path="sales/*" element={<Dashboard />} />
        <Route path="expiry/*" element={<Dashboard />} />
        <Route path="analytics/*" element={<Dashboard />} />
        <Route path="ai/*" element={<Dashboard />} />
        <Route path="integration/*" element={<Dashboard />} />
        <Route path="warehouse/*" element={<Dashboard />} />
        <Route path="compliance/*" element={<Dashboard />} />
        <Route path="procurement/*" element={<Dashboard />} />
        <Route path="users/*" element={<Dashboard />} />
        <Route path="settings/*" element={<Dashboard />} />
        <Route path="health/*" element={<Dashboard />} />
        <Route path="support" element={<Dashboard />} />
      </Routes>
    </InventorySidebarLayout>
  }
/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

