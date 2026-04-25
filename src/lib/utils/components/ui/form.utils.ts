// src/utils/components/ui/form.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM UTILITIES                                         ║
// ║                    Field name extraction, data collection, error scroll   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { FORM_ERROR_SCROLL_BEHAVIOR } from '@/lib/constants/components/ui/form.constants';

// ═══════════════════════════════════════════════════════════════════════════
// FIELD NAME EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Extracts the `name` prop from a child element.
 * Handles FormField wrappers by looking at the FormField's child (the actual input).
 */
export function getFieldNameFromChild(
  child: React.ReactNode
): string | undefined {
  if (!React.isValidElement(child)) return undefined;

  const childElement = child as React.ReactElement<{
    name?: string;
    children?: React.ReactNode;
  }>;

  // Check if this is a FormField wrapper
  if (isFormFieldComponent(childElement)) {
    const grandChild = childElement.props.children;
    if (React.isValidElement(grandChild)) {
      return (grandChild as React.ReactElement<{ name?: string }>).props.name;
    }
  }

  // Direct named element
  return childElement.props.name;
}

/**
 * Determines if a React element is a FormField component.
 */
function isFormFieldComponent(
  element: React.ReactElement
): boolean {
  const componentType = element.type as any;
  const displayName = componentType?.displayName;
  const name = componentType?.name;
  return displayName === 'FormField' || name === 'FormField';
}

// ═══════════════════════════════════════════════════════════════════════════
// FORM DATA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Collects form data from a FormData object into a plain Record.
 */
export function collectFormData(
  formData: FormData
): Record<string, any> {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

// ═══════════════════════════════════════════════════════════════════════════
// ERROR SCROLLING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Scrolls to the first form field with a validation error.
 */
export function scrollToFirstError(
  errors: Record<string, string>
): void {
  const firstErrorField = Object.keys(errors)[0];
  if (!firstErrorField) return;

  const errorElement = document.querySelector(
    `[name="${firstErrorField}"]`
  );
  errorElement?.scrollIntoView(FORM_ERROR_SCROLL_BEHAVIOR);
}