import type { TextareaHTMLAttributes } from 'react';

interface NodeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   accentColor?: string;
   mono?: boolean;
}

export default function NodeTextarea({
   accentColor = 'blue',
   mono = false,
   className = '',
   ...props
}: NodeTextareaProps) {
   return (
      <textarea
         className={`w-full text-sm text-slate-700 p-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-${accentColor}-500 outline-none transition-colors resize-none placeholder:text-slate-300 ${mono ? 'font-mono' : 'font-medium'} ${className}`}
         {...props}
      />
   );
}
