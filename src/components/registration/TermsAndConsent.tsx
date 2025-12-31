import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, UserCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsentData {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  accuracyConfirmed: boolean;
  verificationAuthorized: boolean;
  signatureName: string;
  signatureDate: string;
}

interface TermsAndConsentProps {
  formData: ConsentData;
  onChange: (data: Partial<ConsentData>) => void;
  ownerName: string;
}

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};

export function TermsAndConsent({ formData, onChange, ownerName }: TermsAndConsentProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Auto-fill date
    if (!formData.signatureDate) {
      const today = new Date().toISOString().split('T')[0];
      onChange({ signatureDate: today });
    }
    // Auto-fill owner name
    if (!formData.signatureName && ownerName) {
      onChange({ signatureName: ownerName });
    }
  }, [ownerName]);

  const allConsentsGiven = formData.termsAccepted && 
    formData.privacyAccepted && 
    formData.accuracyConfirmed && 
    formData.verificationAuthorized;

  useEffect(() => {
    if (allConsentsGiven && formData.signatureName) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  }, [allConsentsGiven, formData.signatureName]);

  const ConsentCheckbox = ({ 
    id, 
    checked, 
    onChange: onCheck, 
    icon: Icon, 
    title, 
    description,
    linkText,
    index
  }: { 
    id: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    icon: typeof FileText;
    title: string;
    description: string;
    linkText?: string;
    index: number;
  }) => (
    <motion.div
      variants={fieldVariants}
      custom={index}
      className={cn(
        "p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer",
        checked 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/30"
      )}
      onClick={() => onCheck(!checked)}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <Checkbox
            id={id}
            checked={checked}
            onCheckedChange={onCheck}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={cn(
              "w-4 h-4",
              checked ? "text-primary" : "text-muted-foreground"
            )} />
            <Label htmlFor={id} className="font-medium cursor-pointer">
              {title}
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {linkText && (
            <Button variant="link" className="h-auto p-0 text-primary text-sm mt-1">
              {linkText} <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Terms Preview */}
      <motion.div variants={fieldVariants} custom={0}>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Terms & Conditions Preview
        </h3>
        <ScrollArea className="h-40 rounded-xl border bg-muted/30 p-4">
          <div className="text-sm text-muted-foreground space-y-3">
            <p><strong>1. Platform Usage</strong></p>
            <p>By registering on PharmEco, you agree to comply with all applicable pharmaceutical regulations and platform guidelines.</p>
            <p><strong>2. Data Accuracy</strong></p>
            <p>You confirm that all information provided during registration is accurate and up-to-date. Any false information may result in account suspension.</p>
            <p><strong>3. Document Verification</strong></p>
            <p>PharmEco reserves the right to verify all submitted documents and may request additional documentation if required.</p>
            <p><strong>4. Compliance</strong></p>
            <p>You agree to maintain valid drug licenses, GST registration, and all other regulatory requirements throughout your association with PharmEco.</p>
            <p><strong>5. Privacy & Data</strong></p>
            <p>Your data will be processed in accordance with our Privacy Policy and applicable data protection laws.</p>
          </div>
        </ScrollArea>
      </motion.div>

      {/* Consent Checkboxes */}
      <div className="space-y-3">
        <ConsentCheckbox
          id="terms"
          checked={formData.termsAccepted}
          onChange={(checked) => onChange({ termsAccepted: checked })}
          icon={FileText}
          title="I accept the Terms & Conditions"
          description="I have read and agree to PharmEco's Terms of Service and Merchant Agreement."
          linkText="Read full terms"
          index={1}
        />

        <ConsentCheckbox
          id="privacy"
          checked={formData.privacyAccepted}
          onChange={(checked) => onChange({ privacyAccepted: checked })}
          icon={Shield}
          title="I agree to the Data & Privacy Policy"
          description="I consent to the collection, processing, and storage of my data as described in the Privacy Policy."
          linkText="Read privacy policy"
          index={2}
        />

        <ConsentCheckbox
          id="accuracy"
          checked={formData.accuracyConfirmed}
          onChange={(checked) => onChange({ accuracyConfirmed: checked })}
          icon={UserCheck}
          title="I confirm the information provided is accurate"
          description="I declare that all details, documents, and credentials submitted are true, accurate, and legally valid."
          index={3}
        />

        <ConsentCheckbox
          id="verification"
          checked={formData.verificationAuthorized}
          onChange={(checked) => onChange({ verificationAuthorized: checked })}
          icon={Shield}
          title="I authorize PharmEco to verify documents"
          description="I authorize PharmEco to verify my submitted documents with relevant authorities and third-party services."
          index={4}
        />
      </div>

      {/* Digital Consent Section */}
      <motion.div 
        variants={fieldVariants} 
        custom={5}
        className={cn(
          "p-6 rounded-xl border-2 transition-all duration-300",
          showSuccess 
            ? "border-green-500 bg-green-500/5" 
            : "border-border bg-muted/30"
        )}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-primary" />
          Digital Consent Signature
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name (as per documents)</Label>
            <Input
              placeholder="Enter your full name"
              value={formData.signatureName}
              onChange={(e) => onChange({ signatureName: e.target.value })}
              className="font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.signatureDate}
              onChange={(e) => onChange({ signatureDate: e.target.value })}
              disabled
              className="bg-muted"
            />
          </div>
        </div>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-700 dark:text-green-400">
              All consents provided. Your registration is ready for submission.
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Timestamp */}
      <motion.div variants={fieldVariants} custom={6} className="text-center">
        <p className="text-xs text-muted-foreground">
          Consent recorded at: {new Date().toLocaleString()} | IP: [Protected]
        </p>
      </motion.div>
    </motion.div>
  );
}
