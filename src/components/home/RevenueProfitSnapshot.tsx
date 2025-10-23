import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign } from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 180000, profit: 45000 },
  { month: "Feb", revenue: 195000, profit: 52000 },
  { month: "Mar", revenue: 210000, profit: 58000 },
  { month: "Apr", revenue: 225000, profit: 61000 },
  { month: "May", revenue: 235000, profit: 67000 },
  { month: "Jun", revenue: 245000, profit: 72000 },
];

const categoryProfit = [
  { category: "Medicines", profit: 150000 },
  { category: "Surgical", profit: 65000 },
  { category: "Equipment", profit: 95000 },
];

export default function RevenueProfitSnapshot() {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <CardTitle>Revenue & Profit Overview</CardTitle>
              <p className="text-sm text-muted-foreground">Financial performance snapshot</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={period === "month" ? "default" : "outline"}
              onClick={() => setPeriod("month")}
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={period === "quarter" ? "default" : "outline"}
              onClick={() => setPeriod("quarter")}
            >
              Quarter
            </Button>
            <Button
              size="sm"
              variant={period === "year" ? "default" : "outline"}
              onClick={() => setPeriod("year")}
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Revenue & Profit Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Profit by Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryProfit}>
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="profit" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-lg bg-success/5 border border-success/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-success">AI Insight:</span> Revenue grew 12% from last month.
            Medicines category showing strongest profit margins.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
