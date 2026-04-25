// src/lib/constants/components/ui/form.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM CONSTANTS                                         ║
// ║                    Layout, spacing, actions divider                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Layout ─────────────────────────────────────────────────────────────────
export const FORM_LAYOUT_VERTICAL = 'flex flex-col';
export const FORM_LAYOUT_HORIZONTAL = 'flex flex-row flex-wrap';

// ─── Full Width ─────────────────────────────────────────────────────────────
export const FORM_FULL_WIDTH = 'w-full';

// ─── Field Spacing (Form-level gap between fields) ──────────────────────────
export const FORM_FIELD_SPACING = {
  none: 'gap-0',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
} as const;

// ─── Actions Spacing (gap between buttons) ─────────────────────────────────
export const FORM_ACTIONS_BUTTON_SPACING = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
} as const;

// ─── Actions Alignment ─────────────────────────────────────────────────────
export const FORM_ACTIONS_ALIGNMENT = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;

// ─── Actions Divider ───────────────────────────────────────────────────────
export const FORM_ACTIONS_MARGIN_TOP = 'mt-4';
export const FORM_ACTIONS_PADDING_TOP = 'pt-4';
export const FORM_ACTIONS_BORDER_TOP = 'border-t';
export const FORM_ACTIONS_BORDER_COLOR = 'border-white/10';

// ─── Submitting Message ─────────────────────────────────────────────────────
export const FORM_SUBMITTING_MESSAGE = 'Submitting form...';

// ─── Error Scroll Behavior ──────────────────────────────────────────────────
export const FORM_ERROR_SCROLL_BEHAVIOR: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
};