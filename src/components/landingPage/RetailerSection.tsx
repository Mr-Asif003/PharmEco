import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  Store,
  ShoppingCart,
  Bell,
  BarChart3,
  Smartphone,
  Shield,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full hover:shadow-glow-retailer transition-all duration-300 border-2 hover:border-retailer/20">
        <div className="w-12 h-12 rounded-xl bg-retailer/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-retailer" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
};

const RetailerSection = () => {
  const coreFeatures = [
    {
      icon: Package,
      title: "Smart Inventory Control",
      description: "Auto-stock updates, expiry tracking, batch & barcode scanning for complete inventory management.",
    },
    {
      icon: TrendingUp,
      title: "AI Demand Forecasting",
      description: "Predict next restock date using sales trends, seasonal data, and intelligent analytics.",
    },
    {
      icon: Store,
      title: "Multi-Store Management",
      description: "Manage all your outlets from one centralized dashboard with real-time synchronization.",
    },
    {
      icon: ShoppingCart,
      title: "eCommerce Store Builder",
      description: "Create your online medical store with no-code builder, custom themes, and integrated payments.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for low stock, expiring batches, new orders, and important updates.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track sales, revenue, profit margins, and performance metrics with AI-powered insights.",
    },
    {
      icon: Smartphone,
      title: "POS Integration",
      description: "Seamlessly connect your billing systems and synchronize sales data in real-time.",
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Manage drug licenses, expiry alerts, and generate audit reports automatically.",
    },
  ];

  const smartFeatures = [
    "AI-driven Restock Assistant",
    "Automated Profit Margin Optimization",
    "Voice Command Inventory",
    "Predictive Supplier Matching",
    "Dynamic Price Adjuster",
    "Delivery Heatmap Analytics",
    "Prescription Order Integration",
    "WhatsApp & SMS Notifications",
    "AI-powered Performance Index",
    "Multi-currency Support",
  ];

  return (
    <section id="features" className="py-20 bg-retailer-light/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-retailer/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-retailer/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 rounded-full glass-effect mb-4">
            <span className="text-retailer font-semibold">🟠 For Medical Retailers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Complete Retail Management{" "}
            <span className="text-retailer">Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From inventory to online store, from analytics to automation — everything you need
            to run a modern medical retail business
          </p>
        </motion.div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>

        {/* Smart Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              🤖 AI-Powered Smart Features
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI features that give you a competitive advantage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {smartFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-retailer" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="retailer">
            Start Your Free Trial
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RetailerSection;
