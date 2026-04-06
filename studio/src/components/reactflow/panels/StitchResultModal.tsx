interface Props {
   stitchResult: string;
   onClose: () => void;
}

export function StitchResultModal({ stitchResult, onClose }: Props) {
   return (
      <div className="absolute inset-0 z-1000 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto">
         <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-[600px] flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold">Stitched Video Ready</h2>
            <p className="text-sm text-muted-foreground">
               Your scenes have been successfully combined into a single video.
            </p>

            <video
               src={stitchResult}
               controls
               autoPlay
               className="w-full rounded-lg min-h-[300px] max-h-[400px] object-contain bg-black my-2"
            />

            <div className="flex gap-3 mt-2">
               <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl border-2 border-border text-sm flex-1 font-bold tracking-wide hover:bg-slate-100 transition-colors"
               >
                  Close
               </button>
               <a
                  href={stitchResult}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] bg-violet-600 border-2 border-violet-800 hover:bg-violet-500 hover:translate-x-px hover:translate-y-px hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] text-white text-sm font-bold tracking-wide transition-all"
               >
                  Open in New Tab
               </a>
            </div>
         </div>
      </div>
   );
}
