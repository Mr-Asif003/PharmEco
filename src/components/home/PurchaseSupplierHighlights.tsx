import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Truck, Star } from "lucide-react";

const suppliers = [
  { name: "MedSupply Co.", score: 95, orders: 45, status: "excellent" },
  { name: "PharmaDistrib", score: 88, orders: 38, status: "good" },
  { name: "HealthCare Plus", score: 82, orders: 32, status: "good" },
  { name: "MediSource Ltd", score: 76, orders: 28, status: "average" },
  { name: "QuickMed Supply", score: 91, orders: 41, status: "excellent" },
];

export default function PurchaseSupplierHighlights() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-chart-2/20 flex items-center justify-center">
            <Truck className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <CardTitle>Purchase & Supplier Highlights</CardTitle>
            <p className="text-sm text-muted-foreground">Top performing suppliers</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {suppliers.map((supplier, index) => (
          <div
            key={supplier.name}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm text-foreground">{supplier.name}</h4>
                <p className="text-xs text-muted-foreground">{supplier.orders} completed orders</p>
              </div>
              <Badge
                variant={
                  supplier.status === "excellent"
                    ? "default"
                    : supplier.status === "good"
                    ? "secondary"
                    : "outline"
                }
                className="gap-1"
              >
                <Star className="h-3 w-3" />
                {supplier.score}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">AI Risk Score</span>
                <span className="font-semibold text-foreground">{supplier.score}/100</span>
              </div>
              <Progress
                value={supplier.score}
                className={`h-2 ${
                  supplier.status === "excellent"
                    ? "[&>div]:bg-success"
                    : supplier.status === "good"
                    ? "[&>div]:bg-primary"
                    : "[&>div]:bg-warning"
                }`}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-xs text-muted-foreground">Pending POs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">127</p>
            <p className="text-xs text-muted-foreground">Completed POs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
