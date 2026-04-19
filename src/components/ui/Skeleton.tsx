// components/ui/Skeleton.tsx
// Skeleton Component - The ghost of content yet to arrive
// Provides loading placeholders for async content
// Uses COSMIC design tokens for sizing and animations

import React from 'react';
import { cn } from '@/lib/utils';

export type SkeletonVariant = 'text' | 'avatar' | 'image' | 'card' | 'button' | 'badge';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant of skeleton */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Size of the skeleton */
  size?: SkeletonSize;
  /** Custom width (overrides size) */
  width?: string | number;
  /** Custom height (overrides size) */
  height?: string | number;
  /** Make rounded */
  rounded?: boolean;
  /** Rounded size */
  roundedSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Number of lines for text variant */
  lines?: number;
  /** Line height for text variant */
  lineHeight?: string;
  /** Last line width percentage (for text variant) */
  lastLineWidth?: number;
  /** As child element */
  asChild?: boolean;
}

/**
 * Variant base classes
 */
const variantBaseMap: Record<SkeletonVariant, string> = {
  text: 'h-4',
  avatar: 'rounded-full aspect-square',
  image: 'rounded-md aspect-video',
  card: 'rounded-xl',
  button: 'rounded-lg h-10',
  badge: 'rounded-full h-6 w-16',
};

/**
 * Size mappings
 */
const sizeMap: Record<SkeletonSize, string> = {
  xs: 'h-3',
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-10',
  '2xl': 'h-12',
  '3xl': 'h-16',
  '4xl': 'h-24',
};

const avatarSizeMap: Record<SkeletonSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
  '3xl': 'w-24 h-24',
  '4xl': 'w-32 h-32',
};

const buttonSizeMap: Record<SkeletonSize, string> = {
  xs: 'h-6 w-16',
  sm: 'h-8 w-20',
  md: 'h-10 w-24',
  lg: 'h-12 w-28',
  xl: 'h-14 w-32',
  '2xl': 'h-16 w-40',
  '3xl': 'h-20 w-48',
  '4xl': 'h-24 w-56',
};

const badgeSizeMap: Record<SkeletonSize, string> = {
  xs: 'h-4 w-12',
  sm: 'h-5 w-14',
  md: 'h-6 w-16',
  lg: 'h-7 w-20',
  xl: 'h-8 w-24',
  '2xl': 'h-9 w-28',
  '3xl': 'h-10 w-32',
  '4xl': 'h-11 w-36',
};

/**
 * Rounded size mappings
 */
const roundedSizeMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Animation classes
 */
const animationMap: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
  none: '',
};

/**
 * Skeleton Component
 * 
 * A flexible component for loading placeholders.
 * 
 * @example
 * <Skeleton variant="text" lines={3} />
 * 
 * @example
 * <Skeleton variant="avatar" size="xl" rounded="full" />
 * 
 * @example
 * <Skeleton variant="card" className="w-64 h-48" />
 * 
 * @example
 * <div className="space-y-4">
 *   <Skeleton variant="image" />
 *   <Skeleton variant="text" lines={2} />
 *   <Skeleton variant="text" width="w-1/2" />
 * </div>
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      animation = 'pulse',
      size = 'md',
      width,
      height,
      rounded = false,
      roundedSize = 'md',
      lines = 1,
      lineHeight = '1.5em',
      lastLineWidth = 75,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine size class based on variant
    let sizeClass = '';
    
    if (width && height) {
      // Custom dimensions override everything
      sizeClass = '';
    } else if (variant === 'avatar') {
      sizeClass = avatarSizeMap[size];
    } else if (variant === 'button') {
      sizeClass = buttonSizeMap[size];
    } else if (variant === 'badge') {
      sizeClass = badgeSizeMap[size];
    } else {
      sizeClass = sizeMap[size];
    }
    
    // Determine variant class
    const variantClass = variantBaseMap[variant];
    
    // Determine animation class
    const animationClass = animationMap[animation];
    
    // Determine rounded class
    const roundedClass = rounded ? roundedSizeMap[roundedSize] : '';
    
    // Custom dimensions
    const customStyle: React.CSSProperties = {};
    if (width) customStyle.width = typeof width === 'number' ? `${width}px` : width;
    if (height) customStyle.height = typeof height === 'number' ? `${height}px` : height;
    
    // Base classes
    const baseClasses = cn(
      'bg-white/10',
      !width && !height && sizeClass,
      variant !== 'text' && variantClass,
      roundedClass,
      animationClass,
      className
    );
    
    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'bg-white/10 rounded',
                animationClass,
                i === lines - 1 && lastLineWidth !== 100 && `w-[${lastLineWidth}%]`,
                width ? '' : sizeClass
              )}
              style={i === 0 && !width ? customStyle : { width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined }}
            />
          ))}
        </div>
      );
    }
    
    // Single element
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

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Text Skeleton - For paragraph/heading placeholders
 */
