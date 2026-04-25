// src/types/components/ui/avatar.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR TYPES                                           ║
// ║                    All type definitions for the Avatar component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import type {
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
  AvatarBadgePosition,
} from '@/lib/constants/components/ui/avatar.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { AvatarSize, AvatarStatus, AvatarVariant, AvatarBadgePosition };

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface AvatarProps extends AvatarPrimitive.Root.Props {
  /** Size of the avatar */
  size?: AvatarSize;
  /** Status indicator (online/offline/away/busy) */
  status?: AvatarStatus;
  /** Visual variant for the avatar ring */
  variant?: AvatarVariant;
  /** Make avatar interactive (adds hover effects) */
  interactive?: boolean;
  /** Add a subtle glow effect */
  glow?: boolean;
  src?: string;
  alt?: string;
}

// ─── Image Props ────────────────────────────────────────────────────────────
export interface AvatarImageProps extends AvatarPrimitive.Image.Props {
  /** Alt text for the image */
  alt?: string;
}

// ─── Fallback Props ─────────────────────────────────────────────────────────
export interface AvatarFallbackProps
  extends AvatarPrimitive.Fallback.Props {
  /** Delay before showing fallback (ms) */
  delayMs?: number;
}

// ─── Badge Props ────────────────────────────────────────────────────────────
export interface AvatarBadgeProps
  extends React.ComponentProps<'span'> {
  /** Position of the badge */
  position?: AvatarBadgePosition;
}

// ─── Status Indicator Props ─────────────────────────────────────────────────
export interface AvatarStatusIndicatorProps {
  status?: AvatarStatus;
  size?: AvatarSize;
}

// ─── Group Props ────────────────────────────────────────────────────────────
export interface AvatarGroupProps
  extends React.ComponentProps<'div'> {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars in the group */
  size?: AvatarSize;
}