import bookLogo from "@/assets/book_logo.svg";

export default function generatingScreen({ steps, currentStep, percent, timeLeft }: { steps: string[]; currentStep: number; percent: number; timeLeft: number }) {
  return (
    <div className="max-w-[700px] mx-auto my-10 border-2 border-sky-400 rounded-2xl p-10 flex flex-col items-center">
      <img src={bookLogo} alt="Logo" className="w-48 h-48 mb-4" />
      <h2 className="text-4xl font-bold text-center mb-4">Generating Your Vision...</h2>
      <div className="bg-gray-700 text-gray-100 rounded px-4 py-2 mb-6 text-sm w-full text-center"> {/*status bar */}
        {steps.slice(0, currentStep + 1).join(" ")} 
      </div>
      {/*progress */}
      <div className="text-5xl font-bold mb-2">{percent}%</div>
      <div className="text-gray-600 text-lg">
        Estimated Time Remaining: 0:{timeLeft.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
