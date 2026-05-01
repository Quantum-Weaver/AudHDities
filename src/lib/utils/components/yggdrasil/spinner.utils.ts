// src/utils/components/yggdrasil/spinner.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPINNER UTILITIES                                      ║
// ║                    Size resolution, element rendering helpers             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SpinnerSize,
  SpinnerType,
  SpinnerSpeed,
} from '@/lib/constants/components/yggdrasil/spinner.constants';
import type { SpinnerVariant } from '@/lib/constants/components/yggdrasil/spinner.variants';
import {
  SPINNER_ANIMATION_CLASSES,
  SPINNER_ELEMENT_COUNT,
  SPINNER_STAGGER_DELAYS,
} from '@/lib/constants/components/yggdrasil/spinner.constants';
import { getSpinnerVariantClass } from '@/lib/constants/components/yggdrasil/spinner.variants';

// ─── Size dimension maps (type → size → Tailwind classes) ──────────────────

/** Circle spinner: height × width × border width */
const CIRCLE_SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
};

/** Dots spinner: individual dot size */
const DOT_SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
};

/** Pulse spinner: pulsing circle size */
const PULSE_SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

/** Wave spinner: bar dimensions */
const WAVE_SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-3 w-0.5',
  sm: 'h-4 w-1',
  md: 'h-5 w-1',
  lg: 'h-6 w-1.5',
  xl: 'h-8 w-2',
};

// ─── Public API ────────────────────────────────────────────────────────────

/** Get the Tailwind size classes for a given spinner type and size */
export function getSpinnerSizeClass(type: SpinnerType, size: SpinnerSize): string {
  switch (type) {
    case 'circle':
      return CIRCLE_SIZE_CLASSES[size];
    case 'dots':
      return DOT_SIZE_CLASSES[size];
    case 'pulse':
      return PULSE_SIZE_CLASSES[size];
    case 'wave':
      return WAVE_SIZE_CLASSES[size];
    default:
      return CIRCLE_SIZE_CLASSES[size];
  }
}

/** Get the animation class for a given type and speed */
export function getSpinnerAnimationClass(
  type: SpinnerType,
  speed: SpinnerSpeed
): string {
  return SPINNER_ANIMATION_CLASSES[speed][type];
}

/** Get the number of elements to render for a spinner type */
export function getSpinnerElementCount(type: SpinnerType): number {
  return SPINNER_ELEMENT_COUNT[type];
}

/** Get the stagger delay for a spinner type (returns seconds) */
export function getSpinnerStaggerDelay(type: SpinnerType): number {
  return SPINNER_STAGGER_DELAYS[type];
}

/** Compose all classes for a spinner element */
export function composeSpinnerClasses(params: {
  type: SpinnerType;
  size: SpinnerSize;
  variant: SpinnerVariant;
  speed: SpinnerSpeed;
}): string {
  const sizeClass = getSpinnerSizeClass(params.type, params.size);
  const variantClass = getSpinnerVariantClass(params.type, params.variant);
  const animationClass = getSpinnerAnimationClass(params.type, params.speed);

  return [sizeClass, variantClass, animationClass].filter(Boolean).join(' ');
}

/** Generate the inline style for staggered animation delay */
export function getSpinnerDelayStyle(
  type: SpinnerType,
  index: number
): React.CSSProperties {
  const baseDelay = getSpinnerStaggerDelay(type);
  if (baseDelay === 0) return {};
  return { animationDelay: `${index * baseDelay}s` };
}

/** Generate the array of indices for rendering spinner elements */
export function getSpinnerIndices(type: SpinnerType): number[] {
  return Array.from({ length: getSpinnerElementCount(type) }, (_, i) => i);
}