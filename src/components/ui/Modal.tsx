// src/components/ui/Modal.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MODAL COMPONENT                                        ║
// ║                    The gateway of the interface                            ║
// ║                    Interrupts workflow to capture attention                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ConfirmationModalProps,
} from '@/types/components/ui/modal.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  MODAL_CONTAINER_RADIUS,
  MODAL_CONTAINER_MARGIN,
  MODAL_CONTAINER_PADDING,
  MODAL_HEADER_PADDING_BOTTOM,
  MODAL_HEADER_PADDING,
  MODAL_BODY_PADDING_Y,
  MODAL_FOOTER_PADDING_TOP,
  MODAL_FOOTER_GAP,
  MODAL_CLOSE_ICON_SIZE,
  MODAL_POSITION_CLASSES,
  MODAL_SIZE_MAX_WIDTH,
  MODAL_FOOTER_ALIGN,
  MODAL_SEPARATOR_BORDER,
  MODAL_OPEN_ANIMATION,
} from '@/lib/constants/components/ui/modal.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  modalOverlayVariants,
  modalContentVariants,
} from '@/lib/constants/components/ui/modal.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  useFocusTrap,
  useEscapeKey,
  useScrollLock,
  useMounted,
  useModalState,
} from '@/utils/components/ui/modal.utils';

// ═══════════════════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Modal — Interrupts workflow to capture attention, gather input, or confirm actions.
 *
 * Renders via portal to document.body. Supports focus trapping, escape-to-close,
 * backdrop-click-to-close, and scroll locking. Composable with ModalHeader,
 * ModalBody, and ModalFooter sub-components.
 *
 * @example
 * // Basic usage with composition sub-components
 * <Modal open={isOpen} onClose={close} size="lg">
 *   <ModalHeader onClose={close}>
 *     <h2>Settings</h2>
 *   </ModalHeader>
 *   <ModalBody>
 *     <p>Configure your preferences below.</p>
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="ghost" onClick={close}>Cancel</Button>
 *     <Button variant="primary" onClick={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 *
 * @example
 * // Simple with title/description props
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 * >
 *   <ModalFooter>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
      position = 'CENTER',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      preventScroll = true,
      noPadding = false,
      className,
      contentClassName,
      backdropClassName,
      children,
    },
    ref
  ) => {
    const mounted = useMounted();
    const modalRef = useRef<HTMLDivElement>(null);

    // Accessibility behaviors
    useEscapeKey(onClose, open, closeOnEscape);
    useScrollLock(open, preventScroll);
    useFocusTrap(modalRef, open);

    // Backdrop click handler
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!mounted || !open) return null;

    return createPortal(
      <div
        className={cn(
          modalOverlayVariants({ variant: 'default' }),
          'flex justify-center',
          MODAL_POSITION_CLASSES[position],
          MODAL_OPEN_ANIMATION,
          backdropClassName
        )}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div
          ref={ref}
          className={cn(
            'relative z-10',
            MODAL_CONTAINER_MARGIN,
            'w-full',
            MODAL_CONTAINER_RADIUS,
            'bg-star-dust/5 backdrop-blur-md border border-star-dust/10 shadow-2xl',
            MODAL_SIZE_MAX_WIDTH[size as keyof typeof MODAL_SIZE_MAX_WIDTH] || MODAL_SIZE_MAX_WIDTH.MD,
            noPadding ? 'overflow-hidden' : MODAL_CONTAINER_PADDING,
            MODAL_OPEN_ANIMATION,
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between',
                noPadding ? MODAL_HEADER_PADDING : MODAL_HEADER_PADDING_BOTTOM,
                'border-b',
                MODAL_SEPARATOR_BORDER
              )}
            >
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-xl font-semibold text-star-dust"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="text-sm text-star-dust/60 mt-1"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1 text-star-dust/40 transition-colors hover:text-star-dust/80 hover:bg-star-dust/10"
                  aria-label="Close modal"
                >
                  <X className={MODAL_CLOSE_ICON_SIZE} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div
            ref={modalRef}
            className={cn(
              !noPadding && MODAL_BODY_PADDING_Y,
              contentClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

// ═══════════════════════════════════════════════════════════════════════════
// MODAL HEADER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ModalHeader — Header section with title area and optional close button.
 *
 * @example
 * <ModalHeader onClose={close}>
 *   <h2>Settings</h2>
 *   <p className="text-sm text-star-dust/60">Manage your preferences</p>
 * </ModalHeader>
 */
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    { children, showCloseButton = true, onClose, className, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between',
        MODAL_HEADER_PADDING_BOTTOM,
        'border-b',
        MODAL_SEPARATOR_BORDER,
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-star-dust/40 transition-colors hover:text-star-dust/80 hover:bg-star-dust/10"
          aria-label="Close modal"
        >
          <X className={MODAL_CLOSE_ICON_SIZE} />
        </button>
      )}
    </div>
  )
);
ModalHeader.displayName = 'ModalHeader';

