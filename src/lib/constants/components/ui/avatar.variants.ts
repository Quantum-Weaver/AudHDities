// src/lib/constants/components/ui/avatar.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR VARIANTS                                        ║
// ║                    CVA variant definitions for Avatar                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  AVATAR_BASE_CLASSES,
  AVATAR_RING_WIDTH,
  AVATAR_RING_OFFSET,
} from './avatar.constants';

// ─── Size & Status Types ────────────────────────────────────────────────────
export const AVATAR_SIZES = {
  XS: 'xs',
  SM: 'sm',
  DEFAULT: 'default',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  '4XL': '4xl',
} as const;

export const AVATAR_STATUSES = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  BUSY: 'busy',
  NONE: 'none',
} as const;

export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];
export type AvatarStatus = (typeof AVATAR_STATUSES)[keyof typeof AVATAR_STATUSES];

// ─── Ring Variants ──────────────────────────────────────────────────────────
export const avatarRingVariants = cva(
  [
    ...AVATAR_BASE_CLASSES,
    AVATAR_RING_WIDTH,
    AVATAR_RING_OFFSET,
    'ring-offset-deep-space',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'ring-white/20',
        quantum: 'ring-cyan-500/50',
        cosmic: 'ring-blue-500/50',
        fire: 'ring-orange-500/50',
        hearth: 'ring-amber-500/50',
        sanctuary: 'ring-purple-500/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Status Dot Variants ────────────────────────────────────────────────────
export const avatarStatusDotVariants = cva(
  'absolute right-0 bottom-0 rounded-full ring-2 ring-deep-space',
  {
    variants: {
      status: {
        online: 'bg-green-500',
        offline: 'bg-white/20',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
        none: 'hidden',
      },
    },
    defaultVariants: {
      status: 'none',
    },
  }
);

export type AvatarVariant = NonNullable<
  Parameters<typeof avatarRingVariants>[0]
>['variant'];

export type AvatarBadgePosition = 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';