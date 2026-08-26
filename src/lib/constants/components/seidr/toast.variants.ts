// src/lib/constants/components/seidr/toast.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOAST VARIANTS                                         ║
// ║                    CVA variant definitions for Toast                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

// ─── Variant Types ─────────────────────────────────────────────────────────
export const TOAST_VARIANTS = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  QUANTUM: 'quantum',
} as const;

export type ToastVariantKey = (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS];

// ─── Position Types ────────────────────────────────────────────────────────
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
} as const;

export type ToastPositionKey = (typeof TOAST_POSITIONS)[keyof typeof TOAST_POSITIONS];

// ─── Content Variants (background + border) ────────────────────────────────
// Semantic colors: info, success, warning, error
export const toastContentVariants = cva('', {
  variants: {
    variant: {
      info: 'bg-info/95 border-info/30',
      success: 'bg-success/95 border-success/30',
      warning: 'bg-warning/95 border-warning/30',
      error: 'bg-error/95 border-error/30',
      quantum: 'bg-quantum-purple/95 border-quantum-purple/40',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

// ─── Icon Color Variants ───────────────────────────────────────────────────
export const toastIconColorVariants = cva('', {
  variants: {
    variant: {
      info: 'text-info/80',
      success: 'text-success/80',
      warning: 'text-warning/80',
      error: 'text-error/80',
      quantum: 'text-quantum-light',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

// ─── Position Classes ──────────────────────────────────────────────────────
export const toastPositionVariants = cva('', {
  variants: {
    position: {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    },
  },
  defaultVariants: {
    position: 'bottom-right',
  },
});

// ─── Container Direction (top stacks reverse, bottom stacks normal) ────────
export const getToastContainerDirection = (position: ToastPositionKey): string => {
  return position.startsWith('top') ? 'flex-col-reverse' : 'flex-col';
};

export type ToastVariant = ToastVariantKey;
export type ToastPosition = ToastPositionKey;