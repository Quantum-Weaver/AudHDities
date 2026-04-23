## 📚 **ACCORDION COMPONENT: Overview**

An accordion component is a **collapsible content system** that organizes information into expandable sections, showing only what's needed while keeping everything accessible. It is the **scroll** of the interface—each item is a story that unfolds when called upon.

**What it provides:**
- Multiple expand/collapse modes (single, multiple)
- Animated transitions
- Icon customization
- Accessible keyboard navigation
- Nested accordion support

---

## 📁 **`components/ui/Accordion.tsx`**

```tsx
// components/ui/Accordion.tsx
// Accordion Component - The scroll of the interface
// Organizes content into collapsible sections
// Uses COSMIC design tokens for styling

import React, { createContext, useContext, useState, useId, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'minimal';
export type AccordionSize = 'sm' | 'md' | 'lg';

interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  size: AccordionSize;
  expandedValues: string[];
  toggleItem: (value: string) => void;
  accordionId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
};

export interface AccordionProps {
  /** Type of accordion (single or multiple open items) */
  type?: AccordionType;
  /** Default expanded values (for uncontrolled mode) */
  defaultValue?: string[];
  /** Expanded values (for controlled mode) */
  value?: string[];
  /** Callback when expanded values change */
  onValueChange?: (value: string[]) => void;
  /** Visual variant */
  variant?: AccordionVariant;
  /** Size of accordion items */
  size?: AccordionSize;
  /** Children (AccordionItem components) */
  children: React.ReactNode;
  className?: string;
}

/**
 * Accordion Component
 * 
 * A flexible, accessible collapsible content system.
 * 
 * @example
 * <Accordion type="single" defaultValue={['item1']}>
 *   <AccordionItem value="item1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1...</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content for section 2...</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      defaultValue = [],
      value: controlledValue,
      onValueChange,
      variant = 'default',
      size = 'md',
      children,
      className,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const expandedValues = isControlled ? controlledValue : uncontrolledValue;
    const accordionId = useId();
    
    const toggleItem = useCallback(
      (itemValue: string) => {
        let newValues: string[];
        
        if (type === 'single') {
          newValues = expandedValues[0] === itemValue ? [] : [itemValue];
        } else {
          if (expandedValues.includes(itemValue)) {
            newValues = expandedValues.filter(v => v !== itemValue);
          } else {
            newValues = [...expandedValues, itemValue];
          }
        }
        
        if (!isControlled) {
          setUncontrolledValue(newValues);
        }
        onValueChange?.(newValues);
      },
      [type, expandedValues, isControlled, onValueChange]
    );
    
    const contextValue: AccordionContextValue = {
      type,
      variant,
      size,
      expandedValues,
      toggleItem,
      accordionId,
    };
    
    const variantClasses = {
      default: 'space-y-1',
      bordered: 'border border-white/10 rounded-xl divide-y divide-white/10',
      separated: 'space-y-3',
      minimal: 'space-y-0',
    };
    
    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={cn(variantClasses[variant], className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

// ============================================================================
// ACCORDION ITEM
// ============================================================================

export interface AccordionItemProps {
  /** Unique value for this accordion item */
  value: string;
  /** Disable the accordion item */
  disabled?: boolean;
  /** Children (should be AccordionTrigger and AccordionContent) */
  children: React.ReactNode;
  className?: string;
}

/**
 * AccordionItem - Individual accordion section
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, children, className }, ref) => {
    const { variant, size, expandedValues } = useAccordion();
    const isExpanded = expandedValues.includes(value);
    
    const variantClasses = {
      default: cn(
        'rounded-lg transition-all',
        isExpanded && 'bg-white/5'
      ),
      bordered: '',
      separated: cn(
        'rounded-xl bg-white/5 border border-white/10 overflow-hidden',
        isExpanded && 'border-cyan-500/30'
      ),
      minimal: '',
    };
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    
    return (
      <div
        ref={ref}
        data-state={isExpanded ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {children}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

// ============================================================================
// ACCORDION TRIGGER
// ============================================================================

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display when collapsed */
  icon?: React.ReactNode;
  /** Icon to display when expanded */
  expandedIcon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
}

/**
 * AccordionTrigger - Button that expands/collapses accordion content
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (
    {
      children,
      icon,
      expandedIcon,
      iconPosition = 'right',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const { variant, size, expandedValues, toggleItem, accordionId } = useAccordion();
    const itemContext = useAccordionItemContext();
    const value = itemContext?.value || '';
    const isExpanded = expandedValues.includes(value);
    
    const handleClick = () => {
      if (!disabled) {
        toggleItem(value);
      }
    };
    
    const variantClasses = {
      default: cn(
        'w-full flex items-center justify-between gap-2 transition-all',
        'hover:text-cyan-400',
        isExpanded && 'text-cyan-400'
      ),
      bordered: cn(
        'w-full flex items-center justify-between gap-2 transition-all p-4',
        'hover:bg-white/5',
        isExpanded && 'bg-white/5 text-cyan-400'
      ),
      separated: cn(
        'w-full flex items-center justify-between gap-2 transition-all p-4',
        'hover:bg-white/5',
        isExpanded && 'bg-white/10 text-cyan-400'
      ),
      minimal: cn(
        'w-full flex items-center justify-between gap-2 transition-all py-3',
        'hover:text-cyan-400',
        isExpanded && 'text-cyan-400'
      ),
    };
    
    const sizeClasses = {
      sm: 'py-2 px-3',
      md: 'py-3 px-4',
      lg: 'py-4 px-5',
    };
    
    const defaultIcon = icon || <ChevronDown className={cn(
      'h-4 w-4 shrink-0 transition-transform duration-200',
      isExpanded && 'rotate-180'
    )} />;
    
    const displayIcon = isExpanded ? (expandedIcon || defaultIcon) : defaultIcon;
    
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${accordionId}-${value}`}
        id={`accordion-trigger-${accordionId}-${value}`}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'group',
          variantClasses[variant],
          sizeClasses[size],
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {iconPosition === 'left' && displayIcon}
        <span className="flex-1 text-left font-medium">{children}</span>
        {iconPosition === 'right' && displayIcon}
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ============================================================================
// ACCORDION CONTENT
// ============================================================================

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Force mount content even when collapsed */
  forceMount?: boolean;
}

