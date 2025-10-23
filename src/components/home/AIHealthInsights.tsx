import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const insights = [
  {
    title: "Sales-to-Stock Ratio",
    value: 78,
    status: "good",
    description: "Healthy turnover rate",
    icon: TrendingUp,
  },
  {
    title: "Expiry Risk",
    value: 12,
    status: "warning",
    description: "23 items expiring soon",
    icon: AlertTriangle,
  },
  {
    title: "Supplier Performance",
    value: 92,
    status: "excellent",
    description: "Above average delivery",
    icon: CheckCircle,
  },
];

export default function AIHealthInsights() {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Health Insights</CardTitle>
            <p className="text-sm text-muted-foreground">Smart business summary</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {insights.map((insight) => (
          <div key={insight.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <insight.icon
                  className={`h-5 w-5 ${
                    insight.status === "excellent"
                      ? "text-success"
                      : insight.status === "good"
                      ? "text-primary"
                      : "text-warning"
                  }`}
                />
                <div>
                  <p className="font-semibold text-sm">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-foreground">{insight.value}%</span>
            </div>
            <Progress
              value={insight.value}
              className={`h-2 ${
                insight.status === "excellent"
                  ? "[&>div]:bg-success"
                  : insight.status === "good"
                  ? "[&>div]:bg-primary"
                  : "[&>div]:bg-warning"
              }`}
            />
          </div>
        ))}
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">AI Summary:</span> Your inventory is performing well
            with strong supplier reliability. Consider addressing the 23 items expiring soon to minimize waste.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
