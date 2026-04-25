// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BADGE COMPONENT                                        ║
// ║                    The status indicator                                    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  BadgeProps,
  BadgeGroupProps,
} from '@/types/components/runes/badge.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  badgeVariants,
  BADGE_HOVER_OVERRIDES,
} from '@/lib/constants/components/ui/badge.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  BADGE_RADIUS_DEFAULT,
  BADGE_RADIUS_PILL,
  BADGE_DOT_SIZES,
  BADGE_REMOVE_PADDING,
  BADGE_REMOVE_ICON_SIZE,
  BADGE_GROUP_SPACING,
} from '@/lib/constants/components/runes/badge.constants';

// ═══════════════════════════════════════════════════════════════════════════
// BADGE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Badge — Displays status, categories, or small amounts of information.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * <Badge variant="quantum" pill dot>Online</Badge>
 *
 * @example
 * <Badge variant="error" removable onRemove={() => {}}>Remove me</Badge>
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'MD',
      pill = false,
      dot = false,
      removable = false,
      onRemove,
      className,
      ...props
    },
    ref
  ) => {
    const hoverOverride = BADGE_HOVER_OVERRIDES[variant];

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          pill ? BADGE_RADIUS_PILL : BADGE_RADIUS_DEFAULT,
          hoverOverride,
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('rounded-full bg-current', BADGE_DOT_SIZES[size])}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-0.5 rounded-full hover:bg-white/20 transition-colors',
              BADGE_REMOVE_PADDING[size]
            )}
            aria-label="Remove"
          >
            <svg
              className={cn('text-current', BADGE_REMOVE_ICON_SIZE[size])}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// ═══════════════════════════════════════════════════════════════════════════
// BADGE GROUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * BadgeGroup — Container for multiple badges with consistent spacing.
 *
 * @example
 * <BadgeGroup spacing="MD">
 *   <Badge>Tag 1</Badge>
 *   <Badge variant="quantum">Tag 2</Badge>
 * </BadgeGroup>
 */
export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ children, spacing = 'MD', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap',
        BADGE_GROUP_SPACING[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

BadgeGroup.displayName = 'BadgeGroup';