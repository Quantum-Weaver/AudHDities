// src/lib/constants/components/ui/table.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABLE VARIANTS                                         ║
// ║                    CVA definitions — color/state mappings only            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic';
import {
  TABLE_CELL_PADDING,
  TABLE_BORDER_RADIUS,
  TABLE_ROW_BORDER,
  TABLE_TEXT_MUTED,
  TABLE_TEXT_HOVER,
  TABLE_ROW_HOVER_BG,
  TABLE_TEXT_DIM,
} from './table.constants';

// ─── Selection types ───────────────────────────────────────────────────────
type VariantProp = { variant: NonNullable<Parameters<typeof tableVariants>[0]>['variant'] };
type SizeProp = { size: NonNullable<Parameters<typeof tableCellVariants>[0]>['size'] };

// ─── Table Root Variants ───────────────────────────────────────────────────
export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        bordered: [
          `border border-white/10`,
          TABLE_BORDER_RADIUS,
        ].join(' '),
        minimal: '',
        striped: '',
        compact: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Table Cell Variants ───────────────────────────────────────────────────
export const tableCellVariants = cva(
  'align-middle',
  {
    variants: {
      size: {
        sm: [
          TABLE_CELL_PADDING.sm.x,
          TABLE_CELL_PADDING.sm.y,
        ].join(' '),
        md: [
          TABLE_CELL_PADDING.md.x,
          TABLE_CELL_PADDING.md.y,
        ].join(' '),
        lg: [
          TABLE_CELL_PADDING.lg.x,
          TABLE_CELL_PADDING.lg.y,
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Table Row Variants ────────────────────────────────────────────────────
export const tableRowVariants = cva(
  [
    TABLE_ROW_BORDER,
    'transition-colors',
  ].join(' '),
  {
    variants: {
      interactive: {
        true: [TABLE_ROW_HOVER_BG, 'cursor-pointer'].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

// ─── Sort Icon Color ───────────────────────────────────────────────────────
export const tableSortIconColors = {
  active: 'text-neurospark',
  inactive: TABLE_TEXT_DIM,
} as const;

export type TableVariant = VariantProp['variant'];
export type TableSize = SizeProp['size'];