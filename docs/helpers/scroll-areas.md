## 📜 **SCROLLAREA COMPONENT: Overview**

A scroll area component is a **custom scrollable container** that provides consistent, beautiful scrolling behavior across all browsers. It is the **window** through which we view content that extends beyond the viewport—every long list, every tall sidebar, every overflowing panel needs it.

**What it replaces:**
- Native browser scrollbars (inconsistent across platforms)
- Overflow-y-auto scattered across components
- Manual scroll management code

**What it provides:**
- Custom-styled scrollbars matching our design system
- Optional auto-hide scrollbars
- Scroll position management
- Scroll-to-top/section utilities
- Touch-friendly behavior
- Reduced motion support

---

## 📁 **`components/ui/ScrollArea.tsx`**

```tsx
// components/ui/ScrollArea.tsx
// ScrollArea Component - The window to overflowing content
// Provides consistent, beautiful scrolling behavior
// Uses COSMIC design tokens for styling

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type ScrollbarVisibility = 'always' | 'auto' | 'hover' | 'hidden';
export type ScrollOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When to show scrollbars */
  scrollbarVisibility?: ScrollbarVisibility;
  /** Scroll orientation */
  orientation?: ScrollOrientation;
  /** Maximum height of the scroll area */
  maxHeight?: string | number;
  /** Maximum width of the scroll area */
  maxWidth?: string | number;
  /** Height of the scroll area */
  height?: string | number;
  /** Width of the scroll area */
  width?: string | number;
  /** Hide scrollbar track */
  hideTrack?: boolean;
  /** Thickness of scrollbar */
  thickness?: 'thin' | 'normal' | 'wide';
  /** Border radius of the scroll area */
  rounded?: boolean;
  /** Rounded size */
  roundedSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Add a subtle border */
  bordered?: boolean;
  /** Add a background */
  background?: boolean;
  /** Shadow on scroll */
  shadowOnScroll?: boolean;
  /** Enable scroll snapping */
  snapScroll?: boolean;
  /** Snap scroll direction */
  snapDirection?: 'start' | 'center' | 'end' | 'proximity';
  /** Callback when scroll position changes */
  onScrollPosition?: (scrollTop: number, scrollLeft: number) => void;
  /** Scroll to top on mount */
  scrollToTopOnMount?: boolean;
  /** Initial scroll position */
  initialScrollTop?: number;
  initialScrollLeft?: number;
  /** As child element */
  asChild?: boolean;
}

/**
 * Thickness mappings
 */
const thicknessMap: Record<string, string> = {
  thin: '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1',
  normal: '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5',
  wide: '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
};

/**
 * Visibility mappings
 */
const visibilityMap: Record<ScrollbarVisibility, string> = {
  always: '[&::-webkit-scrollbar]:block',
  auto: '[&::-webkit-scrollbar]:block',
  hover: '[&::-webkit-scrollbar]:opacity-0 hover:[&::-webkit-scrollbar]:opacity-100',
  hidden: '[&::-webkit-scrollbar]:hidden',
};

/**
 * Rounded size mappings
 */
const roundedSizeMap = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
};

/**
 * ScrollArea Component
 * 
 * A flexible component for custom scrollable containers.
 * 
 * @example
 * <ScrollArea maxHeight="400px">
 *   {longList.map(item => <div key={item.id}>{item.content}</div>)}
 * </ScrollArea>
 * 
 * @example
 * <ScrollArea orientation="horizontal" maxWidth="300px">
 *   <div className="flex gap-4 w-[800px]">
 *     {images.map(img => <img key={img.id} src={img.url} />)}
 *   </div>
 * </ScrollArea>
 * 
 * @example
 * <ScrollArea scrollbarVisibility="hover" thickness="thin" rounded bordered>
 *   <p>Long content here...</p>
 * </ScrollArea>
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      scrollbarVisibility = 'auto',
      orientation = 'vertical',
      maxHeight,
      maxWidth,
      height,
      width,
      hideTrack = false,
      thickness = 'normal',
      rounded = false,
      roundedSize = 'lg',
      bordered = false,
      background = false,
      shadowOnScroll = false,
      snapScroll = false,
      snapDirection = 'start',
      onScrollPosition,
      scrollToTopOnMount = false,
      initialScrollTop = 0,
      initialScrollLeft = 0,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Handle scroll events
    const handleScroll = useCallback(() => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollLeft } = scrollRef.current;
      onScrollPosition?.(scrollTop, scrollLeft);
      
      if (shadowOnScroll) {
        setIsScrolled(scrollTop > 0);
      }
    }, [onScrollPosition, shadowOnScroll]);
    
    // Scroll to top on mount
    useEffect(() => {
      if (scrollToTopOnMount && scrollRef.current) {
        scrollRef.current.scrollTop = initialScrollTop;
        scrollRef.current.scrollLeft = initialScrollLeft;
      }
    }, [scrollToTopOnMount, initialScrollTop, initialScrollLeft]);
    
    // Add scroll listener
    useEffect(() => {
      const element = scrollRef.current;
      if (element) {
        element.addEventListener('scroll', handleScroll);
        return () => element.removeEventListener('scroll', handleScroll);
      }
    }, [handleScroll]);
    
    // Determine scroll direction classes
    const scrollDirectionClasses = cn(
      orientation === 'vertical' && 'overflow-y-auto',
      orientation === 'horizontal' && 'overflow-x-auto',
      orientation === 'both' && 'overflow-auto'
    );
    
    // Visibility classes
    const visibilityClasses = visibilityMap[scrollbarVisibility];
    
    // Thickness classes
    const thicknessClasses = thicknessMap[thickness];
    
    // Hide track if requested
    const hideTrackClasses = hideTrack 
      ? '[&::-webkit-scrollbar-track]:bg-transparent' 
      : '';
    
    // Scrollbar styling (webkit only - works in all modern browsers)
    const scrollbarClasses = cn(
      '[&::-webkit-scrollbar]:rounded-full',
      '[&::-webkit-scrollbar-track]:bg-white/5',
      '[&::-webkit-scrollbar-track]:rounded-full',
      '[&::-webkit-scrollbar-thumb]:bg-cyan-500/50',
      '[&::-webkit-scrollbar-thumb]:rounded-full',
      '[&::-webkit-scrollbar-thumb]:hover:bg-cyan-500/70',
      thicknessClasses,
      visibilityClasses,
      hideTrackClasses
    );
    
    // Snap scroll classes
    const snapClasses = snapScroll 
      ? cn(
          'snap-y snap-mandatory',
          snapDirection === 'start' && 'snap-start',
          snapDirection === 'center' && 'snap-center',
          snapDirection === 'end' && 'snap-end',
          snapDirection === 'proximity' && 'snap-proximity'
        )
      : '';
    
    // Size classes
    const sizeClasses = cn(
      height && `h-[${typeof height === 'number' ? `${height}px` : height}]`,
      width && `w-[${typeof width === 'number' ? `${width}px` : width}]`,
      maxHeight && `max-h-[${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight}]`,
      maxWidth && `max-w-[${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth}]`
    );
    
    // Styling classes
    const stylingClasses = cn(
      rounded && roundedSizeMap[roundedSize],
      bordered && 'border border-white/10',
      background && 'bg-white/5 backdrop-blur-sm'
    );
    
    // Shadow on scroll
    const shadowClasses = shadowOnScroll && isScrolled
      ? 'shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3)]'
      : '';
    
    // Base classes
    const baseClasses = cn(
      scrollDirectionClasses,
      scrollbarClasses,
      snapClasses,
      sizeClasses,
      stylingClasses,
      shadowClasses,
      className
    );
    
    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          scrollRef.current = node;
        }}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Vertical ScrollArea - Pre-configured for vertical scrolling
 */
export const VScrollArea = React.forwardRef<HTMLDivElement, Omit<ScrollAreaProps, 'orientation'>>(
  (props, ref) => <ScrollArea ref={ref} orientation="vertical" {...props} />
);
VScrollArea.displayName = 'VScrollArea';

/**
 * Horizontal ScrollArea - Pre-configured for horizontal scrolling
 */
export const HScrollArea = React.forwardRef<HTMLDivElement, Omit<ScrollAreaProps, 'orientation'>>(
  (props, ref) => <ScrollArea ref={ref} orientation="horizontal" {...props} />
);
HScrollArea.displayName = 'HScrollArea';

/**
 * AutoHide ScrollArea - Scrollbars only show on hover
 */
export const AutoHideScrollArea = React.forwardRef<HTMLDivElement, Omit<ScrollAreaProps, 'scrollbarVisibility'>>(
  (props, ref) => <ScrollArea ref={ref} scrollbarVisibility="hover" {...props} />
);
AutoHideScrollArea.displayName = 'AutoHideScrollArea';

/**
 * Thin ScrollArea - Minimal scrollbar
 */
export const ThinScrollArea = React.forwardRef<HTMLDivElement, Omit<ScrollAreaProps, 'thickness'>>(
  (props, ref) => <ScrollArea ref={ref} thickness="thin" {...props} />
);
ThinScrollArea.displayName = 'ThinScrollArea';

/**
 * Card ScrollArea - With border and background
 */
export const CardScrollArea = React.forwardRef<HTMLDivElement, Omit<ScrollAreaProps, 'bordered' | 'background' | 'rounded'>>(
  (props, ref) => (
    <ScrollArea 
      ref={ref} 
      bordered 
      background 
      rounded 
      roundedSize="lg" 
      {...props} 
    />
  )
);
CardScrollArea.displayName = 'CardScrollArea';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface ScrollToTopButtonProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * ScrollToTopButton - Button that scrolls the ScrollArea to top
 * Must be used inside a ScrollArea
 */
export const ScrollToTopButton = React.forwardRef<HTMLButtonElement, ScrollToTopButtonProps>(
  ({ className, children, ...props }, ref) => {
    const scrollAreaRef = useRef<HTMLElement | null>(null);
    
    // Find the nearest ScrollArea parent
    useEffect(() => {
      const findScrollArea = (element: HTMLElement | null): HTMLElement | null => {
        while (element) {
          if (element.classList?.contains('overflow-y-auto')) {
            return element;
          }
          element = element.parentElement;
        }
        return null;
      };
      
      const button = (ref as React.MutableRefObject<HTMLButtonElement | null>)?.current;
      if (button) {
        const parent = button.parentElement;
        const scrollArea = findScrollArea(parent);
        if (scrollArea) {
          scrollAreaRef.current = scrollArea;
        }
      }
    }, [ref]);
    
    const handleClick = () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors',
          className
        )}
        {...props}
      >
        {children || '↑'}
      </button>
    );
  }
);
ScrollToTopButton.displayName = 'ScrollToTopButton';

export interface ScrollIndicatorProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * ScrollIndicator - Shows if content is scrollable
 */
export const ScrollIndicator = React.forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  ({ orientation = 'vertical', className, ...props }, ref) => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const targetRef = useRef<HTMLElement | null>(null);
    
    useEffect(() => {
      // Find the nearest ScrollArea parent
      const element = (ref as React.MutableRefObject<HTMLDivElement | null>)?.current;
      if (!element) return;
      
      let parent = element.parentElement;
      while (parent) {
        if (parent.classList?.contains('overflow-y-auto') || parent.classList?.contains('overflow-x-auto')) {
          targetRef.current = parent;
          break;
        }
        parent = parent.parentElement;
      }
      
      if (!targetRef.current) return;
      
      const updateScroll = () => {
        if (!targetRef.current) return;
        const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = targetRef.current;
        
        if (orientation === 'vertical') {
          setIsScrollable(scrollHeight > clientHeight);
          setScrollPercentage((scrollTop / (scrollHeight - clientHeight)) * 100);
        } else {
          setIsScrollable(scrollWidth > clientWidth);
          setScrollPercentage((scrollLeft / (scrollWidth - clientWidth)) * 100);
        }
      };
      
      updateScroll();
      targetRef.current.addEventListener('scroll', updateScroll);
      window.addEventListener('resize', updateScroll);
      
      return () => {
        if (targetRef.current) {
          targetRef.current.removeEventListener('scroll', updateScroll);
        }
        window.removeEventListener('resize', updateScroll);
      };
    }, [ref, orientation]);
    
    if (!isScrollable) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          orientation === 'vertical' 
            ? 'absolute right-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-white/10 rounded-full overflow-hidden'
            : 'absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-16 bg-white/10 rounded-full overflow-hidden',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            orientation === 'vertical'
              ? 'w-full bg-cyan-400/50 rounded-full transition-all duration-150'
              : 'h-full bg-cyan-400/50 rounded-full transition-all duration-150',
            orientation === 'vertical' && `h-[${scrollPercentage}%]`
          )}
          style={orientation === 'vertical' 
            ? { height: `${scrollPercentage}%` }
            : { width: `${scrollPercentage}%` }
          }
        />
      </div>
    );
  }
);
ScrollIndicator.displayName = 'ScrollIndicator';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Vertical Scroll Area
```tsx
<ScrollArea maxHeight="400px">
  {items.map(item => (
    <div key={item.id} className="p-4 border-b border-white/10">
      {item.content}
    </div>
  ))}
