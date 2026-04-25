// src/components/seidr/Drawer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DRAWER COMPONENT                                       ║
// ║                    The side chamber of the interface                      ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ScrollArea } from './ScrollArea';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  FilterDrawerProps,
  DrawerSide,
} from '@/types/components/seidr/drawer.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  DRAWER_Z_INDEX,
  DRAWER_BACKDROP_BG,
  DRAWER_BACKDROP_BLUR,
  DRAWER_BACKDROP_TRANSITION,
  DRAWER_PANEL_BG,
  DRAWER_BORDER_COLOR,
  DRAWER_SHADOW,
  DRAWER_TRANSITION_DURATION,
  DRAWER_TRANSITION_EASING,
  DRAWER_HEADER_PADDING,
  DRAWER_HEADER_BORDER,
  DRAWER_TITLE_SIZE,
  DRAWER_TITLE_WEIGHT,
  DRAWER_DESCRIPTION_SIZE,
  DRAWER_DESCRIPTION_COLOR,
  DRAWER_DESCRIPTION_MARGIN_TOP,
  DRAWER_CLOSE_BUTTON_PADDING,
  DRAWER_CLOSE_BUTTON_RADIUS,
  DRAWER_CLOSE_BUTTON_COLOR,
  DRAWER_CLOSE_BUTTON_HOVER_COLOR,
  DRAWER_CLOSE_BUTTON_HOVER_BG,
  DRAWER_CLOSE_ICON_SIZE,
  DRAWER_BODY_PADDING,
  DRAWER_FOOTER_PADDING,
  DRAWER_FOOTER_BORDER,
  DRAWER_FOOTER_GAP,
  DRAWER_EXIT_ANIMATION_DELAY,
  DRAWER_FILTER_BUTTON_RESET_COLOR,
  DRAWER_FILTER_BUTTON_RESET_HOVER,
  DRAWER_FILTER_BUTTON_RESET_PADDING_X,
  DRAWER_FILTER_BUTTON_RESET_PADDING_Y,
  DRAWER_FILTER_BUTTON_RESET_RADIUS,
  DRAWER_FILTER_BUTTON_RESET_SIZE,
  DRAWER_FILTER_BUTTON_RESET_WEIGHT,
  DRAWER_FILTER_BUTTON_APPLY_BG,
  DRAWER_FILTER_BUTTON_APPLY_HOVER_BG,
  DRAWER_FILTER_BUTTON_APPLY_COLOR,
  DRAWER_FILTER_BUTTON_APPLY_PADDING_X,
  DRAWER_FILTER_BUTTON_APPLY_PADDING_Y,
  DRAWER_FILTER_BUTTON_APPLY_RADIUS,
  DRAWER_FILTER_BUTTON_APPLY_SIZE,
  DRAWER_FILTER_BUTTON_APPLY_WEIGHT,
} from '@/lib/constants/components/seidr/drawer.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  drawerFooterAlignVariants,
} from '@/lib/constants/components/seidr/drawer.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getDrawerSizeClass,
  getDrawerAnimationClass,
  getDrawerPositionClass,
  getDrawerBorderClass,
  lockBodyScroll,
} from '@/lib/utils/components/seidr/drawer.utils';

// ═══════════════════════════════════════════════════════════════════════════
// DRAWER — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Drawer — Slide-out panel from any screen edge.
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      side = 'right',
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      preventScroll = true,
      noPadding = false,
      className,
      contentClassName,
      backdropClassName,
      children,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Scroll lock
    useEffect(() => {
      if (preventScroll && open) {
        return lockBodyScroll();
      }
    }, [open, preventScroll]);

    // Escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Animation timing
    useEffect(() => {
      if (open) {
        setIsAnimating(true);
      } else {
        const timer = setTimeout(
          () => setIsAnimating(false),
          DRAWER_EXIT_ANIMATION_DELAY
        );
        return () => clearTimeout(timer);
      }
    }, [open]);

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!mounted) return null;

    const sizeClass = getDrawerSizeClass(side, size);
    const animationClass = getDrawerAnimationClass(side, open);
    const positionClass = getDrawerPositionClass(side);
    const borderClass = getDrawerBorderClass(side);

    return createPortal(
      <div
        className={cn(
          'fixed inset-0',
          DRAWER_Z_INDEX,
          'transition-all',
          DRAWER_BACKDROP_TRANSITION,
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          backdropClassName
        )}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0',
            DRAWER_BACKDROP_BG,
            DRAWER_BACKDROP_BLUR
          )}
        />

        {/* Panel */}
        <div
          ref={ref}
          className={cn(
            'fixed',
            DRAWER_PANEL_BG,
            DRAWER_BORDER_COLOR,
            DRAWER_SHADOW,
            'transition-transform',
            DRAWER_TRANSITION_DURATION,
            DRAWER_TRANSITION_EASING,
            positionClass,
            borderClass,
            sizeClass,
            animationClass,
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          aria-describedby={description ? 'drawer-description' : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between',
                DRAWER_HEADER_PADDING,
                DRAWER_HEADER_BORDER,
                DRAWER_BORDER_COLOR
              )}
            >
              <div>
                {title && (
                  <h2
                    id="drawer-title"
                    className={cn(
                      'text-white',
                      DRAWER_TITLE_SIZE,
                      DRAWER_TITLE_WEIGHT
                    )}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="drawer-description"
                    className={cn(
                      DRAWER_DESCRIPTION_SIZE,
                      DRAWER_DESCRIPTION_COLOR,
                      DRAWER_DESCRIPTION_MARGIN_TOP
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    DRAWER_CLOSE_BUTTON_PADDING,
                    DRAWER_CLOSE_BUTTON_RADIUS,
                    DRAWER_CLOSE_BUTTON_COLOR,
                    'transition-colors',
                    DRAWER_CLOSE_BUTTON_HOVER_COLOR,
                    DRAWER_CLOSE_BUTTON_HOVER_BG
                  )}
                  aria-label="Close drawer"
                >
                  <X className={DRAWER_CLOSE_ICON_SIZE} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <ScrollArea
            className={cn(
              'flex-1',
              !noPadding && DRAWER_BODY_PADDING,
              contentClassName
            )}
          >
            {children}
          </ScrollArea>
        </div>
      </div>,
      document.body
    );
  }
);
Drawer.displayName = 'Drawer';

