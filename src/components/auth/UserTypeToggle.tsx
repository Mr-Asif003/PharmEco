import { motion } from "framer-motion";
import { User, Store } from "lucide-react";

interface UserTypeToggleProps {
  userType: "customer" | "retailer";
  onToggle: (type: "customer" | "retailer") => void;
}

export function UserTypeToggle({ userType, onToggle }: UserTypeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
      <motion.button
        onClick={() => onToggle("customer")}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          userType === "customer" 
            ? "text-auth-foreground" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {userType === "customer" && (
          <motion.div
            layoutId="userTypeIndicator"
            className="absolute inset-0 rounded-full bg-auth-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <User className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Customer</span>
      </motion.button>

      <motion.button
        onClick={() => onToggle("retailer")}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          userType === "retailer" 
            ? "text-auth-foreground" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {userType === "retailer" && (
          <motion.div
            layoutId="userTypeIndicator"
            className="absolute inset-0 rounded-full bg-auth-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Store className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Medical Retailer</span>
      </motion.button>
    </div>
  );
}
