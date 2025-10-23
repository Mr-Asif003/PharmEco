import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertTriangle, Zap, Mic } from "lucide-react";

const suggestions = [
  {
    id: 1,
    title: "Reorder Alert",
    message: "Reorder these 5 medicines before 28th Oct.",
    priority: "high",
    icon: AlertTriangle,
    action: "View Items",
  },
  {
    id: 2,
    title: "Top Selling Category",
    message: "Your top-selling category: Antibiotics",
    priority: "info",
    icon: TrendingUp,
    action: "View Analytics",
  },
  {
    id: 3,
    title: "Demand Prediction",
    message: "Predicted demand spike for cough syrups (due to seasonal flu).",
    priority: "medium",
    icon: Sparkles,
    action: "Auto-Reorder",
  },
  {
    id: 4,
    title: "Supplier Alert",
    message: "2 suppliers likely to delay delivery – auto-switch available.",
    priority: "high",
    icon: Zap,
    action: "Switch Supplier",
  },
];

export default function AISuggestionsPanel() {
  return (
    <Card className="border-primary/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Suggestions</CardTitle>
              <p className="text-sm text-muted-foreground">Smart recommendations for your business</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  suggestion.priority === "high"
                    ? "bg-destructive/20"
                    : suggestion.priority === "medium"
                    ? "bg-warning/20"
                    : "bg-primary/10"
                }`}
              >
                <suggestion.icon
                  className={`h-5 w-5 ${
                    suggestion.priority === "high"
                      ? "text-destructive"
                      : suggestion.priority === "medium"
                      ? "text-warning"
                      : "text-primary"
                  }`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                  <Badge
                    variant={
                      suggestion.priority === "high"
                        ? "destructive"
                        : suggestion.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {suggestion.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.message}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  {suggestion.action}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
