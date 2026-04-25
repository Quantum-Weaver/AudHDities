// src/lib/utils/components/runes/progress.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PROGRESS UTILITIES                                     ║
// ║                    Percentage calc, SVG geometry, label formatting        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ProgressLabelPosition } from '@/lib/constants/components/runes/progress.variants';
import { PROGRESS_LABEL_POSITION_LAYOUTS } from '@/lib/constants/components/runes/progress.constants';

// ═══════════════════════════════════════════════════════════════════════════
// PERCENTAGE CALCULATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculates the percentage from a value and max, clamped to 0-100.
 */
export function calculateProgressPercentage(
  value: number,
  max: number = 100
): number {
  return Math.min(100, Math.max(0, (value / max) * 100));
}

// ═══════════════════════════════════════════════════════════════════════════
// LABEL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the layout class for a given label position.
 */
export function getProgressLabelLayout(position: ProgressLabelPosition): string {
  return PROGRESS_LABEL_POSITION_LAYOUTS[position];
}

/**
 * Returns a default formatted label string.
 */
export function formatProgressLabel(percentage: number): string {
  return `${Math.round(percentage)}%`;
}

// ═══════════════════════════════════════════════════════════════════════════
// SVG GEOMETRY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculates SVG circle properties for a circular progress indicator.
 */
export function calculateCircularProgressGeometry(
  size: number,
  strokeWidth: number
): {
  radius: number;
  circumference: number;
  center: number;
} {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;
  return { radius, circumference, center };
}

/**
 * Calculates the stroke-dashoffset for a given percentage.
 */
export function calculateStrokeDashoffset(
  circumference: number,
  percentage: number
): number {
  return circumference - (percentage / 100) * circumference;
}