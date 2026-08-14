// src/types/components/seidr/dialog.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIALOG TYPES                                           ║
// ║                    All type definitions for the Dialog component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import type {
  DialogOverlayVariant,
  DialogContentVariant,
  DialogSize,
} from '@/lib/constants/components/seidr/dialog.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type { DialogOverlayVariant, DialogContentVariant, DialogSize };

// ─── Root ──────────────────────────────────────────────────────────────────
export type DialogProps = DialogPrimitive.Root.Props;

// ─── Trigger ───────────────────────────────────────────────────────────────
export type DialogTriggerProps = DialogPrimitive.Trigger.Props;

// ─── Portal ────────────────────────────────────────────────────────────────
export type DialogPortalProps = DialogPrimitive.Portal.Props;

// ─── Close ─────────────────────────────────────────────────────────────────
export type DialogCloseProps = DialogPrimitive.Close.Props;

// ─── Overlay ───────────────────────────────────────────────────────────────
export interface DialogOverlayProps extends DialogPrimitive.Backdrop.Props {
  /** Visual variant of the overlay backdrop */
  variant?: DialogOverlayVariant;
}

// ─── Content ───────────────────────────────────────────────────────────────
export interface DialogContentProps extends DialogPrimitive.Popup.Props {
  /** Whether to show the default close button (X icon) */
  showCloseButton?: boolean;
  /** Visual variant of the dialog panel */
  variant?: DialogContentVariant;
  /** Size of the dialog */
  size?: DialogSize;
}

// ─── Header ────────────────────────────────────────────────────────────────
export type DialogHeaderProps = React.ComponentProps<'div'>;

// ─── Footer ────────────────────────────────────────────────────────────────
export interface DialogFooterProps extends React.ComponentProps<'div'> {
  /** Whether to show a secondary close button in the footer */
  showCloseButton?: boolean;
}

// ─── Title ─────────────────────────────────────────────────────────────────
export type DialogTitleProps = DialogPrimitive.Title.Props;

// ─── Description ───────────────────────────────────────────────────────────
export type DialogDescriptionProps = DialogPrimitive.Description.Props;