export const TextSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="text" {...props} />
);
TextSkeleton.displayName = 'TextSkeleton';

/**
 * Avatar Skeleton - For profile picture placeholders
 */
export const AvatarSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="avatar" rounded {...props} />
);
AvatarSkeleton.displayName = 'AvatarSkeleton';

/**
 * Image Skeleton - For image/video placeholders
 */
export const ImageSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="image" {...props} />
);
ImageSkeleton.displayName = 'ImageSkeleton';

/**
 * Card Skeleton - For card component placeholders
 */
export const CardSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="card" rounded {...props} />
);
CardSkeleton.displayName = 'CardSkeleton';

/**
 * Button Skeleton - For button placeholders
 */
export const ButtonSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="button" rounded {...props} />
);
ButtonSkeleton.displayName = 'ButtonSkeleton';

/**
 * Badge Skeleton - For badge placeholders
 */
export const BadgeSkeleton = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => <Skeleton ref={ref} variant="badge" rounded {...props} />
);
BadgeSkeleton.displayName = 'BadgeSkeleton';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface CardSkeletonProps {
  /** Number of text lines in the card */
  textLines?: number;
  /** Show avatar in card */
  showAvatar?: boolean;
  /** Show image in card */
  showImage?: boolean;
  /** Image height */
  imageHeight?: string;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

/**
 * CardSkeleton - Pre-built card loading placeholder
 * 
 * @example
 * <CardSkeleton showImage textLines={3} />
 */
export const CardSkeletonComponent = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ textLines = 2, showAvatar = false, showImage = true, imageHeight = '160px', animation = 'pulse', className }, ref) => (
    <div ref={ref} className={cn('rounded-xl bg-white/5 p-4', className)}>
      {showImage && (
        <Skeleton variant="image" height={imageHeight} className="mb-4" animation={animation} />
      )}
      <div className="flex gap-3">
        {showAvatar && (
          <Skeleton variant="avatar" size="md" animation={animation} />
        )}
        <div className="flex-1">
          <Skeleton variant="text" width="w-3/4" className="mb-2" animation={animation} />
          <TextSkeleton lines={textLines} animation={animation} />
        </div>
      </div>
    </div>
  )
);
CardSkeletonComponent.displayName = 'CardSkeletonComponent';

export interface ListSkeletonProps {
  /** Number of items in the list */
  items?: number;
  /** Show avatar in each item */
  showAvatar?: boolean;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

/**
 * ListSkeleton - Pre-built list loading placeholder
 * 
 * @example
 * <ListSkeleton items={5} showAvatar />
 */
export const ListSkeleton = React.forwardRef<HTMLDivElement, ListSkeletonProps>(
  ({ items = 5, showAvatar = false, animation = 'pulse', className }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-3 items-center">
          {showAvatar && <Skeleton variant="avatar" size="sm" animation={animation} />}
          <div className="flex-1">
            <Skeleton variant="text" width="w-1/3" className="mb-1" animation={animation} />
            <Skeleton variant="text" width="w-2/3" animation={animation} />
          </div>
        </div>
      ))}
    </div>
  )
);
ListSkeleton.displayName = 'ListSkeleton';

