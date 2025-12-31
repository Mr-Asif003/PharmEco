import { motion } from "framer-motion";
import { Heart, ExternalLink, HelpCircle, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StoreFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-8 py-6 border-t border-border/50"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>by PharmEco</span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground hover:text-foreground">
            <FileText className="h-4 w-4" />
            Documentation
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground hover:text-foreground">
            <Shield className="h-4 w-4" />
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground hover:text-foreground">
            <ExternalLink className="h-4 w-4" />
            Terms of Service
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2024 PharmEco. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};
