// src/types/components/ui/modal.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MODAL TYPES                                            ║
// ║                    All type definitions for the Modal component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode, HTMLAttributes } from 'react';
import type {
  ModalVariant,
  ModalSize,
} from '@/lib/constants/components/ui/modal.variants';
import type {
  ModalSizeKey,
  ModalPositionKey,
  ModalFooterAlignKey,
} from '@/lib/constants/components/ui/modal.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ModalVariant, ModalSize, ModalSizeKey, ModalPositionKey, ModalFooterAlignKey };

// ─── Core Modal Props ──────────────────────────────────────────────────────
export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description/subtitle */
  description?: string;
  /** Size of the modal */
  size?: ModalSize;
  /** Position of the modal */
  position?: ModalPositionKey;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Close modal when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close modal when pressing Escape key */
  closeOnEscape?: boolean;
  /** Prevent scroll on body when modal is open */
  preventScroll?: boolean;
  /** Remove padding from modal content */
  noPadding?: boolean;
  /** Custom className for the modal container */
  className?: string;
  /** Custom className for the modal content */
  contentClassName?: string;
  /** Custom className for the backdrop */
  backdropClassName?: string;
  /** Children */
  children: ReactNode;
}

// ─── Composition Sub-Component Props ───────────────────────────────────────
export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Show close button */
  showCloseButton?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove padding */
  noPadding?: boolean;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Align footer buttons */
  align?: ModalFooterAlignKey;
}

// ─── Confirmation Modal ────────────────────────────────────────────────────
export interface ConfirmationModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Callback when confirmed */
  onConfirm: () => void;
  /** Title of confirmation */
  title?: string;
  /** Description of confirmation */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Variant of confirmation */
  variant?: 'default' | 'danger';
}

// ─── Hook Return Type ──────────────────────────────────────────────────────
export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}