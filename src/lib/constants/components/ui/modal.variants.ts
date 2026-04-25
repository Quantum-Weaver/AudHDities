// src/lib/constants/components/ui/modal.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MODAL VARIANTS                                         ║
// ║                    CVA variant definitions for Modal                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  MODAL_BACKDROP_BLUR,
  MODAL_BACKDROP_OPACITY,
  MODAL_CONTAINER_RADIUS,
  MODAL_TRANSITION_DURATION,
  MODAL_SIZE_MAX_WIDTH,
} from './modal.constants';

// ─── Overlay Variants ──────────────────────────────────────────────────────
export const modalOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    `bg-deep-space/${MODAL_BACKDROP_OPACITY.DEFAULT}`,
    MODAL_BACKDROP_BLUR,
    `transition-all`,
    `duration-[${MODAL_TRANSITION_DURATION}ms]`,
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        drawer: '',
        sheet: '',
        fullscreen: '',
        alert: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Content Variants ──────────────────────────────────────────────────────
export const modalContentVariants = cva(
  [
    'fixed',
    'z-50',
    'bg-surface',
    'rounded-lg',
    'shadow-xl',
    `transition-all`,
    `duration-[${MODAL_TRANSITION_DURATION}ms]`,
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md',
        drawer: 'top-0 right-0 h-full w-80',
        sheet: 'bottom-0 left-0 right-0 w-full rounded-t-xl',
        fullscreen: 'inset-0 w-full h-full rounded-none',
        alert:
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm',
      },
      size: {
        sm: MODAL_SIZE_MAX_WIDTH.SM,
        md: MODAL_SIZE_MAX_WIDTH.MD,
        lg: MODAL_SIZE_MAX_WIDTH.LG,
        xl: MODAL_SIZE_MAX_WIDTH.XL,
        full: MODAL_SIZE_MAX_WIDTH.FULL,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ModalVariant = NonNullable<
  Parameters<typeof modalContentVariants>[0]
>['variant'];
export type ModalSize = NonNullable<
  Parameters<typeof modalContentVariants>[0]
>['size'];