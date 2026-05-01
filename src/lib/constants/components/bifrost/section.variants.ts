// src/lib/constants/components/bifrost/section.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SECTION VARIANTS                                       ║
// ║                    CVA definitions referencing COSMIC tokens              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  SECTION_VARIANTS,
  SECTION_SPACING_MAP,
  SECTION_TITLE_SIZE,
  SECTION_TITLE_WEIGHT,
  SECTION_TITLE_MARGIN_BOTTOM,
  SECTION_TITLE_DESCRIPTION_GAP,
  SECTION_DIVIDER_WIDTH,
  SECTION_DIVIDER_HEIGHT,
  SECTION_SEPARATOR_WIDTH,
  SECTION_SEPARATOR_HEIGHT,
  SECTION_TITLE_ALIGN,
  SECTION_CONTENT_PADDING_X,
} from './section.constants';

// ─── Section Root Variants ─────────────────────────────────────────────────
export const sectionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        [SECTION_VARIANTS.DEFAULT]: '',
        [SECTION_VARIANTS.MUTED]: 'bg-white/5',
        [SECTION_VARIANTS.GLOW]:
          'bg-gradient-to-r from-transparent via-neurospark/5 to-transparent',
        [SECTION_VARIANTS.GRADIENT]:
          'bg-gradient-to-b from-quantum-purple/10 via-transparent to-transparent',
        [SECTION_VARIANTS.GLASS]:
          'bg-white/5 backdrop-blur-sm border-y border-white/10',
      },
      bordered: {
        true: 'border-t border-white/10',
        false: '',
      },
      separator: {
        true: [
          'relative',
          SECTION_SEPARATOR_WIDTH,
          SECTION_SEPARATOR_HEIGHT,
          'before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2',
          'before:bg-gradient-to-r before:from-transparent before:via-neurospark before:to-transparent',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      variant: SECTION_VARIANTS.DEFAULT,
      bordered: false,
      separator: false,
    },
  }
);

// ─── Section Title Variants ────────────────────────────────────────────────
export const sectionTitleVariants = cva(
  [
    SECTION_TITLE_SIZE,
    SECTION_TITLE_WEIGHT,
    'text-star-dust',
    SECTION_TITLE_DESCRIPTION_GAP,
  ].join(' '),
  {
    variants: {
      align: {
        [SECTION_TITLE_ALIGN.LEFT]: 'text-left',
        [SECTION_TITLE_ALIGN.CENTER]: 'text-center mx-auto',
        [SECTION_TITLE_ALIGN.RIGHT]: 'text-right',
      },
    },
    defaultVariants: {
      align: SECTION_TITLE_ALIGN.CENTER,
    },
  }
);

// ─── Section Description Variants ──────────────────────────────────────────
export const sectionDescriptionVariants = cva(
  'text-star-dust/60 max-w-2xl',
  {
    variants: {
      align: {
        [SECTION_TITLE_ALIGN.LEFT]: 'text-left',
        [SECTION_TITLE_ALIGN.CENTER]: 'mx-auto text-center',
        [SECTION_TITLE_ALIGN.RIGHT]: 'text-right ml-auto',
      },
    },
    defaultVariants: {
      align: SECTION_TITLE_ALIGN.CENTER,
    },
  }
);

// ─── Section Header Container ──────────────────────────────────────────────
export const sectionHeaderVariants = cva(
  SECTION_TITLE_MARGIN_BOTTOM,
  {
    variants: {
      align: {
        [SECTION_TITLE_ALIGN.LEFT]: 'text-left',
        [SECTION_TITLE_ALIGN.CENTER]: 'text-center',
        [SECTION_TITLE_ALIGN.RIGHT]: 'text-right',
      },
      hasContainer: {
        true: '',
        false: SECTION_CONTENT_PADDING_X,
      },
    },
    defaultVariants: {
      align: SECTION_TITLE_ALIGN.CENTER,
      hasContainer: true,
    },
  }
);

// ─── Section Divider Variants ──────────────────────────────────────────────
export const sectionDividerVariants = cva(
  [
    SECTION_DIVIDER_WIDTH,
    SECTION_DIVIDER_HEIGHT,
    'bg-gradient-to-r from-transparent via-neurospark to-transparent',
    'mx-auto',
  ].join(' ')
);

// ─── Type exports ──────────────────────────────────────────────────────────
export type SectionVariantProp = NonNullable<
  Parameters<typeof sectionVariants>[0]
>['variant'];

export type SectionTitleAlignProp = NonNullable<
  Parameters<typeof sectionTitleVariants>[0]
>['align'];