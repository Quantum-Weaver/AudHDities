// src/types/components/ui/divider.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIVIDER TYPES                                          ║
// ║                    All type definitions for the Divider component         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  DividerVariant,
  DividerLineStyle,
  DividerOrientation,
} from '@/lib/constants/components/ui/divider.variants';
import type {
  DividerThickness,
  DividerLength,
  DividerSpacingSize,
} from '@/lib/constants/components/ui/divider.constants';

// ─── Re-exports ─────────────────────────────────────────────────────────────
export type {
  DividerVariant,
  DividerLineStyle,
  DividerOrientation,
  DividerThickness,
  DividerLength,
  DividerSpacingSize,
};

// ─── Main Props ─────────────────────────────────────────────────────────────
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the divider */
  variant?: DividerVariant;
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Line style (solid, dashed, dotted) */
  lineStyle?: DividerLineStyle;
  /** Optional label text to display in the center */
  label?: string;
  /** Optional icon to display with label */
  icon?: React.ReactNode;
  /** Thickness of the divider line */
  thickness?: DividerThickness;
  /** Length of the divider */
  length?: DividerLength;
  /** Add spacing around the divider */
  spaced?: boolean;
  /** Custom spacing size */
  spacingSize?: DividerSpacingSize;
  /** Animate the divider on appear */
  animated?: boolean;
}

// ─── Composition Props ──────────────────────────────────────────────────────
export interface DividerWithTextProps {
  text: string;
  variant?: DividerVariant;
  icon?: React.ReactNode;
  className?: string;
}

export interface SectionDividerProps {
  title: string;
  subtitle?: string;
  variant?: DividerVariant;
  className?: string;
}