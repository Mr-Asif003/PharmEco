import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FileText, Upload, Check, Clock, X, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  file: File | null;
  status: "pending" | "uploaded" | "verified" | "rejected";
  progress: number;
}

interface DocumentUploadSectionProps {
  documents: Document[];
  onDocumentChange: (documents: Document[]) => void;
}

const documentTypes: Omit<Document, "file" | "status" | "progress">[] = [
  { id: "drugLicense", name: "Drug License", description: "Form 20/21 or 20B/21B", required: true },
  { id: "gstCertificate", name: "GST Certificate", description: "Valid GST registration", required: true },
  { id: "pharmacyRegistration", name: "Pharmacy Registration", description: "State Pharmacy Council certificate", required: true },
  { id: "ownerIdProof", name: "Owner ID Proof", description: "Aadhaar, PAN, or Passport", required: true },
  { id: "establishmentCert", name: "Store Establishment Certificate", description: "Shop & Establishment license", required: false },
  { id: "additional", name: "Additional Documents", description: "Any supporting documents", required: false },
];

export function DocumentUploadSection({ documents, onDocumentChange }: DocumentUploadSectionProps) {
  const [localDocs, setLocalDocs] = useState<Document[]>(
    documents.length > 0 ? documents : documentTypes.map(doc => ({
      ...doc,
      file: null,
      status: "pending" as const,
      progress: 0
    }))
  );

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = (docId: string, file: File) => {
    const updatedDocs = localDocs.map(doc => {
      if (doc.id === docId) {
        return { ...doc, file, status: "uploaded" as const, progress: 100 };
      }
      return doc;
    });
    setLocalDocs(updatedDocs);
    onDocumentChange(updatedDocs);
  };

  const handleRemoveFile = (docId: string) => {
    const updatedDocs = localDocs.map(doc => {
      if (doc.id === docId) {
        return { ...doc, file: null, status: "pending" as const, progress: 0 };
      }
      return doc;
    });
    setLocalDocs(updatedDocs);
    onDocumentChange(updatedDocs);
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "uploaded":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case "verified":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-3 h-3" /> Verified
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <X className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
        <p className="text-sm">
          <span className="font-medium text-primary">Important:</span> Upload clear, legible copies of all required documents. 
          Accepted formats: PDF, JPG, PNG (Max 5MB each)
        </p>
      </div>

      <div className="grid gap-4">
        {localDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative p-4 rounded-xl border-2 border-dashed transition-all duration-300",
              doc.file 
                ? "border-primary/50 bg-primary/5" 
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <input
              type="file"
              ref={el => fileInputRefs.current[doc.id] = el}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(doc.id, file);
              }}
            />

            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                doc.file ? "bg-primary/20" : "bg-muted"
              )}>
                <FileText className={cn(
                  "w-6 h-6",
                  doc.file ? "text-primary" : "text-muted-foreground"
                )} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{doc.name}</h4>
                  {doc.required && (
                    <span className="text-xs text-destructive">*Required</span>
                  )}
                  {getStatusBadge(doc.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{doc.description}</p>

                {doc.file ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {doc.file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({(doc.file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No file uploaded</p>
                )}

                {doc.progress > 0 && doc.progress < 100 && (
                  <Progress value={doc.progress} className="h-1 mt-2" />
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {doc.file ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {/* Preview logic */}}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveFile(doc.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRefs.current[doc.id]?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-muted/50 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Upload Progress</p>
            <p className="text-xs text-muted-foreground">
              {localDocs.filter(d => d.file).length} of {localDocs.filter(d => d.required).length} required documents uploaded
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Progress 
              value={(localDocs.filter(d => d.file && d.required).length / localDocs.filter(d => d.required).length) * 100} 
              className="w-32 h-2"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
