import { motion, AnimatePresence } from "framer-motion";
import { Store, User, FileText, MapPin, CheckCircle, Clock, AlertCircle, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ReviewData {
  storeName: string;
  storeType: string;
  ownerName: string;
  mobile: string;
  email: string;
  documentsUploaded: number;
  totalDocuments: number;
  city: string;
  state: string;
  pincode: string;
  storeFrontImage: string | null;
  profileImage: string | null;
  currentStep: number;
  allConsentsGiven: boolean;
}

interface LiveReviewPanelProps {
  data: ReviewData;
}

export function LiveReviewPanel({ data }: LiveReviewPanelProps) {
  const completionPercentage = Math.round(
    ((data.currentStep - 1) / 5) * 100 + 
    (data.storeName ? 5 : 0) + 
    (data.ownerName ? 5 : 0) + 
    (data.documentsUploaded > 0 ? 5 : 0) +
    (data.city ? 5 : 0)
  );

  const getStatusBadge = () => {
    if (data.allConsentsGiven) {
      return (
        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" /> Ready to Submit
        </Badge>
      );
    }
    if (data.currentStep > 3) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
          <Clock className="w-3 h-3 mr-1" /> Almost Done
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
        <AlertCircle className="w-3 h-3 mr-1" /> In Progress
      </Badge>
    );
  };

  const ReviewSection = ({ 
    icon: Icon, 
    title, 
    children,
    completed = false
  }: { 
    icon: typeof Store; 
    title: string; 
    children: React.ReactNode;
    completed?: boolean;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn(
            "w-4 h-4",
            completed ? "text-green-500" : "text-primary"
          )} />
          <span className="text-sm font-medium">{title}</span>
        </div>
        {completed && <CheckCircle className="w-4 h-4 text-green-500" />}
      </div>
      <div className="pl-6 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );

  return (
    <div className="sticky top-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Registration Preview</h3>
          {getStatusBadge()}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.min(completionPercentage, 100)}%</span>
          </div>
          <Progress value={Math.min(completionPercentage, 100)} className="h-2" />
        </div>

        {/* Store Image Preview */}
        <div className="mb-6">
          <div className="aspect-video rounded-xl overflow-hidden bg-muted border-2 border-dashed border-border">
            <AnimatePresence mode="wait">
              {data.storeFrontImage ? (
                <motion.img
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={data.storeFrontImage}
                  alt="Store Front"
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center text-muted-foreground"
                >
                  <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-xs">Store photo preview</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Review Sections */}
        <div className="space-y-4">
          <ReviewSection 
            icon={Store} 
            title="Store Details" 
            completed={!!data.storeName && !!data.storeType}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={data.storeName || "empty"}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <p className="font-medium text-foreground">
                  {data.storeName || "Enter store name..."}
                </p>
                <p>{data.storeType ? data.storeType.charAt(0).toUpperCase() + data.storeType.slice(1) + " Pharmacy" : "Select store type..."}</p>
              </motion.div>
            </AnimatePresence>
          </ReviewSection>

          <div className="border-t border-border pt-4" />

          <ReviewSection 
            icon={User} 
            title="Owner Information" 
            completed={!!data.ownerName && !!data.mobile}
          >
            <div className="flex items-start gap-3">
              {data.profileImage ? (
                <img 
                  src={data.profileImage} 
                  alt="Owner" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {data.ownerName || "Enter owner name..."}
                </p>
                <p>{data.mobile || "Enter mobile..."}</p>
                <p>{data.email || "Enter email..."}</p>
              </div>
            </div>
          </ReviewSection>

          <div className="border-t border-border pt-4" />

          <ReviewSection 
            icon={FileText} 
            title="Documents" 
            completed={data.documentsUploaded >= data.totalDocuments}
          >
            <div className="flex items-center gap-2">
              <Progress 
                value={(data.documentsUploaded / data.totalDocuments) * 100} 
                className="h-2 flex-1"
              />
              <span className="text-xs whitespace-nowrap">
                {data.documentsUploaded}/{data.totalDocuments} uploaded
              </span>
            </div>
          </ReviewSection>

          <div className="border-t border-border pt-4" />

          <ReviewSection 
            icon={MapPin} 
            title="Location" 
            completed={!!data.city && !!data.pincode}
          >
            <p>
              {data.city && data.state && data.pincode 
                ? `${data.city}, ${data.state} - ${data.pincode}`
                : "Enter store location..."
              }
            </p>
            {/* Mini map placeholder */}
            <div className="mt-2 h-20 rounded-lg bg-muted/50 border flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary/50" />
              </div>
            </div>
          </ReviewSection>
        </div>
      </motion.div>

      {/* Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-xl bg-primary/5 border border-primary/20"
      >
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" />
          Quick Tips
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Ensure all documents are clearly visible</li>
          <li>• Use high-quality store photos</li>
          <li>• Double-check GST and license numbers</li>
          <li>• Verification takes 24-48 hours</li>
        </ul>
      </motion.div>
    </div>
  );
}