// ═══════════════════════════════════════════════════════════════════════════
// DRAWER HEADER
// ═══════════════════════════════════════════════════════════════════════════

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, showCloseButton = true, onClose, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between',
        DRAWER_HEADER_PADDING,
        DRAWER_HEADER_BORDER,
        DRAWER_BORDER_COLOR,
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            DRAWER_CLOSE_BUTTON_PADDING,
            DRAWER_CLOSE_BUTTON_RADIUS,
            DRAWER_CLOSE_BUTTON_COLOR,
            'transition-colors',
            DRAWER_CLOSE_BUTTON_HOVER_COLOR,
            DRAWER_CLOSE_BUTTON_HOVER_BG
          )}
          aria-label="Close drawer"
        >
          <X className={DRAWER_CLOSE_ICON_SIZE} />
        </button>
      )}
    </div>
  )
);
DrawerHeader.displayName = 'DrawerHeader';

// ═══════════════════════════════════════════════════════════════════════════
// DRAWER BODY
// ═══════════════════════════════════════════════════════════════════════════

export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, noPadding = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1',
        !noPadding && DRAWER_BODY_PADDING,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerBody.displayName = 'DrawerBody';

// ═══════════════════════════════════════════════════════════════════════════
// DRAWER FOOTER
// ═══════════════════════════════════════════════════════════════════════════

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, align = 'right', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        drawerFooterAlignVariants({ align }),
        DRAWER_FOOTER_PADDING,
        DRAWER_FOOTER_BORDER,
        DRAWER_BORDER_COLOR,
        DRAWER_FOOTER_GAP,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerFooter.displayName = 'DrawerFooter';

// ═══════════════════════════════════════════════════════════════════════════
// FILTER DRAWER
// ═══════════════════════════════════════════════════════════════════════════

export const FilterDrawer = React.forwardRef<HTMLDivElement, FilterDrawerProps>(
  ({ open, onClose, filters = {}, onApply, onReset }, ref) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
      onApply?.(localFilters);
      onClose();
    };

    const handleReset = () => {
      setLocalFilters({});
      onReset?.();
    };

    return (
      <Drawer
        ref={ref}
        open={open}
        onClose={onClose}
        title="Filters"
        side="right"
        size="md"
      >
        <DrawerBody>
          <div className="space-y-4">
            <p className={DRAWER_DESCRIPTION_COLOR}>Filter controls go here</p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              DRAWER_FILTER_BUTTON_RESET_PADDING_X,
              DRAWER_FILTER_BUTTON_RESET_PADDING_Y,
              DRAWER_FILTER_BUTTON_RESET_RADIUS,
              DRAWER_FILTER_BUTTON_RESET_SIZE,
              DRAWER_FILTER_BUTTON_RESET_WEIGHT,
              DRAWER_FILTER_BUTTON_RESET_COLOR,
              'transition-colors',
              DRAWER_FILTER_BUTTON_RESET_HOVER
            )}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className={cn(
              DRAWER_FILTER_BUTTON_APPLY_BG,
              DRAWER_FILTER_BUTTON_APPLY_PADDING_X,
              DRAWER_FILTER_BUTTON_APPLY_PADDING_Y,
              DRAWER_FILTER_BUTTON_APPLY_RADIUS,
              DRAWER_FILTER_BUTTON_APPLY_SIZE,
              DRAWER_FILTER_BUTTON_APPLY_WEIGHT,
              DRAWER_FILTER_BUTTON_APPLY_COLOR,
              'transition-colors',
              DRAWER_FILTER_BUTTON_APPLY_HOVER_BG
            )}
          >
            Apply Filters
          </button>
        </DrawerFooter>
      </Drawer>
    );
  }
);
FilterDrawer.displayName = 'FilterDrawer';

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

export const useDrawer = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  FilterDrawerProps,
  DrawerSide,
  DrawerSize,
  DrawerFooterAlign,
} from '@/types/components/seidr/drawer.types';