export interface ProfileSkeletonProps {
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

/**
 * ProfileSkeleton - Pre-built profile loading placeholder
 * 
 * @example
 * <ProfileSkeleton />
 */
export const ProfileSkeleton = React.forwardRef<HTMLDivElement, ProfileSkeletonProps>(
  ({ animation = 'pulse', className }, ref) => (
    <div ref={ref} className={cn('text-center', className)}>
      <Skeleton variant="avatar" size="3xl" className="mx-auto mb-4" animation={animation} />
      <Skeleton variant="text" width="w-48" className="mx-auto mb-2" animation={animation} />
      <Skeleton variant="text" width="w-64" className="mx-auto" animation={animation} />
    </div>
  )
);
ProfileSkeleton.displayName = 'ProfileSkeleton';

export interface DashboardSkeletonProps {
  /** Number of stat cards */
  statCards?: number;
  /** Number of chart rows */
  chartRows?: number;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

/**
 * DashboardSkeleton - Pre-built dashboard loading placeholder
 * 
 * @example
 * <DashboardSkeleton statCards={4} chartRows={3} />
 */
export const DashboardSkeleton = React.forwardRef<HTMLDivElement, DashboardSkeletonProps>(
  ({ statCards = 4, chartRows = 3, animation = 'pulse', className }, ref) => (
    <div ref={ref} className={cn('space-y-8', className)}>
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: statCards }).map((_, i) => (
          <div key={i} className="p-4 bg-white/5 rounded-xl">
            <Skeleton variant="text" width="w-1/2" className="mb-2" animation={animation} />
            <Skeleton variant="text" size="2xl" width="w-1/3" animation={animation} />
          </div>
        ))}
      </div>
      
      {/* Chart Area */}
      <div className="bg-white/5 rounded-xl p-4">
        <Skeleton variant="text" width="w-1/4" className="mb-4" animation={animation} />
        <Skeleton variant="image" height="200px" animation={animation} />
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white/5 rounded-xl p-4">
        <Skeleton variant="text" width="w-1/4" className="mb-4" animation={animation} />
        {Array.from({ length: chartRows }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center mb-3 last:mb-0">
            <Skeleton variant="avatar" size="sm" animation={animation} />
            <div className="flex-1">
              <Skeleton variant="text" width="w-1/2" animation={animation} />
            </div>
            <Skeleton variant="text" width="w-16" animation={animation} />
          </div>
        ))}
      </div>
    </div>
  )
);
DashboardSkeleton.displayName = 'DashboardSkeleton';

export interface ChatSkeletonProps {
  /** Number of messages */
  messages?: number;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

/**
 * ChatSkeleton - Pre-built chat loading placeholder
 * 
 * @example
 * <ChatSkeleton messages={10} />
 */
export const ChatSkeleton = React.forwardRef<HTMLDivElement, ChatSkeletonProps>(
  ({ messages = 8, animation = 'pulse', className }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)}>
      {Array.from({ length: messages }).map((_, i) => (
        <div key={i} className={cn('flex gap-3', i % 2 === 0 ? 'justify-start' : 'justify-end')}>
          {i % 2 === 0 && <Skeleton variant="avatar" size="sm" animation={animation} />}
          <div className={cn('max-w-[70%]', i % 2 === 0 ? 'items-start' : 'items-end')}>
            <Skeleton variant="text" width="w-32" className="mb-1" animation={animation} />
            <Skeleton variant="text" width="w-48" animation={animation} />
          </div>
          {i % 2 === 1 && <Skeleton variant="avatar" size="sm" animation={animation} />}
        </div>
      ))}
    </div>
  )
);
ChatSkeleton.displayName = 'ChatSkeleton';