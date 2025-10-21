import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import StockSummary from "./pages/inventory/StockSummary";
import ExpiryAlerts from "./pages/inventory/ExpiryAlerts";
import POSCounter from "./pages/sales/POSCounter";
import AIRecommendations from "./pages/ai/AIRecommendations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory/summary" element={<StockSummary />} />
                  <Route path="/inventory/expiry" element={<ExpiryAlerts />} />
                  <Route path="/sales/pos" element={<POSCounter />} />
                  <Route path="/ai/recommendations" element={<AIRecommendations />} />
                  {/* Placeholder routes for all other pages */}
                  <Route path="/inventory/items" element={<Dashboard />} />
                  <Route path="/inventory/adjustment" element={<Dashboard />} />
                  <Route path="/inventory/transfer" element={<Dashboard />} />
                  <Route path="/inventory/reorder" element={<Dashboard />} />
                  <Route path="/inventory/barcode" element={<Dashboard />} />
                  <Route path="/purchase/*" element={<Dashboard />} />
                  <Route path="/sales/*" element={<Dashboard />} />
                  <Route path="/expiry/*" element={<Dashboard />} />
                  <Route path="/analytics/*" element={<Dashboard />} />
                  <Route path="/ai/*" element={<Dashboard />} />
                  <Route path="/integration/*" element={<Dashboard />} />
                  <Route path="/warehouse/*" element={<Dashboard />} />
                  <Route path="/compliance/*" element={<Dashboard />} />
                  <Route path="/procurement/*" element={<Dashboard />} />
                  <Route path="/users/*" element={<Dashboard />} />
                  <Route path="/settings/*" element={<Dashboard />} />
                  <Route path="/health/*" element={<Dashboard />} />
                  <Route path="/support" element={<Dashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
