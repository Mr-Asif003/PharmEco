import { useState } from "react";
import { motion } from "framer-motion";
import { TopNavbar } from "@/components/store/TopNavbar";
import { StoreOverviewCard } from "@/components/store/StoreOverviewCard";
import { MetricsGrid } from "@/components/store/MetricsGrid";
import { OrdersSnapshot } from "@/components/store/OrdersSnapshot";
import { ProductPerformance } from "@/components/store/ProductPerformance";
import { AIStoreInsights } from "@/components/store/AIStoreInsights";
import { DeliveryMap } from "@/components/store/DeliveryMap";
import { MarketingStats } from "@/components/store/MarketingStats";
import { ReviewsPanel } from "@/components/store/ReviewsPanel";
import { StoreFooter } from "@/components/store/StoreFooter";

const StoreHome = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavbar 
        storeName="HealthPlus Pharmacy"
        isOnline={isOnline}
        onToggleOnline={setIsOnline}
      />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Hero Section - Store Overview */}
        <StoreOverviewCard
          storeName="HealthPlus Pharmacy"
          rating={4.7}
          reviewCount={344}
          deliveryRadius={5}
          isOpen={isOnline}
        />

        {/* Key Business Metrics */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MetricsGrid />
        </motion.section>

        {/* Orders Snapshot */}
        <OrdersSnapshot />

        {/* Product Performance */}
        <ProductPerformance />

        {/* AI Store Insights */}
        <AIStoreInsights />

        {/* Two Column Layout for Map & Marketing */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DeliveryMap />
          <MarketingStats />
        </div>

        {/* Reviews & Trust Panel */}
        <ReviewsPanel />

        {/* Footer */}
        <StoreFooter />
      </main>
    </div>
  );
};

export default StoreHome;
