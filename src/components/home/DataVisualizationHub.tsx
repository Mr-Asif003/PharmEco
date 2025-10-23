import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";
import { TrendingUp } from "lucide-react";

const branchData = [
  { branch: "Branch A", inventory: 85, sales: 92, profit: 78, satisfaction: 88 },
  { branch: "Branch B", inventory: 78, sales: 85, profit: 82, satisfaction: 90 },
  { branch: "Branch C", inventory: 92, sales: 88, profit: 85, satisfaction: 85 },
];

const scatterData = [
  { inventory: 100, sales: 120, category: "Medicines" },
  { inventory: 150, sales: 180, category: "Medicines" },
  { inventory: 80, sales: 90, category: "Surgical" },
  { inventory: 120, sales: 140, category: "Equipment" },
  { inventory: 200, sales: 250, category: "Medicines" },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function DataVisualizationHub() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Data Visualization Hub</CardTitle>
            <p className="text-sm text-muted-foreground">Advanced analytics at a glance</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Branch Performance Radar</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={branchData[0] ? Object.keys(branchData[0]).filter(k => k !== 'branch').map(key => ({
                metric: key,
                value: branchData[0][key as keyof typeof branchData[0]]
              })) : []}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--foreground))" fontSize={12} />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Radar
                  name="Branch A"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Inventory vs Sales Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <XAxis
                  dataKey="inventory"
                  name="Inventory"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  dataKey="sales"
                  name="Sales"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ZAxis range={[100, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Scatter name="Products" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
