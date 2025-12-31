import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, MapPin, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CustomerRegisterFieldsProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    location: string;
    profileImage: File | null;
  };
  onChange: (field: string, value: string | File | null) => void;
  errors: Record<string, string>;
}

export function CustomerRegisterFields({ formData, onChange, errors }: CustomerRegisterFieldsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
    >
      {/* Profile Image Upload */}
      <motion.div 
        className="flex justify-center"
        custom={0}
        variants={fieldVariants}
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-muted/50 border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-xs text-muted-foreground text-center mt-2">Upload Photo (Optional)</p>
        </div>
      </motion.div>

      {/* Full Name */}
      <motion.div custom={1} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.fullName ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
      </motion.div>

      {/* Email */}
      <motion.div custom={2} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.email ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </motion.div>

      {/* Phone */}
      <motion.div custom={3} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.phone ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </motion.div>

      {/* Password */}
      <motion.div custom={4} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.password ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </motion.div>

      {/* Confirm Password */}
      <motion.div custom={5} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.confirmPassword ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
      </motion.div>

      {/* Location */}
      <motion.div custom={6} variants={fieldVariants} className="space-y-2">
        <Label htmlFor="location">Location / Pincode</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="location"
            placeholder="City, State or Pincode"
            value={formData.location}
            onChange={(e) => onChange("location", e.target.value)}
            className={`pl-10 h-11 bg-background/50 backdrop-blur-sm border-border/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
              errors.location ? "border-destructive" : ""
            }`}
          />
        </div>
        {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
      </motion.div>
    </motion.div>
  );
}
