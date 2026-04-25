// src/components/ui/Spinner.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPINNER COMPONENT                                      ║
// ║                    Loading indicator — circle, dots, pulse, wave          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { SpinnerProps } from '@/types/components/yggdrasil/spinner.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SPINNER_TYPES,
  SPINNER_SIZES,
  SPINNER_SPEEDS,
  SPINNER_OVERLAY_CLASSES,
  SPINNER_CONTAINER_BASE,
  SPINNER_SR_ONLY,
  SPINNER_ROLE,
  SPINNER_DEFAULT_LABEL,
} from '@/lib/constants/components/ui/spinner.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import { SPINNER_VARIANTS } from '@/lib/constants/components/ui/spinner.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeSpinnerClasses,
  getSpinnerDelayStyle,
  getSpinnerIndices,
} from '@/lib/utils/components/yggdrasil/spinner.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SPINNER
// ═══════════════════════════════════════════════════════════════════════════

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = SPINNER_SIZES.MD,
      variant = SPINNER_VARIANTS.DEFAULT,
      label = SPINNER_DEFAULT_LABEL,
      overlay = false,
      speed = SPINNER_SPEEDS.NORMAL,
      type = SPINNER_TYPES.CIRCLE,
      fullPage = false,
      ...props
    },
    ref
  ) => {
    // ─── Full page wrapper ─────────────────────────────────────────────
    if (fullPage) {
      return (
        <div className={SPINNER_OVERLAY_CLASSES.FULL_PAGE}>
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

    // ─── Overlay wrapper ───────────────────────────────────────────────
    if (overlay) {
      return (
        <div className={SPINNER_OVERLAY_CLASSES.OVERLAY}>
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

    // ─── Render spinner by type ────────────────────────────────────────
    const renderSpinner = () => {
      switch (type) {
        case SPINNER_TYPES.CIRCLE:
          return (
            <div
              className={composeSpinnerClasses({ type, size, variant, speed })}
            />
          );

        case SPINNER_TYPES.DOTS:
          return (
            <div className="flex space-x-1">
              {getSpinnerIndices(type).map((i) => (
                <div
                  key={i}
                  className={composeSpinnerClasses({
                    type,
                    size,
                    variant,
                    speed,
                  })}
                  style={getSpinnerDelayStyle(type, i)}
                />
              ))}
            </div>
          );

        case SPINNER_TYPES.PULSE:
          return (
            <div
              className={composeSpinnerClasses({ type, size, variant, speed })}
            />
          );

        case SPINNER_TYPES.WAVE:
          return (
            <div className="flex space-x-1">
              {getSpinnerIndices(type).map((i) => (
                <div
                  key={i}
                  className={composeSpinnerClasses({
                    type,
                    size,
                    variant,
                    speed,
                  })}
                  style={getSpinnerDelayStyle(type, i)}
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
        role={SPINNER_ROLE}
        className={cn(SPINNER_CONTAINER_BASE, className)}
        aria-label={label}
        {...props}
      >
        {renderSpinner()}
        <span className={SPINNER_SR_ONLY}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };