import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const stockTrendData = [
  { month: "Jun", stockIn: 4200, stockOut: 3800 },
  { month: "Jul", stockIn: 3800, stockOut: 4200 },
  { month: "Aug", stockIn: 5100, stockOut: 3900 },
  { month: "Sep", stockIn: 4800, stockOut: 4500 },
  { month: "Oct", stockIn: 5500, stockOut: 4100 },
  { month: "Nov", stockIn: 4900, stockOut: 4800 },
];

const categoryShareData = [
  { name: "Tablets", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Syrups", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Injections", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Capsules", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 5, color: "hsl(var(--chart-5))" },
];

const supplierData = [
  { name: "MedSupply Co.", orders: 145 },
  { name: "PharmaCorp", orders: 128 },
  { name: "HealthFirst", orders: 98 },
  { name: "MediPlus", orders: 87 },
  { name: "CareDistributors", orders: 65 },
];

const predictiveTrendData = [
  { week: "Week 1", actual: 4200, predicted: 4100 },
  { week: "Week 2", actual: 4500, predicted: 4400 },
  { week: "Week 3", actual: 4800, predicted: 4900 },
  { week: "Week 4", actual: 5100, predicted: 5000 },
  { week: "Week 5", actual: null, predicted: 5300 },
  { week: "Week 6", actual: null, predicted: 5500 },
];

export default function InventoryChartsTabs() {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trends">Stock Trends</TabsTrigger>
            <TabsTrigger value="category">Category Share</TabsTrigger>
            <TabsTrigger value="suppliers">Top Suppliers</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Stock In vs Stock Out</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={stockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="stockIn"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Stock In"
                    animationDuration={1000}
                  />
                  <Line
                    type="monotone"
                    dataKey="stockOut"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Stock Out"
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="category">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {categoryShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="suppliers">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Top 5 Suppliers by Orders</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={supplierData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="predictive">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">AI Predictive Trends (Next 6 Weeks)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={predictiveTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    name="Actual"
                    animationDuration={1000}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                    name="Predicted"
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
