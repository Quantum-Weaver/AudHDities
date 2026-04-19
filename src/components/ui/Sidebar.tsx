// components/ui/Sidebar.tsx
// Sidebar Component - The spine of the interface
// Provides persistent navigation to primary sections

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from './ScrollArea';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

export type SidebarVariant = 'default' | 'glass' | 'minimal';
export type SidebarPosition = 'left' | 'right';

export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon?: React.ReactNode;
  /** URL path */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Nested items */
  children?: SidebarItem[];
  /** Whether item is active */
  isActive?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Badge count or content */
  badge?: string | number;
};
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  variant: SidebarVariant;
  position: SidebarPosition;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar');
  }
  return context;
};

export interface SidebarProps {
  /** Sidebar items */
  items: SidebarItem[];
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Visual variant */
  variant?: SidebarVariant;
  /** Position of sidebar */
  position?: SidebarPosition;
  /** Width of sidebar when expanded */
  width?: number;
  /** Width of sidebar when collapsed */
  collapsedWidth?: number;
  /** Show collapse toggle button */
  showToggle?: boolean;
  /** Mobile drawer mode (overlay on small screens) */
  mobileDrawer?: boolean;
  /** Custom header content */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Children (custom content below navigation) */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

const variantClasses: Record<SidebarVariant, string> = {
  default: 'bg-surface/95 border-r border-white/10',
  glass: 'bg-white/5 backdrop-blur-md border-r border-white/10',
  minimal: 'bg-transparent border-r border-white/5',
};

/**
 * Sidebar Component
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
      width = 260,
      collapsedWidth = 72,
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
    
    const setCollapsed = useCallback((value: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(value);
      }
      onCollapsedChange?.(value);
    }, [isControlled, onCollapsedChange]);
    
    const toggleCollapsed = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);
    
    // Handle mobile drawer
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
    
    const sidebarWidth = collapsed ? collapsedWidth : width;
    const positionClass = position === 'left' ? 'left-0' : 'right-0';
    const borderClass = position === 'left' ? 'border-r' : 'border-l';
    
    const sidebarContent = (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'fixed top-0 z-40 flex h-full flex-col transition-all duration-300',
            variantClasses[variant],
            borderClass,
            positionClass,
            className
          )}
          style={{ width: sidebarWidth }}
        >
          {/* Header */}
          {header && (
            <div className={cn('flex items-center border-b border-white/10', collapsed ? 'px-2 py-3' : 'px-4 py-3')}>
              {header}
              {showToggle && (
                <button
                  type="button"
                  onClick={toggleCollapsed}
                  className={cn(
                    'ml-auto rounded-md p-1 text-white/60 transition-colors hover:text-white hover:bg-white/10',
                    collapsed && 'mx-auto'
                  )}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {position === 'left' ? (
                    collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
                  ) : (
                    collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          )}
          
          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className={cn('flex flex-col gap-1', collapsed ? 'p-2' : 'p-3')}>
              {items.map((item) => (
                <SidebarNavItem key={item.id} item={item} depth={0} />
              ))}
            </nav>
            {children && <div className={cn('mt-4', collapsed ? 'px-2' : 'px-3')}>{children}</div>}
          </ScrollArea>
          
          {/* Footer */}
          {footer && (
            <div className={cn('border-t border-white/10', collapsed ? 'p-2' : 'p-3')}>
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
            className="fixed left-4 top-4 z-50 rounded-md bg-white/10 p-2 text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Mobile overlay */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/80 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
          
          {/* Mobile sidebar (drawer) */}
          <div
            className={cn(
              'fixed top-0 z-40 h-full transition-transform duration-300 md:hidden',
              positionClass,
              isMobileOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'
            )}
            style={{ width }}
          >
            {sidebarContent}
          </div>
          
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            {sidebarContent}
          </div>
        </>
      );
    }
    
    return sidebarContent;
  }
);
Sidebar.displayName = 'Sidebar';

// ============================================================================
// SIDEBAR NAVIGATION ITEM
// ============================================================================

export interface SidebarNavItemProps {
  item: SidebarItem;
  depth?: number;
}

export const SidebarNavItem = React.forwardRef<HTMLDivElement, SidebarNavItemProps>(
  ({ item, depth = 0 }, ref) => {
    const { collapsed, setActiveItemId, activeItemId } = useSidebar();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItemId === item.id || item.isActive;
    
    const handleClick = () => {
      if (hasChildren) {
        setIsOpen(!isOpen);
      } else {
        setActiveItemId(item.id);
        if (item.onClick) {
          item.onClick();
        }
      }
    };
    
    const paddingLeft = collapsed ? 0 : 12 + depth * 16;
    
    const buttonContent = (
      <button
        type="button"
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          'group flex w-full items-center rounded-md transition-all duration-200',
          'hover:bg-white/10',
          isActive && 'bg-cyan-500/20 text-cyan-400',
          item.disabled && 'opacity-50 cursor-not-allowed',
          collapsed ? 'justify-center py-2' : 'gap-3 py-2'
        )}
        style={{ paddingLeft: collapsed ? 0 : paddingLeft, paddingRight: collapsed ? 0 : 12 }}
      >
        {item.icon && (
          <span className={cn('flex-shrink-0', collapsed ? 'text-xl' : 'text-lg')}>
            {item.icon}
          </span>
        )}
        
        {!collapsed && (
          <span className="flex-1 truncate text-left text-sm">
            {item.label}
          </span>
        )}
        
        {!collapsed && item.badge && (
          <span className="ml-auto rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-xs font-medium text-cyan-400">
            {item.badge}
          </span>
        )}
        
        {!collapsed && hasChildren && (
          <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        )}
      </button>
    );
    
    // Wrap with tooltip when collapsed
    const wrappedContent = collapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
            {item.badge && ` (${item.badge})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : buttonContent;
    
    const finalContent = item.href && !item.onClick ? (
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
          <div className="ml-4 mt-1 space-y-1">
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

// ============================================================================
// SIDEBAR GROUP
// ============================================================================

export interface SidebarGroupProps {
  /** Group label */
  label?: string;
  /** Group items */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, children, className }, ref) => {
    const { collapsed } = useSidebar();
    
    return (
      <div ref={ref} className={cn('mt-4 first:mt-0', className)}>
        {!collapsed && label && (
          <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-white/40">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

// ============================================================================
// SIDEBAR HEADER
// ============================================================================

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo or brand element */
  logo?: React.ReactNode;
  /** Brand name */
  brand?: string;
}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, brand, className, ...props }, ref) => {
    const { collapsed } = useSidebar();
    
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', collapsed ? 'justify-center' : 'px-2', className)}
        {...props}
      >
        {logo && <div className="flex-shrink-0">{logo}</div>}
        {!collapsed && brand && (
          <span className="text-lg font-bold text-white">{brand}</span>
        )}
      </div>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

// ============================================================================
// SIDEBAR FOOTER
// ============================================================================

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** User avatar */
  avatar?: React.ReactNode;
  /** User name */
  name?: string;
  /** User email */
  email?: string;
}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ avatar, name, email, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3', collapsed ? 'justify-center' : 'px-2', className)}
        {...props}
      >
        {avatar && <div className="flex-shrink-0">{avatar}</div>}
        {!collapsed && (name || email) && (
          <div className="flex-1 overflow-hidden">
            {name && <div className="truncate text-sm font-medium text-white">{name}</div>}
            {email && <div className="truncate text-xs text-white/60">{email}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = 'SidebarFooter';