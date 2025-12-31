import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation, Home, Ruler, Truck, Eye, Thermometer, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationFormData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  latitude: string;
  longitude: string;
  storeSize: string;
  storageType: string;
  deliveryRadius: number;
  homeDelivery: boolean;
  storeFinderVisible: boolean;
  storeFrontImage: string | null;
  interiorImage: string | null;
  coldStorageImage: string | null;
}

interface MapLocationPickerProps {
  formData: LocationFormData;
  onChange: (data: Partial<LocationFormData>) => void;
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

export function MapLocationPicker({ formData, onChange, errors }: MapLocationPickerProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleImageUpload = (field: 'storeFrontImage' | 'interiorImage' | 'coldStorageImage', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onChange({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (error) => {
          console.log("Location error:", error);
        }
      );
    }
  };

  const ImageUploadCard = ({ 
    label, 
    field, 
    required = false,
    icon: Icon 
  }: { 
    label: string; 
    field: 'storeFrontImage' | 'interiorImage' | 'coldStorageImage';
    required?: boolean;
    icon: typeof Home;
  }) => {
    const imageValue = formData[field];
    
    return (
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <div
          className={cn(
            "relative aspect-video rounded-xl border-2 border-dashed transition-all overflow-hidden group cursor-pointer",
            imageValue ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30"
          )}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(field, file);
            }}
          />
          
          {imageValue ? (
            <>
              <img 
                src={imageValue} 
                alt={label} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange({ [field]: null });
                  }}
                >
                  <X className="w-4 h-4 mr-1" /> Remove
                </Button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm">Click to upload</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Store Address
        </h3>

        <motion.div variants={fieldVariants} custom={0} className="space-y-2">
          <Label>Address Line 1 *</Label>
          <Input
            placeholder="Street address, building name"
            value={formData.addressLine1}
            onChange={(e) => onChange({ addressLine1: e.target.value })}
            className={errors.addressLine1 ? "border-destructive" : ""}
          />
          {errors.addressLine1 && <p className="text-xs text-destructive">{errors.addressLine1}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} custom={1} className="space-y-2">
          <Label>Address Line 2</Label>
          <Input
            placeholder="Area, locality"
            value={formData.addressLine2}
            onChange={(e) => onChange({ addressLine2: e.target.value })}
          />
        </motion.div>

        <motion.div variants={fieldVariants} custom={2} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>City *</Label>
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={errors.city ? "border-destructive" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label>State *</Label>
            <Select value={formData.state} onValueChange={(v) => onChange({ state: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Pincode *</Label>
            <Input
              placeholder="400001"
              value={formData.pincode}
              onChange={(e) => onChange({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              className={errors.pincode ? "border-destructive" : ""}
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} custom={3} className="space-y-2">
          <Label>Landmark</Label>
          <Input
            placeholder="Near hospital, opposite mall, etc."
            value={formData.landmark}
            onChange={(e) => onChange({ landmark: e.target.value })}
          />
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div variants={fieldVariants} custom={4} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" />
          Pin Location on Map
        </h3>

        <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted">
          {/* Placeholder map - in real app, integrate Google Maps or Mapbox */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <MapPin className="w-12 h-12 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Map integration placeholder</p>
            <p className="text-xs text-muted-foreground">Click to pin your store location</p>
          </div>
          
          {/* Map pin animation overlay */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-8 h-8 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="w-3 h-3 bg-primary/30 rounded-full mx-auto -mt-1" />
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleUseCurrentLocation}>
            <Navigation className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>
          <div className="flex gap-2 flex-1">
            <Input
              placeholder="Latitude"
              value={formData.latitude}
              onChange={(e) => onChange({ latitude: e.target.value })}
              className="w-32"
            />
            <Input
              placeholder="Longitude"
              value={formData.longitude}
              onChange={(e) => onChange({ longitude: e.target.value })}
              className="w-32"
            />
          </div>
        </div>
      </motion.div>

      {/* Store Setup Section */}
      <motion.div variants={fieldVariants} custom={5} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Store Setup
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              Store Size (sq. ft)
            </Label>
            <Select value={formData.storeSize} onValueChange={(v) => onChange({ storeSize: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (&lt;500 sq.ft)</SelectItem>
                <SelectItem value="medium">Medium (500-1000 sq.ft)</SelectItem>
                <SelectItem value="large">Large (1000-2000 sq.ft)</SelectItem>
                <SelectItem value="xlarge">Extra Large (&gt;2000 sq.ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-primary" />
              Storage Type
            </Label>
            <Select value={formData.storageType} onValueChange={(v) => onChange({ storageType: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal Storage Only</SelectItem>
                <SelectItem value="cold">Cold Storage Available</SelectItem>
                <SelectItem value="both">Both Normal & Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            Delivery Radius: {formData.deliveryRadius} km
          </Label>
          <Slider
            value={[formData.deliveryRadius]}
            onValueChange={([value]) => onChange({ deliveryRadius: value })}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Home Delivery</span>
            </div>
            <Switch
              checked={formData.homeDelivery}
              onCheckedChange={(checked) => onChange({ homeDelivery: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Visible on Store Finder</span>
            </div>
            <Switch
              checked={formData.storeFinderVisible}
              onCheckedChange={(checked) => onChange({ storeFinderVisible: checked })}
            />
          </div>
        </div>
      </motion.div>

      {/* Store Photos Section */}
      <motion.div variants={fieldVariants} custom={6} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Store Photos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageUploadCard 
            label="Store Front" 
            field="storeFrontImage" 
            required 
            icon={Home} 
          />
          <ImageUploadCard 
            label="Interior" 
            field="interiorImage" 
            icon={Home} 
          />
          <ImageUploadCard 
            label="Cold Storage" 
            field="coldStorageImage" 
            icon={Thermometer} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
