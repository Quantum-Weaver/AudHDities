// src/lib/constants/components/ui/skeleton.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SKELETON VARIANTS                                      ║
// ║                    CVA variant definitions for Skeleton                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SKELETON_BG,
  SKELETON_SHIMMER_GRADIENT,
} from './skeleton.constants';

// ─── Variant & Animation Types ─────────────────────────────────────────────
export const SKELETON_VARIANTS = {
  TEXT: 'text',
  AVATAR: 'avatar',
  IMAGE: 'image',
  CARD: 'card',
  BUTTON: 'button',
  BADGE: 'badge',
} as const;

export const SKELETON_ANIMATIONS = {
  PULSE: 'pulse',
  WAVE: 'wave',
  NONE: 'none',
} as const;

export const SKELETON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  '4XL': '4xl',
} as const;

export type SkeletonVariant = (typeof SKELETON_VARIANTS)[keyof typeof SKELETON_VARIANTS];
export type SkeletonAnimation = (typeof SKELETON_ANIMATIONS)[keyof typeof SKELETON_ANIMATIONS];
export type SkeletonSize = (typeof SKELETON_SIZES)[keyof typeof SKELETON_SIZES];

// ─── Base Variant ──────────────────────────────────────────────────────────
export const skeletonVariants = cva(
  SKELETON_BG,
  {
    variants: {
      animation: {
        pulse: 'animate-pulse',
        wave: [
          'relative',
          'overflow-hidden',
          'before:absolute',
          'before:inset-0',
          'before:-translate-x-full',
          `before:animate-[shimmer_${1500}ms_infinite]`,
          ...SKELETON_SHIMMER_GRADIENT,
        ].join(' '),
        none: '',
      },
    },
    defaultVariants: {
      animation: 'pulse',
    },
  }
);