## 📐 **ASPECT RATIO COMPONENT: Overview**

An aspect ratio component is a **proportion-constraining system** that maintains consistent width-to-height relationships for media elements. It is the **frame** that holds our images, videos, and embeds—every thumbnail, every hero image, every video player uses it.

**What it replaces:**
- Manual padding-top hacks (the classic `padding-bottom: 56.25%` for 16:9)
- Inconsistent image dimensions across components
- Layout shift when media loads

**What it provides:**
- Semantic aspect ratio values (16/9, 4/3, 1/1, etc.)
- Responsive ratio scaling
- Inner content centering
- Fallback backgrounds
- Object-fit integration

---

## 📁 **`components/ui/AspectRatio.tsx`**

```tsx
// components/ui/AspectRatio.tsx
// Aspect Ratio Component - The frame that holds our media
// Maintains consistent proportions for images, videos, and embeds
// Uses COSMIC design tokens for consistency

import React from 'react';
import { cn } from '@/lib/utils';

export type AspectRatioValue = 
  | '1/1'      // Square
  | '4/3'      // Standard photo
  | '3/2'      // Classic photo
  | '16/9'     // Widescreen video
  | '21/9'     // Ultra-wide
  | '2/3'      // Portrait photo
  | '3/4'      // Classic portrait
  | '9/16'     // Vertical video (TikTok/Reels)
  | 'golden'   // Golden ratio (1.618:1)
  | 'cinema'   // CinemaScope (2.35:1)
  | 'custom';

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio value */
  ratio?: AspectRatioValue;
  /** Custom ratio as a number (width/height) */
  customRatio?: number;
  /** Object-fit for inner media */
  objectFit?: ObjectFit;
  /** Inner content (typically an image or video) */
  children?: React.ReactNode;
  /** Background color while loading or for fallback */
  background?: string;
  /** Make rounded corners */
  rounded?: boolean;
  /** Rounded corner size */
  roundedSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Add a subtle border */
  bordered?: boolean;
  /** Add a glow effect on hover */
  glowOnHover?: boolean;
  /** Optional fallback content when no children */
  fallback?: React.ReactNode;
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

/**
 * CSS padding-bottom percentage for each ratio
 */
const ratioMap: Record<AspectRatioValue, string> = {
  '1/1': 'pb-[100%]',           // 1:1
  '4/3': 'pb-[75%]',            // 4:3
  '3/2': 'pb-[66.666%]',        // 3:2
  '16/9': 'pb-[56.25%]',        // 16:9
  '21/9': 'pb-[42.857%]',       // 21:9
  '2/3': 'pb-[150%]',           // 2:3
  '3/4': 'pb-[133.333%]',       // 3:4
  '9/16': 'pb-[177.777%]',      // 9:16
  'golden': 'pb-[61.803%]',     // Golden ratio (1.618:1)
  'cinema': 'pb-[42.553%]',     // CinemaScope (2.35:1)
  'custom': '',
};

/**
 * Object-fit classes
 */
const objectFitMap: Record<ObjectFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

/**
 * Rounded corner sizes
 */
const roundedSizeMap = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * AspectRatio Component
 * 
 * A flexible component for maintaining consistent media proportions.
 * 
 * @example
 * <AspectRatio ratio="16/9">
 *   <img src="/video-thumbnail.jpg" alt="Video thumbnail" />
 * </AspectRatio>
 * 
 * @example
 * <AspectRatio ratio="1/1" rounded glowOnHover>
 *   <Image src="/avatar.jpg" alt="Avatar" />
 * </AspectRatio>
 * 
 * @example
 * <AspectRatio ratio="9/16" objectFit="cover">
 *   <video src="/reel.mp4" autoPlay loop />
 * </AspectRatio>
 * 
 * @example
 * <AspectRatio ratio="golden" background="#1a1a2e">
 *   <div className="flex items-center justify-center h-full">
 *     <span className="text-white">Content</span>
 *   </div>
 * </AspectRatio>
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      ratio = '16/9',
      customRatio,
      objectFit = 'cover',
      children,
      background,
      rounded = false,
      roundedSize = 'md',
      bordered = false,
      glowOnHover = false,
      fallback,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine padding class
    let paddingClass = '';
    if (ratio === 'custom' && customRatio) {
      const percentage = (1 / customRatio) * 100;
      paddingClass = `pb-[${percentage}%]`;
    } else {
      paddingClass = ratioMap[ratio];
    }
    
    // Base classes for the outer container
    const containerClasses = cn(
      'relative w-full overflow-hidden',
      rounded && roundedSizeMap[roundedSize],
      bordered && 'border border-white/10',
      glowOnHover && 'transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]',
      className
    );
    
    // Background style
    const backgroundStyle = background ? { backgroundColor: background } : {};
    
    // Inner content classes
    const innerClasses = cn(
      'absolute inset-0',
      children && 'flex items-center justify-center'
    );
    
    // Media classes (for img, video, iframe)
    const mediaClasses = cn(
      'w-full h-full',
      objectFitMap[objectFit]
    );
    
    // Clone children with media classes if they are media elements
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const elementType = child.type;
        // Apply object-fit to img, video, and iframe elements
        if (elementType === 'img' || elementType === 'video' || elementType === 'iframe') {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(mediaClasses, child),
          });
        }
      }
      return child;
    });
    
    return (
      <div 
        ref={ref} 
        className={containerClasses} 
        style={backgroundStyle}
        {...props}
      >
        <div className={paddingClass} />
        <div className={innerClasses}>
          {enhancedChildren || fallback}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Square Aspect Ratio - 1:1
 * Perfect for avatars, profile pictures, thumbnails
 * 
 * @example
 * <SquareRatio>
 *   <img src="/avatar.jpg" alt="Avatar" />
 * </SquareRatio>
 */
export const SquareRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="1/1" {...props} />
);
SquareRatio.displayName = 'SquareRatio';

/**
 * Photo Aspect Ratio - 4:3
 * Classic photo proportions
 * 
 * @example
 * <PhotoRatio>
 *   <img src="/photo.jpg" alt="Photo" />
 * </PhotoRatio>
 */
export const PhotoRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="4/3" {...props} />
);
PhotoRatio.displayName = 'PhotoRatio';

/**
 * Video Aspect Ratio - 16:9
 * Standard widescreen video
 * 
 * @example
 * <VideoRatio>
 *   <video src="/video.mp4" controls />
 * </VideoRatio>
 */
export const VideoRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="16/9" {...props} />
);
VideoRatio.displayName = 'VideoRatio';

/**
 * Vertical Video Aspect Ratio - 9/16
 * TikTok/Instagram Reels/Shorts proportions
 * 
 * @example
 * <VerticalVideoRatio>
 *   <video src="/reel.mp4" controls />
 * </VerticalVideoRatio>
 */
export const VerticalVideoRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="9/16" {...props} />
);
VerticalVideoRatio.displayName = 'VerticalVideoRatio';

/**
 * Golden Ratio - 1.618:1
 * Aesthetically pleasing proportions for art
 * 
 * @example
 * <GoldenRatio>
 *   <img src="/painting.jpg" alt="Artwork" />
 * </GoldenRatio>
 */
export const GoldenRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="golden" {...props} />
);
GoldenRatio.displayName = 'GoldenRatio';

/**
 * Portrait Ratio - 3:4
 * Classic portrait proportions
 * 
 * @example
 * <PortraitRatio>
 *   <img src="/portrait.jpg" alt="Portrait" />
 * </PortraitRatio>
 */
export const PortraitRatio = React.forwardRef<HTMLDivElement, Omit<AspectRatioProps, 'ratio'>>(
  (props, ref) => <AspectRatio ref={ref} ratio="3/4" {...props} />
);
PortraitRatio.displayName = 'PortraitRatio';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface AspectRatioImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'ratio'> {
  src: string;
  alt: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
  roundedSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * AspectRatioImage - Pre-configured image with aspect ratio
 * 
 * @example
 * <AspectRatioImage src="/hero.jpg" alt="Hero" ratio="16/9" rounded />
 */
export const AspectRatioImage = React.forwardRef<HTMLDivElement, AspectRatioImageProps>(
  ({ src, alt, ratio = '16/9', rounded = true, roundedSize = 'lg', className, ...props }, ref) => (
    <AspectRatio 
      ref={ref} 
      ratio={ratio} 
      rounded={rounded} 
      roundedSize={roundedSize}
      className={className}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" {...props} />
    </AspectRatio>
  )
);
AspectRatioImage.displayName = 'AspectRatioImage';

export interface AspectRatioVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
  poster?: string;
}

/**
 * AspectRatioVideo - Pre-configured video with aspect ratio
 * 
 * @example
 * <AspectRatioVideo src="/video.mp4" ratio="16/9" controls poster="/poster.jpg" />
 */
export const AspectRatioVideo = React.forwardRef<HTMLDivElement, AspectRatioVideoProps>(
  ({ src, ratio = '16/9', rounded = true, poster, className, ...props }, ref) => (
    <AspectRatio 
      ref={ref} 
      ratio={ratio} 
      rounded={rounded} 
      className={className}
    >
      <video 
        src={src} 
        poster={poster} 
        className="w-full h-full object-cover"
        {...props} 
      />
    </AspectRatio>
  )
);
AspectRatioVideo.displayName = 'AspectRatioVideo';

export interface AspectRatioEmbedProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  title: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
}

/**
 * AspectRatioEmbed - Pre-configured iframe embed with aspect ratio
 * Perfect for YouTube, Vimeo, maps, etc.
 * 
 * @example
 * <AspectRatioEmbed src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" ratio="16/9" />
 */
export const AspectRatioEmbed = React.forwardRef<HTMLDivElement, AspectRatioEmbedProps>(
  ({ src, title, ratio = '16/9', rounded = true, className, ...props }, ref) => (
    <AspectRatio 
      ref={ref} 
      ratio={ratio} 
      rounded={rounded} 
      className={className}
    >
      <iframe 
        src={src} 
        title={title} 
        className="w-full h-full"
        allowFullScreen
        {...props} 
      />
    </AspectRatio>
  )
);
AspectRatioEmbed.displayName = 'AspectRatioEmbed';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Image with 16:9 Ratio
```tsx
<AspectRatio ratio="16/9" rounded>
  <img src="/hero.jpg" alt="Hero" />
