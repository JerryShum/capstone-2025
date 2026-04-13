import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface StitchResultModalProps {
   stitchResult: string;
   onClose: () => void;
}

export function StitchResultModal({ stitchResult, onClose }: StitchResultModalProps) {
   const [copied, setCopied] = useState(false);

   const handleCopyLink = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(stitchResult);
         setCopied(true);
         toast.success('Link copied to clipboard!');
         setTimeout(() => setCopied(false), 2000);
      } catch {
         toast.error('Failed to copy link. Please try manually.');
      }
   }, [stitchResult]);

   return (
      <div className="absolute inset-0 z-1000 flex items-center justify-center bg-black/50 pointer-events-auto">
         <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6 w-[600px] flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
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
                  className="hover:cursor-pointer flex-1 h-11 rounded-xl font-bold border-slate-200 dark:border-zinc-800 hover:brightness-90 dark:hover:bg-zinc-800 transition-colors"
               >
                  Close
               </Button>
               {stitchResult && (
                  <Button
                     onClick={handleCopyLink}
                     className={`hover:cursor-pointer flex-1 h-11 rounded-xl font-bold border-2 transition-all active:scale-[0.98] ${
                        copied
                           ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-800 text-white'
                           : 'bg-slate-900 hover:bg-slate-800 border-slate-950 text-white dark:bg-white dark:text-slate-900 dark:border-slate-200 dark:hover:bg-slate-100'
                     }`}
                  >
                     {copied ? (
                        <>
                           <Check className="size-4" />
                           Copied!
                        </>
                     ) : (
                        <>
                           <Link2 className="size-4" />
                           Share Link
                        </>
                     )}
                  </Button>
               )}
               <Button
                  asChild
                  className="hover:cursor-pointer flex-1 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all active:scale-[0.98]"
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
