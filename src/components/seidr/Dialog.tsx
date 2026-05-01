/* src/components/seidr/Dialog.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIALOG COMPONENT                                       ║
// ║                    Modal dialog with overlay, header, footer              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/yggdrasil/Button';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogCloseProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from '@/types/components/seidr/dialog.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  DIALOG_CLOSE_BUTTON_POSITION,
  DIALOG_HEADER_GAP,
  DIALOG_FOOTER_NEGATIVE_MARGIN,
  DIALOG_FOOTER_PADDING,
  DIALOG_FOOTER_RADIUS,
  DIALOG_FOOTER_BORDER,
  DIALOG_FOOTER_BG,
  DIALOG_FOOTER_LAYOUT,
  DIALOG_TITLE_FONT,
  DIALOG_TITLE_SIZE,
  DIALOG_TITLE_LEADING,
  DIALOG_TITLE_WEIGHT,
  DIALOG_DESCRIPTION_SIZE,
  DIALOG_DESCRIPTION_TEXT,
  DIALOG_DESCRIPTION_LINK_CLASSES,
} from '@/lib/constants/components/seidr/dialog.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  dialogOverlayVariants,
  dialogContentVariants,
} from '@/lib/constants/components/seidr/dialog.variants';
import type { DialogOverlayVariant } from '@/lib/constants/components/seidr/dialog.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getDialogOverlayAnimationClasses,
  getDialogContentAnimationClasses,
} from '@/lib/utils/components/seidr/dialog.utils';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT MAPPING
// ═══════════════════════════════════════════════════════════════════════════

/** Maps content panel variants to their corresponding overlay variant */
const contentToOverlayVariant: Record<string, DialogOverlayVariant> & {
  [key: string]: DialogOverlayVariant;
  } = {
    default: 'default',
    glass: 'glass',
    quantum: 'quantum',
    cosmic: 'cosmic',
    emergency: 'heavy',
    sanctuary: 'default',
  };

// ═══════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════

function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// PORTAL
// ═══════════════════════════════════════════════════════════════════════════

function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// CLOSE
// ═══════════════════════════════════════════════════════════════════════════

function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// OVERLAY
// ═══════════════════════════════════════════════════════════════════════════

function DialogOverlay({
  className,
  variant = 'default',
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        dialogOverlayVariants({ variant }),
        getDialogOverlayAnimationClasses(),
        className
      )}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════

function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant = 'default',
  size = 'sm',
  ...props
}: DialogContentProps) {
  // Resolve overlay variant: null or undefined falls back to 'default'
  const overlayVariant: DialogOverlayVariant =
    (variant != null ? contentToOverlayVariant[variant] : undefined) ?? 'default';

  return (
    <DialogPortal>
      <DialogOverlay variant={overlayVariant} />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          dialogContentVariants({ variant, size }),
          getDialogContentAnimationClasses(),
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className={DIALOG_CLOSE_BUTTON_POSITION}
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════════════════

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col', DIALOG_HEADER_GAP, className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        DIALOG_FOOTER_NEGATIVE_MARGIN,
        ...DIALOG_FOOTER_LAYOUT,
        DIALOG_FOOTER_RADIUS,
        DIALOG_FOOTER_BORDER,
        DIALOG_FOOTER_BG,
        DIALOG_FOOTER_PADDING,
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TITLE
// ═══════════════════════════════════════════════════════════════════════════

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        DIALOG_TITLE_FONT,
        DIALOG_TITLE_SIZE,
        DIALOG_TITLE_LEADING,
        DIALOG_TITLE_WEIGHT,
        className
      )}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DESCRIPTION
// ═══════════════════════════════════════════════════════════════════════════

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        DIALOG_DESCRIPTION_SIZE,
        DIALOG_DESCRIPTION_TEXT,
        ...DIALOG_DESCRIPTION_LINK_CLASSES,
        className
      )}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogCloseProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from '@/types/components/seidr/dialog.types';