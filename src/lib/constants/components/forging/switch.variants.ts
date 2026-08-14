// src/lib/constants/components/forging/switch.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SWITCH VARIANTS                                        ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SWITCH_TRACK_BASE,
  SWITCH_TRACK_UNCHECKED_BG,
  SWITCH_TRACK_SIZE,
  SWITCH_THUMB_BASE,
  SWITCH_THUMB_SIZE,
  SWITCH_THUMB_TRANSLATE,
} from './switch.constants';

// ─── Track Variants ────────────────────────────────────────────────────────
export const switchTrackVariants = cva(
  [...SWITCH_TRACK_BASE, SWITCH_TRACK_UNCHECKED_BG].join(' '),
  {
    variants: {
      // Mended 2026-08-12: quantum-purple · cosmic-blue · fire-base ·
      // sanctuary-green are not in the Tailwind theme (phantom tokens — the
      // white-dots finding). All variants wear the one real accent until the
      // four colors truly join the theme; the names stay so callers need no
      // change and the distinct dresses can return by editing here alone.
      variant: {
        default: 'data-[state=checked]:bg-neurospark',
        quantum: 'data-[state=checked]:bg-neurospark',
        cosmic: 'data-[state=checked]:bg-neurospark',
        fire: 'data-[state=checked]:bg-neurospark',
        sanctuary: 'data-[state=checked]:bg-neurospark',
      },
      size: {
        sm: `${SWITCH_TRACK_SIZE.sm.width} ${SWITCH_TRACK_SIZE.sm.height}`,
        md: `${SWITCH_TRACK_SIZE.md.width} ${SWITCH_TRACK_SIZE.md.height}`,
        lg: `${SWITCH_TRACK_SIZE.lg.width} ${SWITCH_TRACK_SIZE.lg.height}`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ─── Thumb Variants ────────────────────────────────────────────────────────
export const switchThumbVariants = cva(
  [...SWITCH_THUMB_BASE].join(' '),
  {
    variants: {
      size: {
        // The translate constants now carry their full data-state prefix —
        // assembling it here at runtime is what kept the thumbs still.
        sm: [
          `${SWITCH_THUMB_SIZE.sm.width} ${SWITCH_THUMB_SIZE.sm.height}`,
          SWITCH_THUMB_TRANSLATE.sm,
        ].join(' '),
        md: [
          `${SWITCH_THUMB_SIZE.md.width} ${SWITCH_THUMB_SIZE.md.height}`,
          SWITCH_THUMB_TRANSLATE.md,
        ].join(' '),
        lg: [
          `${SWITCH_THUMB_SIZE.lg.width} ${SWITCH_THUMB_SIZE.lg.height}`,
          SWITCH_THUMB_TRANSLATE.lg,
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Types ─────────────────────────────────────────────────────────────────
export type SwitchVariant = NonNullable<
  Parameters<typeof switchTrackVariants>[0]
>['variant'];

export type { SwitchSize } from './switch.constants';