// src/utils/components/ui/aspect_ratio.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ASPECT RATIO UTILITIES                                 ║
// ║                    Percentage calculation, class resolution               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  ASPECT_RATIO_PERCENTAGES,
  ASPECT_RATIO_VALUES,
  OBJECT_FIT_CLASSES,
  ROUNDED_SIZE_CLASSES,
} from '@/lib/constants/components/ui/aspect_ratio.constants';
import type {
  AspectRatioValue,
  ObjectFit,
  AspectRatioRoundedSize,
} from '@/lib/constants/components/ui/aspect_ratio.constants';

// ═══════════════════════════════════════════════════════════════════════════
// PERCENTAGE CALCULATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the CSS padding-bottom percentage string for an aspect ratio.
 * For custom ratios, calculates from the provided number.
 */
export function getAspectRatioPadding(
  ratio: AspectRatioValue,
  customRatio?: number
): string {
  if (ratio === ASPECT_RATIO_VALUES.CUSTOM && customRatio) {
    const percentage = (1 / customRatio) * 100;
    return `pb-[${percentage}%]`;
  }

  const percentage = ASPECT_RATIO_PERCENTAGES[ratio];
  return `pb-[${percentage}%]`;
}

/**
 * Returns the numeric percentage for an aspect ratio.
 */
export function getAspectRatioPercentage(
  ratio: AspectRatioValue,
  customRatio?: number
): number {
  if (ratio === ASPECT_RATIO_VALUES.CUSTOM && customRatio) {
    return (1 / customRatio) * 100;
  }
  return ASPECT_RATIO_PERCENTAGES[ratio];
}

// ═══════════════════════════════════════════════════════════════════════════
// CLASS RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the Tailwind object-fit class for a given fit value.
 */
export function getObjectFitClass(fit: ObjectFit): string {
  return OBJECT_FIT_CLASSES[fit];
}

/**
 * Returns the Tailwind rounded class for a given size.
 */
export function getRoundedSizeClass(size: AspectRatioRoundedSize): string {
  return ROUNDED_SIZE_CLASSES[size];
}

// ═══════════════════════════════════════════════════════════════════════════
// MEDIA DETECTION
// ═══════════════════════════════════════════════════════════════════════════

/** Element types that should receive object-fit styling */
const MEDIA_ELEMENT_TYPES = new Set(['img', 'video', 'iframe']);

/**
 * Checks if a React element is a media element (img, video, iframe).
 */
export function isMediaElement(element: React.ReactElement): boolean {
  const elementType = element.type;
  if (typeof elementType === 'string') {
    return MEDIA_ELEMENT_TYPES.has(elementType);
  }
  // For component types, check displayName
  if (typeof elementType === 'function') {
    const name = (elementType as React.ComponentType).displayName;
    return name ? MEDIA_ELEMENT_TYPES.has(name.toLowerCase()) : false;
  }
  return false;
}