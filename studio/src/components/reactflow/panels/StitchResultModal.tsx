import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface Props {
   stitchResult: string;
   onClose: () => void;
}

export function StitchResultModal({ stitchResult, onClose }: Props) {
   const [copied, setCopied] = useState(false);

   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(stitchResult);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy link: ', err);
      }
   };

   return (
      <div className="absolute inset-0 z-1000 flex items-center justify-center bg-black/50 pointer-events-auto">
         <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl p-6 w-[600px] flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold">Stitched Video Ready</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
               Your scenes have been successfully combined into a single video.
            </p>

            <video
               src={stitchResult}
               controls
               autoPlay
               className="w-full rounded-lg min-h-[300px] max-h-[400px] object-contain bg-black my-2"
            />

            <div className="flex gap-3 mt-4">
               <Button
                  variant="outline"
                  onClick={onClose}
                  className="hover:cursor-pointer flex-1 h-11 rounded-lg font-bold border-slate-200 dark:border-zinc-800 hover:brightness-90 dark:hover:bg-zinc-800 transition-colors"
               >
                  Close
               </Button>
               <Button
                  onClick={handleCopy}
                  className={`hover:cursor-pointer flex-1 h-11 rounded-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                     copied
                        ? 'bg-emerald-500 text-white hover:bg-emerald-500'
                        : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90'
                  }`}
               >
                  {copied ? (
                     <>
                        <Check size={16} />
                        <span>Copied!</span>
                     </>
                  ) : (
                     <>
                        <Copy size={16} />
                        <span>Share</span>
                     </>
                  )}
               </Button>
               <Button
                  asChild
                  className="hover:cursor-pointer flex-1 h-11 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all active:scale-[0.98]"
               >
                  <a
                     href={stitchResult}
                     target="_blank"
                     rel="noreferrer"
                  >
                     Open in New Tab
                  </a>
               </Button>
            </div>
         </div>
      </div>
   );
}
