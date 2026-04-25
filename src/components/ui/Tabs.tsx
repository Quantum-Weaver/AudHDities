// src/components/ui/Tabs.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABS COMPONENT                                         ║
// ║                    The bookshelf of the interface                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useId,
  useCallback,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';
import { HScrollArea } from './ScrollArea';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  TabsContextValue,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsPanelProps,
  AnimatedTabsPanelProps,
  IconTabsTriggerProps,
  BadgeTabsTriggerProps,
} from '@/types/components/ui/tabs.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  TABS_ORIENTATION,
  TABS_ANIMATION_DURATION,
  TABS_ANIMATION_MOUNT_DELAY,
  TABS_BADGE_VARIANT,
  TABS_BADGE_CLASSES,
} from '@/lib/constants/components/ui/tabs.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeTabsListClasses,
  composeTabsTriggerClasses,
  composeTabsPanelClasses,
} from '@/lib/utils/components/ui/tabs.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// TABS ROOT
// ═══════════════════════════════════════════════════════════════════════════

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = 'underline',
      size = 'md',
      orientation = 'horizontal',
      fullWidth = false,
      children,
      className,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : uncontrolledValue;
    const tabsId = useId();

    const setActiveTab = useCallback(
      (value: string) => {
        if (!isControlled) setUncontrolledValue(value);
        onValueChange?.(value);
      },
      [isControlled, onValueChange]
    );

    const contextValue: TabsContextValue = {
      activeTab,
      setActiveTab,
      variant,
      size,
      orientation,
      tabsId,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex',
            TABS_ORIENTATION[orientation].container,
            fullWidth && orientation === 'horizontal' && 'w-full',
            className
          )}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

// ═══════════════════════════════════════════════════════════════════════════
// TABS LIST
// ═══════════════════════════════════════════════════════════════════════════

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, fullWidth = false, className, ...props }, ref) => {
    const { orientation, variant, size } = useTabs();

    const listClasses = composeTabsListClasses({
      variant,
      orientation,
      size,
      fullWidth: fullWidth && orientation === 'horizontal',
      className,
    });

    const variantGap =
      variant === 'pill' ? 'gap-2' : variant === 'bordered' ? 'gap-1' : 'gap-4';

    return (
      <div ref={ref} role="tablist" aria-orientation={orientation} className={listClasses} {...props}>
        {orientation === 'horizontal' ? (
          <HScrollArea className="pb-2">
            <div className={cn('flex', variantGap)}>{children}</div>
          </HScrollArea>
        ) : (
          children
        )}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

// ═══════════════════════════════════════════════════════════════════════════
// TABS TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, disabled = false, className, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, size, orientation, tabsId } = useTabs();
    const isActive = activeTab === value;

    const triggerClasses = composeTabsTriggerClasses({
      variant,
      size,
      orientation,
      isActive,
      disabled,
      className,
    });

    const handleClick = () => {
      if (!disabled) setActiveTab(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`tab-${tabsId}-${value}`}
        aria-selected={isActive}
        aria-controls={`panel-${tabsId}-${value}`}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        disabled={disabled}
        className={triggerClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

// ═══════════════════════════════════════════════════════════════════════════
// TABS PANEL
// ═══════════════════════════════════════════════════════════════════════════

export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ children, value, forceMount = false, className, ...props }, ref) => {
    const { activeTab, orientation, tabsId } = useTabs();
    const isActive = activeTab === value;
    if (!forceMount && !isActive) return null;

    const panelClasses = composeTabsPanelClasses({
      orientation,
      hidden: !isActive,
      className,
    });

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tabsId}-${value}`}
        aria-labelledby={`tab-${tabsId}-${value}`}
        hidden={!isActive}
        className={panelClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsPanel.displayName = 'TabsPanel';

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED TABS PANEL
// ═══════════════════════════════════════════════════════════════════════════

export const AnimatedTabsPanel = React.forwardRef<HTMLDivElement, AnimatedTabsPanelProps>(
  ({ children, duration = TABS_ANIMATION_DURATION, value, className, ...props }, ref) => {
    const { activeTab } = useTabs();
    const isActive = activeTab === value;
    const [shouldRender, setShouldRender] = React.useState(isActive);
    const [isAnimating, setIsAnimating] = React.useState(false);

    useEffect(() => {
      if (isActive) {
        setShouldRender(true);
        setTimeout(() => setIsAnimating(true), TABS_ANIMATION_MOUNT_DELAY);
      } else {
        setIsAnimating(false);
        const timer = setTimeout(() => setShouldRender(false), duration);
        return () => clearTimeout(timer);
      }
    }, [isActive, duration]);

    if (!shouldRender) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={!isActive}
        className={cn(
          'transition-all ease-in-out',
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          className
        )}
        style={{ transitionDuration: `${duration}ms` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimatedTabsPanel.displayName = 'AnimatedTabsPanel';

// ═══════════════════════════════════════════════════════════════════════════
// ICON TABS TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

export const IconTabsTrigger = React.forwardRef<HTMLButtonElement, IconTabsTriggerProps>(
  ({ children, icon, iconPosition = 'left', className, ...props }, ref) => (
    <TabsTrigger ref={ref} className={cn('gap-2', className)} {...props}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </TabsTrigger>
  )
);
IconTabsTrigger.displayName = 'IconTabsTrigger';

// ═══════════════════════════════════════════════════════════════════════════
// BADGE TABS TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

export const BadgeTabsTrigger = React.forwardRef<HTMLButtonElement, BadgeTabsTriggerProps>(
  ({ children, badge, badgeVariant = 'default', className, ...props }, ref) => {
    const variantColors = TABS_BADGE_VARIANT[badgeVariant];

    return (
      <TabsTrigger ref={ref} className={cn('gap-1', className)} {...props}>
        {children}
        {badge !== undefined && (
          <span className={cn(TABS_BADGE_CLASSES, variantColors.bg, variantColors.text)}>
            {badge}
          </span>
        )}
      </TabsTrigger>
    );
  }
);
BadgeTabsTrigger.displayName = 'BadgeTabsTrigger';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export { TabsContext, useTabs };

export type {
  TabsContextValue,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsPanelProps,
  AnimatedTabsPanelProps,
  IconTabsTriggerProps,
  BadgeTabsTriggerProps,
  TabsVariant,
  TabsSize,
  TabsOrientation,
  TabsBadgeVariant,
} from '@/types/components/ui/tabs.types';