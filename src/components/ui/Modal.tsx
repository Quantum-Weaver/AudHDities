// src/components/ui/Modal.tsx
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Card } from './Card';
import { X } from 'lucide-react';

export interface ModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  
  /** Called when modal should close (escape key, backdrop click, close button) */
  onClose: () => void;
  
  /** Modal title */
  title?: React.ReactNode;
  
  /** Modal content */
  children: React.ReactNode;
  
  /** Footer content (buttons, etc.) */
  footer?: React.ReactNode;
  
  /** Size of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /** Show close button in header */
  showCloseButton?: boolean;
  
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Close on escape key */
  closeOnEscape?: boolean;
  
  /** Prevent scroll on body when open */
  blockScroll?: boolean;
  
  /** Custom backdrop color */
  backdropColor?: 'default' | 'dark' | 'light' | 'blur';
  
  /** Animation variant */
  animation?: 'fade' | 'scale' | 'slide' | 'none';
  
  /** Position of modal */
  position?: 'center' | 'top' | 'bottom';
  
  /** Z-index override */
  zIndex?: number;
  
  /** Additional className for modal content */
  className?: string;
  
  /** Additional className for backdrop */
  backdropClassName?: string;
  
  /** Called when modal opens */
  onOpen?: () => void;
  
  /** Called when modal closes */
  onCloseComplete?: () => void;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    blockScroll = true,
    backdropColor = 'default',
    animation = 'scale',
    position = 'center',
    zIndex = 50,
    className,
    backdropClassName,
    onOpen,
    onCloseComplete,
  }, ref) => {
    
    const [mounted, setMounted] = React.useState(false);
    const [closing, setClosing] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const previousFocusRef = React.useRef<HTMLElement | null>(null);

    // Handle mounting for SSR
    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Handle body scroll lock
    React.useEffect(() => {
      if (!blockScroll || !mounted) return;

      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        previousFocusRef.current = document.activeElement as HTMLElement;
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore focus when modal closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }

      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }, [isOpen, blockScroll, mounted]);

    // Handle escape key
    React.useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, isOpen]);

    // Call onOpen when modal opens
    React.useEffect(() => {
      if (isOpen && onOpen) {
        onOpen();
      }
    }, [isOpen, onOpen]);

    // Handle close with animation
    const handleClose = () => {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        onClose();
        onCloseComplete?.();
      }, 200); // Match animation duration
    };

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        handleClose();
      }
    };

    // Size styles
    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-[95vw] w-[95vw]',
    };

    // Backdrop styles
    const backdropStyles = {
      default: 'bg-black/60',
      dark: 'bg-black/80',
      light: 'bg-black/40',
      blur: 'bg-black/30 backdrop-blur-md',
    };

    // Position styles
    const positionStyles = {
      center: 'items-center',
      top: 'items-start pt-20',
      bottom: 'items-end pb-20',
    };

    // Animation styles
    const animationStyles = {
      fade: closing 
        ? 'opacity-0 transition-opacity duration-200' 
        : 'opacity-100 transition-opacity duration-200',
      scale: closing 
        ? 'opacity-0 scale-95 transition-all duration-200' 
        : 'opacity-100 scale-100 transition-all duration-200',
      slide: closing 
        ? 'opacity-0 translate-y-4 transition-all duration-200' 
        : 'opacity-100 translate-y-0 transition-all duration-200',
      none: '',
    };

    // Trap focus inside modal
    const handleFocusTrap = (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Focus first focusable element on open
    React.useEffect(() => {
      if (isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 flex justify-center',
          positionStyles[position],
          'p-4',
          zIndex && `z-${zIndex}`
        )}
        style={{ zIndex }}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 -z-10',
            backdropStyles[backdropColor],
            animation === 'fade' && !closing && 'animate-in fade-in duration-200',
            animation === 'fade' && closing && 'animate-out fade-out duration-200',
            backdropClassName
          )}
          aria-hidden="true"
        />

        {/* Modal */}
        <Card
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          className={cn(
            'relative w-full',
            sizeStyles[size],
            animationStyles[animation],
            'max-h-[90vh] overflow-y-auto',
            'shadow-2xl',
            className
          )}
          onKeyDown={handleFocusTrap}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={cn(
              'flex items-start justify-between',
              'px-6 py-4',
              'border-b border-white/10'
            )}>
              {title && (
                <h2 
                  id="modal-title" 
                  className="text-lg font-semibold text-white"
                >
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="ml-auto -mr-2"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn(
              'px-6 py-4',
              'border-t border-white/10',
              'flex justify-end space-x-2'
            )}>
              {footer}
            </div>
          )}
        </Card>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };