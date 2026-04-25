// srv/lib/constants/components/ui/form_field.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM FIELD CONSTANTS                                   ║
// ║                    Sizing, layout, text, spacing                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Layout ─────────────────────────────────────────────────────────────────
export const FORM_FIELD_LAYOUT_VERTICAL = 'flex flex-col';
export const FORM_FIELD_LAYOUT_HORIZONTAL = 'flex flex-row items-start gap-4';

// ─── Full Width ─────────────────────────────────────────────────────────────
export const FORM_FIELD_FULL_WIDTH = 'w-full';

// ─── Size Configurations ────────────────────────────────────────────────────
export const FORM_FIELD_SIZE_CONFIG = {
  sm: {
    gap: 'gap-1',
    label: 'text-xs',
    helper: 'text-xs',
  },
  md: {
    gap: 'gap-1.5',
    label: 'text-sm',
    helper: 'text-xs',
  },
  lg: {
    gap: 'gap-2',
    label: 'text-base',
    helper: 'text-sm',
  },
} as const;

// ─── Label (Horizontal Layout) ──────────────────────────────────────────────
export const FORM_FIELD_HORIZONTAL_LABEL_MIN_WIDTH = 'min-w-[120px]';
export const FORM_FIELD_HORIZONTAL_LABEL_PADDING_TOP = 'pt-2';

// ─── Content Wrapper ────────────────────────────────────────────────────────
export const FORM_FIELD_CONTENT_FLEX = 'flex-1';

// ─── Helper Text ────────────────────────────────────────────────────────────
export const FORM_FIELD_HELPER_MARGIN_TOP = 'mt-1';
export const FORM_FIELD_HELPER_COLOR = 'text-white/40';

// ─── Error Text ─────────────────────────────────────────────────────────────
export const FORM_FIELD_ERROR_MARGIN_TOP = 'mt-1';
export const FORM_FIELD_ERROR_COLOR = 'text-error';

// ─── Disabled State ─────────────────────────────────────────────────────────
export const FORM_FIELD_DISABLED_OPACITY = 'opacity-50';