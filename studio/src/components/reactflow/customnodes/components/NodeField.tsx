import type { LucideIcon } from 'lucide-react';

interface NodeFieldProps {
   icon: LucideIcon;
   label: string;
   children: React.ReactNode;
   className?: string;
}

export default function NodeField({ icon: Icon, label, children, className = '' }: NodeFieldProps) {
   return (
      <div className={`flex flex-col gap-1 ${className}`}>
         <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Icon size={10} />
            {label}
         </label>
         {children}
      </div>
   );
}
