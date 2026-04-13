import type { LucideIcon } from 'lucide-react';

interface NodeHeaderProps {
   icon: LucideIcon;
   label: string;
   color: string;
   rightSlot?: React.ReactNode;
}

export default function NodeHeader({ icon: Icon, label, color, rightSlot }: NodeHeaderProps) {
   return (
      <div className="flex items-center justify-between">
         <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-${color}-500`}>
            <Icon size={14} />
            <span>{label}</span>
         </div>
         {rightSlot && <div>{rightSlot}</div>}
      </div>
   );
}
