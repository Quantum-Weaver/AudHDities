// components/ui/Pagination.tsx
// Pagination Component - The bookmark of the interface
// Divides large datasets into manageable pages

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';

export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'default' | 'outline' | 'minimal';

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show on each side of current page */
  siblingCount?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Current page size */
  pageSize?: number;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Size of pagination buttons */
  size?: PaginationSize;
  /** Visual variant */
  variant?: PaginationVariant;
  /** Compact mode (fewer buttons) */
  compact?: boolean;
  /** Disable pagination */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

const sizeClasses: Record<PaginationSize, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-9 w-9 text-base',
};

const variantClasses: Record<PaginationVariant, string> = {
  default: 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white',
  outline: 'border border-white/20 hover:border-white/40 text-white/80 hover:text-white',
  minimal: 'text-white/60 hover:text-white hover:bg-white/5',
};

const activeVariantClasses: Record<PaginationVariant, string> = {
  default: 'bg-cyan-500 text-white hover:bg-cyan-600',
  outline: 'border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20',
  minimal: 'text-cyan-400 bg-white/5',
};

/**
 * Generate array of page numbers to display
 */
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  compact: boolean
): (number | 'ellipsis')[] => {
  const totalPageNumbers = siblingCount * 2 + (compact ? 3 : 5);
  
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;
  
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = (compact ? 3 : 5) + siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', lastPageIndex];
  }
  
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = (compact ? 3 : 5) + siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }
  
  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
  }
  
  return [];
};

/**
 * Pagination Component
 * 
 * @example
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 * />
 * 
 * @example
 * <Pagination
 *   currentPage={page}
 *   totalPages={100}
 *   onPageChange={setPage}
 *   showFirstLast
 *   showPageSize
 *   pageSize={20}
 *   onPageSizeChange={setPageSize}
 * />
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = false,
      showPageSize = false,
      pageSizeOptions = [10, 20, 50, 100],
      pageSize = 20,
      onPageSizeChange,
      size = 'md',
      variant = 'default',
      compact = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount, compact);
    
    const handlePageChange = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
        onPageChange(page);
      }
    };
    
    if (totalPages <= 1 && !showPageSize) {
      return null;
    }
    
    const buttonClasses = cn(
      'inline-flex items-center justify-center rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant]
    );
    
    const activeButtonClasses = cn(
      buttonClasses,
      activeVariantClasses[variant]
    );
    
    return (
      <div
        ref={ref}
        className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}
      >
        <div className="flex items-center gap-1">
          {/* First Page Button */}
          {showFirstLast && (
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || disabled}
              className={buttonClasses}
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
          
          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            className={buttonClasses}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === 'ellipsis' ? (
                <span className={cn('flex items-center justify-center text-white/40', sizeClasses[size])}>
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePageChange(page as number)}
                  disabled={disabled}
                  className={cn(
                    currentPage === page ? activeButtonClasses : buttonClasses
                  )}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
          
          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            className={buttonClasses}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          {/* Last Page Button */}
          {showFirstLast && (
            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || disabled}
              className={buttonClasses}
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Page Size Selector */}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Show</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className={cn(
                'rounded-md border border-white/20 bg-white/5 px-2 py-1 text-sm text-white',
                'focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-white/60">per page</span>
          </div>
        )}
        
        {/* Page Info (compact mode fallback) */}
        {compact && !showPageSize && (
          <div className="text-sm text-white/60">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * CompactPagination - Smaller, fewer buttons
 * 
 * @example
 * <CompactPagination currentPage={1} totalPages={10} onPageChange={setPage} />
 */
export const CompactPagination = React.forwardRef<HTMLDivElement, Omit<PaginationProps, 'compact'>>(
  (props, ref) => <Pagination ref={ref} compact {...props} />
);
CompactPagination.displayName = 'CompactPagination';

/**
 * SimplePagination - Previous/Next only
 * 
 * @example
 * <SimplePagination currentPage={1} totalPages={10} onPageChange={setPage} />
 */
export const SimplePagination = React.forwardRef<HTMLDivElement, Omit<PaginationProps, 'showFirstLast' | 'siblingCount'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.onPageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-white/60">
        {props.currentPage} / {props.totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.onPageChange(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
);
SimplePagination.displayName = 'SimplePagination';

// ============================================================================
// PAGINATION INFO
// ============================================================================

export interface PaginationInfoProps {
  /** Current page number */
  currentPage: number;
  /** Page size */
  pageSize: number;
  /** Total number of items */
  totalItems: number;
  /** Custom className */
  className?: string;
}

/**
 * PaginationInfo - Displays "Showing X-Y of Z items"
 * 
 * @example
 * <PaginationInfo currentPage={1} pageSize={20} totalItems={145} />
 */
export const PaginationInfo = React.forwardRef<HTMLDivElement, PaginationInfoProps>(
  ({ currentPage, pageSize, totalItems, className }, ref) => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    
    if (totalItems === 0) {
      return (
        <div ref={ref} className={cn('text-sm text-white/60', className)}>
          Showing 0 items
        </div>
      );
    }
    
    return (
      <div ref={ref} className={cn('text-sm text-white/60', className)}>
        Showing {start} to {end} of {totalItems} items
      </div>
    );
  }
);
PaginationInfo.displayName = 'PaginationInfo';