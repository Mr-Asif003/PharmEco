import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, CheckCircle2, FileSpreadsheet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BulkImportModal = ({ open, onOpenChange }: BulkImportModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          toast.success("245 items imported successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadTemplate = () => {
    toast.info("Downloading CSV template...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Bulk Import Items
          </DialogTitle>
          <DialogDescription>
            Upload your inventory data via CSV or Excel file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Download Template */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/50 rounded-lg p-4 border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Download Template</p>
                  <p className="text-sm text-muted-foreground">
                    Get the sample CSV template
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </motion.div>

          {/* Upload Section */}
          <AnimatePresence mode="wait">
            {!uploadComplete ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center"
              >
                {!isUploading ? (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Upload Your File</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to browse
                    </p>
                    <Button onClick={handleFileUpload}>Choose File</Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="font-medium">Uploading...</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadProgress}% Complete
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-2">Import Successful!</h3>
                <p className="text-muted-foreground">
                  245 items have been imported successfully
                </p>
                <Button
                  className="mt-6"
                  onClick={() => {
                    setUploadComplete(false);
                    onOpenChange(false);
                  }}
                >
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkImportModal;
