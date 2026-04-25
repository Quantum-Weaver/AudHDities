// src/types/components/ui/container.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTAINER TYPES                                        ║
// ║                    All type definitions for the Container component       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  ContainerSize,
  ContainerPadding,
  ContainerVisualVariant,
} from '@/lib/constants/components/ui/container.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ContainerSize, ContainerPadding, ContainerVisualVariant };

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint */
  size?: ContainerSize;
  /** Horizontal padding */
  padding?: ContainerPadding;
  /** Vertical padding */
  paddingY?: ContainerPadding;
  /** Top padding */
  paddingTop?: ContainerPadding;
  /** Bottom padding */
  paddingBottom?: ContainerPadding;
  /** Center content horizontally */
  centered?: boolean;
  /** Remove all padding */
  noPadding?: boolean;
  /** Make container full width with max-width constraint */
  fluid?: boolean;
  /** Visual variant */
  visual?: ContainerVisualVariant;
  /** Add a subtle border (shorthand for visual="bordered") */
  bordered?: boolean;
  /** Add a background (shorthand for visual="background") */
  background?: boolean;
  /** Add a subtle shadow (shorthand for visual="elevated") */
  elevated?: boolean;
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

// ─── Shortcut Props ────────────────────────────────────────────────────────
export type PageContainerProps = Omit<
  ContainerProps,
  'size' | 'padding' | 'paddingY'
>;

export type SectionContainerProps = Omit<
  ContainerProps,
  'size' | 'paddingY'
>;

export type NarrowContainerProps = Omit<ContainerProps, 'size'>;

export type WideContainerProps = Omit<ContainerProps, 'size'>;

export type HeroContainerProps = Omit<
  ContainerProps,
  'size' | 'paddingY' | 'background'
>;

export type FooterContainerProps = Omit<
  ContainerProps,
  'size' | 'paddingY' | 'bordered'
>;