// components/ui/Tabs.tsx
// Tabs Component - The bookshelf of the interface
// Organizes content into selectable panels
// Uses COSMIC design tokens for styling

import React, { createContext, useContext, useState, useId, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { HScrollArea } from './ScrollArea';

export type TabsVariant = 'underline' | 'pill' | 'bordered' | 'minimal';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

export interface TabsProps {
  /** Default active tab value (for uncontrolled mode) */
  defaultValue?: string;
  /** Active tab value (for controlled mode) */
  value?: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Size of tab triggers */
  size?: TabsSize;
  /** Orientation of tabs */
  orientation?: TabsOrientation;
  /** Make tabs take full width */
  fullWidth?: boolean;
  /** Children (should be TabsList and TabsPanel components) */
  children: React.ReactNode;
  className?: string;
}

/**
 * Tabs Component
 * 
 * A flexible, accessible tabbed interface.
 * 
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *     <TabsTrigger value="tab3">Tab 3</TabsTrigger>
 *   </TabsList>
 *   <TabsPanel value="tab1">Content 1</TabsPanel>
 *   <TabsPanel value="tab2">Content 2</TabsPanel>
 *   <TabsPanel value="tab3">Content 3</TabsPanel>
 * </Tabs>
 */
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
        if (!isControlled) {
          setUncontrolledValue(value);
        }
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
    
    const orientationClasses = orientation === 'horizontal' ? 'flex-col' : 'flex-row';
    
    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientationClasses,
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

// ============================================================================
// TABS LIST
// ============================================================================

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Make list take full width */
  fullWidth?: boolean;
}

/**
 * TabsList - Container for tab triggers
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, fullWidth = false, className, ...props }, ref) => {
    const { orientation, variant, size, tabsId } = useTabs();
    
    const orientationClasses = orientation === 'horizontal' 
      ? 'flex-row border-b border-white/10' 
      : 'flex-col border-r border-white/10';
    
    const variantClasses = {
      underline: '',
      pill: 'gap-2',
      bordered: 'gap-1 p-1 rounded-lg bg-white/5',
      minimal: 'gap-4',
    };
    
    const sizeClasses = {
      sm: orientation === 'horizontal' ? 'h-9' : 'w-9',
      md: orientation === 'horizontal' ? 'h-10' : 'w-10',
      lg: orientation === 'horizontal' ? 'h-11' : 'w-11',
    };
    
    const listClasses = cn(
      'flex',
      orientationClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && orientation === 'horizontal' && 'w-full',
      className
    );
    
    const scrollContent = orientation === 'horizontal' && (
      <HScrollArea className="pb-2">
        <div className={cn('flex', variantClasses[variant])}>
          {children}
        </div>
      </HScrollArea>
    );
    
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={listClasses}
        {...props}
      >
        {orientation === 'horizontal' ? (
          scrollContent
        ) : (
          children
        )}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

// ============================================================================
// TABS TRIGGER
// ============================================================================

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value of the tab this trigger activates */
  value: string;
  /** Disable the tab */
  disabled?: boolean;
}

/**
 * TabsTrigger - Button that activates a tab panel
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, disabled = false, className, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, size, orientation, tabsId } = useTabs();
    const isActive = activeTab === value;
    
    const baseClasses = cn(
      'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      orientation === 'horizontal' ? 'px-4' : 'px-3 py-2',
      !disabled && 'cursor-pointer'
    );
    
    const sizeClasses = {
      sm: orientation === 'horizontal' ? 'text-sm h-9' : 'text-sm',
      md: orientation === 'horizontal' ? 'text-base h-10' : 'text-base',
      lg: orientation === 'horizontal' ? 'text-lg h-11' : 'text-lg',
    };
    
    const variantClasses = {
      underline: cn(
        'border-b-2 -mb-px',
        isActive
          ? 'border-cyan-400 text-cyan-400'
          : 'border-transparent text-white/60 hover:text-white hover:border-white/20'
      ),
      pill: cn(
        'rounded-full',
        isActive
          ? 'bg-cyan-500/20 text-cyan-400'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      ),
      bordered: cn(
        'rounded-md',
        isActive
          ? 'bg-white/10 text-white shadow-sm'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      ),
      minimal: cn(
        'relative',
        isActive
          ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
          : 'text-white/60 hover:text-white'
      ),
    };
    
    const handleClick = () => {
      if (!disabled) {
        setActiveTab(value);
      }
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
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

// ============================================================================
// TABS PANEL
// ============================================================================

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value of the tab this panel belongs to */
  value: string;
  /** Force mount content even when not active */
  forceMount?: boolean;
}

/**
 * TabsPanel - Content panel for a tab
 */
export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ children, value, forceMount = false, className, ...props }, ref) => {
    const { activeTab, orientation, tabsId } = useTabs();
    const isActive = activeTab === value;
    
    if (!forceMount && !isActive) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tabsId}-${value}`}
        aria-labelledby={`tab-${tabsId}-${value}`}
        hidden={!isActive}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
          orientation === 'vertical' && 'flex-1 pl-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsPanel.displayName = 'TabsPanel';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface AnimatedTabsPanelProps extends TabsPanelProps {
  /** Animation duration in ms */
  duration?: number;
}

/**
 * AnimatedTabsPanel - Tabs panel with fade animation
 */
export const AnimatedTabsPanel = React.forwardRef<HTMLDivElement, AnimatedTabsPanelProps>(
  ({ children, duration = 200, value, className, ...props }, ref) => {
    const { activeTab } = useTabs();
    const isActive = activeTab === value;
    const [shouldRender, setShouldRender] = React.useState(isActive);
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    useEffect(() => {
      if (isActive) {
        setShouldRender(true);
        setTimeout(() => setIsAnimating(true), 10);
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
          'transition-all duration-200 ease-in-out',
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimatedTabsPanel.displayName = 'AnimatedTabsPanel';

export interface IconTabsTriggerProps extends TabsTriggerProps {
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * IconTabsTrigger - Tab trigger with icon support
 */
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

export interface BadgeTabsTriggerProps extends TabsTriggerProps {
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning';
}

/**
 * BadgeTabsTrigger - Tab trigger with badge counter
 */
export const BadgeTabsTrigger = React.forwardRef<HTMLButtonElement, BadgeTabsTriggerProps>(
  ({ children, badge, badgeVariant = 'default', className, ...props }, ref) => {
    const badgeClasses = cn(
      'ml-2 px-1.5 py-0.5 text-xs rounded-full',
      badgeVariant === 'default' && 'bg-white/20 text-white',
      badgeVariant === 'primary' && 'bg-cyan-500/20 text-cyan-400',
      badgeVariant === 'success' && 'bg-green-500/20 text-green-400',
      badgeVariant === 'warning' && 'bg-yellow-500/20 text-yellow-400'
    );
    
    return (
      <TabsTrigger ref={ref} className={cn('gap-1', className)} {...props}>
        {children}
        {badge !== undefined && <span className={badgeClasses}>{badge}</span>}
      </TabsTrigger>
    );
  }
);
BadgeTabsTrigger.displayName = 'BadgeTabsTrigger';