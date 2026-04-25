// src/lib/constants/components/ui/spacer.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPACER VARIANTS                                        ║
// ║                    CVA definitions for axis and direction                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SPACER_SIZES,
  SPACER_AXIS,
  SPACER_DIRECTION,
  SPACER_FULL_CLASSES,
} from './spacer.constants';

// ─── Direction-to-Class Mapping (by axis) ──────────────────────────────────
/** Generates the class string for a given size, direction, and axis combination */
function buildDirectionClass(
  sizePx: number,
  direction: string,
  axis: string
): string {
  const w = `w-[${sizePx}px]`;
  const h = `h-[${sizePx}px]`;

  if (direction === SPACER_DIRECTION.ALL) {
    if (axis === SPACER_AXIS.VERTICAL) return `${h} ${SPACER_FULL_CLASSES.WIDTH}`;
    if (axis === SPACER_AXIS.HORIZONTAL) return `${w} ${SPACER_FULL_CLASSES.HEIGHT}`;
    return `${w} ${h}`;
  }

  if (direction === SPACER_DIRECTION.TOP || direction === SPACER_DIRECTION.BOTTOM) {
    return `${h} ${SPACER_FULL_CLASSES.WIDTH}`;
  }

  if (direction === SPACER_DIRECTION.LEFT || direction === SPACER_DIRECTION.RIGHT) {
    return `${w} ${SPACER_FULL_CLASSES.HEIGHT}`;
  }

  return '';
}

// ─── CVA Variants ──────────────────────────────────────────────────────────
export const spacerVariants = cva('', {
  variants: {
    axis: {
      [SPACER_AXIS.BOTH]: '',
      [SPACER_AXIS.HORIZONTAL]: '',
      [SPACER_AXIS.VERTICAL]: '',
    },
    direction: {
      [SPACER_DIRECTION.TOP]: '',
      [SPACER_DIRECTION.BOTTOM]: '',
      [SPACER_DIRECTION.LEFT]: '',
      [SPACER_DIRECTION.RIGHT]: '',
      [SPACER_DIRECTION.ALL]: '',
    },
  },
  defaultVariants: {
    axis: SPACER_AXIS.BOTH,
    direction: SPACER_DIRECTION.ALL,
  },
});

export { buildDirectionClass };
export type SpacerVariantProps = NonNullable<Parameters<typeof spacerVariants>[0]>;