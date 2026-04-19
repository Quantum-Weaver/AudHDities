// components/ui/Progress.tsx
// Progress Component - The completion tracker
// Shows progress through tasks, loading states, or achievement

import React from 'react';
import { cn } from '@/lib/utils';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'quantum' | 'cosmic';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Animate the progress bar */
  animated?: boolean;
  /** Show striped pattern */
  striped?: boolean;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
}

const variantClasses: Record<ProgressVariant, string> = {
  default: 'bg-white/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  error: 'bg-red-500/20',
  quantum: 'bg-quantum-purple/20',
  cosmic: 'bg-cosmic-blue/20',
};

const fillVariantClasses: Record<ProgressVariant, string> = {
  default: 'bg-white/60',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  quantum: 'bg-quantum-purple',
  cosmic: 'bg-cosmic-blue',
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * Progress Component
 * 
 * @example
 * <Progress value={65} />
 * 
 * @example
 * <Progress value={75} variant="success" showLabel />
 * 
 * @example
 * <Progress value={30} variant="quantum" size="lg" animated />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      labelPosition = 'right',
      animated = false,
      striped = false,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const fillClasses = cn(
      'h-full rounded-full transition-all duration-300 ease-out',
      fillVariantClasses[variant],
      animated && 'transition-all',
      striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem] animate-[stripe_1s_linear_infinite]'
    );
    
    const label = (
      <span className="text-xs font-medium text-white/60">
        {Math.round(percentage)}%
      </span>
    );
    
    const labelPositionClasses = {
      left: 'flex-row items-center gap-2',
      right: 'flex-row items-center gap-2',
      top: 'flex-col gap-1',
      bottom: 'flex-col gap-1',
    };
    
    const contentOrder = {
      left: () => (
        <>
          {label}
          <div className="flex-1">
            <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
              <div
                className={fillClasses}
                style={{ width: indeterminate ? '100%' : `${percentage}%` }}
              />
            </div>
          </div>
        </>
      ),
      right: () => (
        <>
          <div className="flex-1">
            <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
              <div
                className={fillClasses}
                style={{ width: indeterminate ? '100%' : `${percentage}%` }}
              />
            </div>
          </div>
          {label}
        </>
      ),
      top: () => (
        <>
          {label}
          <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
            <div
              className={fillClasses}
              style={{ width: indeterminate ? '100%' : `${percentage}%` }}
            />
          </div>
        </>
      ),
      bottom: () => (
        <>
          <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
            <div
              className={fillClasses}
              style={{ width: indeterminate ? '100%' : `${percentage}%` }}
            />
          </div>
          {label}
        </>
      ),
    };
    
    if (indeterminate) {
      return (
        <div
          ref={ref}
          className={cn(
            'w-full rounded-full overflow-hidden',
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite]',
              fillVariantClasses[variant]
            )}
            style={{ width: '30%' }}
          />
        </div>
      );
    }
    
    if (!showLabel) {
      return (
        <div
          ref={ref}
          className={cn(
            'w-full rounded-full overflow-hidden',
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={fillClasses}
            style={{ width: `${percentage}%` }}
          />
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          labelPositionClasses[labelPosition],
          className
        )}
        {...props}
      >
        {contentOrder[labelPosition]()}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// ============================================================================
// CIRCULAR PROGRESS
// ============================================================================

export interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Size of the circle in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Show percentage label inside */
  showLabel?: boolean;
  /** Label format function */
  formatLabel?: (value: number) => string;
}

/**
 * CircularProgress Component - Circular progress indicator
 * 
 * @example
 * <CircularProgress value={75} size={80} />
 * 
 * @example
 * <CircularProgress value={100} variant="success" showLabel />
 */
export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value,
      max = 100,
      size = 60,
      strokeWidth = 4,
      variant = 'default',
      showLabel = false,
      formatLabel = (v) => `${Math.round(v)}%`,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const strokeColorClasses = {
      default: 'stroke-white/60',
      success: 'stroke-green-500',
      warning: 'stroke-yellow-500',
      error: 'stroke-red-500',
      quantum: 'stroke-quantum-purple',
      cosmic: 'stroke-cosmic-blue',
    };
    
    const trackColorClasses = {
      default: 'stroke-white/10',
      success: 'stroke-green-500/20',
      warning: 'stroke-yellow-500/20',
      error: 'stroke-red-500/20',
      quantum: 'stroke-quantum-purple/20',
      cosmic: 'stroke-cosmic-blue/20',
    };
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn('transform -rotate-90', className)}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={trackColorClasses[variant]}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-300 ease-out',
              strokeColorClasses[variant]
            )}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {formatLabel(percentage)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';