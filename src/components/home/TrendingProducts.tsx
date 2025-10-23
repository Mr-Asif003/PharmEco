import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const trendingProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Analgesics",
    stock: 850,
    expiry: "Dec 2025",
    trend: "up",
    sparklineData: [4, 3, 5, 9, 6, 8, 12, 10],
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 420,
    expiry: "Jan 2026",
    trend: "up",
    sparklineData: [2, 4, 3, 6, 8, 9, 11, 13],
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    category: "Antihistamines",
    stock: 560,
    expiry: "Nov 2025",
    trend: "up",
    sparklineData: [3, 2, 4, 7, 5, 9, 10, 12],
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    category: "Antacids",
    stock: 390,
    expiry: "Mar 2026",
    trend: "up",
    sparklineData: [1, 3, 2, 5, 7, 6, 9, 11],
  },
];

export default function TrendingProducts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Trending Products</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {product.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-semibold">{product.stock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expiry:</span>
                  <span className="font-semibold">{product.expiry}</span>
                </div>
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={product.sparklineData.map((value, i) => ({ value, index: i }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
