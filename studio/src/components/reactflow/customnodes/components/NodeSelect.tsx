import type { SelectHTMLAttributes } from 'react';

interface NodeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
   accentColor?: string;
}

export default function NodeSelect({ accentColor = 'blue', className = '', ...props }: NodeSelectProps) {
   return (
      <select
         className={`w-full text-sm text-slate-700 p-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-${accentColor}-500 outline-none transition-colors ${className}`}
         {...props}
      />
   );
}
