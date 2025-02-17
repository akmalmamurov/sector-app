import { cn } from "@/lib/utils";
import { StepperIcon, StepperOtherIcon } from "@/assets/icons";

interface StepperProps {
  steps: string[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center w-full">
          <div className="relative flex items-center justify-center">
            {index === 0 ? (
              <StepperIcon
                className={cn(
                  activeStep >= index ? "text-cerulean" : "text-gray-400"
                )}
              />
            ) : (
              <StepperOtherIcon
                className={cn(
                  activeStep >= index ? "text-cerulean" : "text-gray-400"
                )}
              />
            )}
            <p
              className={cn(
                "absolute text-sm font-medium",
                activeStep >= index ? "text-cerulean" : "text-gray-400"
              )}
            >
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
