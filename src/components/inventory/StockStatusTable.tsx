import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, CheckCircle, AlertTriangle } from "lucide-react";

const stockData = [
  { id: 1, name: "Ibuprofen 400mg", current: 0, threshold: 200, lastRestocked: "2025-10-05", status: "out" },
  { id: 2, name: "Cough Syrup 100ml", current: 45, threshold: 100, lastRestocked: "2025-10-20", status: "low" },
  { id: 3, name: "Vitamin D3", current: 89, threshold: 150, lastRestocked: "2025-10-15", status: "low" },
  { id: 4, name: "Paracetamol 500mg", current: 520, threshold: 200, lastRestocked: "2025-10-25", status: "healthy" },
  { id: 5, name: "Omeprazole 20mg", current: 0, threshold: 100, lastRestocked: "2025-09-30", status: "out" },
  { id: 6, name: "Metformin 500mg", current: 780, threshold: 200, lastRestocked: "2025-10-28", status: "healthy" },
];

const criticalCount = stockData.filter(item => item.status === "out").length;

export default function StockStatusTable() {
  return (
    <div className="space-y-6">
      {/* Critical Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertDescription className="font-semibold">
            {criticalCount} items are critically low or out of stock. Immediate action required!
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Stock Status Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Stock Status Overview</h3>
            <div className="flex gap-2">
              <Badge variant="secondary" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-success" />
                Healthy
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-warning" />
                Low
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                Out
              </Badge>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Threshold</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group hover:bg-accent/50 ${
                    item.status === "out" ? "animate-pulse" : ""
                  }`}
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span
                      className={`font-bold ${
                        item.status === "out"
                          ? "text-destructive"
                          : item.status === "low"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      {item.current}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.threshold}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "out"
                          ? "destructive"
                          : item.status === "low"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {item.status === "out" ? "Out of Stock" : item.status === "low" ? "Low Stock" : "Healthy"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="default">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Reorder
                    </Button>
                    <Button size="sm" variant="ghost">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Refilled
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
