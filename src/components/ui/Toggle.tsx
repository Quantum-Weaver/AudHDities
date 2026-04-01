// src/components/ui/Toggle.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
  'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-deep-space',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'absolute rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5 left-0.5 top-0.5',
        md: 'h-5 w-5 left-0.5 top-0.5',
        lg: 'h-6 w-6 left-0.5 top-0.5',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        checked: true,
        className: 'translate-x-4',
      },
      {
        size: 'sm',
        checked: false,
        className: 'translate-x-0',
      },
      {
        size: 'md',
        checked: true,
        className: 'translate-x-5',
      },
      {
        size: 'md',
        checked: false,
        className: 'translate-x-0',
      },
      {
        size: 'lg',
        checked: true,
        className: 'translate-x-7',
      },
      {
        size: 'lg',
        checked: false,
        className: 'translate-x-0',
      },
    ],
  }
);

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  /** Whether the toggle is checked */
  checked?: boolean;
  
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  
  /** Optional label text */
  label?: string;
  
  /** Optional description text */
  description?: string;
  
  /** Whether the toggle is disabled */
  disabled?: boolean;
  
  /** Visual variant for the background when checked */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'purple';
  
  /** Show loading state */
  loading?: boolean;
  
  /** Position of label relative to toggle */
  labelPosition?: 'left' | 'right';
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    className,
    size = 'md',
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    label,
    description,
    disabled = false,
    variant = 'default',
    loading = false,
    labelPosition = 'right',
    ...props 
  }, ref) => {
    
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    // Variant styles for checked state
    const variantStyles = {
      default: 'bg-cyan-500',
      primary: 'bg-purple-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      purple: 'bg-indigo-500',
    };

    const handleToggle = () => {
      if (disabled || loading) return;
      
      const newChecked = !isChecked;
      
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      
      onChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={cn(
          'animate-spin',
          size === 'sm' && 'h-3 w-3',
          size === 'md' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5'
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const toggleElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        aria-describedby={description ? `${props.id || 'toggle'}-description` : undefined}
        disabled={disabled || loading}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          toggleVariants({ size }),
          'group',
          disabled && 'opacity-50 cursor-not-allowed',
          loading && 'cursor-wait',
          !disabled && !loading && 'hover:opacity-90',
          isChecked 
            ? variantStyles[variant] 
            : 'bg-white/20 hover:bg-white/30',
          className
        )}
        {...props}
      >
        {/* Thumb */}
        <span className={cn(thumbVariants({ size, checked: isChecked }))}>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center text-deep-space">
              <LoadingSpinner />
            </span>
          )}
        </span>
      </button>
    );

    // If no label, just return the toggle
    if (!label) {
      return toggleElement;
    }

    // With label, arrange based on labelPosition
    return (
      <div className={cn(
        'flex items-start gap-3',
        labelPosition === 'left' && 'flex-row-reverse'
      )}>
        {toggleElement}
        
        <div className={cn(
          'flex-1',
          labelPosition === 'left' && 'text-right'
        )}>
          <label 
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium text-white',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
          
          {description && (
            <p 
              id={`${props.id || 'toggle'}-description`}
              className="text-xs text-white/40"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };