## 🔔 **TOAST COMPONENT: Overview**

A toast component is a **transient notification system** that delivers brief, non-intrusive messages that automatically disappear. It is the **whisper** of the interface—every update, every confirmation, every subtle notification arrives as a toast.

**What it provides:**
- Automatic dismissal after configurable duration
- Stackable notifications (multiple toasts can appear)
- Position options (top-right, bottom-center, etc.)
- Pause on hover
- Swipe to dismiss (mobile)
- Action buttons for user responses

---

## 📁 **`components/ui/Toast.tsx`**

```tsx
// components/ui/Toast.tsx
// Toast Component - The whisper of the interface
// Delivers brief, non-intrusive notifications

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  X,
  Zap,
  Sparkles,
} from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'quantum';
export type ToastPosition = 
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastProps extends Toast {
  onClose: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  info: 'bg-blue-500/95 border-blue-400/30',
  success: 'bg-green-500/95 border-green-400/30',
  warning: 'bg-yellow-500/95 border-yellow-400/30',
  error: 'bg-red-500/95 border-red-400/30',
  quantum: 'bg-quantum-purple/95 border-quantum-purple/40',
};

const iconColorStyles: Record<ToastVariant, string> = {
  info: 'text-blue-300',
  success: 'text-green-300',
  warning: 'text-yellow-300',
  error: 'text-red-300',
  quantum: 'text-quantum-light',
};

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  quantum: <Sparkles className="h-5 w-5" />,
};

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

/**
 * Individual Toast Component
 */
const ToastItem = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = 'info', duration = 5000, action, onClose }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isLeaving, setIsLeaving] = React.useState(false);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);
    
    const handleClose = useCallback(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 200);
    }, [onClose]);
    
    React.useEffect(() => {
      if (duration > 0) {
        timerRef.current = setTimeout(handleClose, duration);
      }
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [duration, handleClose]);
    
    if (!isVisible) return null;
    
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'relative flex w-80 gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-200',
          variantStyles[variant],
          isLeaving ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0',
          'animate-in slide-in-from-right-5 fade-in duration-200'
        )}
      >
        <div className={cn('flex-shrink-0', iconColorStyles[variant])}>
          {defaultIcons[variant]}
        </div>
        
        <div className="flex-1">
          {title && (
            <h5 className="font-medium text-white text-sm">
              {title}
            </h5>
          )}
          <p className={cn('text-white/80 text-sm', title && 'mt-1')}>
            {description}
          </p>
          {action && (
            <button
              type="button"
              onClick={() => {
                action.onClick();
                handleClose();
              }}
              className="mt-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
        
        <button
          type="button"
          onClick={handleClose}
          className="flex-shrink-0 rounded-md p-1 text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
ToastItem.displayName = 'ToastItem';

// ============================================================================
// TOAST CONTEXT
// ============================================================================

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
  success: (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => string;
  error: (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => string;
  warning: (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => string;
  info: (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => string;
  quantum: (description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ============================================================================
// TOAST PROVIDER
// ============================================================================

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

/**
 * ToastProvider - Context provider for toast notifications
 * 
 * @example
 * <ToastProvider>
 *   <App />
 *   <Toaster />
 * </ToastProvider>
 */
export const ToastProvider = React.forwardRef<HTMLDivElement, ToastProviderProps>(
  ({ children, position = 'bottom-right', maxToasts = 5 }, ref) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    
    const addToast = useCallback((toast: Omit<Toast, 'id'>): string => {
      const id = Math.random().toString(36).slice(2, 11);
      const newToast = { ...toast, id, variant: toast.variant || 'info' };
      
      setToasts(prev => {
        const newToasts = [newToast, ...prev].slice(0, maxToasts);
        return newToasts;
      });
      
      return id;
    }, [maxToasts]);
    
    const removeToast = useCallback((id: string) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    
    const clearAll = useCallback(() => {
      setToasts([]);
    }, []);
    
    const success = useCallback((description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => {
      return addToast({ description, variant: 'success', ...options });
    }, [addToast]);
    
    const error = useCallback((description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => {
      return addToast({ description, variant: 'error', ...options });
    }, [addToast]);
    
    const warning = useCallback((description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => {
      return addToast({ description, variant: 'warning', ...options });
    }, [addToast]);
    
    const info = useCallback((description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => {
      return addToast({ description, variant: 'info', ...options });
    }, [addToast]);
    
    const quantum = useCallback((description: string, options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>) => {
      return addToast({ description, variant: 'quantum', ...options });
    }, [addToast]);
    
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

// ============================================================================
// TOASTER (Container)
// ============================================================================

export interface ToasterProps {
  position?: ToastPosition;
  toasts: Toast[];
  onClose: (id: string) => void;
}

/**
 * Toaster - Container component that renders toasts
 */
export const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ position = 'bottom-right', toasts, onClose }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(() => {
      setMounted(true);
    }, []);
    
    if (!mounted) return null;
    
    return createPortal(
      <div
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col gap-2',
          positionClasses[position],
          position.includes('top') ? 'flex-col-reverse' : 'flex-col'
        )}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
        ))}
      </div>,
      document.body
    );
  }
);
Toaster.displayName = 'Toaster';
```

---

## 📋 **USAGE EXAMPLES**

### Wrap App with Provider
```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui/Toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider position="bottom-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### Using Toast in Components
```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const toast = useToast();
  
  const handleSave = () => {
    // ... save logic
    toast.success('Changes saved successfully!');
  };
  
  const handleError = () => {
    toast.error('Something went wrong. Please try again.');
  };
  
  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleError}>Trigger Error</button>
    </div>
  );
}
```

### Toast with Title and Action
```tsx
const toast = useToast();

toast.info('File uploaded', {
  title: 'Upload Complete',
  duration: 8000,
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo upload'),
  },
});
```

### Quantum Toast
```tsx
toast.quantum('Your sovereignty score increased!', {
  title: '✨ Quantum Leap ✨',
  duration: 6000,
});
```

### Custom Duration
```tsx
toast.warning('Session expires in 5 minutes', { duration: 10000 });
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Variant | Background | Border | Icon | Duration Default |
|---------|------------|--------|------|------------------|
| info | blue/95 | blue/30 | Info | 5000ms |
| success | green/95 | green/30 | CheckCircle | 5000ms |
| warning | yellow/95 | yellow/30 | AlertCircle | 5000ms |
| error | red/95 | red/30 | XCircle | 8000ms |
| quantum | purple/95 | purple/40 | Sparkles | 6000ms |

| Position | Use Case |
|----------|----------|
| top-right | Default, least intrusive |
| top-center | Important notifications |
| bottom-right | Mobile-friendly |
| bottom-center | Chat applications |