</AspectRatio>
```

### Square Avatar with Hover Glow
```tsx
<SquareRatio rounded="full" glowOnHover bordered>
  <img src="/avatar.jpg" alt="Avatar" className="object-cover" />
</SquareRatio>
```

### Video Player
```tsx
<VideoRatio rounded>
  <video src="/video.mp4" controls poster="/poster.jpg" />
</VideoRatio>
```

### YouTube Embed
```tsx
<AspectRatioEmbed 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="Video" 
  ratio="16/9" 
  rounded 
/>
```

### TikTok/Reel Style Vertical Video
```tsx
<VerticalVideoRatio rounded>
  <video src="/reel.mp4" controls loop />
</VerticalVideoRatio>
```

### Artwork with Golden Ratio
```tsx
<GoldenRatio rounded background="#1a1a2e">
  <img src="/artwork.jpg" alt="Artwork" className="object-contain" />
</GoldenRatio>
```

### Product Image Grid
```tsx
<Grid cols={2} colsMd={3} colsLg={4} gap="md">
  {products.map(product => (
    <AspectRatioImage 
      key={product.id}
      src={product.image}
      alt={product.name}
      ratio="1/1"
      rounded
    />
  ))}
</Grid>
```

### Hero Section with Cinematic Ratio
```tsx
<AspectRatio ratio="cinema" rounded={false}>
  <img src="/hero-banner.jpg" alt="Hero" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
    <h1 className="text-4xl text-white">Sovereign Sanctuary</h1>
  </div>
