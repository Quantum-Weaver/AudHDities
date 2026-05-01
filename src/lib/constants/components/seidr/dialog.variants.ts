// src/lib/constants/components/seidr/dialog.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIALOG VARIANTS                                        ║
// ║                    CVA variant definitions — no raw values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { GLOW_EFFECTS, BACKDROP_EFFECTS } from '@/lib/constants/cosmic/effects';
import {
  DIALOG_CONTENT_BASE_CLASSES,
  DIALOG_OVERLAY_BASE_CLASSES,
} from './dialog.constants';

// ─── Shared Tokens ─────────────────────────────────────────────────────────
const deepSpace = QUANTUM_COLORS['deepSpace'];
const surface = QUANTUM_COLORS['surface'];
const starDust = QUANTUM_COLORS['starDust'];
const quantumPurple = QUANTUM_COLORS['quantum.purple'];
const cosmicBlue = QUANTUM_COLORS['cosmic.blue'];

// ─── Overlay Variants ──────────────────────────────────────────────────────
export const dialogOverlayVariants = cva(
  DIALOG_OVERLAY_BASE_CLASSES.join(' '),
  {
    variants: {
      variant: {
        default: `bg-[${deepSpace}]/10`,
        dim: `bg-[${deepSpace}]/40`,
        heavy: `bg-[${deepSpace}]/70`,
        quantum: `bg-[${quantumPurple}]/15 backdrop-blur-sm`,
        cosmic: `bg-[${cosmicBlue}]/10 backdrop-blur-sm`,
        glass: 'backdrop-blur-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Content Variants ──────────────────────────────────────────────────────
export const dialogContentVariants = cva(
  DIALOG_CONTENT_BASE_CLASSES.join(' '),
  {
    variants: {
      variant: {
        default: [
          `bg-[${surface}]/95`,
          `text-[${starDust}]`,
          `ring-1 ring-[${starDust}]/10`,
        ].join(' '),
        glass: [
          'backdrop-blur-xl',
          `bg-[${surface}]/60`,
          `text-[${starDust}]`,
          `ring-1 ring-[${starDust}]/20`,
        ].join(' '),
        quantum: [
          `bg-[${surface}]/95`,
          `text-[${starDust}]`,
          `ring-1 ring-[${quantumPurple}]/30`,
          `shadow-[${GLOW_EFFECTS.quantum}]`,
        ].join(' '),
        cosmic: [
          `bg-[${surface}]/95`,
          `text-[${starDust}]`,
          `ring-1 ring-[${cosmicBlue}]/30`,
          `shadow-[${GLOW_EFFECTS.cosmic}]`,
        ].join(' '),
        emergency: [
          `bg-[${surface}]/95`,
          `text-[${starDust}]`,
          `ring-1 ring-[${QUANTUM_COLORS['fire.base']}]/40`,
          `shadow-[${GLOW_EFFECTS.emergency}]`,
        ].join(' '),
        sanctuary: [
          `bg-[${surface}]/95`,
          `text-[${starDust}]`,
          `ring-1 ring-[${QUANTUM_COLORS['sanctuary.green']}]/30`,
          `shadow-[${GLOW_EFFECTS.success}]`,
        ].join(' '),
      },
      size: {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        full: 'sm:max-w-[calc(100%-4rem)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

// ─── Type Exports ──────────────────────────────────────────────────────────
export type DialogOverlayVariant = NonNullable<
  Parameters<typeof dialogOverlayVariants>[0]
>['variant'];

export type DialogContentVariant = NonNullable<
  Parameters<typeof dialogContentVariants>[0]
>['variant'];

export type DialogSize = NonNullable<
  Parameters<typeof dialogContentVariants>[0]
>['size'];