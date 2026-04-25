// src/utils/components/ui/accordion.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ACCORDION UTILITIES                                    ║
// ║                    Size resolution, nested indent, value toggle           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  ACCORDION_SIZES,
  ACCORDION_NESTED_INDENT,
} from '@/lib/constants/components/ui/accordion.constants';
import type { AccordionSize } from '@/lib/constants/components/ui/accordion.constants';
import type { AccordionType } from '@/lib/constants/components/ui/accordion.variants';

// ═══════════════════════════════════════════════════════════════════════════
// SIZE RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/** Returns the text size class for a given AccordionSize */
export function getAccordionTextSize(size: AccordionSize): string {
  return ACCORDION_SIZES[size].text;
}

/** Returns the trigger padding class for a given AccordionSize */
export function getAccordionTriggerPadding(size: AccordionSize): string {
  return ACCORDION_SIZES[size].triggerPadding;
}

/** Returns the content padding class for a given AccordionSize */
export function getAccordionContentPadding(size: AccordionSize): string {
  return ACCORDION_SIZES[size].contentPadding;
}

// ═══════════════════════════════════════════════════════════════════════════
// NESTED INDENT
// ═══════════════════════════════════════════════════════════════════════════

/** Returns the left margin class for a given nesting level */
export function getNestedIndent(level: number): string {
  const key = level as keyof typeof ACCORDION_NESTED_INDENT;
  return ACCORDION_NESTED_INDENT[key] ?? 'ml-0';
}

// ═══════════════════════════════════════════════════════════════════════════
// VALUE TOGGLE LOGIC
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Computes the new expanded values array after toggling an item.
 * Pure function — does not mutate state.
 */
export function computeExpandedValues(params: {
  type: AccordionType;
  currentValues: string[];
  toggledValue: string;
}): string[] {
  const { type, currentValues, toggledValue } = params;

  if (type === 'single') {
    return currentValues[0] === toggledValue ? [] : [toggledValue];
  }

  // type === 'multiple'
  if (currentValues.includes(toggledValue)) {
    return currentValues.filter((v) => v !== toggledValue);
  }
  return [...currentValues, toggledValue];
}