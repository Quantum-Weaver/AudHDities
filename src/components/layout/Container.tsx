// components/ui/layout/Container.tsx - NEW
'use client';
import { ReactNode } from 'react';
import { SCROLLING_SYSTEM, PAGE_LAYOUTS } from '@/lib/constants/systems/layout/grids';

interface ContainerProps {
  children: ReactNode;
  layout?: 'infinite' | 'constrained' | 'immersive';
  variant?: keyof typeof PAGE_LAYOUTS.infiniteScroll | 
            keyof typeof PAGE_LAYOUTS.constrained | 
            keyof typeof PAGE_LAYOUTS.immersive;
  className?: string;
  scrollbarStyle?: 'hidden' | 'thin' | 'quantum' | 'cosmic';
}

export function ScrollContainer({ 
  children, 
  layout = 'constrained',
  variant = 'standard',
  className = '',
  scrollbarStyle = 'quantum'
}: ContainerProps) {
  
  const getLayoutClass = () => {
    switch (layout) {
      case 'infinite':
        return PAGE_LAYOUTS.infiniteScroll[variant as keyof typeof PAGE_LAYOUTS.infiniteScroll];
      case 'constrained':
        return PAGE_LAYOUTS.constrained[variant as keyof typeof PAGE_LAYOUTS.constrained];
      case 'immersive':
        return PAGE_LAYOUTS.immersive[variant as keyof typeof PAGE_LAYOUTS.immersive];
      default:
        return PAGE_LAYOUTS.constrained.standard;
    }
  };

  const scrollbarClass = SCROLLING_SYSTEM.scrollbars[scrollbarStyle];

  return (
    <div className="w-full max-w-none mx-auto space-y-12 pb-32 pt-20 min-h-screen">
      <div className={`${getLayoutClass()} ${scrollbarClass} ${className}`}>
        {children}
      </div>
    </div>
  );
}