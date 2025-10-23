import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, FileCheck, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const alerts = [
  {
    id: 1,
    type: "expiry",
    icon: AlertTriangle,
    title: "Expiry Alerts",
    message: "15 medicines expiring in next 30 days",
    priority: "high",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "stock",
    icon: TrendingDown,
    title: "Low Stock",
    message: "12 items below minimum threshold",
    priority: "high",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "verification",
    icon: FileCheck,
    title: "GRN Verification",
    message: "3 pending GRN verifications",
    priority: "medium",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "reorder",
    icon: ShoppingCart,
    title: "Auto-Reorder",
    message: "AI suggests reordering 8 items",
    priority: "medium",
    time: "2 days ago",
  },
];

export default function AlertsNotifications() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Alerts & Notifications</span>
          <Badge variant="destructive" className="rounded-full">
            {alerts.filter((a) => a.priority === "high").length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                  alert.priority === "high"
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      alert.priority === "high" ? "bg-destructive/20" : "bg-warning/20"
                    }`}
                  >
                    <alert.icon
                      className={`h-5 w-5 ${
                        alert.priority === "high" ? "text-destructive" : "text-warning"
                      }`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground">{alert.title}</h4>
                      <Badge
                        variant={alert.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
