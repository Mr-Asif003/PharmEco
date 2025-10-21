import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", stockIn: 4000, stockOut: 2400, expiry: 240 },
  { month: "Feb", stockIn: 3000, stockOut: 1398, expiry: 221 },
  { month: "Mar", stockIn: 2000, stockOut: 9800, expiry: 229 },
  { month: "Apr", stockIn: 2780, stockOut: 3908, expiry: 200 },
  { month: "May", stockIn: 1890, stockOut: 4800, expiry: 218 },
  { month: "Jun", stockIn: 2390, stockOut: 3800, expiry: 250 },
];

export function StockTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Stock Flow Trends</CardTitle>
          <CardDescription>Monthly stock in, out, and expiry tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="stockIn"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Stock In"
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="stockOut"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Stock Out"
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="expiry"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Expiry"
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
