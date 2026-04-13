import type { LucideIcon } from 'lucide-react';

interface NodeFieldProps {
   icon: LucideIcon;
   label: string;
   children: React.ReactNode;
   className?: string;
   error?: string | null;
}

export default function NodeField({
   icon: Icon,
   label,
   children,
   className = '',
   error,
}: NodeFieldProps) {
   return (
      <div className={`flex flex-col gap-1 ${className}`}>
         <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Icon size={10} />
            {label}
         </label>
         {children}
         {error && (
            <p className="text-[10px] font-bold text-red-500 mt-0.5 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
               {error}
            </p>
         )}
      </div>
   );
}
