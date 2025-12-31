import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const topMovingItems = [
  { name: "Paracetamol", sales: 450 },
  { name: "Amoxicillin", sales: 320 },
  { name: "Cough Syrup", sales: 280 },
  { name: "Vitamin C", sales: 250 },
  { name: "Insulin", sales: 200 },
  { name: "Aspirin", sales: 180 },
  { name: "Ibuprofen", sales: 150 },
  { name: "Antibiotics", sales: 120 },
];

const categoryData = [
  { name: "Tablets", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Capsules", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Syrups", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Injections", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Surgical", value: 5, color: "hsl(var(--chart-5))" },
];

const priceMarginData = [
  { month: "Jan", purchase: 45000, selling: 72000, margin: 60 },
  { month: "Feb", purchase: 52000, selling: 83200, margin: 60 },
  { month: "Mar", purchase: 48000, selling: 76800, margin: 60 },
  { month: "Apr", purchase: 61000, selling: 97600, margin: 60 },
  { month: "May", purchase: 55000, selling: 88000, margin: 60 },
  { month: "Jun", purchase: 67000, selling: 107200, margin: 60 },
];

const AnalyticsCharts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 Item Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar">Top Moving Items</TabsTrigger>
            <TabsTrigger value="pie">Category Distribution</TabsTrigger>
            <TabsTrigger value="line">Price & Margin Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topMovingItems}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="pie" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="line" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={priceMarginData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="purchase"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="selling"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCharts;
