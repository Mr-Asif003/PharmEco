import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isClickable = currentStep >= step.id;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300",
              isActive && "bg-primary/10 border border-primary/30",
              isCompleted && "bg-muted/50",
              !isActive && !isCompleted && "opacity-50",
              isClickable && "hover:bg-muted/80"
            )}
            onClick={() => isClickable && onStepClick(step.id)}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                isCompleted && "bg-green-500 text-white",
                isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                !isActive && !isCompleted && "bg-muted text-muted-foreground border-2 border-border"
              )}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                step.id
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-semibold text-sm truncate",
                isActive && "text-primary",
                isCompleted && "text-green-600 dark:text-green-400"
              )}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{step.subtitle}</p>
            </div>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
