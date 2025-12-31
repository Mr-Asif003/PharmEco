import { motion } from "framer-motion";
import { Eye, Package, Truck, CheckCircle, Clock, Globe, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const orders = [
  {
    id: "ORD-1234",
    customer: "Rajesh Kumar",
    channel: "App",
    status: "New",
    amount: 2450,
    items: 3,
    time: "2 min ago"
  },
  {
    id: "ORD-1233",
    customer: "Priya Sharma",
    channel: "Web",
    status: "Packed",
    amount: 1890,
    items: 2,
    time: "15 min ago"
  },
  {
    id: "ORD-1232",
    customer: "Amit Patel",
    channel: "App",
    status: "Shipped",
    amount: 3250,
    items: 5,
    time: "1 hr ago"
  },
  {
    id: "ORD-1231",
    customer: "Sunita Devi",
    channel: "Web",
    status: "Delivered",
    amount: 890,
    items: 1,
    time: "2 hrs ago"
  },
  {
    id: "ORD-1230",
    customer: "Vikram Singh",
    channel: "App",
    status: "New",
    amount: 4560,
    items: 4,
    time: "3 hrs ago"
  }
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  New: { color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", icon: Clock },
  Packed: { color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", icon: Package },
  Shipped: { color: "bg-violet-500/10 text-violet-600 dark:text-violet-400", icon: Truck },
  Delivered: { color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", icon: CheckCircle }
};

export const OrdersSnapshot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Orders</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage your latest orders
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Channel</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="group hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <span className="font-medium text-foreground">{order.id}</span>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{order.customer}</span>
                          <p className="text-xs text-muted-foreground">{order.items} items</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1">
                          {order.channel === "App" ? (
                            <Smartphone className="h-3 w-3" />
                          ) : (
                            <Globe className="h-3 w-3" />
                          )}
                          {order.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`gap-1 ${statusConfig[order.status].color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{order.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          {order.status === "New" && (
                            <Button size="sm" className="h-8 gap-1 bg-primary hover:bg-primary/90">
                              <Package className="h-3 w-3" />
                              Pack
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
