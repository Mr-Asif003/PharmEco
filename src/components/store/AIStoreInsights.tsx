import { motion } from "framer-motion";
import { 
  Sparkles, Tag, Package, Truck, RefreshCw, 
  ArrowRight, Lightbulb, TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    id: 1,
    type: "promotion",
    icon: Tag,
    title: "Bundle Offer Opportunity",
    description: "Paracetamol + Vitamin C bundle could increase sales by 23%",
    action: "Create Bundle",
    priority: "high",
    impact: "+₹12K/week"
  },
  {
    id: 2,
    type: "bestseller",
    icon: TrendingUp,
    title: "Best Selling Bundle",
    description: "Immunity Kit (Vitamin D3 + Zinc) is trending with 45% repeat orders",
    action: "Boost Visibility",
    priority: "medium",
    impact: "+18% sales"
  },
  {
    id: 3,
    type: "delivery",
    icon: Truck,
    title: "Delivery Delay Alert",
    description: "3 orders in Sector 15 are delayed. Consider priority dispatch",
    action: "View Orders",
    priority: "high",
    impact: "5 orders"
  },
  {
    id: 4,
    type: "reorder",
    icon: RefreshCw,
    title: "Customer Reorder Pattern",
    description: "12 customers typically reorder Metformin this week",
    action: "Send Reminders",
    priority: "medium",
    impact: "₹8K potential"
  }
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
};

const typeColors: Record<string, string> = {
  promotion: "from-violet-500/10 to-violet-500/5",
  bestseller: "from-emerald-500/10 to-emerald-500/5",
  delivery: "from-red-500/10 to-red-500/5",
  reorder: "from-blue-500/10 to-blue-500/5"
};

export const AIStoreInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Store Insights</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Smart recommendations to boost your store
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Lightbulb className="h-3 w-3 mr-1" />
              4 New Insights
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`relative p-4 rounded-xl border border-border/50 bg-gradient-to-br ${typeColors[insight.type]} hover:shadow-md transition-all duration-300 group`}
                >
                  {/* Priority Badge */}
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 right-3 text-xs ${priorityColors[insight.priority]}`}
                  >
                    {insight.priority}
                  </Badge>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-background/80 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {insight.impact}
                        </Badge>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Learn More
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 text-xs gap-1 bg-primary hover:bg-primary/90"
                          >
                            {insight.action}
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