// ═══════════════════════════════════════════════════════════════════════════
// MODAL BODY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ModalBody — Scrollable body section for modal content.
 *
 * @example
 * <ModalBody>
 *   <p>Your content here.</p>
 * </ModalBody>
 *
 * @example
 * <ModalBody noPadding>
 *   <img src="full-bleed-image.jpg" alt="" />
 * </ModalBody>
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, noPadding = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(!noPadding && MODAL_BODY_PADDING_Y, className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalBody.displayName = 'ModalBody';

// ═══════════════════════════════════════════════════════════════════════════
// MODAL FOOTER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ModalFooter — Footer section for action buttons.
 *
 * @example
 * <ModalFooter align="RIGHT">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </ModalFooter>
 */
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, align = 'RIGHT', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        MODAL_FOOTER_GAP,
        MODAL_FOOTER_PADDING_TOP,
        'border-t',
        MODAL_SEPARATOR_BORDER,
        MODAL_FOOTER_ALIGN[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalFooter.displayName = 'ModalFooter';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIRMATION MODAL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ConfirmationModal — Pre-built confirmation dialog with danger variant support.
 *
 * @example
 * <ConfirmationModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   description="This action cannot be undone."
 *   variant="danger"
 * />
 */
export const ConfirmationModal = React.forwardRef<
  HTMLDivElement,
  ConfirmationModalProps
>(
  (
    {
      open,
      onClose,
      onConfirm,
      title = 'Confirm Action',
      description = 'Are you sure you want to proceed?',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      variant = 'default',
    },
    ref
  ) => {
    const handleConfirm = () => {
      onConfirm();
      onClose();
    };

    return (
      <Modal
        ref={ref}
        open={open}
        onClose={onClose}
        title={title}
        size="sm"
        showCloseButton={false}
      >
        <p className="text-star-dust/70">{description}</p>
        <ModalFooter align="RIGHT" className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-star-dust/60 transition-colors hover:text-star-dust/80"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              variant === 'danger'
                ? 'bg-fire-base/20 text-fire-base hover:bg-fire-base/30'
                : 'bg-neurospark/20 text-neurospark hover:bg-neurospark/30'
            )}
          >
            {confirmText}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
);
ConfirmationModal.displayName = 'ConfirmationModal';

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * useModal — Hook for managing modal open/close state.
 *
 * @example
 * const { isOpen, open, close, toggle } = useModal();
 *
 * return (
 *   <>
 *     <Button onClick={open}>Open Modal</Button>
 *     <Modal open={isOpen} onClose={close}>
 *       <ModalBody><p>Content</p></ModalBody>
 *     </Modal>
 *   </>
 * );
 */
export { useModalState as useModal };

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ConfirmationModalProps,
} from '@/types/components/ui/modal.types';

export type { UseModalReturn } from '@/types/components/ui/modal.types';