</AspectRatio>
```

### Fallback Content
```tsx
<AspectRatio ratio="16/9" fallback={<div className="text-white/50">Image not available</div>}>
  {/* No children - shows fallback */}
</AspectRatio>
```

---

## ✅ **ASPECT RATIO REFERENCE TABLE**

| Ratio Name | Value | Padding-Bottom | Use Case |
|------------|-------|----------------|----------|
| `1/1` | 1:1 | 100% | Avatars, profile pictures, square thumbnails |
| `4/3` | 4:3 | 75% | Classic photography, old displays |
| `3/2` | 3:2 | 66.666% | Standard photo prints |
| `16/9` | 16:9 | 56.25% | YouTube, widescreen video |
| `21/9` | 21:9 | 42.857% | Ultra-wide monitors, cinematic |
| `2/3` | 2:3 | 150% | Portrait orientation |
| `3/4` | 3:4 | 133.333% | Classic portrait |
| `9/16` | 9:16 | 177.777% | TikTok, Reels, Shorts |
| `golden` | 1.618:1 | 61.803% | Art, aesthetically pleasing compositions |
| `cinema` | 2.35:1 | 42.553% | CinemaScope films |

---

## 🎯 **LAYOUT COMPONENTS COMPLETE**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Stack** | 1D arrangement (vertical/horizontal) | ✅ |
| **Grid** | 2D arrangement (responsive columns) | ✅ |
| **Container** | Width constraint (max-width + padding) | ✅ |
| **AspectRatio** | Media proportion maintenance | ✅ |

---

## 🚀 **REMAINING LAYOUT COMPONENTS**

- **Spacer** — Flexible spacing element
- **Divider** — Visual separator
- **ScrollArea** — Custom scrollable container
- **Flex** — More flexible than Stack (row/column + wrap + grow + shrink)
- **Skeleton** — Loading placeholders with aspect ratio support
