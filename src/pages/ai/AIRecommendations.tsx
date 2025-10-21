import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Package, AlertTriangle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const recommendations = [
  {
    id: 1,
    type: "reorder",
    icon: Package,
    title: "Smart Reorder Suggestion",
    description: "Based on historical sales patterns and current stock levels",
    items: [
      { name: "Paracetamol 500mg", suggested: 500, confidence: 92 },
      { name: "Amoxicillin 250mg", suggested: 300, confidence: 88 },
      { name: "Vitamin D3", suggested: 200, confidence: 85 },
    ],
    priority: "high",
  },
  {
    id: 2,
    type: "transfer",
    icon: TrendingUp,
    title: "Branch Stock Optimization",
    description: "Optimize inventory distribution across branches",
    items: [
      { name: "Aspirin 75mg", fromBranch: "Main Store", toBranch: "Branch B", quantity: 50 },
      { name: "Omeprazole 20mg", fromBranch: "Branch A", toBranch: "Main Store", quantity: 30 },
    ],
    priority: "medium",
  },
  {
    id: 3,
    type: "promotion",
    icon: Lightbulb,
    title: "Sales Promotion Opportunity",
    description: "Medicines with expiry dates can be promoted",
    items: [
      { name: "Cough Syrup", discount: "15%", expiryDays: 45, expectedRevenue: "₹8,500" },
      { name: "Eye Drops", discount: "10%", expiryDays: 52, expectedRevenue: "₹5,200" },
    ],
    priority: "low",
  },
];

const AIRecommendations = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Smart Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              Machine learning powered insights to optimize your inventory
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Accuracy Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">94.5%</div>
                <Progress value={94.5} className="h-2" />
                <p className="text-xs text-muted-foreground">Last 30 days predictions</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-success">₹1,24,500</div>
                <p className="text-xs text-muted-foreground">Saved this month via AI</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Pending recommendations</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="border-primary/30 hover:border-primary/60 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      rec.priority === "high" ? "bg-destructive/20" :
                      rec.priority === "medium" ? "bg-primary/20" :
                      "bg-muted"
                    }`}>
                      <rec.icon className={`h-6 w-6 ${
                        rec.priority === "high" ? "text-destructive" :
                        rec.priority === "medium" ? "text-primary" :
                        "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <CardTitle>{rec.title}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={
                    rec.priority === "high" ? "destructive" :
                    rec.priority === "medium" ? "default" :
                    "secondary"
                  }>
                    {rec.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rec.type === "reorder" && rec.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Suggested quantity: {item.suggested} units
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Confidence</p>
                          <p className="font-semibold text-primary">{item.confidence}%</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                  {rec.type === "transfer" && rec.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.fromBranch} → {item.toBranch} ({item.quantity} units)
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Execute Transfer
                      </Button>
                    </div>
                  ))}
                  {rec.type === "promotion" && rec.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Discount: {item.discount} • Expires in {item.expiryDays} days
                        </p>
                        <p className="text-sm text-success font-semibold">
                          Expected revenue: {item.expectedRevenue}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Create Promotion
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
