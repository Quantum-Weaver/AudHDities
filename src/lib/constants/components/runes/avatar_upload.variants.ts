// src/lib/constants/components/runes/avatar_upload.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UPLOAD VARIANTS                                 ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  AVATAR_UPLOAD_OVERLAY_OPACITY,
  AVATAR_UPLOAD_OVERLAY_DISABLED,
  AVATAR_UPLOAD_TRANSITION,
  AVATAR_UPLOAD_TRANSITION_DURATION,
  AVATAR_UPLOAD_TRANSITION_EASING,
} from './avatar_upload.constants';

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_VARIANTS = {
  DEFAULT: 'default',
  LOADING: 'loading',
} as const;

export type AvatarUploadVariant =
  (typeof AVATAR_UPLOAD_VARIANTS)[keyof typeof AVATAR_UPLOAD_VARIANTS];

// ─── Overlay Variants ──────────────────────────────────────────────────────
export const avatarUploadOverlayVariants = cva(
  [
    'absolute',
    'inset-0',
    'flex',
    'items-center',
    'justify-center',
    'rounded-full',
    AVATAR_UPLOAD_TRANSITION,
    `duration-[${AVATAR_UPLOAD_TRANSITION_DURATION}ms]`,
    `ease-[${AVATAR_UPLOAD_TRANSITION_EASING}]`,
    AVATAR_UPLOAD_OVERLAY_OPACITY,
    AVATAR_UPLOAD_OVERLAY_DISABLED,
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-black/50',
        loading: 'bg-black/70 opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Spinner Variants ──────────────────────────────────────────────────────
export const avatarUploadSpinnerVariants = cva(
  'animate-spin text-white',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Camera Icon Variants ──────────────────────────────────────────────────
export const avatarUploadCameraIconVariants = cva(
  'text-white',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);