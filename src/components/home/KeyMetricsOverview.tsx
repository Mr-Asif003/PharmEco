import { motion } from "framer-motion";
import { Package, Users, DollarSign, AlertCircle, Bot, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const metrics = [
  { title: "Total Products", value: 2450, target: 3000, icon: Package, color: "text-chart-1" },
  { title: "Active Suppliers", value: 45, target: 50, icon: Users, color: "text-chart-2" },
  { title: "Monthly Revenue", value: 245000, target: 300000, icon: DollarSign, color: "text-success", prefix: "₹" },
  { title: "Expiring Batches", value: 23, target: 100, icon: AlertCircle, color: "text-warning" },
  { title: "AI Suggested Orders", value: 15, target: 20, icon: Bot, color: "text-primary" },
  { title: "Customer Satisfaction", value: 4.7, target: 5.0, icon: Star, color: "text-chart-4", suffix: "/5.0" },
];

export default function KeyMetricsOverview() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Key Metrics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} metric={metric} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric, delay }: { metric: typeof metrics[0]; delay: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const progress = (metric.value / metric.target) * 100;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = metric.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= metric.value) {
        setAnimatedValue(metric.value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [metric.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all hover:scale-105">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              <p className="text-3xl font-bold text-foreground">
                {metric.prefix}
                {typeof animatedValue === "number" && animatedValue % 1 !== 0
                  ? animatedValue.toFixed(1)
                  : animatedValue.toLocaleString()}
                {metric.suffix}
              </p>
            </div>
            <div className={`h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${metric.color}`}>
              <metric.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
