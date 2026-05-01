// src/components/yggdrasil/Accordion.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ACCORDION COMPONENT                                    ║
// ║                    The scroll of the interface                            ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useId,
  useCallback,
} from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  IconAccordionTriggerProps,
  NestedAccordionProps,
  AccordionContextValue,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from '@/types/components/yggdrasil/accordion.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  ACCORDION_ICON_SIZE,
  ACCORDION_ICON_TRANSITION,
  ACCORDION_ICON_ROTATE_OPEN,
  ACCORDION_CONTENT_INNER_PADDING_BOTTOM,
  ACCORDION_ANIMATION_OPEN_DELAY,
  ACCORDION_ANIMATION_CLOSE_DELAY,
  ACCORDION_DISABLED_CLASSES,
  ACCORDION_TRIGGER_TEXT_CLASSES,
} from '@/lib/constants/components/yggdrasil/accordion.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  accordionContainerVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from '@/lib/constants/components/yggdrasil/accordion.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getAccordionTextSize,
  getAccordionTriggerPadding,
  getNestedIndent,
  computeExpandedValues,
} from '@/lib/utils/components/yggdrasil/accordion.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion components must be used within an Accordion provider'
    );
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// ACCORDION — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Accordion — Organizes content into collapsible sections.
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
    const [uncontrolledValue, setUncontrolledValue] =
      useState<string[]>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const expandedValues = isControlled ? controlledValue : uncontrolledValue;
    const accordionId = useId();

    const toggleItem = useCallback(
      (itemValue: string) => {
        const newValues = computeExpandedValues({
          type,
          currentValues: expandedValues,
          toggledValue: itemValue,
        });

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
        <div
          ref={ref}
          className={cn(accordionContainerVariants({ variant }), className)}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

// ═══════════════════════════════════════════════════════════════════════════
// ACCORDION ITEM
// ═══════════════════════════════════════════════════════════════════════════

const AccordionItemContext = createContext<{ value: string } | null>(null);

const useAccordionItemContext = () => useContext(AccordionItemContext);

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
            accordionItemVariants({ variant, isExpanded }),
            getAccordionTextSize(size),
            disabled && ACCORDION_DISABLED_CLASSES,
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

// ═══════════════════════════════════════════════════════════════════════════
// ACCORDION TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
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
    const { variant, size, expandedValues, toggleItem, accordionId } =
      useAccordion();
    const itemContext = useAccordionItemContext();
    const value = itemContext?.value || '';
    const isExpanded = expandedValues.includes(value);

    const handleClick = () => {
      if (!disabled) {
        toggleItem(value);
      }
    };

    const defaultIcon = icon || (
      <ChevronDown
        className={cn(
          ACCORDION_ICON_SIZE,
          'shrink-0',
          ACCORDION_ICON_TRANSITION,
          isExpanded && ACCORDION_ICON_ROTATE_OPEN
        )}
      />
    );

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
          accordionTriggerVariants({ variant, isExpanded }),
          getAccordionTriggerPadding(size),
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {iconPosition === 'left' && displayIcon}
        <span className={ACCORDION_TRIGGER_TEXT_CLASSES}>{children}</span>
        {iconPosition === 'right' && displayIcon}
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ═══════════════════════════════════════════════════════════════════════════
// ACCORDION CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, forceMount = false, className, ...props }, ref) => {
  const { variant, expandedValues, accordionId } = useAccordion();
  const itemContext = useAccordionItemContext();
  const value = itemContext?.value || '';
  const isExpanded = expandedValues.includes(value);
  const [shouldRender, setShouldRender] = React.useState(
    isExpanded || forceMount
  );
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (isExpanded) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), ACCORDION_ANIMATION_OPEN_DELAY);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        if (!forceMount) setShouldRender(false);
      }, ACCORDION_ANIMATION_CLOSE_DELAY);
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
        accordionContentVariants({ variant, isAnimating }),
        className
      )}
      {...props}
    >
      <div className={ACCORDION_CONTENT_INNER_PADDING_BOTTOM}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION: ICON ACCORDION TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

export const IconAccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  IconAccordionTriggerProps
>(({ icon, ...props }, ref) => (
  <AccordionTrigger ref={ref} icon={icon} {...props} />
));
IconAccordionTrigger.displayName = 'IconAccordionTrigger';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION: NESTED ACCORDION
// ═══════════════════════════════════════════════════════════════════════════

export const NestedAccordion = React.forwardRef<
  HTMLDivElement,
  NestedAccordionProps
>(({ level = 1, className, ...props }, ref) => (
  <Accordion
    ref={ref}
    variant="minimal"
    size="sm"
    className={cn(getNestedIndent(level), className)}
    {...props}
  />
));
NestedAccordion.displayName = 'NestedAccordion';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  IconAccordionTriggerProps,
  NestedAccordionProps,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from '@/types/components/yggdrasil/accordion.types';