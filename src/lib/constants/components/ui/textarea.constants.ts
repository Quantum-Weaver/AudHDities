// src/lib/constants/components/ui/textarea.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TEXTAREA CONSTANTS                                     ║
// ║                    Sizing, defaults, class fragments                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Default Rows ──────────────────────────────────────────────────────────
/** Default number of visible text rows */
export const TEXTAREA_DEFAULT_ROWS = 3;

// ─── Label Classes ─────────────────────────────────────────────────────────
export const TEXTAREA_LABEL_BASE_CLASSES = [
  'text-sm',
  'font-medium',
] as const;

export const TEXTAREA_LABEL_DEFAULT_CLASS = 'text-star-dust/80' as const;
export const TEXTAREA_LABEL_ERROR_CLASS = 'text-error' as const;

// ─── Required / Optional Indicators ────────────────────────────────────────
export const TEXTAREA_REQUIRED_CLASS = 'text-neurospark' as const;
export const TEXTAREA_REQUIRED_SYMBOL = '*' as const;

export const TEXTAREA_OPTIONAL_CLASS = 'text-star-dust/40 text-xs' as const;
export const TEXTAREA_OPTIONAL_TEXT = '(optional)' as const;

// ─── Helper / Error Text ───────────────────────────────────────────────────
export const TEXTAREA_HELPER_CLASS = 'text-xs text-star-dust/40' as const;
export const TEXTAREA_ERROR_CLASS = 'text-xs text-error' as const;

// ─── Wrapper ───────────────────────────────────────────────────────────────
export const TEXTAREA_WRAPPER_BASE_CLASSES = [
  'flex',
  'flex-col',
  'gap-1.5',
] as const;