import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import KeyMetricsOverview from "@/components/home/KeyMetricsOverview";
import AISuggestionsPanel from "@/components/home/AISuggestionsPanel";
import TrendingProducts from "@/components/home/TrendingProducts";
import AIHealthInsights from "@/components/home/AIHealthInsights";
import InventorySnapshot from "@/components/home/InventorySnapshot";
import RevenueProfitSnapshot from "@/components/home/RevenueProfitSnapshot";
import PurchaseSupplierHighlights from "@/components/home/PurchaseSupplierHighlights";
import AlertsNotifications from "@/components/home/AlertsNotifications";
import SmartActionsPanel from "@/components/home/SmartActionsPanel";
import ChatbotWidget from "@/components/home/ChatbotWidget";
import RecentActivityFeed from "@/components/home/RecentActivityFeed";
import DataVisualizationHub from "@/components/home/DataVisualizationHub";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KeyMetricsOverview />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AISuggestionsPanel />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AlertsNotifications />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TrendingProducts />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AIHealthInsights />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <InventorySnapshot />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RevenueProfitSnapshot />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <PurchaseSupplierHighlights />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <SmartActionsPanel />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RecentActivityFeed />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <DataVisualizationHub />
        </motion.div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
