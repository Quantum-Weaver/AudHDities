// src/components/ui/Sidebar.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIDEBAR COMPONENT                                      ║
// ║                    The spine of the interface                             ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from './ScrollArea';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SidebarProps,
  SidebarNavItemProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarContextValue,
  SidebarVariant,
  SidebarPosition,
} from '@/types/components/ui/sidebar.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_PADDING_X_EXPANDED,
  SIDEBAR_PADDING_Y_EXPANDED,
  SIDEBAR_PADDING_COLLAPSED,
  SIDEBAR_NAV_PADDING_EXPANDED,
  SIDEBAR_NAV_PADDING_COLLAPSED,
  SIDEBAR_NAV_GAP,
  SIDEBAR_ITEM_GAP,
  SIDEBAR_ITEM_PADDING_Y,
  SIDEBAR_CHILDREN_MARGIN_LEFT,
  SIDEBAR_CHILDREN_MARGIN_TOP,
  SIDEBAR_CHILDREN_GAP,
  SIDEBAR_TOGGLE_PADDING,
  SIDEBAR_TOGGLE_RADIUS,
  SIDEBAR_BADGE_RADIUS,
  SIDEBAR_BADGE_FONT_SIZE,
  SIDEBAR_BADGE_FONT_WEIGHT,
  SIDEBAR_DIVIDER_CLASSES,
  SIDEBAR_MOBILE_OVERLAY_BG,
  SIDEBAR_MOBILE_TOGGLE_PADDING,
  SIDEBAR_MOBILE_TOGGLE_RADIUS,
  SIDEBAR_MOBILE_TOGGLE_Z,
  SIDEBAR_Z_INDEX,
  SIDEBAR_TRANSITION,
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_ICON_SIZE_EXPANDED,
  SIDEBAR_ICON_SIZE_COLLAPSED,
  SIDEBAR_CHEVRON_SIZE,
  SIDEBAR_TOGGLE_ICON_SIZE,
  SIDEBAR_MOBILE_ICON_SIZE,
  SIDEBAR_BRAND_FONT_SIZE,
  SIDEBAR_BRAND_FONT_WEIGHT,
  SIDEBAR_USER_NAME_SIZE,
  SIDEBAR_USER_NAME_WEIGHT,
  SIDEBAR_USER_EMAIL_SIZE,
  SIDEBAR_FOOTER_GAP,
} from '@/lib/constants/components/vegvisir/sidebar.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  sidebarPanelVariants,
  sidebarNavItemVariants,
  sidebarBadgeVariants,
  sidebarGroupLabelVariants,
} from '@/lib/constants/components/vegvisir/sidebar.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  resolveSidebarWidth,
  getSidebarItemPaddingLeft,
  getSidebarItemPaddingRight,
  getMobileDrawerTranslate,
  isSidebarItemActive,
  hasSidebarItemChildren,
} from '@/lib/utils/components/ui/sidebar.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Sidebar — Persistent navigation spine for primary sections.
 *
 * Supports three visual variants (default, glass, minimal),
 * collapsible state with optional mobile drawer mode,
 * and nested navigation items with badges.
 *
 * @example
 * <Sidebar
 *   items={[
 *     { id: 'home', label: 'Home', icon: <Home />, href: '/' },
 *     { id: 'library', label: 'Library', icon: <Book />, children: [...] },
 *   ]}
 *   variant="glass"
 * />
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      items,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      variant = 'default',
      position = 'left',
      width,
      collapsedWidth,
      showToggle = true,
      mobileDrawer = true,
      header,
      footer,
      children,
      className,
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

    const setCollapsed = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalCollapsed(value);
        }
        onCollapsedChange?.(value);
      },
      [isControlled, onCollapsedChange]
    );

    const toggleCollapsed = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);

    // Close mobile drawer on resize to desktop
    useEffect(() => {
      if (!mobileDrawer) return;

      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsMobileOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [mobileDrawer]);

    const contextValue: SidebarContextValue = {
      collapsed,
      setCollapsed,
      toggleCollapsed,
      variant,
      position,
      activeItemId,
      setActiveItemId,
    };

    const resolvedWidth = resolveSidebarWidth({
      collapsed,
      width,
      collapsedWidth,
    });

    const panelVariantClass = sidebarPanelVariants({ variant, position });

    const sidebarContent = (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            panelVariantClass,
            SIDEBAR_TRANSITION,
            SIDEBAR_TRANSITION_DURATION,
            className
          )}
          style={{ width: resolvedWidth }}
        >
          {/* Header */}
          {header && (
            <div
              className={cn(
                'flex items-center border-b',
                SIDEBAR_DIVIDER_CLASSES,
                collapsed
                  ? SIDEBAR_PADDING_COLLAPSED
                  : [SIDEBAR_PADDING_X_EXPANDED, SIDEBAR_PADDING_Y_EXPANDED]
              )}
            >
              {header}
              {showToggle && (
                <button
                  type="button"
                  onClick={toggleCollapsed}
                  className={cn(
                    'ml-auto text-white/60 transition-colors hover:text-white hover:bg-white/10',
                    SIDEBAR_TOGGLE_PADDING,
                    SIDEBAR_TOGGLE_RADIUS,
                    collapsed && 'mx-auto'
                  )}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {position === 'left' ? (
                    collapsed ? (
                      <ChevronRight className={SIDEBAR_TOGGLE_ICON_SIZE} />
                    ) : (
                      <ChevronLeft className={SIDEBAR_TOGGLE_ICON_SIZE} />
                    )
                  ) : collapsed ? (
                    <ChevronLeft className={SIDEBAR_TOGGLE_ICON_SIZE} />
                  ) : (
                    <ChevronRight className={SIDEBAR_TOGGLE_ICON_SIZE} />
                  )}
                </button>
              )}
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav
              className={cn(
                'flex flex-col',
                SIDEBAR_NAV_GAP,
                collapsed
                  ? SIDEBAR_NAV_PADDING_COLLAPSED
                  : SIDEBAR_NAV_PADDING_EXPANDED
              )}
            >
              {items.map((item) => (
                <SidebarNavItem key={item.id} item={item} depth={0} />
              ))}
            </nav>
            {children && (
              <div
                className={cn(
                  'mt-4',
                  collapsed
                    ? SIDEBAR_PADDING_COLLAPSED
                    : SIDEBAR_NAV_PADDING_EXPANDED
                )}
              >
                {children}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {footer && (
            <div
              className={cn(
                'border-t',
                SIDEBAR_DIVIDER_CLASSES,
                collapsed
                  ? SIDEBAR_PADDING_COLLAPSED
                  : SIDEBAR_NAV_PADDING_EXPANDED
              )}
            >
              {footer}
            </div>
          )}
        </div>
      </SidebarContext.Provider>
    );

    // Mobile drawer mode
    if (mobileDrawer) {
      return (
        <>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className={cn(
              'fixed left-4 top-4 bg-white/10 text-white md:hidden',
              SIDEBAR_MOBILE_TOGGLE_Z,
              SIDEBAR_MOBILE_TOGGLE_PADDING,
              SIDEBAR_MOBILE_TOGGLE_RADIUS
            )}
            aria-label="Open menu"
          >
            <Menu className={SIDEBAR_MOBILE_ICON_SIZE} />
          </button>

          {/* Mobile overlay */}
          {isMobileOpen && (
            <div
              className={cn(
                'fixed inset-0 md:hidden',
                SIDEBAR_Z_INDEX,
                SIDEBAR_MOBILE_OVERLAY_BG
              )}
              onClick={() => setIsMobileOpen(false)}
            />
          )}

          {/* Mobile sidebar (drawer) */}
          <div
            className={cn(
              'fixed top-0 h-full md:hidden',
              SIDEBAR_Z_INDEX,
              'transition-transform duration-300',
              position === 'left' ? 'left-0' : 'right-0',
              getMobileDrawerTranslate(isMobileOpen, position ?? 'left')
            )}
            style={{ width: resolvedWidth }}
          >
            {sidebarContent}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block">{sidebarContent}</div>
        </>
      );
    }

    return sidebarContent;
  }
);
Sidebar.displayName = 'Sidebar';

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR NAVIGATION ITEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SidebarNavItem — Individual navigation item with optional children and badge.
 *
 * When collapsed, wraps the trigger in a Tooltip showing the label.
 * Supports nested items with expand/collapse via ChevronDown.
 */
export const SidebarNavItem = React.forwardRef<HTMLDivElement, SidebarNavItemProps>(
  ({ item, depth = 0 }, ref) => {
    const { collapsed, setActiveItemId, activeItemId } = useSidebar();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = hasSidebarItemChildren(item.children);
    const isActive = isSidebarItemActive(item.id, activeItemId, item.isActive);

    const handleClick = () => {
      if (hasChildren) {
        setIsOpen(!isOpen);
      } else {
        setActiveItemId(item.id);
        item.onClick?.();
      }
    };

    const paddingLeft = getSidebarItemPaddingLeft(depth, collapsed);
    const paddingRight = getSidebarItemPaddingRight(collapsed);

    const navItemClass = sidebarNavItemVariants({
      state: item.disabled ? 'disabled' : isActive ? 'active' : 'default',
    });

    const buttonContent = (
      <button
        type="button"
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          navItemClass,
          SIDEBAR_ITEM_PADDING_Y,
          collapsed ? 'justify-center' : SIDEBAR_ITEM_GAP
        )}
        style={{ paddingLeft, paddingRight }}
      >
        {item.icon && (
          <span
            className={cn(
              'flex-shrink-0',
              collapsed ? SIDEBAR_ICON_SIZE_COLLAPSED : SIDEBAR_ICON_SIZE_EXPANDED
            )}
          >
            {item.icon}
          </span>
        )}

        {!collapsed && (
          <span className="flex-1 truncate text-left text-sm">{item.label}</span>
        )}

        {!collapsed && item.badge && (
          <span
            className={sidebarBadgeVariants({
              variant: item.badgeVariant ?? 'default',
            })}
          >
            {item.badge}
          </span>
        )}

        {!collapsed && hasChildren && (
          <ChevronDown
            className={cn(
              SIDEBAR_CHEVRON_SIZE,
              'transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </button>
    );

    // Wrap with tooltip when collapsed
    const wrappedContent = collapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="inline-flex">{buttonContent}</span>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
            {item.badge && ` (${item.badge})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      buttonContent
    );

    const finalContent =
      item.href && !item.onClick ? (
        <a href={item.href} className="block">
          {wrappedContent}
        </a>
      ) : (
        wrappedContent
      );

    return (
      <div ref={ref}>
        {finalContent}

        {hasChildren && isOpen && !collapsed && (
          <div
            className={cn(
              SIDEBAR_CHILDREN_MARGIN_LEFT,
              SIDEBAR_CHILDREN_MARGIN_TOP,
              SIDEBAR_CHILDREN_GAP
            )}
          >
            {item.children!.map((child) => (
              <SidebarNavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
);
SidebarNavItem.displayName = 'SidebarNavItem';

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR GROUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SidebarGroup — Groups navigation items with an optional label.
 *
 * @example
 * <SidebarGroup label="Main" labelVariant="accent">
 *   <SidebarNavItem item={...} />
 * </SidebarGroup>
 */
export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, labelVariant = 'default', children, className }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn('first:mt-0', 'mt-4', className)}
      >
        {!collapsed && label && (
          <div className={sidebarGroupLabelVariants({ variant: labelVariant })}>
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR HEADER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SidebarHeader — Brand area with logo and name.
 *
 * @example
 * <SidebarHeader
 *   logo={<SanctuaryIcon />}
 *   brand="Sanctuary"
 * />
 */
export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, brand, className, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          collapsed ? 'justify-center' : 'px-2',
          className
        )}
        {...props}
      >
        {logo && <div className="flex-shrink-0">{logo}</div>}
        {!collapsed && brand && (
          <span
            className={cn(
              SIDEBAR_BRAND_FONT_SIZE,
              SIDEBAR_BRAND_FONT_WEIGHT,
              'text-white'
            )}
          >
            {brand}
          </span>
        )}
      </div>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR FOOTER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SidebarFooter — User area with avatar, name, and email.
 *
 * @example
 * <SidebarFooter
 *   avatar={<Avatar />}
 *   name="Quantum Weaver"
 *   email="weaver@sanctuary.dev"
 * />
 */
export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ avatar, name, email, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          SIDEBAR_FOOTER_GAP,
          collapsed ? 'justify-center' : 'px-2',
          className
        )}
        {...props}
      >
        {avatar && <div className="flex-shrink-0">{avatar}</div>}
        {!collapsed && (name || email) && (
          <div className="flex-1 overflow-hidden">
            {name && (
              <div
                className={cn(
                  'truncate text-white',
                  SIDEBAR_USER_NAME_SIZE,
                  SIDEBAR_USER_NAME_WEIGHT
                )}
              >
                {name}
              </div>
            )}
            {email && (
              <div
                className={cn(
                  'truncate text-white/60',
                  SIDEBAR_USER_EMAIL_SIZE
                )}
              >
                {email}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = 'SidebarFooter';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  SidebarProps,
  SidebarNavItemProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarItem,
  SidebarContextValue,
  SidebarVariant,
  SidebarPosition,
} from '@/types/components/ui/sidebar.types';