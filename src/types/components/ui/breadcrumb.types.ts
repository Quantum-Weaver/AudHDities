// src/types/components/ui/breadcrumb.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BREADCRUMB TYPES                                       ║
// ║                    All type definitions for the Breadcrumb component      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  BreadcrumbSize,
  BreadcrumbSeparatorType,
} from '@/lib/constants/components/ui/breadcrumb.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { BreadcrumbSize, BreadcrumbSeparatorType };

// ─── Item ───────────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
}

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
  separator?: BreadcrumbSeparatorType;
  showHome?: boolean;
  homeHref?: string;
  maxItems?: number;
}

// ─── Dropdown Props ─────────────────────────────────────────────────────────
export interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparatorType;
  size?: BreadcrumbSize;
  dropdownLabel?: string;
}

// ─── Sub-Component Props ────────────────────────────────────────────────────
export interface BreadcrumbItemComponentProps {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
  isLast?: boolean;
  separator?: React.ReactNode;
  size?: BreadcrumbSize;
  className?: string;
}

export interface BreadcrumbSeparatorComponentProps {
  children?: React.ReactNode;
  type?: BreadcrumbSeparatorType;
  className?: string;
}

export interface BreadcrumbListProps
  extends React.HTMLAttributes<HTMLOListElement> {
  size?: BreadcrumbSize;
}

export interface BreadcrumbWithDropdownProps
  extends Omit<BreadcrumbProps, 'maxItems'> {
  maxItems?: number;
  dropdownLabel?: string;
}