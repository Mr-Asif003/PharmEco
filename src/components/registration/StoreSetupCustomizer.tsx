import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Type, 
  Layout, 
  Upload, 
  Eye,
  Sun,
  Moon,
  Sparkles,
  Store,
  ShoppingBag,
  Heart,
  Pill,
  X,
  Check
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface StoreSetupData {
  storeName: string;
  tagline: string;
  logo: string | null;
  theme: "light" | "dark" | "auto";
  primaryColor: string;
  style: "modern" | "classic" | "minimal" | "bold";
}

interface StoreSetupCustomizerProps {
  formData: StoreSetupData;
  onChange: (data: Partial<StoreSetupData>) => void;
}

const colorOptions = [
  { name: "Medical Orange", value: "#FF7A00", class: "bg-[#FF7A00]" },
  { name: "Trust Blue", value: "#2563EB", class: "bg-[#2563EB]" },
  { name: "Health Green", value: "#16A34A", class: "bg-[#16A34A]" },
  { name: "Care Purple", value: "#7C3AED", class: "bg-[#7C3AED]" },
  { name: "Calm Teal", value: "#0D9488", class: "bg-[#0D9488]" },
  { name: "Warm Rose", value: "#E11D48", class: "bg-[#E11D48]" },
];

const styleOptions = [
  { 
    id: "modern", 
    name: "Modern", 
    description: "Clean lines, gradients, shadows",
    icon: Sparkles 
  },
  { 
    id: "classic", 
    name: "Classic", 
    description: "Traditional, trustworthy feel",
    icon: Store 
  },
  { 
    id: "minimal", 
    name: "Minimal", 
    description: "Simple, focused, elegant",
    icon: Layout 
  },
  { 
    id: "bold", 
    name: "Bold", 
    description: "Vibrant, eye-catching design",
    icon: Heart 
  },
];

