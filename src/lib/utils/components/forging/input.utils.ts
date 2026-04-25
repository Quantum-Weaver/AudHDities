// src/lib/utils/components/forging/input.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INPUT UTILITIES                                        ║
// ║                    Pure logic — ID generation, icon resolution, a11y      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Types ─────────────────────────────────────────────────────────────────
export type IconModifier = 'left' | 'right' | 'both' | undefined;

// ─── ID Generation ─────────────────────────────────────────────────────────

/**
 * Generate a unique input ID.
 * Uses the provided ID if available, otherwise generates a random one.
 *
 * @param id - Optional user-provided ID
 * @returns A unique string ID safe for htmlFor/aria references
 *
 * @example
 * generateInputId()           // => "input-a3f9k2x"
 * generateInputId("email")    // => "email"
 */
export function generateInputId(id?: string): string {
  if (id) return id;
  return `input-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Icon Resolution ───────────────────────────────────────────────────────

/**
 * Determine the icon modifier based on which icon slots are populated.
 *
 * @param leftIcon - Left icon element (truthy check)
 * @param rightIcon - Right icon element (truthy check)
 * @returns The appropriate icon modifier for CVA variant application
 *
 * @example
 * resolveIconModifier(<MailIcon />, null)     // => "left"
 * resolveIconModifier(null, <XIcon />)         // => "right"
 * resolveIconModifier(<MailIcon />, <XIcon />) // => "both"
 * resolveIconModifier(null, null)              // => undefined
 */
export function resolveIconModifier(
  leftIcon: unknown,
  rightIcon: unknown
): IconModifier {
  if (leftIcon && rightIcon) return 'both';
  if (leftIcon) return 'left';
  if (rightIcon) return 'right';
  return undefined;
}

// ─── Accessibility ─────────────────────────────────────────────────────────

/**
 * Resolve the aria-describedby attribute value for an input.
 * Points to helper text in normal state, error text when validation fails.
 *
 * @param inputId - The input's unique ID
 * @param hasError - Whether the input is in an error state
 * @param hasHelper - Whether helper text is present
 * @returns The aria-describedby value, or undefined if neither applies
 *
 * @example
 * getInputAriaDescribedBy("email-input", false, true)    // => "email-input-helper"
 * getInputAriaDescribedBy("email-input", true, false)     // => "email-input-error"
 * getInputAriaDescribedBy("email-input", false, false)    // => undefined
 */
export function getInputAriaDescribedBy(
  inputId: string,
  hasError: boolean,
  hasHelper: boolean
): string | undefined {
  if (hasError) return `${inputId}-error`;
  if (hasHelper) return `${inputId}-helper`;
  return undefined;
}

// ─── Validation State ──────────────────────────────────────────────────────

/**
 * Determine the effective variant based on validation state.
 * When an error is present, the error variant takes precedence
 * over whatever visual variant was requested.
 *
 * @param hasError - Whether the input has an error
 * @param variant - The requested visual variant
 * @returns The effective variant to apply
 *
 * @example
 * resolveInputVariant(true, "default")   // => "error"
 * resolveInputVariant(false, "filled")   // => "filled"
 */
export function resolveInputVariant<T extends string>(
  hasError: boolean,
  variant: T
): T | 'error' {
  return hasError ? 'error' : variant;
}