// src/lib/constants/components/ui/tooltip.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOOLTIP VARIANTS                                       ║
// ║                    CVA variant definitions — all tokens from COSMIC       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  TOOLTIP_CONTENT_BASE_CLASSES,
  TOOLTIP_HAS_KBD_CLASS,
  TOOLTIP_ARROW,
} from './tooltip.constants';

// ─── Placement Tokens ──────────────────────────────────────────────────────
export const TOOLTIP_PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
} as const;

export type TooltipPlacement =
  (typeof TOOLTIP_PLACEMENTS)[keyof typeof TOOLTIP_PLACEMENTS];

// ─── Content Variants ──────────────────────────────────────────────────────
// Colors sourced from Tailwind generated config:
//   bg-foreground, bg-deep-space, bg-white, bg-quantum-purple,
//   bg-cosmic-blue, bg-fire-base, bg-sanctuary-green, bg-hearth-gold
//   text-background, text-star-dust, text-deep-space, text-white
export const tooltipContentVariants = cva(
  [
    ...TOOLTIP_CONTENT_BASE_CLASSES,
    TOOLTIP_HAS_KBD_CLASS,
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background',
        dark: 'bg-deep-space text-star-dust border border-white/10',
        light: 'bg-white text-deep-space border border-white/20',
        quantum: 'bg-quantum-purple text-white shadow-lg shadow-quantum-purple/20',
        cosmic: 'bg-cosmic-blue text-white shadow-lg shadow-cosmic-blue/20',
        fire: 'bg-fire-base text-white shadow-lg shadow-fire-base/20',
        sanctuary: 'bg-sanctuary-green text-white shadow-lg shadow-sanctuary-green/20',
        council: 'bg-hearth-gold text-deep-space shadow-lg shadow-hearth-gold/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Arrow Variants ────────────────────────────────────────────────────────
export const tooltipArrowVariants = cva(
  [
    'z-50',
    TOOLTIP_ARROW.SIZE,
    TOOLTIP_ARROW.ROTATION,
    TOOLTIP_ARROW.RADIUS,
    TOOLTIP_ARROW.VERTICAL_OFFSET,
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-foreground',
        dark: 'bg-deep-space',
        light: 'bg-white',
        quantum: 'bg-quantum-purple',
        cosmic: 'bg-cosmic-blue',
        fire: 'bg-fire-base',
        sanctuary: 'bg-sanctuary-green',
        council: 'bg-hearth-gold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type TooltipVariant = NonNullable<
  Parameters<typeof tooltipContentVariants>[0]
>['variant'];