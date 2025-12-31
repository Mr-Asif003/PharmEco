import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { toast } from "sonner";

interface LoginFormProps {
  userType: "customer" | "retailer";
  onSwitchToRegister: () => void;
}

export function LoginForm({ userType, onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast.success("Login successful!", {
      description: `Welcome back to PharmEco as ${userType === "customer" ? "a customer" : "a medical retailer"}.`
    });
  };

  const inputVariants = {
    focus: { scale: 1.02 },
    blur: { scale: 1 }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <motion.div 
          className="relative"
          variants={inputVariants}
          whileFocus="focus"
        >
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 h-12 bg-background/50 backdrop-blur-sm border-border/50 transition-all duration-300 focus:border-auth-primary focus:ring-2 focus:ring-auth-primary/20 ${
              errors.email ? "border-destructive animate-shake" : ""
            }`}
          />
        </motion.div>
        {errors.email && (
          <motion.p 
            className="text-xs text-destructive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <button
            type="button"
            className={`text-xs font-medium transition-colors ${
              userType === "customer" 
                ? "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300" 
                : "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            }`}
          >
            Forgot password?
          </button>
        </div>
        <motion.div 
          className="relative"
          variants={inputVariants}
          whileFocus="focus"
        >
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-10 pr-10 h-12 bg-background/50 backdrop-blur-sm border-border/50 transition-all duration-300 focus:border-auth-primary focus:ring-2 focus:ring-auth-primary/20 ${
              errors.password ? "border-destructive animate-shake" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </motion.div>
        {errors.password && (
          <motion.p 
            className="text-xs text-destructive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.password}
          </motion.p>
        )}
      </div>

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
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </motion.div>

      <SocialLoginButtons userType={userType} />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className={`font-semibold transition-colors ${
              userType === "customer"
                ? "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                : "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            }`}
          >
            Create account
          </button>
        </p>
      </div>
    </motion.form>
  );
}
