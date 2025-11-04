import { useState } from "react";
import GeneratingScreen from "@/components/ui/generatingScreen";

export default function RouteComponent() {
  const steps = [
    "Analyzing prompt...",
    "Creating artstyle...",
    "Reading Script...",
    "Rendering Video...",
    "Exporting Video...",
  ];
  const [showGenerating, setShowGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(54);

  function startGenerating() {
    setShowGenerating(true);
    setCurrentStep(0);
    setPercent(0);
    setTimeLeft(54);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      setPercent(Math.min((step + 1) * 20, 100));
      setTimeLeft((t) => Math.max(t - 10, 0));
      if (step >= steps.length - 1) clearInterval(interval);
    }, 1000);
  }

  if (showGenerating) {
    return (
      <GeneratingScreen
        steps={steps}
        currentStep={currentStep}
        percent={percent}
        timeLeft={timeLeft}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={startGenerating}
      >
        Start Generating (Demo)
      </button>
    </div>
  );
}