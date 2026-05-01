## 📦 **MODAL COMPONENT: Overview**

A modal component is a **dialog system** that interrupts the user's workflow to capture attention or require a decision. It is the **gateway** of the interface—every confirmation, every form, every important announcement deserves a modal.

**What it provides:**
- Focus trapping (keyboard navigation stays inside modal)
- Scroll locking (prevents background scrolling)
- Backdrop with configurable blur and click-to-close
- Multiple sizes (sm, md, lg, xl, full)
- Animated enter/exit transitions
- Accessible ARIA attributes

---

## 📁 **`components/ui/Modal.tsx`**

```tsx
// components/ui/Modal.tsx
// Modal Component - The gateway of the interface
// Interrupts workflow to capture attention or require decisions

"use client";

import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top';

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
  position?: ModalPosition;
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
  children: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw] w-full',
};

const positionClasses: Record<ModalPosition, string> = {
  center: 'items-center',
  top: 'items-start pt-16',
};

/**
 * Modal Component
 * 
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 *   <div className="flex gap-2 mt-4">
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </div>
 * </Modal>
 * 
 * @example
 * <Modal open={isOpen} onClose={onClose} size="lg" closeOnBackdropClick>
 *   <ModalHeader>Settings</ModalHeader>
 *   <ModalBody>...</ModalBody>
 *   <ModalFooter>
 *     <Button>Save</Button>
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
      position = 'center',
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
    const [mounted, setMounted] = React.useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    // Handle Escape key
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape' && open) {
          onClose();
        }
      };
      
      if (open) {
        document.addEventListener('keydown', handleEscape);
      }
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, closeOnEscape, onClose]);
    
    // Handle scroll locking
    useEffect(() => {
      if (preventScroll && open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open, preventScroll]);
    
    // Handle mounting for portal
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
    
    // Focus trap
    useEffect(() => {
      if (open && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;
          
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };
        
        firstElement?.focus();
        document.addEventListener('keydown', handleTab);
        
        return () => {
          document.removeEventListener('keydown', handleTab);
        };
      }
    }, [open]);
    
    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };
    
    if (!mounted || !open) return null;
    
    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 flex justify-center',
          positionClasses[position],
          'animate-in fade-in duration-200',
          backdropClassName
        )}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        {/* Modal Container */}
        <div
          ref={ref}
          className={cn(
            'relative z-10 m-4 w-full rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl',
            sizeClasses[size],
            noPadding ? 'overflow-hidden' : 'p-6',
            'animate-in zoom-in-95 fade-in duration-200',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={cn(
              'flex items-center justify-between',
              !noPadding && 'pb-4 border-b border-white/10',
              noPadding && 'p-4 border-b border-white/10'
            )}>
              <div>
                {title && (
                  <h2 id="modal-title" className="text-xl font-semibold text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="text-sm text-white/60 mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div ref={modalRef} className={cn(!noPadding && 'py-4', contentClassName)}>
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

// ============================================================================
// MODAL COMPOSITION COMPONENTS
// ============================================================================

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show close button */
  showCloseButton?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

/**
 * ModalHeader - Header section of a modal
 * 
 * @example
 * <ModalHeader showCloseButton onClose={onClose}>
 *   <h2>Title</h2>
 * </ModalHeader>
 */
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, showCloseButton = true, onClose, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between pb-4 border-b border-white/10', className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 hover:bg-white/10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding */
  noPadding?: boolean;
}

/**
 * ModalBody - Body section of a modal
 * 
 * @example
 * <ModalBody>
 *   <p>Modal content goes here</p>
 * </ModalBody>
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, noPadding = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(!noPadding && 'py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Align footer buttons */
  align?: 'left' | 'center' | 'right';
}

const footerAlignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * ModalFooter - Footer section of a modal (for actions)
 * 
 * @example
 * <ModalFooter align="right">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Confirm</Button>
 * </ModalFooter>
 */
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, align = 'right', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex gap-3 pt-4 border-t border-white/10',
        footerAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalFooter.displayName = 'ModalFooter';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

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

/**
 * ConfirmationModal - Pre-built confirmation dialog
 * 
 * @example
 * <ConfirmationModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   variant="danger"
 * />
 */
export const ConfirmationModal = React.forwardRef<HTMLDivElement, ConfirmationModalProps>(
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
        <p className="text-white/70">{description}</p>
        <ModalFooter align="right" className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white/80"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              variant === 'danger'
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
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

/**
 * useModal - Hook for managing modal state
 * 
 * @example
 * const { isOpen, open, close, toggle } = useModal();
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  return { isOpen, open, close, toggle };
};
```

