// src/components/ui/ScrollArea.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCROLL AREA COMPONENT                                   ║
// ║                    The window to overflowing content                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  ScrollAreaProps,
  ScrollToTopButtonProps,
  ScrollIndicatorProps,
} from '@/types/components/ui/scroll_area.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SCROLL_INDICATOR_TRACK_BG,
  SCROLL_INDICATOR_THUMB_BG,
  SCROLL_INDICATOR_TRANSITION,
  SCROLL_TO_TOP_BUTTON_BG,
  SCROLL_TO_TOP_BUTTON_HOVER_BG,
} from '@/lib/constants/components/hof/scroll_area.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeScrollAreaClasses,
  getScrollAreaSizeStyle,
} from '@/utils/components/ui/scroll_area.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL AREA
// ═══════════════════════════════════════════════════════════════════════════

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
      className,
      style,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = useCallback(() => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollLeft } = scrollRef.current;
      onScrollPosition?.(scrollTop, scrollLeft);
      if (shadowOnScroll) setIsScrolled(scrollTop > 0);
    }, [onScrollPosition, shadowOnScroll]);

    useEffect(() => {
      if (scrollToTopOnMount && scrollRef.current) {
        scrollRef.current.scrollTop = initialScrollTop;
        scrollRef.current.scrollLeft = initialScrollLeft;
      }
    }, [scrollToTopOnMount, initialScrollTop, initialScrollLeft]);

    useEffect(() => {
      const element = scrollRef.current;
      if (element) {
        element.addEventListener('scroll', handleScroll, { passive: true });
        return () => element.removeEventListener('scroll', handleScroll);
      }
    }, [handleScroll]);

    const composedClasses = composeScrollAreaClasses({
      orientation,
      visibility: scrollbarVisibility,
      thickness,
      rounded,
      roundedSize,
      bordered,
      background,
      hideTrack,
      snapScroll,
      snapDirection,
      isScrolled,
      shadowOnScroll,
      className,
    });

    const sizeStyle = getScrollAreaSizeStyle({ maxHeight, maxWidth, height, width });

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          scrollRef.current = node;
        }}
        className={composedClasses}
        style={{ ...sizeStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const VScrollArea = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollAreaProps, 'orientation'>
>((props, ref) => <ScrollArea ref={ref} orientation="vertical" {...props} />);
VScrollArea.displayName = 'VScrollArea';

export const HScrollArea = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollAreaProps, 'orientation'>
>((props, ref) => <ScrollArea ref={ref} orientation="horizontal" {...props} />);
HScrollArea.displayName = 'HScrollArea';

export const AutoHideScrollArea = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollAreaProps, 'scrollbarVisibility'>
>((props, ref) => <ScrollArea ref={ref} scrollbarVisibility="hover" {...props} />);
AutoHideScrollArea.displayName = 'AutoHideScrollArea';

export const ThinScrollArea = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollAreaProps, 'thickness'>
>((props, ref) => <ScrollArea ref={ref} thickness="thin" {...props} />);
ThinScrollArea.displayName = 'ThinScrollArea';

export const CardScrollArea = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollAreaProps, 'bordered' | 'background' | 'rounded'>
>((props, ref) => (
  <ScrollArea ref={ref} bordered background rounded roundedSize="lg" {...props} />
));
CardScrollArea.displayName = 'CardScrollArea';

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL TO TOP BUTTON
// ═══════════════════════════════════════════════════════════════════════════

export const ScrollToTopButton = React.forwardRef<
  HTMLButtonElement,
  ScrollToTopButtonProps
>(({ className, children, ...props }, ref) => {
  const scrollAreaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const button = (ref as React.MutableRefObject<HTMLButtonElement | null>)?.current;
    if (!button) return;
    let element: HTMLElement | null = button.parentElement;
    while (element) {
      if (element.classList.contains('overflow-y-auto')) {
        scrollAreaRef.current = element;
        break;
      }
      element = element.parentElement;
    }
  }, [ref]);

  const handleClick = () => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={cn(
        'p-2 rounded-full transition-colors',
        SCROLL_TO_TOP_BUTTON_BG,
        SCROLL_TO_TOP_BUTTON_HOVER_BG,
        className
      )}
      {...props}
    >
      {children || '↑'}
    </button>
  );
});
ScrollToTopButton.displayName = 'ScrollToTopButton';

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL INDICATOR
// ═══════════════════════════════════════════════════════════════════════════

export const ScrollIndicator = React.forwardRef<
  HTMLDivElement,
  ScrollIndicatorProps
>(({ orientation = 'vertical', className, ...props }, ref) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = (ref as React.MutableRefObject<HTMLDivElement | null>)?.current;
    if (!element) return;

    let parent: HTMLElement | null = element.parentElement;
    while (parent) {
      if (
        parent.classList.contains('overflow-y-auto') ||
        parent.classList.contains('overflow-x-auto')
      ) {
        targetRef.current = parent;
        break;
      }
      parent = parent.parentElement;
    }

    if (!targetRef.current) return;

    const updateScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = el;
      if (orientation === 'vertical') {
        setIsScrollable(scrollHeight > clientHeight);
        setScrollPercentage(
          clientHeight < scrollHeight
            ? (scrollTop / (scrollHeight - clientHeight)) * 100
            : 0
        );
      } else {
        setIsScrollable(scrollWidth > clientWidth);
        setScrollPercentage(
          clientWidth < scrollWidth
            ? (scrollLeft / (scrollWidth - clientWidth)) * 100
            : 0
        );
      }
    };

    updateScroll();
    targetRef.current.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    return () => {
      targetRef.current?.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [ref, orientation]);

  if (!isScrollable) return null;

  const isVertical = orientation === 'vertical';

  return (
    <div
      ref={ref}
      className={cn(
        'absolute rounded-full overflow-hidden',
        isVertical
          ? 'right-1 top-1/2 -translate-y-1/2 w-1 h-16'
          : 'bottom-1 left-1/2 -translate-x-1/2 h-1 w-16',
        SCROLL_INDICATOR_TRACK_BG,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'rounded-full',
          isVertical ? 'w-full' : 'h-full',
          SCROLL_INDICATOR_THUMB_BG,
          SCROLL_INDICATOR_TRANSITION
        )}
        style={
          isVertical
            ? { height: `${scrollPercentage}%` }
            : { width: `${scrollPercentage}%` }
        }
      />
    </div>
  );
});
ScrollIndicator.displayName = 'ScrollIndicator';

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type {
  ScrollAreaProps,
  ScrollToTopButtonProps,
  ScrollIndicatorProps,
  ScrollbarVisibility,
  ScrollOrientation,
  ScrollbarThickness,
  SnapDirection,
  ScrollAreaRoundedSize,
} from '@/types/components/ui/scroll_area.types';