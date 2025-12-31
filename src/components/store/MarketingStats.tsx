import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tag, ShoppingCart, Users, Percent, 
  TrendingUp, Gift, ArrowUpRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid
} from "recharts";

const couponData = [
  { name: "HEALTH20", used: 145, revenue: 28900 },
  { name: "WELCOME10", used: 89, revenue: 12500 },
  { name: "VITAMIN15", used: 67, revenue: 9800 },
];

const abandonedCartData = [
  { day: "Mon", carts: 12, recovered: 4 },
  { day: "Tue", carts: 18, recovered: 7 },
  { day: "Wed", carts: 15, recovered: 6 },
  { day: "Thu", carts: 22, recovered: 9 },
  { day: "Fri", carts: 28, recovered: 12 },
  { day: "Sat", carts: 35, recovered: 15 },
  { day: "Sun", carts: 20, recovered: 8 },
];

const statsCards = [
  { 
    title: "Active Offers", 
    value: "5", 
    change: "+2 this week",
    icon: Tag,
    color: "violet"
  },
  { 
    title: "Coupon Redemptions", 
    value: "301", 
    change: "+23% vs last week",
    icon: Percent,
    color: "emerald"
  },
  { 
    title: "Abandoned Carts", 
    value: "₹45K", 
    change: "42% recovered",
    icon: ShoppingCart,
    color: "amber"
  },
  { 
    title: "Repeat Customers", 
    value: "68%", 
    change: "+5% this month",
    icon: Users,
    color: "blue"
  },
];

const colorMap: Record<string, string> = {
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  blue: "#3b82f6"
};

export const MarketingStats = () => {
  const [period, setPeriod] = useState("weekly");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Marketing & Growth
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Track your promotional campaigns and customer retention
              </p>
            </div>
            <Tabs value={period} onValueChange={setPeriod}>
              <TabsList className="grid grid-cols-3 w-fit">
                <TabsTrigger value="daily" className="text-xs px-3">Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs px-3">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs px-3">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${colorMap[stat.color]}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: colorMap[stat.color] }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xs mt-1" style={{ color: colorMap[stat.color] }}>
                    {stat.change}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coupon Performance */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Coupon Performance</h4>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={couponData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'used' ? `${value} uses` : `₹${value.toLocaleString()}`,
                        name === 'used' ? 'Redemptions' : 'Revenue'
                      ]}
                    />
                    <Bar dataKey="used" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Abandoned Cart Recovery */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Cart Recovery Rate</h4>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  42% recovered
                </Badge>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={abandonedCartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="carts" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                      name="Abandoned"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="recovered" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2 }}
                      name="Recovered"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
