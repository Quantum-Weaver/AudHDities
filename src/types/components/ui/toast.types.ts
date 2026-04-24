// src/types/components/ui/toast.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOAST TYPES                                            ║
// ║                    All type definitions for the Toast component            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode } from 'react';
import type {
  ToastVariantKey,
  ToastPositionKey,
} from '@/lib/constants/components/ui/toast.variants';

// ─── Re-exports from constants ─────────────────────────────────────────────
export type ToastVariant = ToastVariantKey;
export type ToastPosition = ToastPositionKey;

// ─── Toast Data ────────────────────────────────────────────────────────────
export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

// ─── Toast Item Props ──────────────────────────────────────────────────────
export interface ToastItemProps extends Toast {
  onClose: () => void;
}

// ─── Provider Props ────────────────────────────────────────────────────────
export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

// ─── Toaster Props ─────────────────────────────────────────────────────────
export interface ToasterProps {
  position?: ToastPosition;
  toasts: Toast[];
  onClose: (id: string) => void;
}

// ─── Toast Icon Map ────────────────────────────────────────────────────────
export type ToastIconMap = Record<ToastVariant, React.ComponentType<{ className?: string }>>;

// ─── Context Value ─────────────────────────────────────────────────────────
export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
  success: (
    description: string,
    options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
  ) => string;
  error: (
    description: string,
    options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
  ) => string;
  warning: (
    description: string,
    options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
  ) => string;
  info: (
    description: string,
    options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
  ) => string;
  quantum: (
    description: string,
    options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
  ) => string;
}