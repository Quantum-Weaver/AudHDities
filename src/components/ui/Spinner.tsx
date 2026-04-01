// src/components/ui/Spinner.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'purple' | 'white';
  
  /** Optional label for screen readers */
  label?: string;
  
  /** Show as overlay (centered in parent) */
  overlay?: boolean;
  
  /** Animation speed for ND preferences */
  speed?: 'slow' | 'normal' | 'fast';
  
  /** Type of spinner */
  type?: 'circle' | 'dots' | 'pulse' | 'wave';
  
  /** Show as full page loader */
  fullPage?: boolean;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ 
    className,
    size = 'md',
    variant = 'default',
    label = 'Loading...',
    overlay = false,
    speed = 'normal',
    type = 'circle',
    fullPage = false,
    ...props 
  }, ref) => {
    
    // Size mappings
    const sizeStyles = {
      xs: {
        circle: 'h-3 w-3 border-2',
        dots: 'h-1.5 w-1.5',
        pulse: 'h-4 w-4',
        wave: 'h-3 w-0.5',
        container: '',
      },
      sm: {
        circle: 'h-4 w-4 border-2',
        dots: 'h-2 w-2',
        pulse: 'h-6 w-6',
        wave: 'h-4 w-1',
        container: '',
      },
      md: {
        circle: 'h-6 w-6 border-2',
        dots: 'h-2.5 w-2.5',
        pulse: 'h-8 w-8',
        wave: 'h-5 w-1',
        container: '',
      },
      lg: {
        circle: 'h-8 w-8 border-[3px]',
        dots: 'h-3 w-3',
        pulse: 'h-12 w-12',
        wave: 'h-6 w-1.5',
        container: '',
      },
      xl: {
        circle: 'h-12 w-12 border-4',
        dots: 'h-4 w-4',
        pulse: 'h-16 w-16',
        wave: 'h-8 w-2',
        container: '',
      },
    };

    // Color variants
    const variantColors = {
      default: {
        circle: 'border-cyan-400 border-t-transparent',
        dots: 'bg-cyan-400',
        pulse: 'bg-cyan-400',
        wave: 'bg-cyan-400',
      },
      primary: {
        circle: 'border-purple-400 border-t-transparent',
        dots: 'bg-purple-400',
        pulse: 'bg-purple-400',
        wave: 'bg-purple-400',
      },
      success: {
        circle: 'border-green-400 border-t-transparent',
        dots: 'bg-green-400',
        pulse: 'bg-green-400',
        wave: 'bg-green-400',
      },
      warning: {
        circle: 'border-yellow-400 border-t-transparent',
        dots: 'bg-yellow-400',
        pulse: 'bg-yellow-400',
        wave: 'bg-yellow-400',
      },
      purple: {
        circle: 'border-indigo-400 border-t-transparent',
        dots: 'bg-indigo-400',
        pulse: 'bg-indigo-400',
        wave: 'bg-indigo-400',
      },
      white: {
        circle: 'border-white border-t-transparent',
        dots: 'bg-white',
        pulse: 'bg-white',
        wave: 'bg-white',
      },
    };

    // Animation speed
    const speedStyles = {
      slow: {
        circle: 'animate-spin-slow',
        dots: 'animate-bounce-slow',
        pulse: 'animate-pulse-slow',
        wave: 'animate-wave-slow',
      },
      normal: {
        circle: 'animate-spin',
        dots: 'animate-bounce',
        pulse: 'animate-pulse',
        wave: 'animate-wave',
      },
      fast: {
        circle: 'animate-spin-fast',
        dots: 'animate-bounce-fast',
        pulse: 'animate-pulse-fast',
        wave: 'animate-wave-fast',
      },
    };

    // If full page, wrap in full-screen overlay
    if (fullPage) {
      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner 
            size={size}
            variant={variant}
            label={label}
            speed={speed}
            type={type}
          />
        </div>
      );
    }

    // If overlay, wrap in relative container with centered spinner
    if (overlay) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10">
          <Spinner 
            size={size}
            variant={variant}
            label={label}
            speed={speed}
            type={type}
          />
        </div>
      );
    }

    // Render based on type
    const renderSpinner = () => {
      switch (type) {
        case 'circle':
          return (
            <div
              className={cn(
                'rounded-full',
                sizeStyles[size].circle,
                variantColors[variant].circle,
                speedStyles[speed].circle
              )}
            />
          );

        case 'dots':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full',
                    sizeStyles[size].dots,
                    variantColors[variant].dots,
                    speedStyles[speed].dots
                  )}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          );

        case 'pulse':
          return (
            <div
              className={cn(
                'rounded-full',
                sizeStyles[size].pulse,
                variantColors[variant].pulse,
                speedStyles[speed].pulse
              )}
            />
          );

        case 'wave':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full',
                    sizeStyles[size].wave,
                    variantColors[variant].wave,
                    speedStyles[speed].wave
                  )}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'inline-flex items-center justify-center',
          className
        )}
        aria-label={label}
        {...props}
      >
        {renderSpinner()}
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };