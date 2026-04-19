// components/ui/Switch.tsx
// Switch Component - The toggle gateway
// Allows users to toggle between two states

import React from 'react';
import { cn } from '@/lib/utils';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Checked state */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Callback when checked changes */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Size of the switch */
  size?: SwitchSize;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
}

const trackSizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-10 h-5',
  lg: 'w-12 h-6',
};

const thumbSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const thumbTranslateClasses = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
};

/**
 * Switch Component
 * 
 * @example
 * <Switch label="Enable notifications" />
 * 
 * @example
 * <Switch checked={isEnabled} onChange={setIsEnabled} />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      label,
      size = 'md',
      error,
      helper,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) setInternalChecked(newChecked);
      onChange?.(newChecked);
    };
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            ref={ref}
            id={switchId}
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-label={label || 'toggle switch'}
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              'relative rounded-full transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isChecked ? 'bg-cyan-500' : 'bg-white/20',
              trackSizeClasses[size],
              className
            )}
            {...props}
          >
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 left-0.5 rounded-full bg-white transition-transform duration-200',
                thumbSizeClasses[size],
                isChecked && thumbTranslateClasses[size]
              )}
            />
          </button>
          
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p className="text-xs text-white/40 pl-11">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p className="text-xs text-red-400 pl-11">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';