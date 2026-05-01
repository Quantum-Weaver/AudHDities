// src/lib/constants/components/runes/empty_state.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    EMPTY STATE VARIANTS                                   ║
// ║                    CVA variant definitions for EmptyState                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic';
import type { EmptyStateSize } from './empty_state.constants';

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const EMPTY_STATE_VARIANTS = {
  DEFAULT: 'default',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  SANCTUARY: 'sanctuary',
} as const;

export type EmptyStateVariant =
  (typeof EMPTY_STATE_VARIANTS)[keyof typeof EMPTY_STATE_VARIANTS];

// ─── Derived Color Maps (from QUANTUM_COLORS source) ───────────────────────
/** Icon opacity modifier per variant */
const ICON_OPACITY: Record<EmptyStateVariant, string> = {
  default: 'text-star-dust/40',
  quantum: 'text-[#6C5CE7]/50',
  cosmic: 'text-[#0984E3]/50',
  sanctuary: 'text-[#00B894]/50',
} as const;

/** Title color per variant */
const TITLE_COLOR: Record<EmptyStateVariant, string> = {
  default: 'text-star-dust',
  quantum: 'text-[#6C5CE7]',
  cosmic: 'text-[#0984E3]',
  sanctuary: 'text-[#00B894]',
} as const;

/** Description opacity per variant */
const DESCRIPTION_COLOR: Record<EmptyStateVariant, string> = {
  default: 'text-star-dust/60',
  quantum: 'text-[#6C5CE7]/60',
  cosmic: 'text-[#0984E3]/60',
  sanctuary: 'text-[#00B894]/60',
} as const;

// ─── Container Variants ────────────────────────────────────────────────────
export const emptyStateContainerVariants = cva('text-center', {
  variants: {
    size: {
      compact: 'py-6',
      default: 'py-12',
      spacious: 'py-20',
    },
    variant: {
      default: '',
      quantum: '',
      cosmic: '',
      sanctuary: '',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

// ─── Icon Container Variants (spacing below icon) ──────────────────────────
export const emptyStateIconContainerVariants = cva('', {
  variants: {
    size: {
      compact: 'mb-3',
      default: 'mb-4',
      spacious: 'mb-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// ─── Icon Variants ─────────────────────────────────────────────────────────
export const emptyStateIconVariants = cva('', {
  variants: {
    size: {
      compact: 'text-4xl',
      default: 'text-6xl',
      spacious: 'text-7xl',
    },
    variant: {
      default: ICON_OPACITY.default,
      quantum: ICON_OPACITY.quantum,
      cosmic: ICON_OPACITY.cosmic,
      sanctuary: ICON_OPACITY.sanctuary,
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

// ─── Title Variants ────────────────────────────────────────────────────────
export const emptyStateTitleVariants = cva('font-bold mb-2', {
  variants: {
    size: {
      compact: 'text-lg',
      default: 'text-xl',
      spacious: 'text-2xl',
    },
    variant: {
      default: TITLE_COLOR.default,
      quantum: TITLE_COLOR.quantum,
      cosmic: TITLE_COLOR.cosmic,
      sanctuary: TITLE_COLOR.sanctuary,
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

// ─── Description Variants ──────────────────────────────────────────────────
export const emptyStateDescriptionVariants = cva('mb-4', {
  variants: {
    size: {
      compact: 'text-sm',
      default: 'text-base',
      spacious: 'text-lg',
    },
    variant: {
      default: DESCRIPTION_COLOR.default,
      quantum: DESCRIPTION_COLOR.quantum,
      cosmic: DESCRIPTION_COLOR.cosmic,
      sanctuary: DESCRIPTION_COLOR.sanctuary,
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});