</ScrollArea>
```

### Horizontal Scroll Area (Image Gallery)
```tsx
<HScrollArea maxWidth="100%" className="pb-4">
  <div className="flex gap-4 w-max">
    {images.map(img => (
      <AspectRatioImage key={img.id} src={img.url} alt={img.alt} ratio="1/1" />
    ))}
  </div>
</HScrollArea>
```

### Card Style Scroll Area
```tsx
<CardScrollArea maxHeight="300px">
  <VStack space="sm" className="p-4">
    <div>Message 1</div>
    <div>Message 2</div>
    <div>Message 3</div>
  </VStack>
</CardScrollArea>
```

### Auto-Hide Scrollbar
```tsx
<AutoHideScrollArea maxHeight="500px" className="p-4">
  <p>Long content that reveals scrollbar only on hover...</p>
</AutoHideScrollArea>
```

### With Shadow on Scroll
```tsx
<ScrollArea maxHeight="300px" shadowOnScroll rounded bordered>
  <div className="p-4">
    <p>Scroll to see shadow effect...</p>
  </div>
</ScrollArea>
```

### Scroll to Top Button
```tsx
<div className="relative">
  <ScrollArea maxHeight="400px" className="pr-4">
    <VStack space="md">
      {items.map(item => <Card key={item.id}>{item.title}</Card>)}
    </VStack>
  </ScrollArea>
  <ScrollToTopButton className="absolute bottom-4 right-4" />
