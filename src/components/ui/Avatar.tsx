// src/components/ui/Avatar.tsx
'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: React.ReactNode;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 'md',
  className = '',
  fallback
}: AvatarProps) {
  const [error, setError] = useState(false);

  const sizeClass = sizeClasses[size];
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src && !error) {
    return (
      <div className={`relative rounded-full overflow-hidden bg-white/5 ${sizeClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center ${sizeClass} ${className}`}>
      {fallback || <User className="text-white/60" size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 18 : size === 'lg' ? 22 : 28} />}
    </div>
  );
}