// src/lib/utils/components/forging/textarea.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TEXTAREA UTILITIES                                     ║
// ║                    Pure logic — no rendering, no side effects             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── ID Generation ────────────────────────────────────────────────────────

let idCounter = 0;

/**
 * Generate a unique, deterministic textarea ID.
 * Increments on each call within a session — stable across renders,
 * predictable for testing.
 *
 * @param prefix  Optional prefix (default: 'textarea')
 * @returns       Unique ID string (e.g., "textarea-3")
 */
export function generateTextareaId(prefix: string = 'textarea'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Reset the internal ID counter (useful for testing).
 */
export function resetTextareaIdCounter(): void {
  idCounter = 0;
}

// ─── ARIA Helpers ─────────────────────────────────────────────────────────

/**
 * Composes the `aria-describedby` attribute value for a textarea.
 * Points to the helper text element when present and no error exists,
 * or to the error element when an error is present.
 *
 * @param id        The textarea's base ID
 * @param hasHelper Whether helper text is provided
 * @param hasError  Whether an error message is present
 * @returns         The `aria-describedby` value, or `undefined` if neither applies
 */
export function getTextareaAriaDescribedBy(
  id: string,
  hasHelper: boolean,
  hasError: boolean
): string | undefined {
  if (hasHelper && !hasError) return `${id}-helper`;
  if (hasError) return `${id}-error`;
  return undefined;
}

// ─── Label Indicators ─────────────────────────────────────────────────────

export interface LabelIndicator {
  /** CSS class for the indicator span */
  className: string;
  /** Display text for the indicator */
  text: string;
}

/**
 * Returns the appropriate label indicator based on required/optional state.
 *
 * @param required  Whether the field is required
 * @param optional  Whether the field is explicitly optional
 * @returns         Indicator config, or null if neither applies
 */
export function getLabelIndicator(
  required: boolean,
  optional: boolean
): LabelIndicator | null {
  if (required) {
    return {
      className: 'ml-1 text-neurospark',
      text: '*',
    };
  }

  if (optional) {
    return {
      className: 'ml-1 text-star-dust/40 text-xs',
      text: '(optional)',
    };
  }

  return null;
}

// ─── Character Counting ───────────────────────────────────────────────────

export interface CharacterCount {
  /** Total number of characters */
  characters: number;
  /** Number of words (split on whitespace) */
  words: number;
  /** Number of lines (split on newline) */
  lines: number;
  /** Remaining characters before maxLength is reached */
  remaining: number | null;
  /** Whether the maxLength has been exceeded */
  isOverLimit: boolean;
  /** Percentage of maxLength used (0–100) */
  percentUsed: number | null;
}

/**
 * Calculate character count statistics for a textarea value.
 *
 * @param value     The current textarea value
 * @param maxLength Optional maximum character limit
 * @returns         Character count statistics
 */
export function countCharacters(
  value: string,
  maxLength?: number
): CharacterCount {
  const characters = value.length;
  const words = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
  const lines = value === '' ? 0 : value.split('\n').length;

  const remaining = maxLength != null ? maxLength - characters : null;
  const isOverLimit = remaining != null ? remaining < 0 : false;
  const percentUsed =
    maxLength != null ? Math.min(100, Math.round((characters / maxLength) * 100)) : null;

  return {
    characters,
    words,
    lines,
    remaining,
    isOverLimit,
    percentUsed,
  };
}

/**
 * Format remaining characters as a human-readable string.
 *
 * @param remaining Remaining character count
 * @returns         Formatted string, e.g. "42 characters remaining"
 */
export function formatRemaining(remaining: number): string {
  const absolute = Math.abs(remaining);
  const unit = absolute === 1 ? 'character' : 'characters';

  if (remaining < 0) {
    return `${absolute} ${unit} over limit`;
  }

  return `${remaining} ${unit} remaining`;
}

// ─── Auto-Resize ──────────────────────────────────────────────────────────

/**
 * Auto-resize a textarea element to fit its content.
 * Call this in an `onInput` handler or `useEffect`.
 *
 * @param textarea The textarea DOM element
 */
export function autoResizeTextarea(textarea: HTMLTextAreaElement): void {
  textarea.style.height = 'auto';

  textarea.style.height = `${textarea.scrollHeight + 2}px`;
}

// ─── Validation Helpers ────────────────────────────────────────────────────

/**
 * Check if a textarea value meets a minimum length requirement.
 *
 * @param value   The textarea value
 * @param minLength Minimum required length
 * @returns       True if the value meets or exceeds minLength
 */
export function meetsMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Check if a textarea value exceeds a maximum length.
 *
 * @param value    The textarea value
 * @param maxLength Maximum allowed length
 * @returns        True if the value exceeds maxLength
 */
export function exceedsMaxLength(value: string, maxLength: number): boolean {
  return value.length > maxLength;
}