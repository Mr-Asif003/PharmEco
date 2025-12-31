import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileDown, MapPin } from "lucide-react";

const expiryData = [
  { id: 1, name: "Paracetamol 500mg", batch: "BAT-2024-001", expiry: "2025-11-20", quantity: 450, supplier: "MedSupply Co.", daysLeft: 28, alert: "week" },
  { id: 2, name: "Amoxicillin 250mg", batch: "BAT-2024-045", expiry: "2025-11-25", quantity: 320, supplier: "PharmaCorp", daysLeft: 33, alert: "month" },
  { id: 3, name: "Aspirin 75mg", batch: "BAT-2024-089", expiry: "2025-12-05", quantity: 180, supplier: "HealthFirst", daysLeft: 43, alert: "month" },
  { id: 4, name: "Vitamin C Tablets", batch: "BAT-2024-112", expiry: "2025-10-15", quantity: 90, supplier: "MedSupply Co.", daysLeft: 3, alert: "expired" },
];

const timelineData = [
  { month: "Nov", count: 15 },
  { month: "Dec", count: 28 },
  { month: "Jan", count: 35 },
  { month: "Feb", count: 22 },
  { month: "Mar", count: 18 },
];

export default function ExpiryAlertsTable() {
  return (
    <div className="space-y-6">
      {/* Alert Chips */}
      <div className="flex gap-3 flex-wrap">
        <Badge variant="destructive" className="px-4 py-2">Expiring This Week: 5</Badge>
        <Badge variant="default" className="px-4 py-2">Expiring This Month: 23</Badge>
        <Badge variant="secondary" className="px-4 py-2">Expired Stock: 2</Badge>
      </div>

      {/* Expiry Timeline Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Expiry Timeline</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timelineData}>
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
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expiry Table */}
      {/* <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Medicines Nearing Expiry</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Move to Branch
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Batch No.</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiryData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-accent/50"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-sm">{item.batch}</TableCell>
                  <TableCell className={item.daysLeft < 30 ? "text-destructive font-semibold" : ""}>
                    {item.expiry}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-muted-foreground">{item.supplier}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.alert === "expired" ? "destructive" : item.alert === "week" ? "destructive" : "default"}
                      className={item.alert === "week" ? "animate-pulse" : ""}
                    >
                      {item.daysLeft < 0 ? "Expired" : `${item.daysLeft} days`}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}
