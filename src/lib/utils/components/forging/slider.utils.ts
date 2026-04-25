// src/lib/utils/components/forging/slider.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER UTILITIES                                       ║
// ║                    Pure math — percentage, marks, clamping                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { SliderSize } from '@/types/components/forging/slider.types';
import { SLIDER_THUMB_PIXEL_SIZE } from '@/lib/constants/components/forging/slider.constants';

// ─── Percentage ────────────────────────────────────────────────────────────

/**
 * Calculate the fill percentage of a slider value within its range.
 *
 * @example
 * valueToPercentage(50, 0, 100)  // => 50
 * valueToPercentage(3, 1, 5)     // => 50
 * valueToPercentage(0, -100, 100) // => 50
 */
export function valueToPercentage(
  value: number,
  min: number,
  max: number
): number {
  if (min === max) return 0;
  return ((value - min) / (max - min)) * 100;
}

/**
 * Convert a percentage back to a value within the range.
 */
export function percentageToValue(
  percentage: number,
  min: number,
  max: number,
  step: number = 1
): number {
  const raw = min + (percentage / 100) * (max - min);
  return snapToStep(raw, min, max, step);
}

// ─── Clamping & Snapping ───────────────────────────────────────────────────

/**
 * Clamp a value within a min/max range.
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Snap a value to the nearest step increment.
 *
 * @example
 * snapToStep(47, 0, 100, 10)  // => 50
 * snapToStep(43, 0, 100, 10)  // => 40
 * snapToStep(47, 0, 100, 1)   // => 47
 */
export function snapToStep(
  value: number,
  min: number,
  max: number,
  step: number
): number {
  if (step <= 0) return clampValue(value, min, max);

  const stepped = Math.round((value - min) / step) * step + min;
  return clampValue(stepped, min, max);
}

// ─── Thumb Positioning ─────────────────────────────────────────────────────

/**
 * Calculate the CSS left offset for the custom thumb element.
 * Compensates for thumb width so the center aligns with the value position.
 *
 * @returns CSS left value (e.g., `calc(50% - 8px)`)
 */
export function thumbPositionOffset(
  percentage: number,
  size: SliderSize
): string {
  const halfThumb = SLIDER_THUMB_PIXEL_SIZE[size] / 2;
  return `calc(${percentage}% - ${halfThumb}px)`;
}

// ─── Marks ─────────────────────────────────────────────────────────────────

/**
 * Generate an array of mark values at regular intervals across the range.
 *
 * @example
 * generateMarks(0, 100, 10)
 * // => [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 *
 * generateMarks(1, 10, 3)
 * // => [1, 4, 7, 10]
 */
export function generateMarks(
  min: number,
  max: number,
  interval: number
): number[] {
  if (interval <= 0) return [];

  const count = Math.floor((max - min) / interval) + 1;
  return Array.from({ length: count }, (_, i) =>
    snapToStep(min + i * interval, min, max, interval)
  );
}

/**
 * Check if a mark value represents a labeled position.
 * Useful for showing text labels at major intervals.
 */
export function isMajorMark(
  value: number,
  min: number,
  max: number,
  majorInterval: number
): boolean {
  if (majorInterval <= 0) return false;
  return (value - min) % majorInterval === 0;
}

// ─── Value Formatting ──────────────────────────────────────────────────────

/**
 * Default value formatter — shows integer or decimal based on step size.
 *
 * @example
 * defaultFormatValue(47.5, 0.5)   // => "47.5"
 * defaultFormatValue(47, 1)       // => "47"
 */
export function defaultFormatValue(value: number, step: number): string {
  // If step is fractional, show matching decimal places
  const stepDecimals = countDecimals(step);
  return value.toFixed(stepDecimals);
}

/**
 * Format as percentage string.
 */
export function formatAsPercentage(
  value: number,
  min: number,
  max: number
): string {
  const pct = valueToPercentage(value, min, max);
  return `${Math.round(pct)}%`;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Count decimal places in a number.
 */
function countDecimals(num: number): number {
  if (Number.isInteger(num)) return 0;
  return num.toString().split('.')[1]?.length ?? 0;
}

/**
 * Check if a value has changed enough to warrant an onChange call.
 * Useful for debouncing or avoiding unnecessary updates.
 */
export function hasValueChanged(
  oldValue: number,
  newValue: number,
  threshold: number = 0
): boolean {
  return Math.abs(newValue - oldValue) > threshold;
}

/**
 * Calculate the step count between min and max.
 */
export function stepCount(min: number, max: number, step: number): number {
  if (step <= 0) return 0;
  return Math.floor((max - min) / step);
}

/**
 * Validate slider configuration. Returns error messages or null if valid.
 */
export function validateSliderConfig(
  min: number,
  max: number,
  step: number
): string | null {
  if (min >= max) return 'Minimum must be less than maximum.';
  if (step <= 0) return 'Step must be greater than zero.';
  if ((max - min) % step !== 0 && (max - min) / step !== Math.floor((max - min) / step)) {
    // Allow non-divisible ranges — just warn, don't error
    return null;
  }
  return null;
}