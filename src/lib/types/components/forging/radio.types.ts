// src/types/components/forging/radio.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RADIO TYPES                                            ║
// ║                    All type definitions for Radio components              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  RadioVariant,
  RadioSize,
  RadioGroupDirection,
} from '@/lib/constants/components/forging/radio.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { RadioVariant, RadioSize, RadioGroupDirection };

// ─── Radio Group ───────────────────────────────────────────────────────────
export interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size: RadioSize;
  variant: RadioVariant;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size?: RadioSize;
  variant?: RadioVariant;
  direction?: RadioGroupDirection;
  children: React.ReactNode;
}

// ─── Radio Item ────────────────────────────────────────────────────────────
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value: string;
  label?: string;
  error?: string;
  helper?: string;
}