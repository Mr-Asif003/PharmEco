import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Store, FileText, Clock, HelpCircle, Building2, Calendar } from "lucide-react";

interface StoreDetailsFormProps {
  formData: {
    storeName: string;
    storeType: string;
    registrationNumber: string;
    gstNumber: string;
    drugLicenseType: string;
    yearsInOperation: string;
    openingTime: string;
    closingTime: string;
    is24x7: boolean;
  };
  onChange: (data: Partial<StoreDetailsFormProps["formData"]>) => void;
  errors: Record<string, string>;
}

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};

export function StoreDetailsForm({ formData, onChange, errors }: StoreDetailsFormProps) {
  return (
    <TooltipProvider>
      <motion.div
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={fieldVariants} custom={0} className="space-y-2">
          <Label htmlFor="storeName" className="flex items-center gap-2">
            <Store className="w-4 h-4 text-primary" />
            Medical Store Name *
          </Label>
          <Input
            id="storeName"
            placeholder="Enter your pharmacy/store name"
            value={formData.storeName}
            onChange={(e) => onChange({ storeName: e.target.value })}
            className={errors.storeName ? "border-destructive" : ""}
          />
          {errors.storeName && <p className="text-xs text-destructive">{errors.storeName}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Store Type *
            </Label>
            <Select value={formData.storeType} onValueChange={(v) => onChange({ storeType: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select store type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Pharmacy</SelectItem>
                <SelectItem value="wholesale">Wholesale Pharmacy</SelectItem>
                <SelectItem value="hospital">Hospital Pharmacy</SelectItem>
                <SelectItem value="chain">Chain Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Registration Number
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your pharmacy registration number from the Pharmacy Council</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              placeholder="e.g., PH/2024/12345"
              value={formData.registrationNumber}
              onChange={(e) => onChange({ registrationNumber: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} custom={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              GST Number *
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>15-digit GST Identification Number</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              placeholder="e.g., 22AAAAA0000A1Z5"
              value={formData.gstNumber}
              onChange={(e) => onChange({ gstNumber: e.target.value.toUpperCase() })}
              className={errors.gstNumber ? "border-destructive" : ""}
            />
            {errors.gstNumber && <p className="text-xs text-destructive">{errors.gstNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Drug License Type *
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Type of drug license issued by FDA</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <Select value={formData.drugLicenseType} onValueChange={(v) => onChange({ drugLicenseType: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Only (Form 20/21)</SelectItem>
                <SelectItem value="wholesale">Wholesale Only (Form 20B/21B)</SelectItem>
                <SelectItem value="both">Both Retail & Wholesale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} custom={3} className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Years in Operation
          </Label>
          <Select value={formData.yearsInOperation} onValueChange={(v) => onChange({ yearsInOperation: v })}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New (Less than 1 year)</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5-10">5-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={fieldVariants} custom={4} className="space-y-4">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Operating Hours
          </Label>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">24×7 Emergency Pharmacy</span>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enable if your pharmacy operates round the clock</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Switch
              checked={formData.is24x7}
              onCheckedChange={(checked) => onChange({ is24x7: checked })}
            />
          </div>

          {!formData.is24x7 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  value={formData.openingTime}
                  onChange={(e) => onChange({ openingTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  value={formData.closingTime}
                  onChange={(e) => onChange({ closingTime: e.target.value })}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}
