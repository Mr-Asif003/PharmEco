import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bot, FileText, Zap } from "lucide-react";

const forecastData = [
  { date: "Nov 15", paracetamol: 520, ibuprofen: 340, amoxicillin: 280 },
  { date: "Nov 22", paracetamol: 450, ibuprofen: 280, amoxicillin: 220 },
  { date: "Nov 29", paracetamol: 380, ibuprofen: 220, amoxicillin: 160 },
  { date: "Dec 06", paracetamol: 310, ibuprofen: 160, amoxicillin: 100 },
  { date: "Dec 13", paracetamol: 240, ibuprofen: 100, amoxicillin: 40 },
  { date: "Dec 20", paracetamol: 170, ibuprofen: 40, amoxicillin: 0 },
];

const refillSuggestions = [
  { id: 1, name: "Amoxicillin 250mg", avgSales: 35, depletionDate: "2025-12-20", recommended: 500 },
  { id: 2, name: "Ibuprofen 400mg", avgSales: 28, depletionDate: "2025-12-18", recommended: 400 },
  { id: 3, name: "Paracetamol 500mg", avgSales: 42, depletionDate: "2025-12-25", recommended: 600 },
  { id: 4, name: "Vitamin C Tablets", avgSales: 18, depletionDate: "2026-01-05", recommended: 300 },
];

export default function PredictiveRefillAdvisor() {
  return (
    <div className="space-y-6">
      {/* AI Accuracy Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-chart-1/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary animate-pulse" />
                </div>
                <div>
                  <div className="text-2xl font-bold">94% Accuracy</div>
                  <p className="text-sm text-muted-foreground">Last AI sync: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Refresh Predictions
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Forecasted Stock-Out Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Forecasted Stock-Out Dates</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="paracetamol"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Paracetamol"
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="ibuprofen"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Ibuprofen"
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="amoxicillin"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Amoxicillin"
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Refill List */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI-Suggested Refill List</h3>
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="h-4 w-4 mr-2" />
              Auto-Generate PO
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Avg. Daily Sales</TableHead>
                <TableHead>Expected Depletion</TableHead>
                <TableHead>Recommended Qty</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refillSuggestions.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-accent/50"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.avgSales} units/day</Badge>
                  </TableCell>
                  <TableCell className="text-warning font-semibold">{item.depletionDate}</TableCell>
                  <TableCell className="text-primary font-bold">{item.recommended} units</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Add to PO
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
