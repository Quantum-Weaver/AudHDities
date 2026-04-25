// src/types/components/seidr/drawer.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DRAWER TYPES                                           ║
// ║                    All type definitions for the Drawer component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  DrawerSide,
  DrawerSize,
  DrawerFooterAlign,
} from '@/lib/constants/components/seidr/drawer.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { DrawerSide, DrawerSize, DrawerFooterAlign };

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: string;
  /** Drawer description/subtitle */
  description?: string;
  /** Side from which the drawer slides in */
  side?: DrawerSide;
  /** Size of the drawer */
  size?: DrawerSize;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Close drawer when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close drawer when pressing Escape key */
  closeOnEscape?: boolean;
  /** Prevent scroll on body when drawer is open */
  preventScroll?: boolean;
  /** Remove padding from drawer content */
  noPadding?: boolean;
  /** Custom className for the drawer container */
  className?: string;
  /** Custom className for the drawer content */
  contentClassName?: string;
  /** Custom className for the backdrop */
  backdropClassName?: string;
  /** Children */
  children: React.ReactNode;
}

// ─── Sub-Component Props ────────────────────────────────────────────────────
export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Show close button */
  showCloseButton?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

export interface DrawerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding */
  noPadding?: boolean;
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Align footer buttons */
  align?: DrawerFooterAlign;
}

export interface FilterDrawerProps {
  /** Whether drawer is open */
  open: boolean;
  /** Callback when drawer closes */
  onClose: () => void;
  /** Current filter values */
  filters?: Record<string, unknown>;
  /** Callback when filters are applied */
  onApply?: (filters: Record<string, unknown>) => void;
  /** Callback when filters are reset */
  onReset?: () => void;
}