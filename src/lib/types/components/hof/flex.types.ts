// src/types/components/hof/flex.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FLEX TYPES                                             ║
// ║                    All type definitions for the Flex component            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  FLEX_DIRECTION,
  FLEX_WRAP,
  FLEX_JUSTIFY,
  FLEX_ALIGN,
  FLEX_GAP,
  FLEX_ALIGN_SELF,
} from '@/lib/constants/components/hof/flex.constants';

// ─── Direction type (accepts the raw string values) ────────────────────────
export type FlexDirection =
  (typeof FLEX_DIRECTION)[keyof typeof FLEX_DIRECTION];

export type FlexWrap =
  (typeof FLEX_WRAP)[keyof typeof FLEX_WRAP];

export type FlexJustify =
  (typeof FLEX_JUSTIFY)[keyof typeof FLEX_JUSTIFY];

export type FlexAlign =
  (typeof FLEX_ALIGN)[keyof typeof FLEX_ALIGN];

export type FlexGap =
  (typeof FLEX_GAP)[keyof typeof FLEX_GAP];

export type FlexAlignSelf =
  (typeof FLEX_ALIGN_SELF)[keyof typeof FLEX_ALIGN_SELF];

// ─── Root Props ────────────────────────────────────────────────────────────
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of flex items */
  direction?: FlexDirection;
  /** Wrap behavior */
  wrap?: FlexWrap;
  /** Horizontal alignment (justify-content) */
  justify?: FlexJustify;
  /** Vertical alignment (align-items) */
  align?: FlexAlign;
  /** Gap between items */
  gap?: FlexGap;
  /** Row gap (overrides gap for rows) */
  rowGap?: FlexGap;
  /** Column gap (overrides gap for columns) */
  columnGap?: FlexGap;
  /** Responsive gap overrides */
  responsiveGap?: {
    mobile?: FlexGap;
    tablet?: FlexGap;
    desktop?: FlexGap;
    wide?: FlexGap;
  };
  /** As child element */
  asChild?: boolean;
}

// ─── FlexItem Props ────────────────────────────────────────────────────────
export interface FlexItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Grow factor (true = flex-grow: 1, number for flex-grow-N) */
  grow?: boolean | number;
  /** Shrink factor (true = flex-shrink, number for flex-shrink-N) */
  shrink?: boolean | number;
  /** Basis value (pixels or CSS value) */
  basis?: string | number;
  /** Order */
  order?: number;
  /** Align self override */
  alignSelf?: FlexAlignSelf;
}

// ─── ResponsiveFlex Props ──────────────────────────────────────────────────
export interface ResponsiveFlexProps
  extends Omit<FlexProps, 'direction'> {
  directionMobile?: FlexDirection;
  directionTablet?: FlexDirection;
  directionDesktop?: FlexDirection;
  directionWide?: FlexDirection;
}