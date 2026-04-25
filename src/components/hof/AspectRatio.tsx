// src/components/hof/AspectRatio.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ASPECT RATIO COMPONENT                                  ║
// ║                    The frame that holds our media                           ║
// ║                    All values from COSMIC constants                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  AspectRatioProps,
  AspectRatioShortcutProps,
  AspectRatioImageProps,
  AspectRatioVideoProps,
  AspectRatioEmbedProps,
  AspectRatioValue,
  ObjectFit,
  AspectRatioRoundedSize,
} from '@/types/components/hof/aspect_ratio.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  ASPECT_RATIO_VALUES,
  ASPECT_RATIO_MEDIA_BASE,
  ASPECT_RATIO_FALLBACK_BG,
} from '@/lib/constants/components/hof/aspect_ratio.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  aspectRatioContainerVariants,
  aspectRatioInnerVariants,
} from '@/lib/constants/components/hof/aspect_ratio.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getAspectRatioPadding,
  getObjectFitClass,
  isMediaElement,
} from '@/lib/utils/components/hof/aspect_ratio.utils';

// ═══════════════════════════════════════════════════════════════════════════
// ASPECT RATIO — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * AspectRatio — Maintains consistent proportions for media and embeds.
 *
 * Uses the padding-bottom technique for reliable cross-browser
 * aspect ratio containment.
 *
 * @example
 * <AspectRatio ratio="16/9" rounded glowOnHover>
 *   <img src="/thumbnail.jpg" alt="Video thumbnail" />
 * </AspectRatio>
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      ratio = ASPECT_RATIO_VALUES.WIDESCREEN,
      customRatio,
      objectFit = 'cover',
      children,
      background,
      rounded = false,
      roundedSize = 'md',
      bordered = false,
      glowOnHover = false,
      fallback,
      className,
      ...props
    },
    ref
  ) => {
    const paddingClass = getAspectRatioPadding(ratio, customRatio);

    const containerClass = aspectRatioContainerVariants({
      rounded: rounded ? roundedSize : 'none',
      bordered,
      glow: glowOnHover,
    });

    const innerClass = aspectRatioInnerVariants({
      centered: !!children,
    });

    const backgroundStyle = background ? { backgroundColor: background } : {};

    // Enhance media children with object-fit classes
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && isMediaElement(child)) {
        return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
          className: cn(
            ...ASPECT_RATIO_MEDIA_BASE,
            getObjectFitClass(objectFit),
            (child.props as React.HTMLAttributes<HTMLElement>).className
          ),
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(containerClass, className)}
        style={backgroundStyle}
        {...props}
      >
        <div className={paddingClass} />
        <div className={innerClass}>
          {enhancedChildren || fallback || (
            <div
              className={cn(
                ...ASPECT_RATIO_MEDIA_BASE,
                ASPECT_RATIO_FALLBACK_BG
              )}
            />
          )}
        </div>
      </div>
    );
  }
);
AspectRatio.displayName = 'AspectRatio';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const SquareRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.SQUARE} {...props} />
  )
);
SquareRatio.displayName = 'SquareRatio';

export const PhotoRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.STANDARD} {...props} />
  )
);
PhotoRatio.displayName = 'PhotoRatio';

export const VideoRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.WIDESCREEN} {...props} />
  )
);
VideoRatio.displayName = 'VideoRatio';

export const VerticalVideoRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.VERTICAL_VIDEO} {...props} />
  )
);
VerticalVideoRatio.displayName = 'VerticalVideoRatio';

export const GoldenRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.GOLDEN} {...props} />
  )
);
GoldenRatio.displayName = 'GoldenRatio';

export const PortraitRatio = React.forwardRef<HTMLDivElement, AspectRatioShortcutProps>(
  (props, ref) => (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO_VALUES.CLASSIC_PORTRAIT} {...props} />
  )
);
PortraitRatio.displayName = 'PortraitRatio';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export const AspectRatioImage = React.forwardRef<HTMLDivElement, AspectRatioImageProps>(
  ({ src, alt, ratio = ASPECT_RATIO_VALUES.WIDESCREEN, rounded = true, roundedSize = 'lg', className, ...props }, ref) => (
    <AspectRatio ref={ref} ratio={ratio} rounded={rounded} roundedSize={roundedSize} className={className}>
      <img src={src} alt={alt} className={cn(...ASPECT_RATIO_MEDIA_BASE, 'object-cover')} {...props} />
    </AspectRatio>
  )
);
AspectRatioImage.displayName = 'AspectRatioImage';

export const AspectRatioVideo = React.forwardRef<HTMLDivElement, AspectRatioVideoProps>(
  ({ src, ratio = ASPECT_RATIO_VALUES.WIDESCREEN, rounded = true, poster, className, ...props }, ref) => (
    <AspectRatio ref={ref} ratio={ratio} rounded={rounded} className={className}>
      <video src={src} poster={poster} className={cn(...ASPECT_RATIO_MEDIA_BASE, 'object-cover')} {...props} />
    </AspectRatio>
  )
);
AspectRatioVideo.displayName = 'AspectRatioVideo';

export const AspectRatioEmbed = React.forwardRef<HTMLDivElement, AspectRatioEmbedProps>(
  ({ src, title, ratio = ASPECT_RATIO_VALUES.WIDESCREEN, rounded = true, className, ...props }, ref) => (
    <AspectRatio ref={ref} ratio={ratio} rounded={rounded} className={className}>
      <iframe src={src} title={title} className={cn(...ASPECT_RATIO_MEDIA_BASE)} allowFullScreen {...props} />
    </AspectRatio>
  )
);
AspectRatioEmbed.displayName = 'AspectRatioEmbed';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  AspectRatioProps,
  AspectRatioImageProps,
  AspectRatioVideoProps,
  AspectRatioEmbedProps,
  AspectRatioValue,
  ObjectFit,
  AspectRatioRoundedSize,
} from '@/types/components/hof/aspect_ratio.types';