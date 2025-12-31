import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save, Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  canProceed: boolean;
}

export function RegistrationFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  isSubmitting,
  isSuccess,
  canProceed
}: RegistrationFooterProps) {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={onBack}
            disabled={isFirstStep || isSubmitting}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i + 1 === currentStep 
                  ? "w-8 bg-primary" 
                  : i + 1 < currentStep 
                    ? "bg-green-500" 
                    : "bg-muted"
              )}
              animate={i + 1 === currentStep ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Draft</span>
          </Button>

          {isLastStep ? (
            <Button
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting || isSuccess}
              className={cn(
                "gap-2 min-w-[160px] transition-all duration-300",
                isSuccess && "bg-green-500 hover:bg-green-500"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : isSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Submitted!
                </motion.div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit for Verification
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!canProceed || isSubmitting}
              className="gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
