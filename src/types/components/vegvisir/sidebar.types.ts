// src/types/components/vegvisir/sidebar.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIDEBAR TYPES                                          ║
// ║                    All type definitions for the Sidebar component         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SidebarVariant,
  SidebarPosition,
  SidebarBadgeVariant,
  SidebarGroupLabelVariant,
} from '@/lib/constants/components/vegvisir/sidebar.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type {
  SidebarVariant,
  SidebarPosition,
  SidebarBadgeVariant,
  SidebarGroupLabelVariant,
};

// ─── Navigation Item ───────────────────────────────────────────────────────
export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon?: React.ReactNode;
  /** URL path */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Nested items */
  children?: SidebarItem[];
  /** Whether item is active */
  isActive?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Badge count or content */
  badge?: string | number;
  /** Badge visual variant */
  badgeVariant?: SidebarBadgeVariant;
}

// ─── Context ───────────────────────────────────────────────────────────────
export interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  variant: SidebarVariant;
  position: SidebarPosition;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
}

// ─── Root Props ────────────────────────────────────────────────────────────
export interface SidebarProps {
  /** Sidebar items */
  items: SidebarItem[];
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Visual variant */
  variant?: SidebarVariant;
  /** Position of sidebar */
  position?: SidebarPosition;
  /** Width of sidebar when expanded */
  width?: number;
  /** Width of sidebar when collapsed */
  collapsedWidth?: number;
  /** Show collapse toggle button */
  showToggle?: boolean;
  /** Mobile drawer mode (overlay on small screens) */
  mobileDrawer?: boolean;
  /** Custom header content */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Children (custom content below navigation) */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

// ─── Sub-Component Props ───────────────────────────────────────────────────
export interface SidebarNavItemProps {
  item: SidebarItem;
  depth?: number;
}

export interface SidebarGroupProps {
  /** Group label */
  label?: string;
  /** Group label visual variant */
  labelVariant?: SidebarGroupLabelVariant;
  /** Group items */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo or brand element */
  logo?: React.ReactNode;
  /** Brand name */
  brand?: string;
}

export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** User avatar */
  avatar?: React.ReactNode;
  /** User name */
  name?: string;
  /** User email */
  email?: string;
}