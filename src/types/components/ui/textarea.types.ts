// src/lib/constants/components/ui/textarea.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TEXTAREA TYPES                                         ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  TextareaVariant,
  TextareaSize,
} from '@/lib/constants/components/ui/textarea.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { TextareaVariant, TextareaSize };

// ─── Component Props ───────────────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message — when present, shows error state */
  error?: string;
  /** Helper text displayed below when no error */
  helper?: string;
  /** Size variant from CVA definition */
  size?: TextareaSize;
  /** Number of visible text rows */
  rows?: number;
  /** Show required asterisk indicator */
  required?: boolean;
  /** Show optional text indicator */
  optional?: boolean;
  /** Expand to full width of container */
  fullWidth?: boolean;
}