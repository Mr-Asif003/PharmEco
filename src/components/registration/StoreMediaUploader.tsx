import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Camera, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "storefront" | "interior" | "coldstorage";
}

interface StoreMediaUploaderProps {
  onMediaChange: (media: MediaFile[]) => void;
  media: MediaFile[];
}

const mediaTypes = [
  { id: "storefront", label: "Store Front Photo", required: true, icon: Camera },
  { id: "interior", label: "Interior Photo", required: false, icon: ImageIcon },
  { id: "coldstorage", label: "Cold Storage Photo", required: false, icon: ImageIcon },
];

export function StoreMediaUploader({ onMediaChange, media }: StoreMediaUploaderProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = (type: MediaFile["type"], file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMedia: MediaFile = {
        id: `${type}-${Date.now()}`,
        file,
        preview: reader.result as string,
        type,
      };
      
      const updatedMedia = media.filter(m => m.type !== type);
      updatedMedia.push(newMedia);
      onMediaChange(updatedMedia);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (type: MediaFile["type"]) => {
    const updatedMedia = media.filter(m => m.type !== type);
    onMediaChange(updatedMedia);
  };

  const getMediaByType = (type: MediaFile["type"]) => {
    return media.find(m => m.type === type);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
        <p className="text-sm">
          <span className="font-medium text-primary">Photo Guidelines:</span> Upload clear, 
          well-lit photos. Storefront photo is required. Accepted formats: JPG, PNG (Max 5MB each)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mediaTypes.map((mediaType, index) => {
          const Icon = mediaType.icon;
          const existingMedia = getMediaByType(mediaType.id as MediaFile["type"]);

          return (
            <motion.div
              key={mediaType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <Label className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                {mediaType.label}
                {mediaType.required && <span className="text-destructive">*</span>}
              </Label>

              <div
                className={cn(
                  "relative aspect-video rounded-xl border-2 border-dashed transition-all overflow-hidden group cursor-pointer",
                  existingMedia 
                    ? "border-primary/50 bg-primary/5" 
                    : "border-border hover:border-primary/30 hover:bg-muted/50"
                )}
                onMouseEnter={() => setHoveredCard(mediaType.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => !existingMedia && fileInputRefs.current[mediaType.id]?.click()}
              >
                <input
                  type="file"
                  ref={el => fileInputRefs.current[mediaType.id] = el}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(mediaType.id as MediaFile["type"], file);
                  }}
                />

                {existingMedia ? (
                  <>
                    <motion.img
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={existingMedia.preview}
                      alt={mediaType.label}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className={cn(
                      "absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center gap-2",
                      hoveredCard === mediaType.id ? "opacity-100" : "opacity-0"
                    )}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRefs.current[mediaType.id]?.click();
                        }}
                      >
                        <Crop className="w-4 h-4 mr-1" /> Replace
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(mediaType.id as MediaFile["type"]);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Click to upload</span>
                    <span className="text-xs mt-1">or drag and drop</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
        <p className="text-xs text-muted-foreground text-center">
          Uploaded photos will be reviewed during verification. High-quality images increase approval chances.
        </p>
      </div>
    </motion.div>
  );
}
