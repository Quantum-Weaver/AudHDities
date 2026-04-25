// src/types/components/bifrost/section.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SECTION TYPES                                          ║
// ║                    Pure interfaces                                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ContainerSize } from '@/types/components/hof/container.types';
import type {
  SECTION_SPACING,
  SECTION_VARIANTS,
  SECTION_TITLE_ALIGN,
} from '@/lib/constants/components/bifrost/section.constants';

// ─── Variant types derived from constants ──────────────────────────────────
export type SectionSpacing =
  (typeof SECTION_SPACING)[keyof typeof SECTION_SPACING];

export type SectionVariant =
  (typeof SECTION_VARIANTS)[keyof typeof SECTION_VARIANTS];

export type SectionTitleAlign =
  (typeof SECTION_TITLE_ALIGN)[keyof typeof SECTION_TITLE_ALIGN];

// ─── Main Section Props ────────────────────────────────────────────────────
export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Vertical padding for the section */
  spacing?: SectionSpacing;
  /** Visual variant of the section */
  variant?: SectionVariant;
  /** Container size (max-width constraint) */
  containerSize?: ContainerSize;
  /** Whether to use a container (width constraint) */
  withContainer?: boolean;
  /** Remove top spacing */
  noTopSpacing?: boolean;
  /** Remove bottom spacing */
  noBottomSpacing?: boolean;
  /** Add a subtle top border */
  bordered?: boolean;
  /** Add a subtle separator above the section */
  separator?: boolean;
  /** Section title */
  title?: string;
  /** Section description/subtitle */
  description?: string;
  /** Align title and description */
  titleAlign?: SectionTitleAlign;
}

// ─── Section Header Props ──────────────────────────────────────────────────
export interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: SectionTitleAlign;
  className?: string;
}

// ─── Section Divider Props ─────────────────────────────────────────────────
export interface SectionDividerProps {
  className?: string;
}

// ─── Section Group Props ───────────────────────────────────────────────────
export interface SectionGroupProps {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  className?: string;
}