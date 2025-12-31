import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, ScanLine, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BarcodeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BarcodeScanner = ({ open, onOpenChange }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([
    {
      id: "1",
      name: "Paracetamol 500mg",
      barcode: "8901234567890",
      quantity: 50,
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      barcode: "8901234567891",
      quantity: 30,
    },
  ]);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Item scanned successfully");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Barcode & QR Scanner
          </DialogTitle>
          <DialogDescription>
            Scan items to auto-fill product details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Scanner View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-muted/30 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border overflow-hidden"
          >
            {isScanning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
                <motion.div
                  animate={{
                    y: [-100, 100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-3/4 h-1 bg-primary shadow-[0_0_20px_rgba(255,119,0,0.8)]"
                />
                <ScanLine className="absolute h-16 w-16 text-primary animate-pulse" />
              </motion.div>
            ) : (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Click to start scanning
                </p>
                <Button onClick={handleStartScan}>
                  <ScanLine className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              </div>
            )}
          </motion.div>

          {/* Scanned Items */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Scanned Items ({scannedItems.length})
            </h3>
            <div className="grid grid-cols-1 gap-3 max-h-[200px] overflow-y-auto">
              {scannedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Barcode: {item.barcode}
                        </p>
                      </div>
                      <Badge variant="secondary">Qty: {item.quantity}</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => toast.success("Items added to inventory")}>
              Add All Items
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setScannedItems([]);
                toast.info("List cleared");
              }}
            >
              Clear List
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;
