// src/types/components/runes/table.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABLE TYPES                                            ║
// ║                    All type definitions for the Table component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  TableVariant,
  TableSize,
} from '@/lib/constants/components/runes/table.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type { TableVariant, TableSize };

// ─── Table Root ────────────────────────────────────────────────────────────
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  fullWidth?: boolean;
}

// ─── Table Row ─────────────────────────────────────────────────────────────
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  interactive?: boolean;
}

// ─── Table Head ────────────────────────────────────────────────────────────
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  size?: TableSize;
}

// ─── Table Cell ────────────────────────────────────────────────────────────
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  size?: TableSize;
}