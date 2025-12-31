import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, Calendar, CreditCard, MapPin, Upload, Camera } from "lucide-react";

interface OwnerInfoFormProps {
  formData: {
    ownerName: string;
    mobile: string;
    email: string;
    dateOfBirth: string;
    panNumber: string;
    aadhaarNumber: string;
    ownerAddress: string;
    sameAsStore: boolean;
    profileImage: string | null;
  };
  onChange: (data: Partial<OwnerInfoFormProps["formData"]>) => void;
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

export function OwnerInfoForm({ formData, onChange, errors }: OwnerInfoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(formData.profileImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onChange({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profile Image Upload */}
      <motion.div variants={fieldVariants} custom={0} className="flex flex-col items-center gap-4">
        <div
          className="relative w-28 h-28 rounded-full bg-muted border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <Camera className="w-8 h-8" />
              <span className="text-xs">Upload Photo</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Upload className="w-6 h-6 text-white" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <p className="text-xs text-muted-foreground">Click to upload profile photo</p>
      </motion.div>

      <motion.div variants={fieldVariants} custom={1} className="space-y-2">
        <Label htmlFor="ownerName" className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Owner Full Name *
        </Label>
        <Input
          id="ownerName"
          placeholder="Enter your full name"
          value={formData.ownerName}
          onChange={(e) => onChange({ ownerName: e.target.value })}
          className={errors.ownerName ? "border-destructive" : ""}
        />
        {errors.ownerName && <p className="text-xs text-destructive">{errors.ownerName}</p>}
      </motion.div>

      <motion.div variants={fieldVariants} custom={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Mobile Number *
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="+91 9876543210"
              value={formData.mobile}
              onChange={(e) => onChange({ mobile: e.target.value })}
              className={errors.mobile ? "border-destructive flex-1" : "flex-1"}
            />
            <Button variant="outline" size="sm" className="shrink-0">
              Send OTP
            </Button>
          </div>
          {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Address *
          </Label>
          <Input
            type="email"
            placeholder="owner@pharmacy.com"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </motion.div>

      <motion.div variants={fieldVariants} custom={3} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Date of Birth
          </Label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            PAN Number *
          </Label>
          <Input
            placeholder="ABCDE1234F"
            value={formData.panNumber}
            onChange={(e) => onChange({ panNumber: e.target.value.toUpperCase() })}
            className={errors.panNumber ? "border-destructive" : ""}
            maxLength={10}
          />
          {errors.panNumber && <p className="text-xs text-destructive">{errors.panNumber}</p>}
        </div>
      </motion.div>

      <motion.div variants={fieldVariants} custom={4} className="space-y-2">
        <Label className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Aadhaar / National ID
          <span className="text-xs text-muted-foreground">(Optional - for verification)</span>
        </Label>
        <Input
          placeholder="XXXX XXXX XXXX"
          value={formData.aadhaarNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 12);
            const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            onChange({ aadhaarNumber: formatted });
          }}
        />
        <p className="text-xs text-muted-foreground">
          Your Aadhaar will be used for identity verification only
        </p>
      </motion.div>

      <motion.div variants={fieldVariants} custom={5} className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="sameAsStore"
            checked={formData.sameAsStore}
            onCheckedChange={(checked) => onChange({ sameAsStore: checked as boolean })}
          />
          <Label htmlFor="sameAsStore" className="cursor-pointer">
            Same address as store location
          </Label>
        </div>

        {!formData.sameAsStore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Owner Address
            </Label>
            <Textarea
              placeholder="Enter your residential address"
              value={formData.ownerAddress}
              onChange={(e) => onChange({ ownerAddress: e.target.value })}
              rows={3}
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={fieldVariants}
        custom={6}
        className="p-4 rounded-xl bg-primary/5 border border-primary/20"
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Privacy Notice:</span> Your personal information is collected in accordance with applicable data protection laws and will only be used for verification and platform services.
        </p>
      </motion.div>
    </motion.div>
  );
}
