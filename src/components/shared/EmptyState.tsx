// src/components/shared/EmptyState.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    EMPTY STATE COMPONENT                                  ║
// ║                    No results / empty state fallback                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { EmptyStateProps } from '@/types/components/shared/empty_state.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  emptyStateContainerVariants,
  emptyStateIconContainerVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
} from '@/lib/constants/components/shared/empty_state.variants';

/**
 * EmptyState — Displayed when a list, search, or view has no results.
 *
 * Supports four visual variants (default, quantum, cosmic, sanctuary),
 * three sizes (compact, default, spacious), and two layouts (centered, horizontal).
 *
 * @example
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search terms."
 *   icon={<SearchIcon />}
 *   actionLabel="Clear Filters"
 *   onAction={() => resetFilters()}
 *   variant="quantum"
 * />
 */
export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
  size = 'default',
  variant = 'default',
  layout = 'centered',
}: EmptyStateProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={cn(
        emptyStateContainerVariants({ size, variant }),
        isHorizontal && 'flex items-center justify-center gap-4 text-left',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            emptyStateIconContainerVariants({ size }),
            isHorizontal && 'mb-0 flex-shrink-0'
          )}
        >
          <span className={emptyStateIconVariants({ size, variant })}>
            {icon}
          </span>
        </div>
      )}

      <div className={cn(isHorizontal && 'flex flex-col')}>
        <h3 className={emptyStateTitleVariants({ size, variant })}>
          {title}
        </h3>

        {description && (
          <p className={emptyStateDescriptionVariants({ size, variant })}>
            {description}
          </p>
        )}

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant={variant === 'default' ? 'secondary' : 'ghost'}
            size="sm"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}