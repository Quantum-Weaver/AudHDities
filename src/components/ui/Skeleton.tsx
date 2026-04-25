// src/components/ui/Skeleton.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SKELETON COMPONENT                                     ║
// ║                    The ghost of content yet to arrive                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SkeletonProps,
  CardSkeletonProps,
  ListSkeletonProps,
  ProfileSkeletonProps,
  DashboardSkeletonProps,
  ChatSkeletonProps,
} from '@/types/components/ui/skeleton.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SKELETON_CARD_BG,
  SKELETON_SPACING,
  SKELETON_DEFAULTS,
} from '../../lib/constants/components/runes/skeleton.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  skeletonVariants,
  SKELETON_VARIANTS,
  SKELETON_ANIMATIONS,
  SKELETON_SIZES,
} from '../../lib/constants/components/runes/skeleton.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  resolveSkeletonSize,
  resolveSkeletonVariantClass,
  resolveSkeletonRoundedClass,
  resolveSkeletonCustomStyle,
} from '@/lib/utils/components/ui/skeleton.utils';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SKELETON
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Skeleton — A flexible loading placeholder component.
 *
 * @example
 * <Skeleton variant="text" lines={3} />
 *
 * @example
 * <Skeleton variant="avatar" size="xl" rounded roundedSize="full" />
 *
 * @example
 * <Skeleton variant="card" className="w-64 h-48" />
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = SKELETON_VARIANTS.TEXT,
      animation = SKELETON_ANIMATIONS.PULSE,
      size = SKELETON_SIZES.MD,
      width,
      height,
      rounded = false,
      roundedSize = 'md',
      lines = SKELETON_DEFAULTS.LINES,
      lineHeight,
      lastLineWidth = SKELETON_DEFAULTS.LAST_LINE_WIDTH,
      className,
      ...props
    },
    ref
  ) => {
    const hasCustomDimensions = !!(width && height);
    const sizeClass = resolveSkeletonSize(variant, size, hasCustomDimensions);
    const variantClass = resolveSkeletonVariantClass(variant);
    const variantStyles = skeletonVariants({ animation });
    const roundedClass = rounded ? resolveSkeletonRoundedClass(roundedSize) : '';
    const customStyle = resolveSkeletonCustomStyle(width, height);

    const baseClasses = cn(
      variantStyles,
      !hasCustomDimensions && sizeClass,
      variant !== SKELETON_VARIANTS.TEXT && variantClass,
      roundedClass,
      className
    );

    // ── Multi-line Text Variant ──────────────────────────────────────────
    if (variant === SKELETON_VARIANTS.TEXT && lines > 1) {
      return (
        <div ref={ref} className={SKELETON_SPACING.LINE_GAP} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                variantStyles,
                'rounded',
                i === lines - 1 && lastLineWidth !== 100 && `w-[${lastLineWidth}%]`,
                !width && sizeClass
              )}
              style={
                i === 0 && !width
                  ? customStyle
                  : { width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined }
              }
            />
          ))}
        </div>
      );
    }

    // ── Single Element ───────────────────────────────────────────────────
    return (
      <div
        ref={ref}
        className={baseClasses}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const TextSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.TEXT} {...props} />
));
TextSkeleton.displayName = 'TextSkeleton';

export const AvatarSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.AVATAR} rounded {...props} />
));
AvatarSkeleton.displayName = 'AvatarSkeleton';

export const ImageSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.IMAGE} {...props} />
));
ImageSkeleton.displayName = 'ImageSkeleton';

export const CardSkeletonShortcut = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.CARD} rounded {...props} />
));
CardSkeletonShortcut.displayName = 'CardSkeleton';

export const ButtonSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.BUTTON} rounded {...props} />
));
ButtonSkeleton.displayName = 'ButtonSkeleton';

export const BadgeSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>((props, ref) => (
  <Skeleton ref={ref} variant={SKELETON_VARIANTS.BADGE} rounded {...props} />
));
BadgeSkeleton.displayName = 'BadgeSkeleton';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export const CardSkeletonComponent = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({
    textLines = 2,
    showAvatar = false,
    showImage = true,
    imageHeight = SKELETON_DEFAULTS.CARD_IMAGE_HEIGHT,
    animation = SKELETON_ANIMATIONS.PULSE,
    className,
  }, ref) => (
    <div ref={ref} className={cn(SKELETON_CARD_BG, 'rounded-xl', SKELETON_SPACING.CARD_PADDING, className)}>
      {showImage && (
        <Skeleton
          variant={SKELETON_VARIANTS.IMAGE}
          height={imageHeight}
          className={SKELETON_SPACING.AVATAR_MARGIN_BOTTOM}
          animation={animation}
        />
      )}
      <div className={cn('flex', SKELETON_SPACING.FLEX_GAP)}>
        {showAvatar && (
          <Skeleton
            variant={SKELETON_VARIANTS.AVATAR}
            size={SKELETON_SIZES.MD}
            animation={animation}
          />
        )}
        <div className="flex-1">
          <Skeleton
            variant={SKELETON_VARIANTS.TEXT}
            width="w-3/4"
            className={SKELETON_SPACING.TEXT_MARGIN_BOTTOM}
            animation={animation}
          />
          <TextSkeleton lines={textLines} animation={animation} />
        </div>
      </div>
    </div>
  )
);
CardSkeletonComponent.displayName = 'CardSkeletonComponent';

