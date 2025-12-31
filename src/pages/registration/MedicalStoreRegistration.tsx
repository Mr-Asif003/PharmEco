import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Stepper } from "@/components/registration/Stepper";
import { StoreDetailsForm } from "@/components/registration/StoreDetailsForm";
import { OwnerInfoForm } from "@/components/registration/OwnerInfoForm";
import { DocumentUploadSection } from "@/components/registration/DocumentUploadSection";
import { MapLocationPicker } from "@/components/registration/MapLocationPicker";
import { StoreSetupCustomizer } from "@/components/registration/StoreSetupCustomizer";
import { TermsAndConsent } from "@/components/registration/TermsAndConsent";
import { LiveReviewPanel } from "@/components/registration/LiveReviewPanel";
import { RegistrationFooter } from "@/components/registration/RegistrationFooter";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Store } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Store Details", subtitle: "Basic store information" },
  { id: 2, title: "Owner Information", subtitle: "Personal details" },
  { id: 3, title: "Licenses & Documents", subtitle: "Upload required docs" },
  { id: 4, title: "Location & Setup", subtitle: "Store location & photos" },
  { id: 5, title: "Store Customization", subtitle: "Theme, colors & branding" },
  { id: 6, title: "Terms & Consent", subtitle: "Review and submit" },
];

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  file: File | null;
  status: "pending" | "uploaded" | "verified" | "rejected";
  progress: number;
}

export default function MedicalStoreRegistration() {
  const { theme, setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form States
  const [storeDetails, setStoreDetails] = useState({
    storeName: "",
    storeType: "",
    registrationNumber: "",
    gstNumber: "",
    drugLicenseType: "",
    yearsInOperation: "",
    openingTime: "09:00",
    closingTime: "21:00",
    is24x7: false,
  });

  const [ownerInfo, setOwnerInfo] = useState({
    ownerName: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    panNumber: "",
    aadhaarNumber: "",
    ownerAddress: "",
    sameAsStore: false,
    profileImage: null as string | null,
  });

  const [documents, setDocuments] = useState<Document[]>([]);

  const [locationData, setLocationData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    storeSize: "",
    storageType: "",
    deliveryRadius: 10,
    homeDelivery: true,
    storeFinderVisible: true,
    storeFrontImage: null as string | null,
    interiorImage: null as string | null,
    coldStorageImage: null as string | null,
  });

  const [consentData, setConsentData] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    accuracyConfirmed: false,
    verificationAuthorized: false,
    signatureName: "",
    signatureDate: "",
  });

  const [storeSetup, setStoreSetup] = useState({
    storeName: "",
    tagline: "",
    logo: null as string | null,
    theme: "light" as "light" | "dark" | "auto",
    primaryColor: "#FF7A00",
    style: "modern" as "modern" | "classic" | "minimal" | "bold",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!storeDetails.storeName) newErrors.storeName = "Store name is required";
        if (!storeDetails.gstNumber) newErrors.gstNumber = "GST number is required";
        break;
      case 2:
        if (!ownerInfo.ownerName) newErrors.ownerName = "Owner name is required";
        if (!ownerInfo.mobile) newErrors.mobile = "Mobile number is required";
        if (!ownerInfo.email) newErrors.email = "Email is required";
        break;
      case 4:
        if (!locationData.addressLine1) newErrors.addressLine1 = "Address is required";
        if (!locationData.city) newErrors.city = "City is required";
        if (!locationData.pincode) newErrors.pincode = "Pincode is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    } else {
      toast({
        title: "Please fill required fields",
        description: "Some required information is missing.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your registration progress has been saved.",
    });
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) return;
    
    const allConsents = consentData.termsAccepted && 
      consentData.privacyAccepted && 
      consentData.accuracyConfirmed && 
      consentData.verificationAuthorized;

    if (!allConsents) {
      toast({
        title: "Consent Required",
        description: "Please accept all terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Registration Submitted!",
        description: "Your application is under review. We'll notify you within 24-48 hours.",
      });
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!storeDetails.storeName;
      case 2:
        return !!ownerInfo.ownerName && !!ownerInfo.mobile;
      case 3:
        return true; // Documents optional for now
      case 4:
        return !!locationData.addressLine1 && !!locationData.city;
      case 5:
        return !!storeSetup.storeName;
      case 6:
        return consentData.termsAccepted && 
          consentData.privacyAccepted && 
          consentData.accuracyConfirmed && 
          consentData.verificationAuthorized &&
          !!consentData.signatureName;
      default:
        return true;
    }
  };

  const reviewData = {
    storeName: storeDetails.storeName,
    storeType: storeDetails.storeType,
    ownerName: ownerInfo.ownerName,
    mobile: ownerInfo.mobile,
    email: ownerInfo.email,
    documentsUploaded: documents.filter(d => d.file).length,
    totalDocuments: 4,
    city: locationData.city,
    state: locationData.state,
    pincode: locationData.pincode,
    storeFrontImage: locationData.storeFrontImage,
    profileImage: ownerInfo.profileImage,
    currentStep,
    allConsentsGiven: consentData.termsAccepted && 
      consentData.privacyAccepted && 
      consentData.accuracyConfirmed && 
      consentData.verificationAuthorized,
    storeSetup: {
      displayName: storeSetup.storeName,
      logo: storeSetup.logo,
      primaryColor: storeSetup.primaryColor,
      theme: storeSetup.theme,
      style: storeSetup.style,
    },
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StoreDetailsForm
            formData={storeDetails}
            onChange={(data) => setStoreDetails({ ...storeDetails, ...data })}
            errors={errors}
          />
        );
      case 2:
        return (
          <OwnerInfoForm
            formData={ownerInfo}
            onChange={(data) => setOwnerInfo({ ...ownerInfo, ...data })}
            errors={errors}
          />
        );
      case 3:
        return (
          <DocumentUploadSection
            documents={documents}
            onDocumentChange={setDocuments}
          />
        );
      case 4:
        return (
          <MapLocationPicker
            formData={locationData}
            onChange={(data) => setLocationData({ ...locationData, ...data })}
            errors={errors}
          />
        );
      case 5:
        return (
          <StoreSetupCustomizer
            formData={{
              ...storeSetup,
              storeName: storeSetup.storeName || storeDetails.storeName,
            }}
            onChange={(data) => setStoreSetup({ ...storeSetup, ...data })}
          />
        );
      case 6:
        return (
          <TermsAndConsent
            formData={consentData}
            onChange={(data) => setConsentData({ ...consentData, ...data })}
            ownerName={ownerInfo.ownerName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">PharmEco</h1>
              <p className="text-xs text-muted-foreground">Medical Store Registration</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stepper - Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={(step) => {
                  if (step <= currentStep) setCurrentStep(step);
                }}
              />
            </div>
          </div>

          {/* Form Content - Center */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border shadow-lg p-6 md:p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-muted-foreground">
                  {steps[currentStep - 1].subtitle}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Live Review Panel - Right Sidebar */}
          <div className="lg:col-span-3">
            <LiveReviewPanel data={reviewData} />
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <RegistrationFooter
        currentStep={currentStep}
        totalSteps={6}
        onBack={handleBack}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        canProceed={canProceed()}
      />
    </div>
  );
}
