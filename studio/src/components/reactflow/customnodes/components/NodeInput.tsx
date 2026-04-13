import type { InputHTMLAttributes } from 'react';

interface NodeInputProps extends InputHTMLAttributes<HTMLInputElement> {
   accentColor?: string;
}

export default function NodeInput({ accentColor = 'blue', className = '', ...props }: NodeInputProps) {
   return (
      <input
         className={`w-full text-sm text-slate-700 p-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-${accentColor}-500 outline-none transition-colors font-medium placeholder:text-slate-400 disabled:bg-slate-100/60 disabled:text-slate-400 disabled:cursor-not-allowed ${className}`}
         {...props}
      />
   );
}
