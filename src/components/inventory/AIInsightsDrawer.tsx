import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, AlertTriangle, Award } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIInsightsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const insights = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "Expiring Soon",
    description: "3 items nearing expiry in next 15 days",
    items: ["Paracetamol Batch #A123", "Amoxicillin Batch #B456", "Cough Syrup Batch #C789"],
    color: "text-warning",
  },
  {
    id: 2,
    type: "suggestion",
    icon: TrendingUp,
    title: "Best Supplier",
    description: "Optimal supplier recommendation",
    items: ["Sun Pharma - Best pricing for Paracetamol", "Quality score: 9.5/10", "Delivery reliability: 98%"],
    color: "text-primary",
  },
  {
    id: 3,
    type: "improvement",
    icon: Award,
    title: "Profit Optimization",
    description: "Margin improvement suggestions",
    items: ["Increase Vitamin C margin by 5%", "Bundle offer for Antibiotics", "Seasonal pricing for Cough Syrup"],
    color: "text-success",
  },
];

const AIInsightsDrawer = ({ open, onOpenChange }: AIInsightsDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI Insights & Recommendations
          </SheetTitle>
          <SheetDescription>
            Smart suggestions to optimize your inventory
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${insight.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          AI
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {insight.description}
                      </p>
                      <ul className="space-y-1">
                        {insight.items.map((item, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          <Button className="w-full mt-6">
            Optimize Inventory
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIInsightsDrawer;