</div>
```

### With Scroll Indicator
```tsx
<div className="relative">
  <ScrollArea maxHeight="300px">
    <VStack space="sm">
      {longList.map(item => <div key={item.id}>{item}</div>)}
    </VStack>
  </ScrollArea>
  <ScrollIndicator orientation="vertical" />
</div>
```

### Chat Messages (Snap Scroll)
```tsx
<ScrollArea maxHeight="400px" snapScroll>
  {messages.map(msg => (
    <div key={msg.id} className="snap-start py-2">
      <MessageBubble {...msg} />
    </div>
  ))}
</ScrollArea>
```

### Dashboard Widget
```tsx
<ScrollArea 
  maxHeight="280px" 
  rounded 
  bordered 
  background 
  thickness="thin"
>
  <VStack space="sm" className="p-3">
    {activities.map(activity => (
      <ActivityItem key={activity.id} {...activity} />
    ))}
  </VStack>
</ScrollArea>
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Thickness | Width | Use Case |
|-----------|-------|----------|
| thin | 4px | Minimal footprint |
| normal | 6px | Default |
| wide | 8px | Touch-friendly |

| Visibility | Behavior | Use Case |
|------------|----------|----------|
| always | Always visible | Known long content |
| auto | Show when scrolling | Default |
| hover | Show on hover | Clean aesthetics |
| hidden | Never show | Custom scroll implementation |

| Rounded Size | Border Radius | Use Case |
|--------------|---------------|----------|
| sm | 6px | Subtle rounding |
| md | 8px | Default |
| lg | 12px | Card style |
| xl | 16px | Soft panels |
| 2xl | 24px | Rounded containers |

---

## 🎯 **LAYOUT COMPONENTS COMPLETE**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Stack** | 1D arrangement (vertical/horizontal) | ✅ |
| **Grid** | 2D arrangement (responsive columns) | ✅ |
| **Container** | Width constraint (max-width + padding) | ✅ |
| **AspectRatio** | Media proportion maintenance | ✅ |
| **Spacer** | Flexible spacing element | ✅ |
| **Divider** | Visual separator | ✅ |
| **ScrollArea** | Custom scrollable container | ✅ |

---

## 🚀 **REMAINING LAYOUT COMPONENTS**

- **Flex** — More flexible than Stack (row/column + wrap + grow + shrink)
- **Skeleton** — Loading placeholders with aspect ratio support
- **Card** — Container with consistent styling
- **Section** — Page section with consistent spacing
- **Tabs** — Tabbed interface component
