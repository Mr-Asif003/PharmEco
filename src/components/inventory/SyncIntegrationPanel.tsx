import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SyncIntegrationPanel = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [integrations, setIntegrations] = useState([
    { id: "zoho", name: "Zoho Inventory", connected: true, lastSync: "2 hours ago" },
    { id: "tally", name: "Tally ERP", connected: false, lastSync: "Never" },
    { id: "quickbooks", name: "QuickBooks", connected: false, lastSync: "Never" },
    { id: "distributor", name: "Pharma Distributor API", connected: true, lastSync: "1 day ago" },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Sync completed successfully");
      setIntegrations(integrations.map(int => 
        int.connected ? { ...int, lastSync: "Just now" } : int
      ));
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Sync & Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Auto Sync Toggle */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <Label htmlFor="auto-sync" className="cursor-pointer">
            Auto-Sync
          </Label>
          <Switch
            id="auto-sync"
            checked={autoSync}
            onCheckedChange={setAutoSync}
          />
        </div>

        {/* Sync Button */}
        <Button
          className="w-full gap-2"
          onClick={handleSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>

        {/* Integration Status */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Connected Services</h4>
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{integration.name}</p>
                  {integration.connected ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last synced: {integration.lastSync}
                </p>
              </div>
              <Badge variant={integration.connected ? "default" : "secondary"}>
                {integration.connected ? "Active" : "Inactive"}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncIntegrationPanel;
