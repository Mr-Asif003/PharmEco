import { motion } from "framer-motion";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const recommendations = [
  {
    category: "Top 5 Refill Suggestions",
    icon: TrendingUp,
    color: "text-primary",
    items: [
      { name: "Paracetamol 500mg", reason: "High demand, depleting in 8 days", priority: "high" },
      { name: "Vitamin C Tablets", reason: "Seasonal spike expected", priority: "medium" },
      { name: "Cough Syrup", reason: "Winter season approaching", priority: "high" },
      { name: "Ibuprofen 400mg", reason: "Below safety threshold", priority: "high" },
      { name: "Aspirin 75mg", reason: "Consistent daily demand", priority: "medium" },
    ],
  },
  {
    category: "Most Wasted Medicines",
    icon: TrendingDown,
    color: "text-destructive",
    items: [
      { name: "Eye Drops 10ml", reason: "Expired before use (23 units)", priority: "high" },
      { name: "Antibiotic Cream", reason: "Low demand vs purchase", priority: "medium" },
      { name: "Nasal Spray", reason: "Seasonal mismatch", priority: "low" },
    ],
  },
  {
    category: "Best Performing Brands",
    icon: Sparkles,
    color: "text-success",
    items: [
      { name: "Brand A Tablets", reason: "95% sell-through rate", priority: "high" },
      { name: "Brand B Syrups", reason: "Fast-moving, zero waste", priority: "high" },
      { name: "Brand C Vitamins", reason: "High profit margin", priority: "medium" },
    ],
  },
  {
    category: "Low Stock Patterns",
    icon: AlertTriangle,
    color: "text-warning",
    items: [
      { name: "Recurring: Diabetes medicines", reason: "Low every month-end", priority: "high" },
      { name: "Recurring: Pain relievers", reason: "Weekly restocking needed", priority: "medium" },
    ],
  },
];

export default function AIRecommendationDrawer() {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          AI Recommendations
        </SheetTitle>
        <SheetDescription>
          Intelligent insights to optimize your inventory management
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6">
        {recommendations.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <section.icon className={`h-5 w-5 ${section.color}`} />
                  <h3 className="font-semibold">{section.category}</h3>
                </div>
                <Separator className="mb-3" />
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <Lightbulb className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{item.name}</p>
                          <Badge
                            variant={
                              item.priority === "high"
                                ? "destructive"
                                : item.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Optimize Procurement
        </Button>
      </motion.div>
    </div>
  );
}
