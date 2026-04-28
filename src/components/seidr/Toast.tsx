// src/components/seidr/Toast.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOAST COMPONENT                                        ║
// ║                    The whisper of the interface                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  Toast,
  ToastVariant,
  ToastPosition,
  ToastItemProps,
  ToastProviderProps,
  ToasterProps,
  ToastContextValue,
} from '@/types/components/seidr/toast.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  TOAST_DEFAULT_DURATION,
  TOAST_MAX_COUNT,
  TOAST_CLOSE_BUTTON,
  TOAST_ICON_SIZE,
  TOAST_TITLE_MARGIN,
  TOAST_ACTION_MARGIN,
} from '@/lib/constants/components/seidr/toast.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeToastItemClasses,
  composeToastIconClasses,
  composeToasterContainerClasses,
  TOAST_ICONS,
  resolveToastDuration,
  generateToastId,
} from '@/lib/utils/components/seidr/toast.utils';

// ═══════════════════════════════════════════════════════════════════════════
// TOAST ITEM
// ═══════════════════════════════════════════════════════════════════════════

const ToastItem = React.forwardRef<HTMLDivElement, ToastItemProps>(
  (
    {
      id,
      title,
      description,
      variant = 'info',
      duration,
      action,
      onClose,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const resolvedDuration = resolveToastDuration(variant, duration);
    const IconComponent = TOAST_ICONS[variant];

    const handleClose = useCallback(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 200);
    }, [onClose]);

    useEffect(() => {
      if (resolvedDuration > 0) {
        timerRef.current = setTimeout(handleClose, resolvedDuration);
      }
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [resolvedDuration, handleClose]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={composeToastItemClasses({
          variant,
          isLeaving,
        })}
      >
        {/* Icon */}
        <div className={composeToastIconClasses(variant)}>
          <IconComponent className={TOAST_ICON_SIZE} />
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h5 className="font-medium text-star-dust text-sm">{title}</h5>
          )}
          <p className={cn('text-star-dust/80 text-sm', title && TOAST_TITLE_MARGIN)}>
            {description}
          </p>
          {action && (
            <button
              type="button"
              onClick={() => {
                action.onClick();
                handleClose();
              }}
              className={cn(
                TOAST_ACTION_MARGIN,
                'text-sm font-medium text-star-dust/80 hover:text-star-dust transition-colors'
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'flex-shrink-0',
            TOAST_CLOSE_BUTTON.RADIUS,
            TOAST_CLOSE_BUTTON.PADDING,
            'text-star-dust/40 hover:text-star-dust/80 hover:bg-white/10 transition-colors'
          )}
          aria-label="Close"
        >
          <X className={TOAST_CLOSE_BUTTON.ICON_SIZE} />
        </button>
      </div>
    );
  }
);
ToastItem.displayName = 'ToastItem';

// ═══════════════════════════════════════════════════════════════════════════
// TOAST CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// TOAST PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

export const ToastProvider = React.forwardRef<HTMLDivElement, ToastProviderProps>(
  ({ children, position = 'bottom-right', maxToasts = TOAST_MAX_COUNT }, ref) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
      (toast: Omit<Toast, 'id'>): string => {
        const id = generateToastId();
        const newToast: Toast = {
          ...toast,
          id,
          variant: toast.variant || 'info',
        };

        setToasts((prev) => [newToast, ...prev].slice(0, maxToasts));
        return id;
      },
      [maxToasts]
    );

    const removeToast = useCallback((id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const clearAll = useCallback(() => {
      setToasts([]);
    }, []);

    const success = useCallback(
      (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) =>
        addToast({ description, variant: 'success', ...options }),
      [addToast]
    );

    const error = useCallback(
      (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) =>
        addToast({ description, variant: 'error', ...options }),
      [addToast]
    );

    const warning = useCallback(
      (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) =>
        addToast({ description, variant: 'warning', ...options }),
      [addToast]
    );

    const info = useCallback(
      (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) =>
        addToast({ description, variant: 'info', ...options }),
      [addToast]
    );

    const quantum = useCallback(
      (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) =>
        addToast({ description, variant: 'quantum', ...options }),
      [addToast]
    );

    const contextValue: ToastContextValue = {
      toasts,
      addToast,
      removeToast,
      clearAll,
      success,
      error,
      warning,
      info,
      quantum,
    };

    return (
      <ToastContext.Provider value={contextValue}>
        {children}
        <Toaster position={position} toasts={toasts} onClose={removeToast} />
      </ToastContext.Provider>
    );
  }
);
ToastProvider.displayName = 'ToastProvider';

// ═══════════════════════════════════════════════════════════════════════════
// TOASTER (Container)
// ═══════════════════════════════════════════════════════════════════════════

export const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ position = 'bottom-right', toasts, onClose }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
      <div ref={ref} className={composeToasterContainerClasses(position)}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onClose={() => onClose(toast.id)}
          />
        ))}
      </div>,
      document.body
    );
  }
);
Toaster.displayName = 'Toaster';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  Toast,
  ToastVariant,
  ToastPosition,
  ToastItemProps,
  ToastProviderProps,
  ToasterProps,
  ToastContextValue,
} from '@/types/components/seidr/toast.types';