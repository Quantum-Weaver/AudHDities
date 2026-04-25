// src/components/ui/Table.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABLE COMPONENT                                        ║
// ║                    The structured data grid                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  TableProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableVariant,
  TableSize,
} from '@/types/components/ui/table.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  tableVariants,
  tableCellVariants,
  tableRowVariants,
  tableSortIconColors,
} from '@/lib/constants/components/runes/table.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  TABLE_BORDER_RADIUS,
  TABLE_WRAPPER_CLASSES,
  TABLE_LAST_ROW_NO_BORDER,
  TABLE_FOOTER_BG,
  TABLE_TEXT_MUTED,
  TABLE_TEXT_HOVER,
  TABLE_TEXT_CAPTION,
  TABLE_SORT_ICON_SIZE,
  TABLE_SORT_ICON_OFFSET,
} from '@/lib/constants/components/runes/table.constants';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE ROOT
// ═══════════════════════════════════════════════════════════════════════════

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', size = 'md', fullWidth = true, className, children, ...props }, ref) => (
    <div className={cn(TABLE_WRAPPER_CLASSES, variant === 'bordered' && TABLE_BORDER_RADIUS)}>
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant }),
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE HEADER
// ═══════════════════════════════════════════════════════════════════════════

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE BODY
// ═══════════════════════════════════════════════════════════════════════════

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(TABLE_LAST_ROW_NO_BORDER, className)} {...props} />
));
TableBody.displayName = 'TableBody';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE FOOTER
// ═══════════════════════════════════════════════════════════════════════════

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t', TABLE_FOOTER_BG, 'font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE ROW
// ═══════════════════════════════════════════════════════════════════════════

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ interactive }), className)}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE HEAD
// ═══════════════════════════════════════════════════════════════════════════

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortDirection, onSort, size = 'md', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'text-left align-middle font-medium',
        TABLE_TEXT_MUTED,
        tableCellVariants({ size }),
        onSort && `cursor-pointer select-none ${TABLE_TEXT_HOVER}`,
        className
      )}
      onClick={onSort}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {onSort && (
          <span className="inline-flex flex-col">
            <ChevronUp
              className={cn(
                TABLE_SORT_ICON_SIZE,
                TABLE_SORT_ICON_OFFSET.up,
                sortDirection === 'asc'
                  ? tableSortIconColors.active
                  : tableSortIconColors.inactive
              )}
            />
            <ChevronDown
              className={cn(
                TABLE_SORT_ICON_SIZE,
                TABLE_SORT_ICON_OFFSET.down,
                sortDirection === 'desc'
                  ? tableSortIconColors.active
                  : tableSortIconColors.inactive
              )}
            />
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = 'TableHead';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE CELL
// ═══════════════════════════════════════════════════════════════════════════

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size }), className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE CAPTION
// ═══════════════════════════════════════════════════════════════════════════

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm', TABLE_TEXT_CAPTION, className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  TableVariant,
  TableSize,
} from '@/types/components/ui/table.types';