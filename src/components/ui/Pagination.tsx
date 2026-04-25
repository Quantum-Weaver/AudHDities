// src/components/ui/Pagination.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION COMPONENT                                   ║
// ║                    The bookmark of the interface                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  PaginationProps,
  PaginationInfoProps,
  PaginationSize,
  PaginationVariant,
  PageNumberItem,
} from '@/types/components/ui/pagination.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  PAGINATION_BUTTON_SIZE,
  PAGINATION_ICON_SIZE,
  PAGINATION_DEFAULT_SIBLING_COUNT,
  PAGINATION_DEFAULT_PAGE_SIZES,
  PAGINATION_DEFAULT_PAGE_SIZE,
  PAGINATION_SELECT_PADDING,
  PAGINATION_CONTAINER_GAP,
  PAGINATION_BUTTON_GAP,
  PAGINATION_SELECT_GAP,
} from '@/lib/constants/components/ui/pagination.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  paginationButtonVariants,
  paginationActiveButtonVariants,
  paginationSelectVariants,
} from '@/lib/constants/components/ui/pagination.variants';

// ═══════════════════════════════════════════════════════════════════════════
// PAGE NUMBER GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate the array of page numbers and ellipses to display.
 * Pure logic — no styling dependencies.
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  compact: boolean
): PageNumberItem[] {
  const totalPageNumbers = siblingCount * 2 + (compact ? 3 : 5);

  // All pages fit — no ellipsis needed
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Only right ellipsis needed
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = (compact ? 3 : 5) + siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', lastPageIndex];
  }

  // Only left ellipsis needed
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = (compact ? 3 : 5) + siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }

  // Both ellipses needed
  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
  }

  return [];
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGINATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Pagination — Divides large datasets into manageable pages.
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
 *   variant="outline"
 * />
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = PAGINATION_DEFAULT_SIBLING_COUNT,
      showFirstLast = false,
      showPageSize = false,
      pageSizeOptions = [...PAGINATION_DEFAULT_PAGE_SIZES],
      pageSize = PAGINATION_DEFAULT_PAGE_SIZE,
      onPageSizeChange,
      size = 'MD',
      variant = 'default',
      compact = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount, compact);
    const sizeConfig = PAGINATION_BUTTON_SIZE[size];

    const handlePageChange = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
        onPageChange(page);
      }
    };

    // Hide pagination if only one page and no page size selector
    if (totalPages <= 1 && !showPageSize) {
      return null;
    }

    const buttonClass = cn(
      paginationButtonVariants({ variant }),
      sizeConfig.height,
      sizeConfig.width,
      sizeConfig.textSize
    );

    const activeButtonClass = cn(
      paginationActiveButtonVariants({ variant }),
      sizeConfig.height,
      sizeConfig.width,
      sizeConfig.textSize
    );

    const selectClass = cn(
      paginationSelectVariants({ variant }),
      PAGINATION_SELECT_PADDING.X,
      PAGINATION_SELECT_PADDING.Y
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col sm:flex-row items-center justify-between',
          PAGINATION_CONTAINER_GAP,
          className
        )}
      >
        {/* ── Page Navigation ── */}
        <div className={cn('flex items-center', PAGINATION_BUTTON_GAP)}>
          {showFirstLast && (
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || disabled}
              className={buttonClass}
              aria-label="First page"
            >
              <ChevronsLeft className={PAGINATION_ICON_SIZE.CHEVRON} />
            </button>
          )}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            className={buttonClass}
            aria-label="Previous page"
          >
            <ChevronLeft className={PAGINATION_ICON_SIZE.CHEVRON} />
          </button>

          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === 'ellipsis' ? (
                <span
                  className={cn(
                    'flex items-center justify-center text-white/40',
                    sizeConfig.height,
                    sizeConfig.width,
                    sizeConfig.textSize
                  )}
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePageChange(page as number)}
                  disabled={disabled}
                  className={cn(
                    currentPage === page ? activeButtonClass : buttonClass
                  )}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            className={buttonClass}
            aria-label="Next page"
          >
            <ChevronRight className={PAGINATION_ICON_SIZE.CHEVRON} />
          </button>

          {showFirstLast && (
            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || disabled}
              className={buttonClass}
              aria-label="Last page"
            >
              <ChevronsRight className={PAGINATION_ICON_SIZE.CHEVRON} />
            </button>
          )}
        </div>

        {/* ── Page Size Selector ── */}
        {showPageSize && onPageSizeChange && (
          <div className={cn('flex items-center', PAGINATION_SELECT_GAP)}>
            <span className="text-sm text-white/60">Show</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className={selectClass}
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

        {/* ── Compact Info ── */}
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

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * CompactPagination — Smaller buttons, fewer visible page numbers.
 *
 * @example
 * <CompactPagination currentPage={1} totalPages={10} onPageChange={setPage} />
 */
export const CompactPagination = React.forwardRef<
  HTMLDivElement,
  Omit<PaginationProps, 'compact'>
>((props, ref) => <Pagination ref={ref} compact {...props} />);
CompactPagination.displayName = 'CompactPagination';

/**
 * SimplePagination — Previous/Next buttons only with page indicator.
 * Uses the Button component for its triggers.
 *
 * @example
 * <SimplePagination currentPage={1} totalPages={10} onPageChange={setPage} />
 */
export const SimplePagination = React.forwardRef<
  HTMLDivElement,
  Omit<PaginationProps, 'showFirstLast' | 'siblingCount'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', PAGINATION_SELECT_GAP, className)}>
    <Button
      variant="outline"
      size="sm"
      onClick={() => props.onPageChange(props.currentPage - 1)}
      disabled={props.currentPage === 1}
    >
      <ChevronLeft className={PAGINATION_ICON_SIZE.CHEVRON} />
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
      <ChevronRight className={PAGINATION_ICON_SIZE.CHEVRON} />
    </Button>
  </div>
));
SimplePagination.displayName = 'SimplePagination';

// ═══════════════════════════════════════════════════════════════════════════
// PAGINATION INFO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PaginationInfo — Displays "Showing X-Y of Z items".
 *
 * @example
 * <PaginationInfo currentPage={1} pageSize={20} totalItems={145} />
 */
export const PaginationInfo = React.forwardRef<HTMLDivElement, PaginationInfoProps>(
  ({ currentPage, pageSize, totalItems, className }, ref) => {
    if (totalItems === 0) {
      return (
        <div ref={ref} className={cn('text-sm text-white/60', className)}>
          Showing 0 items
        </div>
      );
    }

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    return (
      <div ref={ref} className={cn('text-sm text-white/60', className)}>
        Showing {start} to {end} of {totalItems} items
      </div>
    );
  }
);
PaginationInfo.displayName = 'PaginationInfo';

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type {
  PaginationProps,
  PaginationInfoProps,
  PaginationSize,
  PaginationVariant,
} from '@/types/components/ui/pagination.types';