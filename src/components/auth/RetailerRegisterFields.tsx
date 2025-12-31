import { useState } from "react";
import { motion } from "framer-motion";
import { Store, User, Mail, Phone, Lock, MapPin, FileText, Receipt, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RetailerRegisterFieldsProps {
  formData: {
    storeName: string;
    ownerName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    gstNumber: string;
    storeAddress: string;
    password: string;
    confirmPassword: string;
    storeLicense: File | null;
    storeLogo: File | null;
  };
  onChange: (field: string, value: string | File | null) => void;
  errors: Record<string, string>;
}

export function RetailerRegisterFields({ formData, onChange, errors }: RetailerRegisterFieldsProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [licenseFileName, setLicenseFileName] = useState<string>("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange("storeLogo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange("storeLicense", file);
      setLicenseFileName(file.name);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.3 }
    })
  };

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
    >
      {/* Store Logo Upload */}
      <motion.div 
        className="flex justify-center"
        custom={0}
        variants={fieldVariants}
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-xl bg-muted/50 border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
            {logoPreview ? (
              <img src={logoPreview} alt="Store Logo" className="w-full h-full object-cover" />
            ) : (
              <Store className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-xs text-muted-foreground text-center mt-2">Store Logo</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Store Name */}
        <motion.div custom={1} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="storeName">Medical Store Name</Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="storeName"
              placeholder="PharmaCare Plus"
              value={formData.storeName}
              onChange={(e) => onChange("storeName", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.storeName ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.storeName && <p className="text-xs text-destructive">{errors.storeName}</p>}
        </motion.div>

        {/* Owner Name */}
        <motion.div custom={2} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="ownerName"
              placeholder="John Smith"
              value={formData.ownerName}
              onChange={(e) => onChange("ownerName", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.ownerName ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.ownerName && <p className="text-xs text-destructive">{errors.ownerName}</p>}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <motion.div custom={3} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="store@example.com"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.email ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </motion.div>

        {/* Phone */}
        <motion.div custom={4} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.phone ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* License Number */}
        <motion.div custom={5} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="licenseNumber">Store License Number</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="licenseNumber"
              placeholder="DL-XXX-XXXXXX"
              value={formData.licenseNumber}
              onChange={(e) => onChange("licenseNumber", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.licenseNumber ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.licenseNumber && <p className="text-xs text-destructive">{errors.licenseNumber}</p>}
        </motion.div>

        {/* GST Number */}
        <motion.div custom={6} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="gstNumber">GST Number</Label>
          <div className="relative">
            <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="gstNumber"
              placeholder="XXAABBCCDDEE1Z1"
              value={formData.gstNumber}
              onChange={(e) => onChange("gstNumber", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.gstNumber ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.gstNumber && <p className="text-xs text-destructive">{errors.gstNumber}</p>}
        </motion.div>
      </div>

      {/* Store Address */}
      <motion.div custom={7} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="storeAddress">Store Address / Region</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="storeAddress"
            placeholder="123 Medical Lane, City, State - 123456"
            value={formData.storeAddress}
            onChange={(e) => onChange("storeAddress", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
              errors.storeAddress ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.storeAddress && <p className="text-xs text-destructive">{errors.storeAddress}</p>}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <motion.div custom={8} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => onChange("password", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.password ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </motion.div>

        {/* Confirm Password */}
        <motion.div custom={9} variants={fieldVariants} className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                errors.confirmPassword ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        </motion.div>
      </div>

      {/* License Upload */}
      <motion.div custom={10} variants={fieldVariants} className="space-y-2">
        <Label>Upload Store License (PDF/Image)</Label>
        <div className="relative">
          <div className={`flex items-center gap-3 p-3 rounded-lg border-2 border-dashed bg-background/50 backdrop-blur-sm transition-colors cursor-pointer hover:border-orange-500/50 ${
            errors.storeLicense ? "border-destructive" : "border-border/50"
          }`}>
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {licenseFileName || "Click to upload license document"}
            </span>
          </div>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleLicenseChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {errors.storeLicense && <p className="text-xs text-destructive">{errors.storeLicense}</p>}
      </motion.div>
    </motion.div>
  );
}
