// src/components/ui/Toast.tsx
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

// Individual Toast Component
const Toast = ({ toast, onDismiss }: ToastProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Auto-dismiss after duration
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200); // Match animation duration
  };

  // Icon mapping
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const Icon = icons[toast.type];

  // Color mapping
  const colors = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: 'text-green-400',
      title: 'text-green-400',
      message: 'text-green-400/70',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      title: 'text-red-400',
      message: 'text-red-400/70',
    },
    info: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      icon: 'text-cyan-400',
      title: 'text-cyan-400',
      message: 'text-cyan-400/70',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: 'text-yellow-400',
      title: 'text-yellow-400',
      message: 'text-yellow-400/70',
    },
  };

  const color = colors[toast.type];

  return (
    <div
      className={cn(
        'relative w-96 rounded-lg border shadow-lg backdrop-blur-sm',
        color.bg,
        color.border,
        'transform transition-all duration-200',
        mounted && !exiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-8 opacity-0',
        exiting && 'translate-x-8 opacity-0'
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <Icon className={cn('h-5 w-5 flex-shrink-0', color.icon)} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className={cn('text-sm font-medium', color.title)}>
              {toast.title}
            </p>
          )}
          <p className={cn('text-sm', color.message)}>
            {toast.message}
          </p>
          {toast.action && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toast.action?.onClick();
                handleDismiss();
              }}
              className="mt-2 h-auto px-2 py-1 text-xs"
            >
              {toast.action.label}
            </Button>
          )}
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 -mr-1 -mt-1"
          aria-label="Close notification"
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
};

// Toast Context
interface ToastContextType {
  toasts: ToastData[];
  showToast: (toast: Omit<ToastData, 'id'>) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
  updateToast: (id: string, toast: Partial<Omit<ToastData, 'id'>>) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const showToast = (toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const dismissAll = () => {
    setToasts([]);
  };

  const updateToast = (id: string, toast: Partial<Omit<ToastData, 'id'>>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        dismissAll,
        updateToast,
      }}
    >
      {children}
      {mounted && createPortal(
        <div
          className="fixed top-4 right-4 z-50 flex flex-col gap-2"
          aria-live="polite"
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onDismiss={dismissToast}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience methods
export const toast = {
  success: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) => {
    const { showToast } = useToast();
    return showToast({ type: 'success', message, ...options });
  },
  error: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) => {
    const { showToast } = useToast();
    return showToast({ type: 'error', message, ...options });
  },
  info: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) => {
    const { showToast } = useToast();
    return showToast({ type: 'info', message, ...options });
  },
  warning: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) => {
    const { showToast } = useToast();
    return showToast({ type: 'warning', message, ...options });
  },
};

// Export individual toast component for direct use
export { Toast };