export const ListSkeleton = React.forwardRef<HTMLDivElement, ListSkeletonProps>(
  ({
    items = SKELETON_DEFAULTS.ITEMS,
    showAvatar = false,
    animation = SKELETON_ANIMATIONS.PULSE,
    className,
  }, ref) => (
    <div ref={ref} className={cn(SKELETON_SPACING.LIST_GAP, className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className={cn('flex', SKELETON_SPACING.FLEX_GAP, 'items-center')}>
          {showAvatar && (
            <Skeleton
              variant={SKELETON_VARIANTS.AVATAR}
              size={SKELETON_SIZES.SM}
              animation={animation}
            />
          )}
          <div className="flex-1">
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-1/3"
              className={SKELETON_SPACING.TEXT_MARGIN_BOTTOM}
              animation={animation}
            />
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-2/3"
              animation={animation}
            />
          </div>
        </div>
      ))}
    </div>
  )
);
ListSkeleton.displayName = 'ListSkeleton';

export const ProfileSkeleton = React.forwardRef<HTMLDivElement, ProfileSkeletonProps>(
  ({ animation = SKELETON_ANIMATIONS.PULSE, className }, ref) => (
    <div ref={ref} className={cn('text-center', className)}>
      <Skeleton
        variant={SKELETON_VARIANTS.AVATAR}
        size={SKELETON_SIZES['3XL']}
        className={cn('mx-auto', SKELETON_SPACING.AVATAR_MARGIN_BOTTOM)}
        animation={animation}
      />
      <Skeleton
        variant={SKELETON_VARIANTS.TEXT}
        width="w-48"
        className={cn('mx-auto', SKELETON_SPACING.TEXT_MARGIN_BOTTOM)}
        animation={animation}
      />
      <Skeleton
        variant={SKELETON_VARIANTS.TEXT}
        width="w-64"
        className="mx-auto"
        animation={animation}
      />
    </div>
  )
);
ProfileSkeleton.displayName = 'ProfileSkeleton';

export const DashboardSkeleton = React.forwardRef<HTMLDivElement, DashboardSkeletonProps>(
  ({
    statCards = SKELETON_DEFAULTS.STAT_CARDS,
    chartRows = SKELETON_DEFAULTS.CHART_ROWS,
    animation = SKELETON_ANIMATIONS.PULSE,
    className,
  }, ref) => (
    <div ref={ref} className={cn(SKELETON_SPACING.DASHBOARD_GAP, className)}>
      {/* Stat Cards Row */}
      <div className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        SKELETON_SPACING.GRID_GAP
      )}>
        {Array.from({ length: statCards }).map((_, i) => (
          <div key={i} className={cn(SKELETON_CARD_BG, 'rounded-xl', SKELETON_SPACING.CARD_PADDING)}>
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-1/2"
              className={SKELETON_SPACING.TEXT_MARGIN_BOTTOM}
              animation={animation}
            />
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              size={SKELETON_SIZES['2XL']}
              width="w-1/3"
              animation={animation}
            />
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className={cn(SKELETON_CARD_BG, 'rounded-xl', SKELETON_SPACING.CARD_PADDING)}>
        <Skeleton
          variant={SKELETON_VARIANTS.TEXT}
          width="w-1/4"
          className={SKELETON_SPACING.AVATAR_MARGIN_BOTTOM}
          animation={animation}
        />
        <Skeleton
          variant={SKELETON_VARIANTS.IMAGE}
          height={SKELETON_DEFAULTS.CHART_HEIGHT}
          animation={animation}
        />
      </div>

      {/* Recent Activity */}
      <div className={cn(SKELETON_CARD_BG, 'rounded-xl', SKELETON_SPACING.CARD_PADDING)}>
        <Skeleton
          variant={SKELETON_VARIANTS.TEXT}
          width="w-1/4"
          className={SKELETON_SPACING.AVATAR_MARGIN_BOTTOM}
          animation={animation}
        />
        {Array.from({ length: chartRows }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              SKELETON_SPACING.FLEX_GAP,
              'items-center',
              i < chartRows - 1 && 'mb-3'
            )}
          >
            <Skeleton
              variant={SKELETON_VARIANTS.AVATAR}
              size={SKELETON_SIZES.SM}
              animation={animation}
            />
            <div className="flex-1">
              <Skeleton
                variant={SKELETON_VARIANTS.TEXT}
                width="w-1/2"
                animation={animation}
              />
            </div>
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-16"
              animation={animation}
            />
          </div>
        ))}
      </div>
    </div>
  )
);
DashboardSkeleton.displayName = 'DashboardSkeleton';

export const ChatSkeleton = React.forwardRef<HTMLDivElement, ChatSkeletonProps>(
  ({
    messages = SKELETON_DEFAULTS.MESSAGES,
    animation = SKELETON_ANIMATIONS.PULSE,
    className,
  }, ref) => (
    <div ref={ref} className={cn(SKELETON_SPACING.LIST_GAP, className)}>
      {Array.from({ length: messages }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex',
            SKELETON_SPACING.FLEX_GAP,
            i % 2 === 0 ? 'justify-start' : 'justify-end'
          )}
        >
          {i % 2 === 0 && (
            <Skeleton
              variant={SKELETON_VARIANTS.AVATAR}
              size={SKELETON_SIZES.SM}
              animation={animation}
            />
          )}
          <div className={cn(SKELETON_DEFAULTS.CHAT_MAX_WIDTH, i % 2 === 0 ? 'items-start' : 'items-end')}>
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-32"
              className={SKELETON_SPACING.TEXT_MARGIN_BOTTOM}
              animation={animation}
            />
            <Skeleton
              variant={SKELETON_VARIANTS.TEXT}
              width="w-48"
              animation={animation}
            />
          </div>
          {i % 2 === 1 && (
            <Skeleton
              variant={SKELETON_VARIANTS.AVATAR}
              size={SKELETON_SIZES.SM}
              animation={animation}
            />
          )}
        </div>
      ))}
    </div>
  )
);
ChatSkeleton.displayName = 'ChatSkeleton';