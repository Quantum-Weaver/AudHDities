// src/types/components/hof/stack.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    STACK TYPES                                            ║
// ║                    All type definitions for the Stack component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  StackSpacing,
  StackAlign,
  StackJustify,
  StackDirection,
} from '@/lib/constants/components/hof/stack.constants';

// ─── Re-exports ─────────────────────────────────────────────────────────────
export type { StackSpacing, StackAlign, StackJustify, StackDirection };

// ─── Main Props ─────────────────────────────────────────────────────────────
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between children */
  space?: StackSpacing;
  /** Vertical alignment of children */
  align?: StackAlign;
  /** Horizontal alignment of children */
  justify?: StackJustify;
  /** Direction of the stack */
  direction?: StackDirection;
  /** Show dividers between children */
  dividers?: boolean;
  /** Wrap children on multiple lines (horizontal only) */
  wrap?: boolean;
  /** Reverse order of children */
  reverse?: boolean;
  /** Stretch children to fill available space (vertical only) */
  stretch?: boolean;
  /** Responsive spacing overrides */
  responsive?: {
    mobile?: StackSpacing;
    tablet?: StackSpacing;
    desktop?: StackSpacing;
  };
}

// ─── Responsive Stack Props ─────────────────────────────────────────────────
export interface ResponsiveStackProps extends Omit<StackProps, 'direction'> {
  directionMobile?: StackDirection;
  directionTablet?: StackDirection;
  directionDesktop?: StackDirection;
}