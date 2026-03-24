import React, { useState } from 'react';

interface ImageWithFallbackProps {
   src: string;
   alt?: string;
   className?: string;
}

export function ImageWithFallback({ src, alt = 'Project banner', className }: ImageWithFallbackProps) {
   const [didError, setDidError] = useState(false);

   if (didError || !src) {
      //@ Gradient fallback when image is missing or broken
      return (
         <div
            className={`w-full h-full ${className ?? ''}`}
            style={{
               background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
            }}
         />
      );
   }

   return (
      <img
         src={src}
         alt={alt}
         className={`w-full h-full object-cover ${className ?? ''}`}
         onError={() => setDidError(true)}
      />
   );
}