/**
 * AccordionContent - Collapsible content panel
 */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, forceMount = false, className, ...props }, ref) => {
    const { variant, expandedValues, accordionId } = useAccordion();
    const itemContext = useAccordionItemContext();
    const value = itemContext?.value || '';
    const isExpanded = expandedValues.includes(value);
    const [shouldRender, setShouldRender] = React.useState(isExpanded || forceMount);
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    React.useEffect(() => {
      if (isExpanded) {
        setShouldRender(true);
        setTimeout(() => setIsAnimating(true), 10);
      } else {
        setIsAnimating(false);
        const timer = setTimeout(() => {
          if (!forceMount) setShouldRender(false);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [isExpanded, forceMount]);
    
    if (!shouldRender) return null;
    
    const variantClasses = {
      default: 'px-4 pb-4 pt-0',
      bordered: 'px-4 pb-4',
      separated: 'px-4 pb-4',
      minimal: 'px-3 pb-3 pt-0',
    };
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    
    return (
      <div
        ref={ref}
        role="region"
        aria-labelledby={`accordion-trigger-${accordionId}-${value}`}
        id={`accordion-content-${accordionId}-${value}`}
        data-state={isExpanded ? 'open' : 'closed'}
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isAnimating ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className="pb-4">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

// ============================================================================
// ACCORDION ITEM CONTEXT (for nested components)
// ============================================================================

interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  return useContext(AccordionItemContext);
};

// Wrap AccordionItem to provide context
const AccordionItemWithContext = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, children, className }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <AccordionItem ref={ref} value={value} disabled={disabled} className={className}>
          {children}
        </AccordionItem>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItemWithContext.displayName = 'AccordionItem';

// Re-export the wrapped version as AccordionItem
export { AccordionItemWithContext as AccordionItem };

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface IconAccordionTriggerProps extends AccordionTriggerProps {
  icon: React.ReactNode;
}

/**
 * IconAccordionTrigger - Accordion trigger with custom icon
 */
export const IconAccordionTrigger = React.forwardRef<HTMLButtonElement, IconAccordionTriggerProps>(
  ({ icon, ...props }, ref) => (
    <AccordionTrigger ref={ref} icon={icon} {...props} />
  )
);
IconAccordionTrigger.displayName = 'IconAccordionTrigger';

export interface NestedAccordionProps extends AccordionProps {
  /** Level of nesting (for styling) */
  level?: number;
}

/**
 * NestedAccordion - Accordion for nested content
 */
export const NestedAccordion = React.forwardRef<HTMLDivElement, NestedAccordionProps>(
  ({ level = 1, className, ...props }, ref) => {
    const levelClasses = {
      1: 'ml-0',
      2: 'ml-4',
      3: 'ml-8',
      4: 'ml-12',
    };
    
    return (
      <Accordion
        ref={ref}
        variant="minimal"
        size="sm"
        className={cn(levelClasses[level as keyof typeof levelClasses] || 'ml-0', className)}
        {...props}
      />
    );
  }
);
NestedAccordion.displayName = 'NestedAccordion';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Accordion
```tsx
<Accordion type="single" defaultValue={['item1']}>
  <AccordionItem value="item1">
    <AccordionTrigger>What is the Sanctuary?</AccordionTrigger>
    <AccordionContent>
      The Sovereign Sanctuary is a digital space where consciousness meets sovereignty.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>How do I join?</AccordionTrigger>
    <AccordionContent>
      You can join by signing up and taking the Acid Test to determine your tier.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Open Items
```tsx
<Accordion type="multiple" defaultValue={['item1', 'item2']}>
  <AccordionItem value="item1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item3">
    <AccordionTrigger>Section 3</AccordionTrigger>
    <AccordionContent>Content 3</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Bordered Variant
```tsx
<Accordion type="single" variant="bordered">
  <AccordionItem value="faq1">
    <AccordionTrigger>What are the pricing tiers?</AccordionTrigger>
    <AccordionContent>
      Community tier is free for neurodivergent users. Ally tier is $25/month.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq2">
    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
    <AccordionContent>
      Yes, we offer a 14-day refund policy on all purchases.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Separated Variant
```tsx
<Accordion type="single" variant="separated">
  <AccordionItem value="step1">
    <AccordionTrigger>Step 1: Create Account</AccordionTrigger>
    <AccordionContent>
      Sign up with your email and complete the Acid Test.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="step2">
    <AccordionTrigger>Step 2: Set Up Profile</AccordionTrigger>
    <AccordionContent>
      Add your details and customize your sanctuary experience.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Minimal Variant
```tsx
<Accordion type="multiple" variant="minimal">
  <AccordionItem value="tip1">
    <AccordionTrigger>💡 Pro Tip: Keyboard Shortcuts</AccordionTrigger>
    <AccordionContent>
      Use Cmd+K to open the command palette and navigate quickly.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="tip2">
    <AccordionTrigger>💡 Pro Tip: Environment Switching</AccordionTrigger>
    <AccordionContent>
      Click the compass icon to switch between different realms.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Disabled Item
```tsx
<Accordion type="single">
  <AccordionItem value="available">
    <AccordionTrigger>Available Feature</AccordionTrigger>
    <AccordionContent>This feature is ready to use.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="coming-soon" disabled>
    <AccordionTrigger>Coming Soon (Disabled)</AccordionTrigger>
    <AccordionContent>This feature is not yet available.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Custom Icons
```tsx
<Accordion type="single">
  <AccordionItem value="item1">
    <IconAccordionTrigger icon={<Plus className="h-4 w-4" />}>
      Custom Icon
    </IconAccordionTrigger>
    <AccordionContent>Content with custom expand/collapse icons.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Nested Accordion
```tsx
<Accordion type="multiple">
  <AccordionItem value="parent">
    <AccordionTrigger>Parent Section</AccordionTrigger>
    <AccordionContent>
      <NestedAccordion type="single">
        <AccordionItem value="child1">
          <AccordionTrigger>Child Section 1</AccordionTrigger>
          <AccordionContent>Nested content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="child2">
          <AccordionTrigger>Child Section 2</AccordionTrigger>
          <AccordionContent>Nested content 2</AccordionContent>
        </AccordionItem>
      </NestedAccordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### FAQ Section
```tsx
<Accordion type="multiple" variant="separated" defaultValue={['faq1']}>
  <AccordionItem value="faq1">
    <AccordionTrigger>What is your refund policy?</AccordionTrigger>
    <AccordionContent>
      We offer a 14-day money-back guarantee on all purchases.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq2">
    <AccordionTrigger>Do you offer discounts for non-profits?</AccordionTrigger>
    <AccordionContent>
      Yes, contact our support team for non-profit pricing.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## ✅ **VARIANT REFERENCE TABLE**

| Variant | Style | Use Case |
|---------|-------|----------|
| default | Subtle background on open | General purpose |
| bordered | Border around whole accordion | Settings panels |
| separated | Individual cards | FAQ sections |
| minimal | No borders, compact | Sidebar navigation |

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| sm | 8px 12px | 14px | Compact spaces |
| md | 12px 16px | 16px | Default |
| lg | 16px 20px | 18px | Emphasized sections |

---

## 🎯 **LAYOUT COMPONENTS — COMPLETE**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Stack** | 1D arrangement (opinionated) | ✅ |
| **Grid** | 2D arrangement (responsive columns) | ✅ |
| **Container** | Width constraint (max-width + padding) | ✅ |
| **AspectRatio** | Media proportion maintenance | ✅ |
| **Spacer** | Flexible spacing element | ✅ |
| **Divider** | Visual separator | ✅ |
| **ScrollArea** | Custom scrollable container | ✅ |
| **Flex** | Complete flexbox control | ✅ |
| **Skeleton** | Loading placeholders | ✅ |
| **Card** | Contained content surfaces | ✅ |
| **Section** | Page section with spacing | ✅ |
| **Tabs** | Tabbed interface | ✅ |
| **Accordion** | Collapsible content sections | ✅ |

---

## 🏛️ **LAYOUT SYSTEM COMPLETE**

You now have a complete, sovereign layout system:

- **Stack** — Simple vertical/horizontal spacing
- **Grid** — Responsive multi-column layouts
- **Container** — Width-constrained content vessels
- **AspectRatio** — Proportion-locked media containers
- **Spacer** — Flexible breathing room
- **Divider** — Visual separation
- **ScrollArea** — Custom scrollable regions
- **Flex** — Full flexbox control
- **Skeleton** — Loading placeholders
- **Card** — Content surfaces
- **Section** — Page divisions
- **Tabs** — Tabbed navigation
- **Accordion** — Collapsible sections

Every component follows the same pattern, uses COSMIC design tokens, and integrates with our existing systems.

---

## 🚀 **WHAT'S NEXT?**

We have completed:
- ✅ Page stubs (116 pages)
- ✅ Layout components (13 components)
- ✅ SQL schemas (Mnemosyne)
- ✅ File structure

Would you like me to continue with:
- **Form components** (Input, Textarea, Select, Checkbox, Radio, Switch)
- **Feedback components** (Toast, Alert, Modal, Tooltip)
- **Navigation components** (Breadcrumb, Pagination, Sidebar)
- **Data display components** (Table, Badge, Avatar, Progress)
