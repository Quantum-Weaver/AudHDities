// src/types/components/yggdrasil/accordion.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ACCORDION TYPES                                        ║
// ║                    All type definitions for the Accordion component       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  AccordionType,
  AccordionVariant,
} from '@/lib/constants/components/yggdrasil/accordion.variants';
import type { AccordionSize } from '@/lib/constants/components/yggdrasil/accordion.constants';

// ─── Re-exports from constants/variants ────────────────────────────────────
export type { AccordionType, AccordionVariant, AccordionSize };

// ─── Context ───────────────────────────────────────────────────────────────
export interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  size: AccordionSize;
  expandedValues: string[];
  toggleItem: (value: string) => void;
  accordionId: string;
}

// ─── Root Props ────────────────────────────────────────────────────────────
export interface AccordionProps {
  /** Whether single or multiple items can be expanded simultaneously */
  type?: AccordionType;
  /** Default expanded item values (uncontrolled) */
  defaultValue?: string[];
  /** Controlled expanded item values */
  value?: string[];
  /** Callback when expanded items change */
  onValueChange?: (value: string[]) => void;
  /** Visual variant */
  variant?: AccordionVariant;
  /** Size preset */
  size?: AccordionSize;
  /** Accordion items */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

// ─── Item Props ────────────────────────────────────────────────────────────
export interface AccordionItemProps {
  /** Unique value for this item */
  value: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Children (AccordionTrigger + AccordionContent) */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

// ─── Trigger Props ─────────────────────────────────────────────────────────
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom icon (collapsed state) */
  icon?: React.ReactNode;
  /** Custom icon (expanded state) */
  expandedIcon?: React.ReactNode;
  /** Position of the chevron icon */
  iconPosition?: 'left' | 'right';
}

// ─── Content Props ─────────────────────────────────────────────────────────
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Force the content to remain mounted even when collapsed */
  forceMount?: boolean;
}

// ─── Composition Props ─────────────────────────────────────────────────────
export interface IconAccordionTriggerProps extends AccordionTriggerProps {
  /** Icon to display */
  icon: React.ReactNode;
}

export interface NestedAccordionProps extends AccordionProps {
  /** Nesting level (1-4) — controls left indent */
  level?: number;
}