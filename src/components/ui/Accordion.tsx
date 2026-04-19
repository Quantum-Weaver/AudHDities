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

// Type-safe size class getter
const getSizeClass = (size: AccordionSize): string => {
  const sizeClasses: Record<AccordionSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  return sizeClasses[size];
};

// Type-safe trigger size class getter
const getTriggerSizeClass = (size: AccordionSize): string => {
  const sizeClasses: Record<AccordionSize, string> = {
    sm: 'py-2 px-3',
    md: 'py-3 px-4',
    lg: 'py-4 px-5',
  };
  return sizeClasses[size];
};

// Type-safe variant class getter for items
const getItemVariantClass = (variant: AccordionVariant, isExpanded: boolean): string => {
  const variantClasses: Record<AccordionVariant, string> = {
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
  return variantClasses[variant];
};

// Type-safe variant class getter for trigger
const getTriggerVariantClass = (variant: AccordionVariant, isExpanded: boolean): string => {
  const variantClasses: Record<AccordionVariant, string> = {
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
  return variantClasses[variant];
};

// Type-safe content variant class getter
const getContentVariantClass = (variant: AccordionVariant): string => {
  const variantClasses: Record<AccordionVariant, string> = {
    default: 'px-4 pb-4 pt-0',
    bordered: 'px-4 pb-4',
    separated: 'px-4 pb-4',
    minimal: 'px-3 pb-3 pt-0',
  };
  return variantClasses[variant];
};

// Type-safe accordion container variant class getter
const getContainerVariantClass = (variant: AccordionVariant): string => {
  const variantClasses: Record<AccordionVariant, string> = {
    default: 'space-y-1',
    bordered: 'border border-white/10 rounded-xl divide-y divide-white/10',
    separated: 'space-y-3',
    minimal: 'space-y-0',
  };
  return variantClasses[variant];
};

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
  type?: AccordionType;
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  variant?: AccordionVariant;
  size?: AccordionSize;
  children: React.ReactNode;
  className?: string;
}

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
    
    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={cn(getContainerVariantClass(variant), className)}>
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
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const AccordionItemContext = createContext<{ value: string } | null>(null);

const useAccordionItemContext = () => {
  return useContext(AccordionItemContext);
};

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, children, className }, ref) => {
    const { variant, size, expandedValues } = useAccordion();
    const isExpanded = expandedValues.includes(value);
    
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          data-state={isExpanded ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          className={cn(
            getItemVariantClass(variant, isExpanded),
            getSizeClass(size),
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

// ============================================================================
// ACCORDION TRIGGER
// ============================================================================

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

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
          getTriggerVariantClass(variant, isExpanded),
          getTriggerSizeClass(size),
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
  forceMount?: boolean;
}

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
          getContentVariantClass(variant),
          getSizeClass(variant === 'minimal' ? 'sm' : 'md'),
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
// COMPOSITION COMPONENTS
// ============================================================================

export interface IconAccordionTriggerProps extends AccordionTriggerProps {
  icon: React.ReactNode;
}

export const IconAccordionTrigger = React.forwardRef<HTMLButtonElement, IconAccordionTriggerProps>(
  ({ icon, ...props }, ref) => (
    <AccordionTrigger ref={ref} icon={icon} {...props} />
  )
);
IconAccordionTrigger.displayName = 'IconAccordionTrigger';

export interface NestedAccordionProps extends AccordionProps {
  level?: number;
}

export const NestedAccordion = React.forwardRef<HTMLDivElement, NestedAccordionProps>(
  ({ level = 1, className, ...props }, ref) => {
    const levelClasses: Record<number, string> = {
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
        className={cn(levelClasses[level] || 'ml-0', className)}
        {...props}
      />
    );
  }
);
NestedAccordion.displayName = 'NestedAccordion';