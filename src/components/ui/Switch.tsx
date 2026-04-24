// src/components/ui/Switch.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SWITCH COMPONENT                                       ║
// ║                    The toggle gateway                                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { SwitchProps } from '@/types/components/ui/switch.types';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeSwitchTrackClasses,
  composeSwitchThumbClasses,
  composeSwitchLabelClasses,
  composeSwitchHelperClasses,
  generateSwitchId,
} from '@/utils/components/ui/switch.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SWITCH
// ═══════════════════════════════════════════════════════════════════════════

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      label,
      size = 'md',
      variant = 'default',
      error,
      helper,
      disabled = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const switchId = generateSwitchId(id);
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
            data-state={isChecked ? 'checked' : 'unchecked'}
            onClick={handleClick}
            disabled={disabled}
            className={composeSwitchTrackClasses({
              variant,
              size,
              className,
            })}
            {...props}
          >
            <span
              data-state={isChecked ? 'checked' : 'unchecked'}
              className={composeSwitchThumbClasses({ size, isChecked })}
            />
          </button>

          {label && (
            <label
              htmlFor={switchId}
              className={composeSwitchLabelClasses({
                size,
                disabled,
                hasError,
              })}
            >
              {label}
            </label>
          )}
        </div>

        {(helper || hasError) && (
          <p className={composeSwitchHelperClasses({ hasError })}>
            {hasError ? error : helper}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type {
  SwitchProps,
  SwitchSize,
  SwitchVariant,
} from '@/types/components/ui/switch.types';