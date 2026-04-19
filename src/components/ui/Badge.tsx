// components/ui/Badge.tsx
// Badge Component - The status indicator
// Shows status, categories, or small amounts of information

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | 'quantum'
  | 'cosmic'
  | 'purple'
  | 'cyan'
  | 'pink'
  | 'green';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Make badge rounded-full */
  pill?: boolean;
  /** Show dot indicator */
  dot?: boolean;
  /** Removable badge with close button */
  removable?: boolean;
  /** Callback when removed */
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/80',
  primary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  quantum: 'bg-quantum-purple/20 text-quantum-purple border border-quantum-purple/30',
  cosmic: 'bg-cosmic-blue/20 text-cosmic-blue border border-cosmic-blue/30',
  purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
  green: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-sm',
  lg: 'px-2.5 py-1 text-base',
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

/**
 * Badge Component
 * 
 * @example
 * <Badge variant="primary">Active</Badge>
 * 
 * @example
 * <Badge variant="success" pill>Completed</Badge>
 * 
 * @example
 * <Badge variant="error" dot>Offline</Badge>
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      pill = false,
      dot = false,
      removable = false,
      onRemove,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium',
          variantClasses[variant],
          sizeClasses[size],
          pill ? 'rounded-full' : 'rounded-md',
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full bg-current',
              dotSizeClasses[size]
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-0.5 rounded-full hover:bg-white/20 transition-colors',
              size === 'sm' ? 'p-0.5' : 'p-1'
            )}
            aria-label="Remove"
          >
            <svg
              className={cn(
                'text-current',
                size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'
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

// ============================================================================
// BADGE GROUP
// ============================================================================

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between badges */
  spacing?: 'sm' | 'md' | 'lg';
}

const groupSpacingClasses: Record<string, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

/**
 * BadgeGroup - Container for multiple badges
 * 
 * @example
 * <BadgeGroup>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 * </BadgeGroup>
 */
export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ children, spacing = 'md', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap', groupSpacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  )
);
BadgeGroup.displayName = 'BadgeGroup';