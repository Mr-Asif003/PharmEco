import { motion } from "framer-motion";
import { AlertTriangle, Calendar, Package } from "lucide-react";
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
import ExpiryAlertsTable from "@/components/inventory/ExpiryAlertsTable";

const expiryData = [
  {
    id: 1,
    name: "Cough Syrup 100ml",
    batch: "BAT-2024-001",
    quantity: 45,
    expiryDate: "2025-11-15",
    daysLeft: 28,
    priority: "high",
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    batch: "BAT-2024-045",
    quantity: 120,
    expiryDate: "2025-11-20",
    daysLeft: 33,
    priority: "high",
  },
  {
    id: 3,
    name: "Eye Drops 10ml",
    batch: "BAT-2024-089",
    quantity: 80,
    expiryDate: "2025-12-10",
    daysLeft: 53,
    priority: "medium",
  },
  {
    id: 4,
    name: "Antibiotic Cream",
    batch: "BAT-2024-112",
    quantity: 35,
    expiryDate: "2025-12-25",
    daysLeft: 68,
    priority: "medium",
  },
  {
    id: 5,
    name: "Pain Relief Gel",
    batch: "BAT-2024-156",
    quantity: 60,
    expiryDate: "2026-01-15",
    daysLeft: 89,
    priority: "low",
  },
];

const ExpiryAlerts = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Expiry Alerts & Insights</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered expiry tracking to minimize waste and optimize stock rotation
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">Expiring in 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-warning/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">Expiring in 60 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-primary/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">Active medicines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Mark as Returned
        </Button>
        <Button variant="outline">Generate Report</Button>
        <Button variant="outline">AI Suggestions</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Medicines Nearing Expiry</CardTitle>
            <CardDescription>
              Prioritized list of medicines requiring immediate action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${
                        item.daysLeft < 30 ? "text-destructive" :
                        item.daysLeft < 60 ? "text-warning" :
                        "text-muted-foreground"
                      }`}>
                        {item.daysLeft} days
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">
                        Take Action
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* //table from components */}
      <ExpiryAlertsTable/>
    </div>
  );
};

export default ExpiryAlerts;
