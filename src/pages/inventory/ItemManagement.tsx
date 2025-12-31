import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Upload, Camera, Trash2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import ItemForm from "@/components/inventory/ItemForm";
import BulkImportModal from "@/components/inventory/BulkImportModal";
import BarcodeScanner from "@/components/inventory/BarcodeScanner";
import SyncIntegrationPanel from "@/components/inventory/SyncIntegrationPanel";
import ItemTable from "@/components/inventory/ItemTable";
import AnalyticsCharts from "@/components/inventory/AnalyticsCharts";
import AIInsightsDrawer from "@/components/inventory/AIInsightsDrawer";

const ItemManagement = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                🧾 Item Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage, Monitor, and Sync Your Complete Product Catalog
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </Button>
          </div>

          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-4">
            Dashboard / Inventory / Item Management
          </div>

          {/* Search & Actions */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by SKU, Name, or Barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>

            <Button variant="outline" className="gap-2" onClick={() => setShowBulkImport(true)}>
              <Upload className="h-4 w-4" />
              Bulk Import
            </Button>

            <Button variant="outline" className="gap-2" onClick={() => setShowBarcodeScanner(true)}>
              <Camera className="h-4 w-4" />
              Scan Barcode
            </Button>

            {selectedItems.length > 0 && (
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete ({selectedItems.length})
              </Button>
            )}

            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync
            </Button>

            <Button
              variant="secondary"
              onClick={() => setShowAIDrawer(!showAIDrawer)}
            >
              💡 AI Help
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="max-w-[1600px] mx-auto p-6">
        
          {/* Left Panel - Item Controls */}
          

          {/* Right Panel - Item Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <ItemTable
              searchQuery={searchQuery}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </motion.div>
        

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <AnalyticsCharts />
        </motion.div>
      </div>

      {/* Modals & Drawers */}
      <BulkImportModal open={showBulkImport} onOpenChange={setShowBulkImport} />
      <BarcodeScanner open={showBarcodeScanner} onOpenChange={setShowBarcodeScanner} />
      <AIInsightsDrawer open={showAIDrawer} onOpenChange={setShowAIDrawer} />
    </div>
  );
};

export default ItemManagement;
