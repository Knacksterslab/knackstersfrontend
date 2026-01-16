interface StepperProps {
  currentStep: number;
  totalSteps?: number;
}

export default function Stepper({ currentStep, totalSteps = 3 }: StepperProps) {
  return (
    <div className="relative flex justify-between items-center mb-10 px-5">
      {/* Connecting line */}
      <div className="absolute top-5 left-[60px] right-[60px] h-0.5 bg-gray-300 z-0"></div>
      
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isInactive = step > currentStep;

        return (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base mb-2 transition-colors ${
                isActive || isCompleted
                  ? 'bg-gray-800 border-2 border-gray-800 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-800'
              }`}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
}

