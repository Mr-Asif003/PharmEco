import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, TrendingDown, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const topSelling = [
  { id: 1, name: "Paracetamol 500mg", price: 45, sold: 234, stock: 450, image: "💊", visible: true },
  { id: 2, name: "Azithromycin 250mg", price: 180, sold: 156, stock: 200, image: "💊", visible: true },
  { id: 3, name: "Vitamin D3 Capsules", price: 350, sold: 142, stock: 180, image: "💊", visible: true },
  { id: 4, name: "Cetirizine 10mg", price: 25, sold: 128, stock: 320, image: "💊", visible: true },
  { id: 5, name: "Omeprazole 20mg", price: 85, sold: 118, stock: 150, image: "💊", visible: true },
];

const outOfStock = [
  { id: 6, name: "Insulin Glargine", price: 1200, sold: 45, stock: 0, image: "💉", visible: false },
  { id: 7, name: "Metformin 500mg", price: 35, sold: 89, stock: 0, image: "💊", visible: false },
  { id: 8, name: "BP Monitor Digital", price: 1500, sold: 23, stock: 0, image: "🩺", visible: false },
];

const lowDemand = [
  { id: 9, name: "Antacid Gel 200ml", price: 120, sold: 8, stock: 95, image: "🧴", visible: true },
  { id: 10, name: "Throat Lozenges", price: 45, sold: 12, stock: 200, image: "🍬", visible: true },
  { id: 11, name: "Eye Drops 10ml", price: 65, sold: 15, stock: 150, image: "💧", visible: true },
];

interface ProductCardProps {
  product: typeof topSelling[0];
  type: "top" | "outOfStock" | "lowDemand";
}

const ProductCard = ({ product, type }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState(product.visible);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="min-w-[200px] flex-shrink-0"
    >
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-4">
          {/* Product Image Placeholder */}
          <div className="relative h-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-3">
            <span className="text-4xl">{product.image}</span>
            {type === "outOfStock" && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
              </div>
            )}
            {type === "top" && (
              <Badge className="absolute top-2 left-2 bg-emerald-500/90 text-white text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Top
              </Badge>
            )}
            {type === "lowDemand" && (
              <Badge className="absolute top-2 left-2 bg-amber-500/90 text-white text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                Low
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <h4 className="font-medium text-sm text-foreground truncate mb-1">
            {product.name}
          </h4>
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <span className="text-xs text-muted-foreground">
              {product.sold} sold
            </span>
          </div>

          {/* Stock & Visibility */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                product.stock === 0 
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                  : product.stock < 50 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {product.stock === 0 ? 'No Stock' : `${product.stock} units`}
            </Badge>
            <div className="flex items-center gap-1.5">
              {isVisible ? (
                <Eye className="h-3 w-3 text-emerald-500" />
              ) : (
                <EyeOff className="h-3 w-3 text-muted-foreground" />
              )}
              <Switch
                checked={isVisible}
                onCheckedChange={setIsVisible}
                disabled={product.stock === 0}
                className="scale-75"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ProductPerformance = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Product Performance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Monitor your best and worst performing products
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="top" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="top" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Top Selling
              </TabsTrigger>
              <TabsTrigger value="outOfStock" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                Out of Stock
              </TabsTrigger>
              <TabsTrigger value="lowDemand" className="gap-2">
                <TrendingDown className="h-4 w-4" />
                Low Demand
              </TabsTrigger>
            </TabsList>

            <TabsContent value="top">
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {topSelling.map((product) => (
                    <ProductCard key={product.id} product={product} type="top" />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outOfStock">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {outOfStock.map((product) => (
                  <ProductCard key={product.id} product={product} type="outOfStock" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lowDemand">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {lowDemand.map((product) => (
                  <ProductCard key={product.id} product={product} type="lowDemand" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
