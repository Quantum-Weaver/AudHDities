// src/lib/constants/components/yggdrasil/inline.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE VARIANTS                                        ║
// ║                    CVA definitions for Inline component                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  INLINE_BASE_CLASSES,
  INLINE_WRAP_CLASS,
  INLINE_SPACE_TO_GAP_CLASS,
  INLINE_ALIGN_TO_JUSTIFY_CLASS,
  INLINE_DEFAULT_SPACE,
  INLINE_DEFAULT_ALIGN,
  type InlineSpace,
  type InlineAlign,
} from './inline.constants';

// ─── Container Variants ────────────────────────────────────────────────────
export const inlineVariants = cva(INLINE_BASE_CLASSES, {
  variants: {
    space: INLINE_SPACE_TO_GAP_CLASS as Record<InlineSpace, string>,
    align: INLINE_ALIGN_TO_JUSTIFY_CLASS as Record<InlineAlign, string>,
    wrap: {
      true: INLINE_WRAP_CLASS,
      false: '',
    },
    // ─── Responsive variants ─────────────────────────────────────────────
    responsive: {
      none: '',
      stackOnMobile: 'flex-col sm:flex-row',
      stackOnTablet: 'flex-col md:flex-row',
    },
  },
  defaultVariants: {
    space: INLINE_DEFAULT_SPACE,
    align: INLINE_DEFAULT_ALIGN,
    wrap: true,
    responsive: 'none',
  },
});

// ─── Type exports ──────────────────────────────────────────────────────────
export type InlineVariantProps = NonNullable<
  Parameters<typeof inlineVariants>[0]
>;

export type InlineSpaceProp = InlineVariantProps['space'];
export type InlineAlignProp = InlineVariantProps['align'];
export type InlineResponsiveProp = InlineVariantProps['responsive'];