---

## 📋 **USAGE EXAMPLES**

### Basic Modal
```tsx
const { isOpen, open, close } = useModal();

<Button onClick={open}>Open Modal</Button>
<Modal open={isOpen} onClose={close} title="Basic Modal">
  <p>This is a basic modal with a title.</p>
  <ModalFooter>
    <Button variant="ghost" onClick={close}>Close</Button>
  </ModalFooter>
</Modal>
```

### Confirmation Modal
```tsx
<ConfirmationModal
  open={isOpen}
  onClose={close}
  onConfirm={handleDelete}
  title="Delete Item"
  description="Are you sure you want to delete this item? This action cannot be undone."
  variant="danger"
  confirmText="Delete"
/>
```

### Form Modal
```tsx
<Modal open={isOpen} onClose={close} title="Edit Profile" size="md">
  <ModalBody>
    <VStack space="md">
      <Input label="Name" />
      <Input label="Email" />
      <Textarea label="Bio" rows={3} />
    </VStack>
  </ModalBody>
  <ModalFooter align="right">
    <Button variant="ghost" onClick={close}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
  </ModalFooter>
</Modal>
```

### Large Modal with Custom Content
```tsx
<Modal open={isOpen} onClose={close} size="lg" title="Product Details">
  <ModalBody>
    <div className="grid grid-cols-2 gap-4">
      <AspectRatioImage src="/product.jpg" alt="Product" />
      <div>
        <h3 className="text-lg font-bold">Product Name</h3>
        <p className="text-white/60 mt-1">Description...</p>
        <div className="mt-4">
          <Badge variant="primary">In Stock</Badge>
        </div>
      </div>
    </div>
  </ModalBody>
  <ModalFooter align="right">
    <Button variant="primary">Add to Cart</Button>
  </ModalFooter>
</Modal>
```

### Full-Screen Modal
```tsx
<Modal open={isOpen} onClose={close} size="full" noPadding>
  <div className="h-[90vh] overflow-y-auto">
    <div className="sticky top-0 bg-black/80 backdrop-blur-sm p-4 border-b border-white/10">
      <h2 className="text-xl font-bold">Full Screen Content</h2>
    </div>
    <div className="p-6">
      {/* Scrollable content */}
    </div>
  </div>
</Modal>
```

### Modal with Custom Close Button Position
```tsx
<Modal open={isOpen} onClose={close} showCloseButton={false}>
  <ModalHeader showCloseButton onClose={close}>
    <h2 className="text-xl font-bold">Custom Header</h2>
  </ModalHeader>
  <ModalBody>Content...</ModalBody>
</Modal>
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Size | Max Width | Use Case |
|------|-----------|----------|
| sm | 384px | Confirmations, alerts |
| md | 448px | Forms, simple dialogs |
| lg | 512px | Complex forms |
| xl | 576px | Detailed content |
| full | 90vw | Immersive experiences |

| Position | Use Case |
|----------|----------|
| center | Default, balanced |
| top | Large modals, forms |

| Variant | Confirm Button | Use Case |
|---------|----------------|----------|
| default | Cyan | General confirmations |
| danger | Red | Destructive actions |
