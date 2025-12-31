import { motion } from "framer-motion";
import { Package, Boxes, AlertTriangle, XCircle, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const stats = [
  { title: "Total Stock Quantity", value: "45,230", icon: Package, color: "text-primary" },
  { title: "Total Product SKUs", value: "2,450", icon: Boxes, color: "text-chart-1" },
  { title: "Near Expiry Items", value: "127", icon: AlertTriangle, color: "text-warning" },
  { title: "Out of Stock Items", value: "23", icon: XCircle, color: "text-destructive" },
  { title: "Low Stock Items", value: "89", icon: TrendingDown, color: "text-chart-2" },
];

const categoryData = [
  { name: "Tablets", value: 18500, color: "hsl(var(--chart-1))" },
  { name: "Syrups", value: 12300, color: "hsl(var(--chart-2))" },
  { name: "Injections", value: 8900, color: "hsl(var(--chart-3))" },
  { name: "Capsules", value: 5530, color: "hsl(var(--chart-4))" },
];

export default function InventoryStatsCards() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stock by Category Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Stock by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
