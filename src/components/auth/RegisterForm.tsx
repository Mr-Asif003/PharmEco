import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerRegisterFields } from "./CustomerRegisterFields";
import { RetailerRegisterFields } from "./RetailerRegisterFields";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  userType: "customer" | "retailer";
  onSwitchToLogin: () => void;
}

export function RegisterForm({ userType, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    profileImage: null as File | null,
  }); 
  

  const [retailerData, setRetailerData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    gstNumber: "",
    storeAddress: "",
    password: "",
    confirmPassword: "",
    storeLicense: null as File | null,
    storeLogo: null as File | null,
  });

  const handleCustomerChange = (field: string, value: string | File | null) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleRetailerChange = (field: string, value: string | File | null) => {
    setRetailerData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCustomerForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!customerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!customerData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!customerData.password) {
      newErrors.password = "Password is required";
    } else if (customerData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (customerData.password !== customerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!customerData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRetailerForm = () => {
    const newErrors: Record<string, string> = {};

    if (!retailerData.storeName.trim()) newErrors.storeName = "Store name is required";
    if (!retailerData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!retailerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(retailerData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!retailerData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!retailerData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
    if (!retailerData.gstNumber.trim()) newErrors.gstNumber = "GST number is required";
    if (!retailerData.storeAddress.trim()) newErrors.storeAddress = "Store address is required";
    if (!retailerData.password) {
      newErrors.password = "Password is required";
    } else if (retailerData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (retailerData.password !== retailerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register/store')
    const isValid = userType === "customer" ? validateCustomerForm() : validateRetailerForm();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast.success("Registration successful!", {
      description: `Welcome to PharmEco! Your ${userType === "customer" ? "customer" : "retailer"} account has been created.`
    });
  };
//handleSubmit
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {userType === "customer" ? (
          <CustomerRegisterFields
            formData={customerData}
            onChange={handleCustomerChange}
            errors={errors}
          />
        ) : (
          <RetailerRegisterFields
            formData={retailerData}
            onChange={handleRetailerChange}
            errors={errors}
          />
        )}
      </div>

      <div className="pt-2 space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
              userType === "customer"
                ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)]"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_hsl(28_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(28_100%_50%/0.5)]"
            }`}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </motion.div>

        <SocialLoginButtons userType={userType} />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className={`font-semibold transition-colors ${
                userType === "customer"
                  ? "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                  : "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              }`}
            >
              <ArrowLeft className="w-3 h-3 inline mr-1" />
              Sign in
            </button>
          </p>
        </div>
      </div>
    </motion.form>
  );
}