export function StoreSetupCustomizer({ formData, onChange }: StoreSetupCustomizerProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(formData.logo);
  const [activeTab, setActiveTab] = useState("preview");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        onChange({ logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    onChange({ logo: null });
  };

  return (
    <div className="space-y-8">
      {/* Store Branding Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Store Branding</h3>
        </div>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Store Name</Label>
            <Input
              id="displayName"
              value={formData.storeName}
              onChange={(e) => onChange({ storeName: e.target.value })}
              placeholder="Your Pharmacy Name"
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">
              This name will be displayed on your store front
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Store Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              placeholder="Your trusted healthcare partner"
            />
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Store Logo</Label>
            <div className="flex items-start gap-4">
              <motion.div 
                className={cn(
                  "w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors",
                  logoPreview ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
                whileHover={{ scale: 1.02 }}
              >
                {logoPreview ? (
                  <div className="relative w-full h-full group">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center p-2">
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </motion.div>
              <div className="flex-1 text-sm text-muted-foreground">
                <p>Upload your store logo</p>
                <p className="text-xs mt-1">Recommended: 200x200px, PNG or JPG</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Theme Mode</h3>
        </div>

        <RadioGroup
          value={formData.theme}
          onValueChange={(value) => onChange({ theme: value as "light" | "dark" | "auto" })}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { value: "light", icon: Sun, label: "Light" },
            { value: "dark", icon: Moon, label: "Dark" },
            { value: "auto", icon: Sparkles, label: "Auto" },
          ].map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all",
                formData.theme === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <option.icon className={cn(
                "w-6 h-6",
                formData.theme === option.value ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                formData.theme === option.value && "text-primary"
              )}>
                {option.label}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Brand Color</h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {colorOptions.map((color) => (
            <motion.button
              key={color.value}
              onClick={() => onChange({ primaryColor: color.value })}
              className={cn(
                "relative w-full aspect-square rounded-xl transition-all",
                color.class,
                formData.primaryColor === color.value
                  ? "ring-4 ring-offset-2 ring-offset-background ring-primary scale-110"
                  : "hover:scale-105"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formData.primaryColor === color.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-6 h-6 text-white drop-shadow-lg" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Selected: {colorOptions.find(c => c.value === formData.primaryColor)?.name || "Medical Orange"}
        </p>
      </div>

      {/* Style Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Store Style</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {styleOptions.map((style) => (
            <motion.button
              key={style.id}
              onClick={() => onChange({ style: style.id as StoreSetupData["style"] })}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                formData.style === style.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                formData.style === style.id ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <style.icon className="w-5 h-5" />
              </div>
              <div>
                <p className={cn(
                  "font-semibold",
                  formData.style === style.id && "text-primary"
                )}>
                  {style.name}
                </p>
                <p className="text-xs text-muted-foreground">{style.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Store Preview</h3>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Store Card</TabsTrigger>
            <TabsTrigger value="header">Header View</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-2xl overflow-hidden border shadow-lg",
                formData.theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
              )}
              style={{
                borderColor: formData.primaryColor + "40"
              }}
            >
              {/* Store Card Preview */}
              <div 
                className="h-24 relative"
                style={{ 
                  background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.primaryColor}99)` 
                }}
              >
                {logoPreview && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-8 left-4 w-16 h-16 rounded-xl border-4 overflow-hidden shadow-lg"
                    style={{ borderColor: formData.theme === "dark" ? "#18181b" : "#fff" }}
                  >
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  </motion.div>
                )}
                {!logoPreview && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-8 left-4 w-16 h-16 rounded-xl border-4 overflow-hidden shadow-lg flex items-center justify-center"
                    style={{ 
                      borderColor: formData.theme === "dark" ? "#18181b" : "#fff",
                      backgroundColor: formData.primaryColor + "20"
                    }}
                  >
                    <Pill className="w-8 h-8" style={{ color: formData.primaryColor }} />
                  </motion.div>
                )}
              </div>

              <div className={cn(
                "p-4 pt-12",
                formData.style === "minimal" && "pt-10",
                formData.style === "bold" && "pt-14"
              )}>
                <h4 className="font-bold text-lg">
                  {formData.storeName || "Your Store Name"}
                </h4>
                <p className={cn(
                  "text-sm",
                  formData.theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                )}>
                  {formData.tagline || "Your trusted healthcare partner"}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Open Now
                  </span>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    formData.theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                  )}>
                    Free Delivery
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: formData.theme === "dark" ? "#27272a" : "#e4e4e7" }}>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4" style={{ color: formData.primaryColor }} />
                    <span className="text-xs">1000+ Products</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" style={{ color: formData.primaryColor }} />
                    <span className="text-xs">4.8 Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="header" className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-2xl overflow-hidden border shadow-lg",
                formData.theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
              )}
            >
              {/* Header Preview */}
              <div 
                className="p-4 flex items-center justify-between"
                style={{ 
                  borderBottom: `2px solid ${formData.primaryColor}20`
                }}
              >
                <div className="flex items-center gap-3">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: formData.primaryColor + "20" }}
                    >
                      <Pill className="w-5 h-5" style={{ color: formData.primaryColor }} />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">
                      {formData.storeName || "Your Store Name"}
                    </h4>
                    <p className={cn(
                      "text-xs",
                      formData.theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    )}>
                      {formData.tagline || "Your trusted healthcare partner"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: formData.primaryColor, color: formData.primaryColor }}
                  >
                    Contact
                  </Button>
                  <Button 
                    size="sm"
                    className="text-xs text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>

              {/* Nav Preview */}
              <div className={cn(
                "px-4 py-2 flex gap-4 text-sm",
                formData.theme === "dark" ? "bg-zinc-800" : "bg-zinc-50"
              )}>
                {["Home", "Products", "Categories", "Offers", "About"].map((item, i) => (
                  <span 
                    key={item}
                    className={cn(
                      "cursor-pointer transition-colors",
                      i === 0 ? "font-semibold" : "opacity-70 hover:opacity-100"
                    )}
                    style={{ color: i === 0 ? formData.primaryColor : undefined }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
