// src/lib/utils/container.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTAINER UTILITIES                                    ║
// ║                    Size/padding resolution, visual variant resolution     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  CONTAINER_SIZE_CLASSES,
  CONTAINER_PADDING_X_CLASSES,
  CONTAINER_PADDING_Y_CLASSES,
  CONTAINER_PADDING_TOP_CLASSES,
  CONTAINER_PADDING_BOTTOM_CLASSES,
  CONTAINER_RESPONSIVE_PADDING_X_CLASSES,
} from '@/lib/constants/components/hof/container.constants';
import type {
  ContainerSize,
  ContainerPadding,
  ContainerVisualVariant,
} from '@/lib/constants/components/hof/container.variants';

// ═══════════════════════════════════════════════════════════════════════════
// SIZE RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the max-width class for a given container size.
 * If fluid is true, returns max-w-full regardless of size.
 */
export function getContainerSizeClass(
  size: ContainerSize,
  fluid: boolean
): string {
  if (fluid) return CONTAINER_SIZE_CLASSES.fluid;
  return CONTAINER_SIZE_CLASSES[size];
}

// ═══════════════════════════════════════════════════════════════════════════
// PADDING RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns responsive horizontal padding class.
 */
export function getContainerPaddingXClass(padding: ContainerPadding): string {
  return CONTAINER_RESPONSIVE_PADDING_X_CLASSES[padding];
}

/**
 * Returns vertical padding class, or empty string if undefined.
 */
export function getContainerPaddingYClass(paddingY?: ContainerPadding): string {
  return paddingY ? CONTAINER_PADDING_Y_CLASSES[paddingY] : '';
}

/**
 * Returns top padding class, or empty string if undefined.
 */
export function getContainerPaddingTopClass(
  paddingTop?: ContainerPadding
): string {
  return paddingTop ? CONTAINER_PADDING_TOP_CLASSES[paddingTop] : '';
}

/**
 * Returns bottom padding class, or empty string if undefined.
 */
export function getContainerPaddingBottomClass(
  paddingBottom?: ContainerPadding
): string {
  return paddingBottom
    ? CONTAINER_PADDING_BOTTOM_CLASSES[paddingBottom]
    : '';
}

// ═══════════════════════════════════════════════════════════════════════════
// VISUAL VARIANT RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Resolves the visual variant from the combination of boolean props.
 * `visual` prop takes precedence. Boolean props are combined.
 */
export function resolveContainerVisualVariant(params: {
  visual?: ContainerVisualVariant;
  bordered?: boolean;
  background?: boolean;
  elevated?: boolean;
}): ContainerVisualVariant {
  // Explicit visual prop takes precedence
  if (params.visual) return params.visual;

  // Combine boolean props
  const hasBackground = params.background;
  const hasElevated = params.elevated;
  const hasBordered = params.bordered;

  if (hasBackground && hasElevated) return 'background-elevated';
  if (hasBackground) return 'background';
  if (hasElevated) return 'elevated';
  if (hasBordered) return 'bordered';

  return 'default';
}