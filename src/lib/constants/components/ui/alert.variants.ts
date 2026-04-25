// src/lib/constants/components/ui/alert.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ALERT VARIANTS                                         ║
// ║                    CVA variant definitions — all derived from COSMIC      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const ALERT_VARIANTS = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  QUANTUM: 'quantum',
} as const;

export type AlertVariant = (typeof ALERT_VARIANTS)[keyof typeof ALERT_VARIANTS];

// ─── Container Variants (background + border) ──────────────────────────────
export const alertContainerVariants = cva('relative rounded-lg border', {
  variants: {
    variant: {
      info: 'bg-info/10 border-info/30',
      success: 'bg-success/10 border-success/30',
      warning: 'bg-warning/10 border-warning/30',
      error: 'bg-error/10 border-error/30',
      quantum: 'bg-quantum-purple/10 border-quantum-purple/30',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

// ─── Icon Color Variants ───────────────────────────────────────────────────
export const alertIconColorVariants = cva('flex-shrink-0', {
  variants: {
    variant: {
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      quantum: 'text-quantum-purple',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

// ─── Combined variant type for props ───────────────────────────────────────
export type AlertVariantProp = NonNullable<
  Parameters<typeof alertContainerVariants>[0]
>['variant'];