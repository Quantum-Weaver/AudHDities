// src/components/ui/Avatar.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR COMPONENT                                       ║
// ║                    The visual representation of sovereignty               ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarStatusIndicatorProps,
  AvatarGroupProps,
  AvatarSize,
} from '@/types/components/ui/avatar.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AVATAR_SIZE_CLASSES,
  AVATAR_STATUS_SIZE_CLASSES,
  AVATAR_IMAGE_BASE_CLASSES,
  AVATAR_FALLBACK_BASE_CLASSES,
  AVATAR_FALLBACK_GRADIENT,
  AVATAR_FALLBACK_TEXT_COLOR,
  AVATAR_FALLBACK_TEXT_SIZE,
  AVATAR_FALLBACK_TEXT_WEIGHT,
  AVATAR_FALLBACK_DEFAULT_DELAY_MS,
  AVATAR_BADGE_BASE_CLASSES,
  AVATAR_BADGE_GRADIENT,
  AVATAR_BADGE_TEXT_COLOR,
  AVATAR_GROUP_SPACING,
  AVATAR_GROUP_HOVER_TRANSLATE,
  AVATAR_GROUP_REMAINING_BG,
  AVATAR_GROUP_REMAINING_TEXT,
  AVATAR_INTERACTIVE_TRANSITION,
  AVATAR_INTERACTIVE_HOVER_SCALE,
  AVATAR_INTERACTIVE_CURSOR,
  AVATAR_GLOW_SHADOW,
} from '@/lib/constants/components/runes/avatar.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  avatarRingVariants,
  avatarStatusDotVariants,
} from '@/lib/constants/components/ui/avatar.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getAvatarSizeClass,
  getAvatarStatusSizeClass,
  getAvatarFallbackFontSizeClass,
  getAvatarBadgePositionClass,
  getAvatarBadgeSizeClass,
  getAvatarBadgeFontSizeClass,
} from '@/utils/components/ui/avatar.utils';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR — ROOT
// ═══════════════════════════════════════════════════════════════════════════

function Avatar({
  className,
  size = 'default',
  status = 'none',
  variant = 'default',
  interactive = false,
  glow = false,
  ...props
}: AvatarProps) {
  const ringClass = avatarRingVariants({ variant });
  const statusDotClass = avatarStatusDotVariants({ status });

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-status={status}
      data-variant={variant}
      className={cn(
        ringClass,
        AVATAR_SIZE_CLASSES[size],
        status !== 'none' && 'relative',
        interactive && [
          AVATAR_INTERACTIVE_CURSOR,
          AVATAR_INTERACTIVE_TRANSITION,
          AVATAR_INTERACTIVE_HOVER_SCALE,
          'hover:ring-cyan-400',
        ],
        glow && AVATAR_GLOW_SHADOW,
        className
      )}
      {...props}
    />
  );
}
Avatar.displayName = 'Avatar';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR IMAGE
// ═══════════════════════════════════════════════════════════════════════════

function AvatarImage({ className, alt, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(AVATAR_IMAGE_BASE_CLASSES, className)}
      alt={alt}
      {...props}
    />
  );
}
AvatarImage.displayName = 'AvatarImage';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR FALLBACK
// ═══════════════════════════════════════════════════════════════════════════

function AvatarFallback({
  className,
  children,
  delayMs = AVATAR_FALLBACK_DEFAULT_DELAY_MS,
  ...props
}: AvatarFallbackProps) {
  // Build group-data font size classes for all sizes
  const sizeClasses = (
    ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl', '4xl'] as AvatarSize[]
  ).map((s) => getAvatarFallbackFontSizeClass(s));

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        AVATAR_FALLBACK_BASE_CLASSES,
        AVATAR_FALLBACK_GRADIENT,
        AVATAR_FALLBACK_TEXT_SIZE,
        AVATAR_FALLBACK_TEXT_WEIGHT,
        AVATAR_FALLBACK_TEXT_COLOR,
        ...sizeClasses,
        className
      )}
      delay={delayMs}
      {...props}
    >
      {children || (
        <svg
          className="size-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      )}
    </AvatarPrimitive.Fallback>
  );
}
AvatarFallback.displayName = 'AvatarFallback';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR BADGE
// ═══════════════════════════════════════════════════════════════════════════

function AvatarBadge({
  className,
  position = 'bottom-right',
  children,
  ...props
}: AvatarBadgeProps) {
  const positionClass = getAvatarBadgePositionClass(position);

  // Build group-data size + font classes for all sizes
  const sizeClasses = (
    ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl', '4xl'] as AvatarSize[]
  ).flatMap((s) => [getAvatarBadgeSizeClass(s), getAvatarBadgeFontSizeClass(s)]);

  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        AVATAR_BADGE_BASE_CLASSES,
        AVATAR_BADGE_GRADIENT,
        AVATAR_BADGE_TEXT_COLOR,
        'ring-2 ring-deep-space',
        positionClass,
        ...sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
AvatarBadge.displayName = 'AvatarBadge';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR STATUS INDICATOR
// ═══════════════════════════════════════════════════════════════════════════

function AvatarStatusIndicator({
  status = 'none',
  size = 'default',
}: AvatarStatusIndicatorProps) {
  if (status === 'none') return null;

  return (
    <span
      className={cn(
        avatarStatusDotVariants({ status }),
        AVATAR_STATUS_SIZE_CLASSES[size]
      )}
    />
  );
}
AvatarStatusIndicator.displayName = 'AvatarStatusIndicator';

// ═══════════════════════════════════════════════════════════════════════════
// AVATAR GROUP
// ═══════════════════════════════════════════════════════════════════════════

function AvatarGroup({
  className,
  children,
  max,
  size = 'default',
  ...props
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount =
    max && childrenArray.length > max ? childrenArray.length - max : 0;

  return (
    <div
      data-slot="avatar-group"
      data-size={size}
      className={cn(
        'group/avatar-group flex',
        AVATAR_GROUP_SPACING,
        '[&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-deep-space',
        className
      )}
      {...props}
    >
      {React.Children.map(visibleChildren, (child, i) => (
        <div
          key={i}
          className={cn(
            'transition-transform duration-200',
            `hover:${AVATAR_GROUP_HOVER_TRANSLATE}`
          )}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <Avatar size={size} className="ring-2 ring-deep-space">
          <AvatarFallback
            className={cn(
              AVATAR_GROUP_REMAINING_BG,
              AVATAR_GROUP_REMAINING_TEXT
            )}
          >
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
AvatarGroup.displayName = 'AvatarGroup';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

function QuantumAvatar(props: Omit<AvatarProps, 'variant'>) {
  return <Avatar variant="quantum" {...props} />;
}
QuantumAvatar.displayName = 'QuantumAvatar';

function CosmicAvatar(props: Omit<AvatarProps, 'variant'>) {
  return <Avatar variant="cosmic" {...props} />;
}
CosmicAvatar.displayName = 'CosmicAvatar';

function GlowingAvatar(props: Omit<AvatarProps, 'glow'>) {
  return <Avatar glow {...props} />;
}
GlowingAvatar.displayName = 'GlowingAvatar';

function InteractiveAvatar(props: Omit<AvatarProps, 'interactive'>) {
  return <Avatar interactive {...props} />;
}
InteractiveAvatar.displayName = 'InteractiveAvatar';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarStatusIndicator,
  AvatarGroup,
  QuantumAvatar,
  CosmicAvatar,
  GlowingAvatar,
  InteractiveAvatar,
};

export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarStatusIndicatorProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
  AvatarBadgePosition,
} from '@/types/components/ui/avatar.types';