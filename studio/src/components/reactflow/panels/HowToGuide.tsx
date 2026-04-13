import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from '@/components/ui/sheet';
import {
   HelpCircle,
   MousePointerClick,
   Cable,
   Clapperboard,
   Film,
   ScrollText,
   UserStar,
   Trees,
   Play,
   ArrowRight,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface HowToGuideProps {
   openState: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

/** Step data for the guide – keeps JSX declarative and easy to extend. */
const GUIDE_STEPS = [
   {
      number: 1,
      title: 'Add Your Assets',
      description:
         'Use the bottom toolbar to add nodes to the canvas. Each icon creates a different type of asset.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      items: [
         { icon: ScrollText, label: 'Script', detail: 'Story arc & narrative beats' },
         { icon: UserStar, label: 'Character', detail: 'Appearance, style & name' },
         { icon: Trees, label: 'Environment', detail: 'Location, weather & lighting' },
         { icon: Clapperboard, label: 'Scene', detail: 'The final shot to generate' },
      ],
   },
   {
      number: 2,
      title: 'Connect the Dots',
      description:
         'Drag a connection from any asset node\u2019s handle to a Scene node. The scene inherits all connected context automatically.',
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      items: [
         { icon: Cable, label: 'Drag handles', detail: 'From asset → to scene' },
         { icon: Clapperboard, label: 'Scene merges context', detail: 'Characters + script + environment' },
      ],
   },
   {
      number: 3,
      title: 'Generate Clips',
      description:
         'Write a prompt in your Scene node describing the action, then click the Generate Video button. Wait a moment for the AI to bring your scene to life.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      items: [
         { icon: MousePointerClick, label: 'Write a prompt', detail: 'Describe what happens' },
         { icon: Play, label: 'Click Generate', detail: 'AI creates the video' },
      ],
   },
   {
      number: 4,
      title: 'Stitch & Share',
      description:
         'Once you have 2+ scenes with READY status, click the Stitch Video button in the bottom toolbar to combine them into a final video.',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      items: [
         { icon: Film, label: 'Stitch Video', detail: 'Merge all clips in timeline order' },
         { icon: ArrowRight, label: 'Share the result', detail: 'Copy link or open in new tab' },
      ],
   },
] as const;

export default function HowToGuide({ openState, setOpen }: HowToGuideProps) {
   return (
      <Sheet open={openState} onOpenChange={setOpen}>
         <SheetContent
            side="left"
            className="w-full sm:max-w-[440px] backdrop-blur-xl border-l border-white/10 shadow-2xl p-0 flex flex-col gap-0 overflow-hidden rounded-r-lg"
         >
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
               <SheetHeader className="mb-8 px-0">
                  <div className="flex items-center gap-2.5 py-1 bg-white/10 border-2 border-foreground/15 rounded-full w-fit px-3 mb-2">
                     <HelpCircle size={16} className="text-foreground/70" />
                     <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground/70">
                        Quick Start
                     </span>
                  </div>
                  <SheetTitle className="text-3xl font-bold tracking-tight text-foreground">
                     How to Use StoryWeaver
                  </SheetTitle>
                  <SheetDescription className="text-foreground/70 text-sm leading-relaxed max-w-[90%]">
                     Follow these four steps to go from an empty canvas to a finished AI video.
                  </SheetDescription>
               </SheetHeader>

               <div className="flex flex-col gap-6">
                  {GUIDE_STEPS.map((step) => (
                     <div
                        key={step.number}
                        className={`rounded-xl border-2 ${step.borderColor} ${step.bgColor} p-4 flex flex-col gap-3`}
                     >
                        {/* Step header */}
                        <div className="flex items-center gap-2">
                           <span
                              className={`flex items-center justify-center size-7 rounded-full text-xs font-black text-white ${step.color.replace('text-', 'bg-')}`}
                           >
                              {step.number}
                           </span>
                           <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                              {step.title}
                           </h3>
                        </div>

                        {/* Step description */}
                        <p className="text-[13px] text-foreground/70 leading-relaxed">
                           {step.description}
                        </p>

                        {/* Step items */}
                        <div className="grid grid-cols-2 gap-2">
                           {step.items.map((item) => (
                              <div
                                 key={item.label}
                                 className="flex items-start gap-2 rounded-lg bg-background/60 border border-border/40 p-2.5"
                              >
                                 <item.icon
                                    size={16}
                                    className={`${step.color} shrink-0 mt-0.5`}
                                 />
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-foreground">
                                       {item.label}
                                    </span>
                                    <span className="text-[10px] text-foreground/50">
                                       {item.detail}
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </SheetContent>
      </Sheet>
   );
}
