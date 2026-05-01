// src/lib/constants/components/vegvisir/pagination.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION VARIANTS                                    ║
// ║                    CVA variant definitions — no raw values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import type { PaginationSize } from './pagination.constants';

// ─── Shared Tokens ─────────────────────────────────────────────────────────
const starDust = QUANTUM_COLORS['starDust'];       // #E0E0E0
const neurospark = QUANTUM_COLORS['neurospark'];   // #22D3EE

// ─── Page Button Variants ──────────────────────────────────────────────────
const BUTTON_BASE = [
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-md',
  'transition-colors',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
] as const;

export const paginationButtonVariants = cva(BUTTON_BASE.join(' '), {
  variants: {
    variant: {
      default: `bg-[${starDust}]/5 hover:bg-[${starDust}]/10 text-[${starDust}]/80 hover:text-[${starDust}]`,
      outline: `border border-[${starDust}]/20 hover:border-[${starDust}]/40 text-[${starDust}]/80 hover:text-[${starDust}]`,
      minimal: `text-[${starDust}]/60 hover:text-[${starDust}] hover:bg-[${starDust}]/5`,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const paginationActiveButtonVariants = cva(BUTTON_BASE.join(' '), {
  variants: {
    variant: {
      default: `bg-[${neurospark}] text-star-dust hover:bg-[${neurospark}]/90`,
      outline: `border border-[${neurospark}] bg-[${neurospark}]/10 text-[${neurospark}] hover:bg-[${neurospark}]/20`,
      minimal: `text-[${neurospark}] bg-[${starDust}]/5`,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const paginationSelectVariants = cva(
  [
    'rounded-md',
    'border',
    'text-sm',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-1',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        default: `border-[${starDust}]/20 bg-[${starDust}]/5 text-[${starDust}] focus:border-[${neurospark}] focus:ring-[${neurospark}]`,
        outline: `border-[${starDust}]/30 bg-transparent text-[${starDust}] focus:border-[${neurospark}] focus:ring-[${neurospark}]`,
        minimal: `border-transparent bg-transparent text-[${starDust}]/60 focus:text-[${starDust}] focus:border-[${starDust}]/20`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Type Exports ──────────────────────────────────────────────────────────
export type PaginationVariant = NonNullable<
  Parameters<typeof paginationButtonVariants>[0]
>['variant'];

// Re-export from constants — single source for PaginationSize
export type { PaginationSize };