import { motion } from "framer-motion";
import { ShoppingCart, Scan, Calculator, CreditCard, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const cartItems = [
  { id: 1, name: "Paracetamol 500mg", quantity: 2, price: 45, total: 90 },
  { id: 2, name: "Vitamin C Tablets", quantity: 1, price: 120, total: 120 },
];

const POSCounter = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">POS Counter</h1>
        <p className="text-muted-foreground mt-1">
          Fast and efficient point-of-sale system with prescription validation
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Scan or Search Medicine</CardTitle>
                <CardDescription>Use barcode scanner or search by name</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Scan barcode or type medicine name..."
                      className="h-12"
                    />
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Scan className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>
                  {cartItems.length} item(s) added
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            -
                          </Button>
                          <span className="font-semibold">{item.quantity}</span>
                          <Button size="sm" variant="outline">
                            +
                          </Button>
                        </div>
                        <p className="font-bold text-lg">₹{item.total}</p>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <div className="flex gap-2">
                    <Input id="customer" placeholder="Enter name or phone" />
                    <Button size="icon" variant="outline">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription ID (Optional)</Label>
                  <Input id="prescription" placeholder="RX-XXXX" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Bill Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">₹210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%):</span>
                  <span className="font-semibold">₹10.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-semibold text-success">-₹20</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-primary">₹200.50</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 h-12" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Payment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default POSCounter;
