import { motion } from "framer-motion";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { StockTrendChart } from "@/components/charts/StockTrendChart";
import { ExpiryDonutChart } from "@/components/charts/ExpiryDonutChart";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Smart Insights for Real-Time Stock Health & Operations
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Stock Value"
          value="₹12,45,000"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          delay={0}
        />
        <MetricCard
          title="Active Medicines"
          value="2,847"
          change="+23 new items"
          changeType="positive"
          icon={Package}
          delay={0.1}
        />
        <MetricCard
          title="Expiring Soon"
          value="15"
          change="Needs immediate attention"
          changeType="negative"
          icon={AlertTriangle}
          delay={0.2}
        />
        <MetricCard
          title="Today's Sales"
          value="₹45,230"
          change="+8.2% vs yesterday"
          changeType="positive"
          icon={TrendingUp}
          delay={0.3}
        />
        <MetricCard
          title="Pending Orders"
          value="24"
          change="8 from suppliers"
          changeType="neutral"
          icon={ShoppingCart}
          delay={0.4}
        />
        <MetricCard
          title="Active Customers"
          value="1,245"
          change="+45 this week"
          changeType="positive"
          icon={Users}
          delay={0.5}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <StockTrendChart />
          <ExpiryDonutChart />
        </div>
        <div>
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
