// src/lib/constants/components/hof/divider.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIVIDER VARIANTS                                       ║
// ║                    CVA variant definitions — colors only                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic';

// ─── Variant Type ───────────────────────────────────────────────────────────
export const DIVIDER_VARIANTS = {
  LIGHT: 'light',
  SUBTLE: 'subtle',
  BOLD: 'bold',
  GLOW: 'glow',
  GRADIENT: 'gradient',
} as const;

export type DividerVariant = (typeof DIVIDER_VARIANTS)[keyof typeof DIVIDER_VARIANTS];

// ─── Line Style Type ────────────────────────────────────────────────────────
export const DIVIDER_LINE_STYLES = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
} as const;

export type DividerLineStyle = (typeof DIVIDER_LINE_STYLES)[keyof typeof DIVIDER_LINE_STYLES];

// ─── Orientation Type ───────────────────────────────────────────────────────
export const DIVIDER_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export type DividerOrientation =
  (typeof DIVIDER_ORIENTATIONS)[keyof typeof DIVIDER_ORIENTATIONS];

// ─── Color Variants (Horizontal) ────────────────────────────────────────────
export const dividerColorVariants = cva('', {
  variants: {
    variant: {
      light: 'bg-white/10',
      subtle: 'bg-white/20',
      bold: 'bg-white/40',
      glow: `bg-gradient-to-r from-transparent via-[${QUANTUM_COLORS['neurospark']}] to-transparent`,
      gradient: `bg-gradient-to-r from-[${QUANTUM_COLORS['quantum.purple']}] via-[${QUANTUM_COLORS['neurospark']}] to-[${QUANTUM_COLORS['quantum.purple']}]`,
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});

// ─── Color Variants (Vertical) ──────────────────────────────────────────────
export const dividerColorVerticalVariants = cva('', {
  variants: {
    variant: {
      light: 'bg-white/10',
      subtle: 'bg-white/20',
      bold: 'bg-white/40',
      glow: `bg-gradient-to-b from-transparent via-[${QUANTUM_COLORS['neurospark']}] to-transparent`,
      gradient: `bg-gradient-to-b from-[${QUANTUM_COLORS['quantum.purple']}] via-[${QUANTUM_COLORS['neurospark']}] to-[${QUANTUM_COLORS['quantum.purple']}]`,
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});

// ─── Line Style Variants ────────────────────────────────────────────────────
export const dividerLineStyleVariants = cva('', {
  variants: {
    lineStyle: {
      solid: '',
      dashed: 'bg-none border-t border-dashed',
      dotted: 'bg-none border-t border-dotted',
    },
  },
  defaultVariants: {
    lineStyle: 'solid',
  },
});

export const dividerLineStyleVerticalVariants = cva('', {
  variants: {
    lineStyle: {
      solid: '',
      dashed: 'bg-none border-l border-dashed',
      dotted: 'bg-none border-l border-dotted',
    },
  },
  defaultVariants: {
    lineStyle: 'solid',
  },
});