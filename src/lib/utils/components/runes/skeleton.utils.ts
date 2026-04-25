// src/utils/components/runes/skeleton.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SKELETON UTILITIES                                     ║
// ║                    Size resolution, class composition helpers             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SkeletonVariant,
  SkeletonSize,
  SkeletonRoundedSize,
} from '@/types/components/runes/skeleton.types';
import {
  SKELETON_TEXT_HEIGHT,
  SKELETON_AVATAR_SIZE,
  SKELETON_BUTTON_SIZE,
  SKELETON_BADGE_SIZE,
  SKELETON_VARIANT_BASE,
} from '../../../constants/components/runes/skeleton.constants';
import { BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Size Resolution ───────────────────────────────────────────────────────
/**
 * Resolves the appropriate size class for a given variant and size.
 * Returns empty string if custom width/height are provided.
 */
export function resolveSkeletonSize(
  variant: SkeletonVariant,
  size: SkeletonSize,
  hasCustomDimensions: boolean
): string {
  if (hasCustomDimensions) return '';

  switch (variant) {
    case 'avatar':
      return SKELETON_AVATAR_SIZE[size] ?? '';
    case 'button':
      return SKELETON_BUTTON_SIZE[size] ?? '';
    case 'badge':
      return SKELETON_BADGE_SIZE[size] ?? '';
    case 'text':
      return SKELETON_TEXT_HEIGHT[size] ?? '';
    default:
      return SKELETON_TEXT_HEIGHT[size] ?? '';
  }
}

/**
 * Returns the base shape class for a variant.
 */
export function resolveSkeletonVariantClass(variant: SkeletonVariant): string {
  return SKELETON_VARIANT_BASE[variant] ?? '';
}

// ─── Rounded Resolution ────────────────────────────────────────────────────
/**
 * Returns the rounded class for a given rounded size key.
 */
export function resolveSkeletonRoundedClass(size: SkeletonRoundedSize): string {
  return `rounded-[${BORDER_RADII[size]}]`;
}

// ─── Custom Style Resolution ───────────────────────────────────────────────
/**
 * Creates a CSSProperties object from custom width/height values.
 */
export function resolveSkeletonCustomStyle(
  width?: string | number,
  height?: string | number
): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;
  return style;
}