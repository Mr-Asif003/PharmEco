import { useState } from "react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sparkles, RefreshCw } from "lucide-react";
import InventoryStatsCards from "@/components/inventory/InventoryStatsCards";
import ExpiryAlertsTable from "@/components/inventory/ExpiryAlertsTable";
import StockStatusTable from "@/components/inventory/StockStatusTable";
import PredictiveRefillAdvisor from "@/components/inventory/PredictiveRefillAdvisor";
import InventoryChartsTabs from "@/components/inventory/InventoryChartsTabs";
import AIRecommendationDrawer from "@/components/inventory/AIRecommendationDrawer";

export default function InventoryDashboard() {
  const [syncing, setSyncing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-6 py-4">
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/inventory/summary">Inventory</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Intelligence</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                📊 Real-Time Inventory Intelligence
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor, Predict, and Act on Your Inventory Health
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Synced 2 min ago
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={syncing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                Sync Now
              </Button>
              <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Insights
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <AIRecommendationDrawer />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Live Stock Summary Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📦 Current Inventory Status
          </h2>
          <InventoryStatsCards />
        </motion.section>

        {/* Expiry Alerts & Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            ⏳ Expiry Tracking & Alerts
          </h2>
          <ExpiryAlertsTable />
        </motion.section>

        {/* Out-of-Stock Warnings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🚨 Low & Out-of-Stock Warnings
          </h2>
          <StockStatusTable />
        </motion.section>

        {/* Predictive Refill Advisor */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🤖 Predictive Refill Advisor
          </h2>
          <PredictiveRefillAdvisor />
        </motion.section>

        {/* Combined Real-Time Analytics & Charts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">📈 Analytics & Insights</h2>
          <InventoryChartsTabs />
        </motion.section>
      </div>
    </div>
  );
}
