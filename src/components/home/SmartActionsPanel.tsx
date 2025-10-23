import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Scan, FileText, Bot } from "lucide-react";

const actions = [
  { icon: Plus, label: "Add Product", description: "Manual entry", color: "bg-primary/10 text-primary" },
  { icon: Upload, label: "Upload CSV", description: "Bulk import", color: "bg-chart-2/10 text-chart-2" },
  { icon: Scan, label: "Scan Stock", description: "Barcode/QR", color: "bg-chart-3/10 text-chart-3" },
  { icon: FileText, label: "Generate Report", description: "Analytics", color: "bg-chart-4/10 text-chart-4" },
  { icon: Bot, label: "AI Chatbot", description: "Ask anything", color: "bg-chart-5/10 text-chart-5" },
];

export default function SmartActionsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Quick access to common tasks</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className={`h-12 w-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
