// src/lib/constants/components/ui/switch.variants.ts
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
      variant: {
        default: 'data-[state=checked]:bg-quantum-purple',
        quantum: 'data-[state=checked]:bg-quantum-purple',
        cosmic: 'data-[state=checked]:bg-cosmic-blue',
        fire: 'data-[state=checked]:bg-fire-base',
        sanctuary: 'data-[state=checked]:bg-sanctuary-green',
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
        sm: [
          `${SWITCH_THUMB_SIZE.sm.width} ${SWITCH_THUMB_SIZE.sm.height}`,
          `data-[state=checked]:${SWITCH_THUMB_TRANSLATE.sm}`,
        ].join(' '),
        md: [
          `${SWITCH_THUMB_SIZE.md.width} ${SWITCH_THUMB_SIZE.md.height}`,
          `data-[state=checked]:${SWITCH_THUMB_TRANSLATE.md}`,
        ].join(' '),
        lg: [
          `${SWITCH_THUMB_SIZE.lg.width} ${SWITCH_THUMB_SIZE.lg.height}`,
          `data-[state=checked]:${SWITCH_THUMB_TRANSLATE.lg}`,
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