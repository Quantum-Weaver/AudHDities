// src/types/components/ui/spacer.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPACER TYPES                                           ║
// ║                    All type definitions for the Spacer component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SpacerSize,
  SpacerAxis,
  SpacerDirection,
  SpacerResponsiveBreakpoint,
} from '@/lib/constants/components/ui/spacer.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SpacerSize, SpacerAxis, SpacerDirection, SpacerResponsiveBreakpoint };

// ─── Spacer Props ──────────────────────────────────────────────────────────
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spacer */
  size?: SpacerSize;
  /** Axis of spacing */
  axis?: SpacerAxis;
  /** Specific direction */
  direction?: SpacerDirection;
  /** Make spacer grow to fill available space (flex context) */
  grow?: boolean;
  /** Make spacer shrink (flex context) */
  shrink?: boolean;
  /** Base pixel size override (bypasses semantic sizes) */
  px?: number;
  /** Responsive size overrides per breakpoint */
  responsive?: Partial<Record<SpacerResponsiveBreakpoint, SpacerSize>>;
  /** Render as child element instead of div */
  asChild?: boolean;
}

// ─── Shortcut Props ────────────────────────────────────────────────────────
export interface VSpacerProps extends Omit<SpacerProps, 'axis'> {}
export interface HSpacerProps extends Omit<SpacerProps, 'axis'> {}
export interface FlexSpacerProps extends Omit<SpacerProps, 'grow' | 'size'> {}
export interface DirectionalSpacerProps extends Omit<SpacerProps, 'direction'> {}

// ─── SpacerGroup Props ─────────────────────────────────────────────────────
export interface SpacerGroupProps {
  children: React.ReactNode;
  spacing?: SpacerSize;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}