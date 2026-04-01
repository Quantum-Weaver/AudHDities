// src/components/ui/Badge.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white hover:bg-white/15',
        primary: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30',
        success: 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30',
        error: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
        purple: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30',
        pink: 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30',
        indigo: 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30',
        outline: 'border border-white/20 text-white hover:bg-white/5',
        ghost: 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      rounded: {
        default: 'rounded-full',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to display before text */
  icon?: React.ReactNode;
  
  /** Whether the badge is interactive (clickable) */
  interactive?: boolean;
  
  /** Whether the badge can be dismissed */
  dismissible?: boolean;
  
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    icon,
    interactive = false,
    dismissible = false,
    onDismiss,
    children,
    onClick,
    ...props 
  }, ref) => {
    
    const isInteractive = interactive || onClick !== undefined;

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, rounded }),
          isInteractive && 'cursor-pointer',
          dismissible && 'pr-1',
          className
        )}
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={isInteractive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        } : undefined}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className={cn('mr-1', size === 'sm' ? 'mr-0.5' : 'mr-1')}>
            {icon}
          </span>
        )}

        {/* Content */}
        <span>{children}</span>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className={cn(
              'ml-1 rounded-full hover:bg-white/10 p-0.5',
              size === 'sm' ? 'ml-0.5' : 'ml-1'
            )}
            aria-label="Dismiss"
          >
            <svg
              className={cn(
                size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };