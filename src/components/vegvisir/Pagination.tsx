// src/components/vegvisir/Pagination.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION COMPONENT                                   ║
// ║                    The bookmark of the interface                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../yggdrasil/Button';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  PaginationProps,
  PaginationInfoProps,
  PaginationSize,
  PaginationVariant,
  PageNumberItem,
} from '@/types/components/vegvisir/pagination.types';

// ─── Utilities ─────────────────────────────────────────────────────────────────
import { getPageNumbers, getPageRange } from '@/lib/utils/components/vegvisir/pagination.utils';

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
  SIZE_KEY_MAP,
} from '@/lib/constants/components/vegvisir/pagination.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  paginationButtonVariants,
  paginationActiveButtonVariants,
  paginationSelectVariants,
} from '@/lib/constants/components/vegvisir/pagination.variants';

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
      size = 'md',
      variant = 'default',
      compact = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const pageNumbers = getPageNumbers({
      currentPage,
      totalPages,
      siblingCount,
      compact,
    });
    const sizeConfig = PAGINATION_BUTTON_SIZE[SIZE_KEY_MAP[size]];

    const handlePageChange = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
        onPageChange(page);
      }
    };

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
                    'flex items-center justify-center text-star-dust/40',
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

        {showPageSize && onPageSizeChange && (
          <div className={cn('flex items-center', PAGINATION_SELECT_GAP)}>
            <span className="text-sm text-star-dust/60">Show</span>
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
            <span className="text-sm text-star-dust/60">per page</span>
          </div>
        )}

        {/* ── Compact Info ── */}
        {compact && !showPageSize && (
          <div className="text-sm text-star-dust/60">
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
    <span className="text-sm text-star-dust/60">
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
        <div ref={ref} className={cn('text-sm text-star-dust/60', className)}>
          Showing 0 items
        </div>
      );
    }

    const { start, end } = getPageRange(currentPage, pageSize, totalItems);

    return (
      <div ref={ref} className={cn('text-sm text-star-dust/60', className)}>
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
} from '@/types/components/vegvisir/pagination.types';