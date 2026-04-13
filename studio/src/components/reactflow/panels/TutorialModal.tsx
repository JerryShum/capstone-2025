import { Button } from '@/components/ui/button';
import { X, ScrollText, UserStar, Trees, Clapperboard, Film } from 'lucide-react';

interface Props {
   onClose: () => void;
}

const nodes = [
   {
      icon: ScrollText,
      label: 'Script',
      desc: 'Write the narrative or dialogue for the scene.',
      // script = black/slate
      iconColor: 'text-slate-800 dark:text-slate-200',
      bg: 'bg-slate-100 dark:bg-slate-800/60',
      border: 'border-slate-200 dark:border-slate-700',
   },
   {
      icon: UserStar,
      label: 'Character',
      desc: 'Define who appears — name, look, and style.',
      // character = blue
      iconColor: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
   },
   {
      icon: Trees,
      label: 'Environment',
      desc: 'Set the location, time of day, and weather.',
      // environment = green
      iconColor: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
   },
   {
      icon: Clapperboard,
      label: 'Scene',
      desc: 'Combines all inputs and generates the video clip.',
      // scene = purple
      iconColor: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
   },
];

const steps = [
   {
      num: '01',
      heading: 'Add Nodes',
      body: 'Use the bottom toolbar to place Script, Character, Environment, and Scene nodes on the canvas.',
   },
   {
      num: '02',
      heading: 'Connect Them',
      body: "Drag from the output handle of a Script, Character, or Environment node into a Scene node's input.",
   },
   {
      num: '03',
      heading: 'Generate',
      body: 'Hit Generate Video on a Scene node. The AI will build a cinematic clip from your inputs.',
   },
   {
      num: '04',
      heading: 'Stitch',
      body: (
         <>
            Once scenes are <span className="font-semibold text-purple-500">READY</span>, press{' '}
            <span className="font-semibold text-purple-600">Stitch Video</span> to merge them into one film.
         </>
      ),
   },
];

export function TutorialModal({ onClose }: Props) {
   return (
      <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/50 pointer-events-auto">
         <div className="bg-white dark:bg-zinc-900 border border-border/50 rounded-lg shadow-2xl w-[660px] max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
               <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">How to use Story Weaver</h2>
                  <p className="text-md text-muted-foreground mt-0.5">A quick start guide to creating your story.</p>
               </div>
               <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full size-9 text-muted-foreground hover:text-foreground">
                  <X className="size-5" />
               </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">

               {/* Node Types */}
               <section>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Node Types</p>
                  <div className="grid grid-cols-2 gap-2.5">
                     {nodes.map(({ icon: Icon, label, desc, iconColor, bg, border }) => (
                        <div key={label} className={`flex items-start gap-3 p-3.5 rounded-lg border ${bg} ${border}`}>
                           <div className={`mt-0.5 ${iconColor}`}>
                              <Icon className="size-5" />
                           </div>
                           <div>
                              <p className="text-sm font-semibold leading-none mb-1.5">{label}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Steps */}
               <section>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Workflow</p>
                  <div className="space-y-4">
                     {steps.map(({ num, heading, body }) => (
                        <div key={num} className="flex gap-4 items-start">
                           <div className="flex-none size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                              <span className="text-sm font-black text-zinc-500 dark:text-zinc-400 tabular-nums">{num}</span>
                           </div>
                           <div className="pt-1.5">
                              <p className="text-sm font-semibold leading-none mb-1.5">{heading}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Tip */}
               <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <Film className="size-5 text-purple-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                     <strong>Pro Tip:</strong> Multiple Scene nodes can share the same Character or Environment node — just draw multiple connections.
                  </p>
               </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/50 flex justify-end">
               <Button
                  onClick={onClose}
                  className="h-10 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all active:scale-[0.98]"
               >
                  Got it
               </Button>
            </div>
         </div>
      </div>
   );
}
