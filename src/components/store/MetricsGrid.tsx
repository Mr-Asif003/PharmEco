import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, DollarSign, TrendingUp, Users, 
  Receipt, ArrowUp, ArrowDown 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, Line, ResponsiveContainer 
} from "recharts";

const metrics = [
  {
    id: 1,
    title: "Today's Orders",
    value: 47,
    change: 12.5,
    trend: "up",
    icon: ShoppingCart,
    color: "primary",
    sparkData: [
      { v: 30 }, { v: 35 }, { v: 28 }, { v: 42 }, { v: 38 }, { v: 45 }, { v: 47 }
    ]
  },
  {
    id: 2,
    title: "Online Revenue",
    value: 45230,
    prefix: "₹",
    change: 8.3,
    trend: "up",
    icon: DollarSign,
    color: "emerald",
    sparkData: [
      { v: 35000 }, { v: 38000 }, { v: 42000 }, { v: 39000 }, { v: 44000 }, { v: 43000 }, { v: 45230 }
    ]
  },
  {
    id: 3,
    title: "Conversion Rate",
    value: 4.2,
    suffix: "%",
    change: -1.2,
    trend: "down",
    icon: TrendingUp,
    color: "blue",
    sparkData: [
      { v: 4.5 }, { v: 4.3 }, { v: 4.6 }, { v: 4.1 }, { v: 4.4 }, { v: 4.0 }, { v: 4.2 }
    ]
  },
  {
    id: 4,
    title: "Active Customers",
    value: 1248,
    change: 5.7,
    trend: "up",
    icon: Users,
    color: "violet",
    sparkData: [
      { v: 1100 }, { v: 1150 }, { v: 1180 }, { v: 1200 }, { v: 1220 }, { v: 1235 }, { v: 1248 }
    ]
  },
  {
    id: 5,
    title: "Avg Order Value",
    value: 962,
    prefix: "₹",
    change: 3.2,
    trend: "up",
    icon: Receipt,
    color: "amber",
    sparkData: [
      { v: 900 }, { v: 920 }, { v: 935 }, { v: 945 }, { v: 950 }, { v: 958 }, { v: 962 }
    ]
  }
];

const colorMap: Record<string, string> = {
  primary: "hsl(var(--primary))",
  emerald: "#10b981",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  amber: "#f59e0b"
};

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={metric.id} metric={metric} index={index} />
      ))}
    </div>
  );
};

interface MetricCardProps {
  metric: typeof metrics[0];
  index: number;
}

const MetricCard = ({ metric, index }: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = metric.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= metric.value) {
        setDisplayValue(metric.value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [metric.value]);

  const formatValue = (val: number) => {
    if (metric.prefix === "₹" && val >= 1000) {
      return `${metric.prefix}${(val / 1000).toFixed(1)}K`;
    }
    return `${metric.prefix || ''}${val.toLocaleString()}${metric.suffix || ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${colorMap[metric.color]}15` }}
            >
              <Icon className="h-5 w-5" style={{ color: colorMap[metric.color] }} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {metric.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(metric.change)}%
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-2xl font-bold text-foreground">
              {formatValue(displayValue)}
            </h3>
            <p className="text-sm text-muted-foreground">{metric.title}</p>
          </div>

          {/* Sparkline */}
          <div className="h-12 -mx-2 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.sparkData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={colorMap[metric.color]}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>

        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, ${colorMap[metric.color]}10 0%, transparent 70%)` 
          }}
        />
      </Card>
    </motion.div>
  );
};
