import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Plus, Truck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    icon: AlertTriangle,
    type: "warning",
    message: "5 batches expiring in 10 days",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: Truck,
    type: "info",
    message: "Supplier A's delivery delayed by 2 days",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: Plus,
    type: "success",
    message: "3 new items added manually today",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: TrendingDown,
    type: "warning",
    message: "Low stock alert for Paracetamol 500mg",
    time: "1 day ago",
  },
  {
    id: 5,
    icon: Truck,
    type: "success",
    message: "Purchase Order #PO-2024-156 completed",
    time: "2 days ago",
  },
  {
    id: 6,
    icon: Plus,
    type: "info",
    message: "Bulk import completed: 45 new items",
    time: "3 days ago",
  },
];

export default function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">System updates and notifications</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="relative">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "warning"
                        ? "bg-warning/20"
                        : activity.type === "success"
                        ? "bg-success/20"
                        : "bg-primary/20"
                    }`}
                  >
                    <activity.icon
                      className={`h-5 w-5 ${
                        activity.type === "warning"
                          ? "text-warning"
                          : activity.type === "success"
                          ? "text-success"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
