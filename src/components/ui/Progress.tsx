// src/components/ui/Progress.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PROGRESS COMPONENT                                     ║
// ║                    The completion tracker                                 ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  ProgressProps,
  CircularProgressProps,
} from '@/types/components/ui/progress.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  PROGRESS_SIZE_HEIGHTS,
  PROGRESS_LABEL_SIZE,
  PROGRESS_LABEL_WEIGHT,
  PROGRESS_LABEL_COLOR,
  PROGRESS_CIRCULAR_LABEL_SIZE,
  PROGRESS_CIRCULAR_LABEL_WEIGHT,
  PROGRESS_CIRCULAR_LABEL_COLOR,
  PROGRESS_CIRCULAR_DEFAULT_SIZE,
  PROGRESS_CIRCULAR_DEFAULT_STROKE,
  PROGRESS_SVG_ROTATION,
  PROGRESS_INDETERMINATE_WIDTH,
  PROGRESS_BASE_CLASSES,
} from '@/lib/constants/components/runes/progress.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  progressTrackVariants,
  progressFillVariants,
  progressStrokeVariants,
  progressTrackStrokeVariants,
} from '@/lib/constants/components/ui/progress.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  calculateProgressPercentage,
  getProgressLabelLayout,
  formatProgressLabel,
  calculateCircularProgressGeometry,
  calculateStrokeDashoffset,
} from '@/utils/components/ui/progress.utils';

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS — LINEAR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Progress — Linear progress bar with variant, size, label, and animation support.
 *
 * @example
 * <Progress value={65} />
 *
 * @example
 * <Progress value={75} variant="success" showLabel />
 *
 * @example
 * <Progress value={30} variant="quantum" size="lg" animated striped />
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
    const percentage = calculateProgressPercentage(value, max);

    const trackClass = progressTrackVariants({ variant });
    const fillClass = progressFillVariants({ variant, striped });

    const sizeClass = PROGRESS_SIZE_HEIGHTS[size];

    const label = (
      <span
        className={cn(
          PROGRESS_LABEL_SIZE,
          PROGRESS_LABEL_WEIGHT,
          PROGRESS_LABEL_COLOR
        )}
      >
        {formatProgressLabel(percentage)}
      </span>
    );

    const barMarkup = (
      <div className="flex-1">
        <div className={cn(PROGRESS_BASE_CLASSES.join(' '), trackClass, sizeClass)}>
          <div
            className={fillClass}
            style={{
              width: indeterminate
                ? PROGRESS_INDETERMINATE_WIDTH
                : `${percentage}%`,
            }}
          />
        </div>
      </div>
    );

    // Indeterminate
    if (indeterminate) {
      return (
        <div
          ref={ref}
          className={cn(PROGRESS_BASE_CLASSES.join(' '), trackClass, sizeClass, className)}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite]',
              progressFillVariants({ variant })
            )}
            style={{ width: PROGRESS_INDETERMINATE_WIDTH }}
          />
        </div>
      );
    }

    // No label
    if (!showLabel) {
      return (
        <div
          ref={ref}
          className={cn(PROGRESS_BASE_CLASSES.join(' '), trackClass, sizeClass, className)}
          {...props}
        >
          <div className={fillClass} style={{ width: `${percentage}%` }} />
        </div>
      );
    }

    // With label
    const layoutClass = getProgressLabelLayout(labelPosition);
    const isHorizontal = labelPosition === 'left' || labelPosition === 'right';
    const isTop = labelPosition === 'top';
    const isBottom = labelPosition === 'bottom';

    return (
      <div
        ref={ref}
        className={cn('flex', layoutClass, className)}
        {...props}
      >
        {isHorizontal && labelPosition === 'left' && (
          <>
            {label}
            {barMarkup}
          </>
        )}
        {isHorizontal && labelPosition === 'right' && (
          <>
            {barMarkup}
            {label}
          </>
        )}
        {isTop && (
          <>
            {label}
            {barMarkup}
          </>
        )}
        {isBottom && (
          <>
            {barMarkup}
            {label}
          </>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

// ═══════════════════════════════════════════════════════════════════════════
// CIRCULAR PROGRESS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * CircularProgress — Circular SVG progress indicator.
 *
 * @example
 * <CircularProgress value={75} size={80} />
 *
 * @example
 * <CircularProgress value={100} variant="success" showLabel />
 */
export const CircularProgress = React.forwardRef<
  SVGSVGElement,
  CircularProgressProps
>(
  (
    {
      value,
      max = 100,
      size = PROGRESS_CIRCULAR_DEFAULT_SIZE,
      strokeWidth = PROGRESS_CIRCULAR_DEFAULT_STROKE,
      variant = 'default',
      showLabel = false,
      formatLabel = (v) => `${Math.round(v)}%`,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = calculateProgressPercentage(value, max);
    const { radius, circumference, center } =
      calculateCircularProgressGeometry(size, strokeWidth);
    const strokeDashoffset = calculateStrokeDashoffset(
      circumference,
      percentage
    );

    const strokeClass = progressStrokeVariants({ variant });
    const trackClass = progressTrackStrokeVariants({ variant });

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn(PROGRESS_SVG_ROTATION, className)}
          {...props}
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={trackClass}
          />
          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={strokeClass}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                PROGRESS_CIRCULAR_LABEL_SIZE,
                PROGRESS_CIRCULAR_LABEL_WEIGHT,
                PROGRESS_CIRCULAR_LABEL_COLOR
              )}
            >
              {formatLabel(percentage)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  ProgressProps,
  CircularProgressProps,
  ProgressVariant,
  ProgressSize,
  ProgressLabelPosition,
} from '@/types/components/ui/progress.types';