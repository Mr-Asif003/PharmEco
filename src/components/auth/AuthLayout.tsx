import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowBigLeftIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { AuthBackground } from "./AuthBackground";
import { Auth3DVisual } from "./Auth3DVisual";
import { UserTypeToggle } from "./UserTypeToggle";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  userType: "customer" | "retailer";
  onUserTypeChange: (type: "customer" | "retailer") => void;
  title: string;
  subtitle: string;
}

export function AuthLayout({ 
  children, 
  userType, 
  onUserTypeChange, 
  title, 
  subtitle 
}: AuthLayoutProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
 const handleNavigateBack = () => {
  navigate('/')
 }
  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
       
      <AuthBackground userType={userType} />
<Button
  onClick={handleNavigateBack}
  className="absolute top-4 left-4 z-50 bg-gray-200 cursor-pointer hover:bg-gray-300"
  size="icon"
>
  <ArrowBigLeftIcon className="text-black" />
</Button>

      {/* Theme Toggle */}
     
      <motion.div 
        className="absolute top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </motion.div>

      {/* Left Panel - 3D Visual (Hidden on mobile) */}
      <motion.div 
        className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Auth3DVisual userType={userType} />
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div 
        className="w-full lg:w-[45%] xl:w-[40%] flex items-center justify-center p-4 sm:p-8 relative z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <motion.div
            className="relative p-6 sm:p-8 rounded-3xl bg-background/70 backdrop-blur-xl border border-border/50 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              boxShadow: userType === "customer"
                ? "0 25px 50px -12px rgba(0, 255, 255, 0.15), 0 0 0 1px rgba(0, 255, 255, 0.05)"
                : "0 25px 50px -12px rgba(255, 140, 50, 0.15), 0 0 0 1px rgba(255, 140, 50, 0.05)"
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <span className="text-3xl font-bold">
                  <span className="text-foreground">Pharm</span>
                  <span className={userType === "customer" ? "text-cyan-500" : "text-orange-500"}>Eco</span>
                </span>
              </motion.div>

              <motion.h1
                className="text-xl sm:text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* User Type Toggle */}
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <UserTypeToggle userType={userType} onToggle={onUserTypeChange} />
            </motion.div>

            {/* Form Content */}
            {children}
          </motion.div>

          {/* Footer */}
          <motion.p
            className="text-center text-xs text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            By continuing, you agree to PharmEco's{" "}
            <a href="#" className={`underline hover:no-underline ${
              userType === "customer" ? "text-cyan-600 dark:text-cyan-400" : "text-orange-600 dark:text-orange-400"
            }`}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className={`underline hover:no-underline ${
              userType === "customer" ? "text-cyan-600 dark:text-cyan-400" : "text-orange-600 dark:text-orange-400"
            }`}>
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
