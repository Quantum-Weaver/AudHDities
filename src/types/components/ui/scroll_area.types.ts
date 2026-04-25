// src/types/components/ui/scroll_area.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCROLL AREA TYPES                                      ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  ScrollbarVisibility,
  ScrollOrientation,
  ScrollbarThickness,
  SnapDirection,
  ScrollAreaRoundedSize,
} from '@/lib/constants/components/hof/scroll_area.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type {
  ScrollbarVisibility,
  ScrollOrientation,
  ScrollbarThickness,
  SnapDirection,
  ScrollAreaRoundedSize,
};

// ─── ScrollArea Props ──────────────────────────────────────────────────────
export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** When to show scrollbars */
  scrollbarVisibility?: ScrollbarVisibility;
  /** Scroll orientation */
  orientation?: ScrollOrientation;
  /** Maximum height */
  maxHeight?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Fixed height */
  height?: string | number;
  /** Fixed width */
  width?: string | number;
  /** Hide scrollbar track background */
  hideTrack?: boolean;
  /** Scrollbar thickness */
  thickness?: ScrollbarThickness;
  /** Apply border radius */
  rounded?: boolean;
  /** Border radius size */
  roundedSize?: ScrollAreaRoundedSize;
  /** Add subtle border */
  bordered?: boolean;
  /** Add background with blur */
  background?: boolean;
  /** Show inset shadow when scrolled */
  shadowOnScroll?: boolean;
  /** Enable CSS scroll snapping */
  snapScroll?: boolean;
  /** Snap alignment */
  snapDirection?: SnapDirection;
  /** Callback with current scroll position */
  onScrollPosition?: (scrollTop: number, scrollLeft: number) => void;
  /** Scroll to top on mount */
  scrollToTopOnMount?: boolean;
  /** Initial vertical scroll position */
  initialScrollTop?: number;
  /** Initial horizontal scroll position */
  initialScrollLeft?: number;
}

// ─── ScrollToTopButton Props ───────────────────────────────────────────────
export interface ScrollToTopButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

// ─── ScrollIndicator Props ─────────────────────────────────────────────────
export interface ScrollIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}