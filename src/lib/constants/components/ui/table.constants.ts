// src/lib/constants/components/ui/table.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABLE CONSTANTS                                        ║
// ║                    Single source of truth — no magic values               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Cell Padding (maps to size prop) ──────────────────────────────────────
/** Horizontal and vertical padding per size tier */
export const TABLE_CELL_PADDING = {
  sm: { x: `px-[${SPACING_SCALE['2']}]`, y: `py-[${SPACING_SCALE['1.5']}]` },
  md: { x: `px-[${SPACING_SCALE['3']}]`, y: `py-[${SPACING_SCALE['2']}]` },
  lg: { x: `px-[${SPACING_SCALE['4']}]`, y: `py-[${SPACING_SCALE['3']}]` },
} as const;

// ─── Border Radius (bordered variant) ──────────────────────────────────────
export const TABLE_BORDER_RADIUS = `rounded-[${BORDER_RADII.lg}]`;

// ─── Border Classes ────────────────────────────────────────────────────────
/** Row divider — applied to tbody rows */
export const TABLE_ROW_BORDER = 'border-b border-white/10';

/** Last row exception */
export const TABLE_LAST_ROW_NO_BORDER = '[&_tr:last-child]:border-0';

// ─── Text Opacity Tokens — using Tailwind's text-opacity modifier pattern ──
export const TABLE_TEXT_MUTED = 'text-white/60';
export const TABLE_TEXT_HOVER = 'text-white/80';
export const TABLE_TEXT_DIM = 'text-white/30';
export const TABLE_TEXT_CAPTION = 'text-white/40';

// ─── Background Tokens ─────────────────────────────────────────────────────
export const TABLE_FOOTER_BG = 'bg-white/5';
export const TABLE_ROW_HOVER_BG = 'hover:bg-white/5';

// ─── Sort Icon ─────────────────────────────────────────────────────────────
export const TABLE_SORT_ICON_SIZE = 'h-3 w-3';
export const TABLE_SORT_ICON_OFFSET = { up: '-mb-1', down: '-mt-1' } as const;

// ─── Wrapper ───────────────────────────────────────────────────────────────
export const TABLE_WRAPPER_CLASSES = 'relative overflow-x-auto';