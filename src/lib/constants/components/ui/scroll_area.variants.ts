// src/lib/constants/components/ui/scroll_area.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCROLL AREA VARIANTS                                   ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SCROLL_ORIENTATION,
  SCROLLBAR_VISIBILITY,
  SCROLLBAR_THICKNESS,
  SCROLL_AREA_ROUNDED,
  SCROLL_AREA_BORDER,
  SCROLL_AREA_BACKGROUND,
  SCROLLBAR_WEBKIT_BASE,
} from './scroll_area.constants';

// ─── ScrollArea Root Variants ──────────────────────────────────────────────
export const scrollAreaVariants = cva(
  [
    ...SCROLLBAR_WEBKIT_BASE,
  ].join(' '),
  {
    variants: {
      orientation: {
        vertical: SCROLL_ORIENTATION.vertical,
        horizontal: SCROLL_ORIENTATION.horizontal,
        both: SCROLL_ORIENTATION.both,
      },
      visibility: {
        always: SCROLLBAR_VISIBILITY.always,
        auto: SCROLLBAR_VISIBILITY.auto,
        hover: SCROLLBAR_VISIBILITY.hover,
        hidden: SCROLLBAR_VISIBILITY.hidden,
      },
      thickness: {
        thin: SCROLLBAR_THICKNESS.thin.webkit,
        normal: SCROLLBAR_THICKNESS.normal.webkit,
        wide: SCROLLBAR_THICKNESS.wide.webkit,
      },
      rounded: {
        none: '',
        sm: SCROLL_AREA_ROUNDED.sm,
        md: SCROLL_AREA_ROUNDED.md,
        lg: SCROLL_AREA_ROUNDED.lg,
        xl: SCROLL_AREA_ROUNDED.xl,
        '2xl': SCROLL_AREA_ROUNDED['2xl'],
        '3xl': SCROLL_AREA_ROUNDED['3xl'],
      },
      bordered: {
        true: SCROLL_AREA_BORDER,
        false: '',
      },
      background: {
        true: SCROLL_AREA_BACKGROUND,
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      visibility: 'auto',
      thickness: 'normal',
      rounded: 'none',
      bordered: false,
      background: false,
    },
  }
);

export type ScrollAreaVariantProps = NonNullable<
  Parameters<typeof scrollAreaVariants>[0]
>;