// src/lib/constants/components/vegvisir/filter_bar.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FILTER BAR VARIANTS                                    ║
// ║                    Layout and orientation variants                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  FILTER_BAR_GAP,
  FILTER_BAR_COUNT_MARGIN,
  FILTER_BAR_COUNT_FONT_SIZE,
  FILTER_BAR_COUNT_OPACITY,
} from './filter_bar.constants';

// ─── Container Variants ────────────────────────────────────────────────────
export const filterBarContainerVariants = cva(
  'flex flex-wrap',
  {
    variants: {
      /** Spacing density between filter buttons */
      density: {
        compact: `gap-1`,
        default: `gap-[${FILTER_BAR_GAP}]`,
        spacious: `gap-3`,
      },
      /** Horizontal alignment of the filter bar */
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
    },
    defaultVariants: {
      density: 'default',
      align: 'start',
    },
  }
);

// ─── Count Badge Variants ──────────────────────────────────────────────────
export const filterBarCountVariants = cva(
  [
    FILTER_BAR_COUNT_MARGIN,
    FILTER_BAR_COUNT_FONT_SIZE,
    FILTER_BAR_COUNT_OPACITY,
  ].join(' '),
  {
    variants: {
      /** Position of the count relative to the label */
      position: {
        inline: 'ml-[4px]',
        superscript: 'align-super text-[10px] -ml-[2px]',
      },
    },
    defaultVariants: {
      position: 'inline',
    },
  }
);

// ─── Derived Types ─────────────────────────────────────────────────────────
export type FilterBarDensity = NonNullable<
  Parameters<typeof filterBarContainerVariants>[0]
>['density'];

export type FilterBarAlign = NonNullable<
  Parameters<typeof filterBarContainerVariants>[0]
>['align'];

export type FilterBarCountPosition = NonNullable<
  Parameters<typeof filterBarCountVariants>[0]
>['position'];