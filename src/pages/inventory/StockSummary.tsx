import { motion } from "framer-motion";
import { Package, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stockData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    quantity: 450,
    minLevel: 200,
    status: "healthy",
    trend: "up",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    quantity: 180,
    minLevel: 150,
    status: "low",
    trend: "down",
  },
  {
    id: 3,
    name: "Aspirin 75mg",
    category: "Cardiovascular",
    quantity: 50,
    minLevel: 100,
    status: "critical",
    trend: "down",
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    category: "Gastric",
    quantity: 320,
    minLevel: 100,
    status: "healthy",
    trend: "up",
  },
  {
    id: 5,
    name: "Metformin 500mg",
    category: "Diabetes",
    quantity: 580,
    minLevel: 200,
    status: "healthy",
    trend: "up",
  },
];

const StockSummary = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Real-Time Stock Summary</h1>
        <p className="text-muted-foreground mt-1">
          Monitor inventory levels and stock movements across all branches
        </p>
      </motion.div>

      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90">
          <Package className="mr-2 h-4 w-4" />
          Add Manually
        </Button>
        <Button variant="outline">Upload CSV</Button>
        <Button variant="outline">Sync with AI</Button>
        <Button variant="outline">Download Report</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Current Stock Levels</CardTitle>
            <CardDescription>
              Real-time inventory tracking with AI-powered restock suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Min Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trend</TableHead>
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
                    className="group hover:bg-accent/50"
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-semibold">{item.quantity}</TableCell>
                    <TableCell className="text-muted-foreground">{item.minLevel}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "critical"
                            ? "destructive"
                            : item.status === "low"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {item.status === "critical" && <AlertCircle className="mr-1 h-3 w-3" />}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StockSummary;
