// components/ui/Drawer.tsx
// Drawer Component - The side chamber of the interface
// Provides slide-out panels for additional content

"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ScrollArea } from './ScrollArea';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: string;
  /** Drawer description/subtitle */
  description?: string;
  /** Side from which the drawer slides in */
  side?: DrawerSide;
  /** Size of the drawer */
  size?: DrawerSize;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Close drawer when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close drawer when pressing Escape key */
  closeOnEscape?: boolean;
  /** Prevent scroll on body when drawer is open */
  preventScroll?: boolean;
  /** Remove padding from drawer content */
  noPadding?: boolean;
  /** Custom className for the drawer container */
  className?: string;
  /** Custom className for the drawer content */
  contentClassName?: string;
  /** Custom className for the backdrop */
  backdropClassName?: string;
  /** Children */
  children: React.ReactNode;
}

const sizeClasses: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  top: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    full: 'h-full',
  },
};

const animationClasses: Record<DrawerSide, { enter: string; exit: string }> = {
  left: {
    enter: 'translate-x-0',
    exit: '-translate-x-full',
  },
  right: {
    enter: 'translate-x-0',
    exit: 'translate-x-full',
  },
  top: {
    enter: 'translate-y-0',
    exit: '-translate-y-full',
  },
  bottom: {
    enter: 'translate-y-0',
    exit: 'translate-y-full',
  },
};

/**
 * Drawer Component
 * 
 * @example
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)} title="Filters" side="right">
 *   <div className="space-y-4">
 *     <Input placeholder="Search" />
 *     <Select options={options} />
 *   </div>
 * </Drawer>
 * 
 * @example
 * <Drawer open={isOpen} onClose={onClose} side="bottom" size="lg" title="Comments">
 *   <CommentList comments={comments} />
 * </Drawer>
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      side = 'right',
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      preventScroll = true,
      noPadding = false,
      className,
      contentClassName,
      backdropClassName,
      children,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Handle mounting for portal
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
    
    // Handle scroll locking
    useEffect(() => {
      if (preventScroll && open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open, preventScroll]);
    
    // Handle Escape key
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape' && open) {
          onClose();
        }
      };
      
      if (open) {
        document.addEventListener('keydown', handleEscape);
      }
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, closeOnEscape, onClose]);
    
    // Handle animation timing
    useEffect(() => {
      if (open) {
        setIsAnimating(true);
      } else {
        const timer = setTimeout(() => setIsAnimating(false), 200);
        return () => clearTimeout(timer);
      }
    }, [open]);
    
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };
    
    if (!mounted) return null;
    
    const sizeClass = sizeClasses[side][size];
    const animation = animationClasses[side];
    
    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          backdropClassName
        )}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        {/* Drawer Container */}
        <div
          ref={ref}
          className={cn(
            'fixed bg-surface border-white/10 shadow-2xl transition-transform duration-300 ease-out',
            side === 'left' && 'left-0 top-0 bottom-0 border-r',
            side === 'right' && 'right-0 top-0 bottom-0 border-l',
            side === 'top' && 'top-0 left-0 right-0 border-b',
            side === 'bottom' && 'bottom-0 left-0 right-0 border-t',
            sizeClass,
            open ? animation.enter : animation.exit,
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          aria-describedby={description ? 'drawer-description' : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={cn(
              'flex items-center justify-between',
              !noPadding && 'p-4 border-b border-white/10',
              noPadding && 'p-4 border-b border-white/10'
            )}>
              <div>
                {title && (
                  <h2 id="drawer-title" className="text-lg font-semibold text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="drawer-description" className="text-sm text-white/60 mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 hover:bg-white/10"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <ScrollArea className={cn('flex-1', !noPadding && 'p-4', contentClassName)}>
            {children}
          </ScrollArea>
        </div>
      </div>,
      document.body
    );
  }
);
Drawer.displayName = 'Drawer';

// ============================================================================
// DRAWER COMPOSITION COMPONENTS
// ============================================================================

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show close button */
  showCloseButton?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

/**
 * DrawerHeader - Header section of a drawer
 */
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, showCloseButton = true, onClose, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-4 border-b border-white/10', className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 hover:bg-white/10"
          aria-label="Close drawer"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
);
DrawerHeader.displayName = 'DrawerHeader';

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding */
  noPadding?: boolean;
}

/**
 * DrawerBody - Body section of a drawer
 */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, noPadding = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', !noPadding && 'p-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerBody.displayName = 'DrawerBody';

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Align footer buttons */
  align?: 'left' | 'center' | 'right';
}

const footerAlignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * DrawerFooter - Footer section of a drawer (for actions)
 */
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, align = 'right', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex gap-3 p-4 border-t border-white/10',
        footerAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerFooter.displayName = 'DrawerFooter';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

export interface FilterDrawerProps {
  /** Whether drawer is open */
  open: boolean;
  /** Callback when drawer closes */
  onClose: () => void;
  /** Current filter values */
  filters?: Record<string, any>;
  /** Callback when filters are applied */
  onApply?: (filters: Record<string, any>) => void;
  /** Callback when filters are reset */
  onReset?: () => void;
}

/**
 * FilterDrawer - Pre-built filter drawer for search/filter interfaces
 * 
 * @example
 * <FilterDrawer
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   filters={filters}
 *   onApply={setFilters}
 * />
 */
export const FilterDrawer = React.forwardRef<HTMLDivElement, FilterDrawerProps>(
  ({ open, onClose, filters = {}, onApply, onReset }, ref) => {
    const [localFilters, setLocalFilters] = useState(filters);
    
    const handleApply = () => {
      onApply?.(localFilters);
      onClose();
    };
    
    const handleReset = () => {
      setLocalFilters({});
      onReset?.();
    };
    
    return (
      <Drawer
        ref={ref}
        open={open}
        onClose={onClose}
        title="Filters"
        side="right"
        size="md"
      >
        <DrawerBody>
          {/* Filter content would go here - to be customized by parent */}
          <div className="space-y-4">
            <p className="text-white/60">Filter controls go here</p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white/80"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30"
          >
            Apply Filters
          </button>
        </DrawerFooter>
      </Drawer>
    );
  }
);
FilterDrawer.displayName = 'FilterDrawer';

/**
 * useDrawer - Hook for managing drawer state
 * 
 * @example
 * const { isOpen, open, close, toggle } = useDrawer();
 */
export const useDrawer = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  
  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);
  
  return { isOpen, open, close, toggle };
};