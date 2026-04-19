// components/ui/Table.tsx
// Table Component - The structured data grid
// Presents tabular data with sorting and accessibility

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type TableVariant = 'default' | 'bordered' | 'minimal';
export type TableSize = 'sm' | 'md' | 'lg';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Visual variant */
  variant?: TableVariant;
  /** Size of table cells */
  size?: TableSize;
  /** Make table full width */
  fullWidth?: boolean;
}

const variantClasses: Record<TableVariant, string> = {
  default: 'w-full caption-bottom text-sm',
  bordered: 'w-full caption-bottom text-sm border border-white/10 rounded-lg',
  minimal: 'w-full caption-bottom text-sm',
};

const cellSizeClasses: Record<TableSize, string> = {
  sm: 'px-2 py-1.5',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
};

/**
 * Table Component
 * 
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Role</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Quantum Weaver</TableCell>
 *       <TableCell>Creator</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', size = 'md', fullWidth = true, className, children, ...props }, ref) => (
    <div className={cn('relative overflow-x-auto', variant === 'bordered' && 'rounded-lg')}>
      <table
        ref={ref}
        className={cn(
          variantClasses[variant],
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

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-white/5 font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Make row interactive */
  interactive?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-white/10 transition-colors',
        interactive && 'hover:bg-white/5 cursor-pointer',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback when sort is requested */
  onSort?: () => void;
  /** Size of the cell */
  size?: TableSize;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortDirection, onSort, size = 'md', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'text-left align-middle font-medium text-white/60',
        cellSizeClasses[size],
        onSort && 'cursor-pointer select-none hover:text-white/80',
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
                'h-3 w-3 -mb-1',
                sortDirection === 'asc' ? 'text-cyan-400' : 'text-white/30'
              )}
            />
            <ChevronDown
              className={cn(
                'h-3 w-3 -mt-1',
                sortDirection === 'desc' ? 'text-cyan-400' : 'text-white/30'
              )}
            />
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Size of the cell */
  size?: TableSize;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <td
      ref={ref}
      className={cn('align-middle', cellSizeClasses[size], className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-white/40', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';