import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const insights = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "Expiry Alert",
    message: "15 medicines expiring within 30 days",
    action: "View Details",
    priority: "high",
  },
  {
    id: 2,
    type: "success",
    icon: TrendingUp,
    title: "Demand Prediction",
    message: "Paracetamol demand expected to increase by 30%",
    action: "Auto-Reorder",
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    icon: Package,
    title: "Stock Optimization",
    message: "Consider transferring 50 units of Aspirin to Branch B",
    action: "Execute Transfer",
    priority: "low",
  },
];

export function AIInsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/20 animate-pulse-glow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>Smart recommendations & insights</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  insight.priority === "high" ? "bg-destructive/20" :
                  insight.priority === "medium" ? "bg-warning/20" :
                  "bg-muted"
                }`}>
                  <insight.icon className={`h-4 w-4 ${
                    insight.priority === "high" ? "text-destructive" :
                    insight.priority === "medium" ? "text-warning" :
                    "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <Badge variant={
                      insight.priority === "high" ? "destructive" :
                      insight.priority === "medium" ? "default" :
                      "secondary"
                    } className="text-xs">
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                  <Button size="sm" variant="outline" className="text-xs">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
