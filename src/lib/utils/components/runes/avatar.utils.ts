// src/utils/components/runes/avatar.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UTILITIES                                       ║
// ║                    Size resolution, class composition                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  AVATAR_SIZE_CLASSES,
  AVATAR_STATUS_SIZE_CLASSES,
  AVATAR_FALLBACK_FONT_SIZE_MAP,
  AVATAR_BADGE_SIZE_MAP,
  AVATAR_BADGE_FONT_SIZE_MAP,
  AVATAR_BADGE_POSITION_CLASSES,
} from '@/lib/constants/components/runes/avatar.constants';
import type {
  AvatarSize,
  AvatarBadgePosition,
} from '@/lib/constants/components/runes/avatar.variants';

// ═══════════════════════════════════════════════════════════════════════════
// SIZE RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the Tailwind size class for a given avatar size.
 */
export function getAvatarSizeClass(size: AvatarSize): string {
  return AVATAR_SIZE_CLASSES[size];
}

/**
 * Returns the status dot size class for a given avatar size.
 */
export function getAvatarStatusSizeClass(size: AvatarSize): string {
  return AVATAR_STATUS_SIZE_CLASSES[size];
}

// ═══════════════════════════════════════════════════════════════════════════
// FALLBACK RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the group-data font size class for a fallback based on parent avatar size.
 * Generates: `group-data-[size=xs]/avatar:text-[8px]`
 */
export function getAvatarFallbackFontSizeClass(size: AvatarSize): string {
  const fontClass = AVATAR_FALLBACK_FONT_SIZE_MAP[size];
  return `group-data-[size=${size}]/avatar:${fontClass}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// BADGE RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the position class for a badge.
 */
export function getAvatarBadgePositionClass(
  position: AvatarBadgePosition
): string {
  return AVATAR_BADGE_POSITION_CLASSES[position];
}

/**
 * Returns the size class for a badge based on parent avatar size.
 * Generates: `group-data-[size=xs]/avatar:size-2.5`
 */
export function getAvatarBadgeSizeClass(size: AvatarSize): string {
  const sizeClass = AVATAR_BADGE_SIZE_MAP[size];
  return `group-data-[size=${size}]/avatar:${sizeClass}`;
}

/**
 * Returns the font size class for a badge based on parent avatar size.
 * Generates: `group-data-[size=xs]/avatar:text-[6px]`
 */
export function getAvatarBadgeFontSizeClass(size: AvatarSize): string {
  const fontClass = AVATAR_BADGE_FONT_SIZE_MAP[size];
  return `group-data-[size=${size}]/avatar:${fontClass}`;
}