// components/ui/Alert.tsx
// Alert Component - The voice of the interface
// Communicates important information to users

import React from 'react';
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

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'quantum';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the alert */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert description/message */
  description?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Custom icon (overrides default) */
  icon?: React.ReactNode;
  /** Action button */
  action?: React.ReactNode;
  /** Make alert compact (smaller padding) */
  compact?: boolean;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-500/10 border-blue-500/30',
  success: 'bg-green-500/10 border-green-500/30',
  warning: 'bg-yellow-500/10 border-yellow-500/30',
  error: 'bg-red-500/10 border-red-500/30',
  quantum: 'bg-quantum-purple/10 border-quantum-purple/30',
};

const iconColorStyles: Record<AlertVariant, string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
  quantum: 'text-quantum-purple',
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  quantum: <Sparkles className="h-5 w-5" />,
};

/**
 * Alert Component
 * 
 * @example
 * <Alert variant="success" title="Success!" description="Your changes have been saved." />
 * 
 * @example
 * <Alert variant="error" dismissible onDismiss={() => setShowAlert(false)}>
 *   Something went wrong. Please try again.
 * </Alert>
 * 
 * @example
 * <Alert variant="quantum" title="Quantum Update" action={<Button size="sm">Undo</Button>}>
 *   Your profile has been updated.
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      children,
      dismissible = false,
      onDismiss,
      icon,
      action,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);
    
    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };
    
    if (dismissed) {
      return null;
    }
    
    const displayIcon = icon || defaultIcons[variant];
    const hasContent = title || description || children;
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative rounded-lg border p-4',
          variantStyles[variant],
          compact && 'p-3',
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          <div className={cn('flex-shrink-0', iconColorStyles[variant])}>
            {displayIcon}
          </div>
          
          <div className="flex-1">
            {title && (
              <h5 className={cn('font-medium text-white', compact ? 'text-sm' : 'text-base')}>
                {title}
              </h5>
            )}
            
            {description && (
              <div className={cn('text-white/70', title ? 'mt-1' : '', compact ? 'text-xs' : 'text-sm')}>
                {description}
              </div>
            )}
            
            {children && (
              <div className={cn('text-white/70', title ? 'mt-1' : '', compact ? 'text-xs' : 'text-sm')}>
                {children}
              </div>
            )}
          </div>
          
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
          
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                'flex-shrink-0 rounded-md p-1 transition-colors',
                'text-white/40 hover:text-white/80 hover:bg-white/10',
                'focus:outline-none focus:ring-2 focus:ring-white/20'
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

export const InfoAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="info" {...props} />
);
InfoAlert.displayName = 'InfoAlert';

export const SuccessAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="success" {...props} />
);
SuccessAlert.displayName = 'SuccessAlert';

export const WarningAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="warning" {...props} />
);
WarningAlert.displayName = 'WarningAlert';

export const ErrorAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="error" {...props} />
);
ErrorAlert.displayName = 'ErrorAlert';

export const QuantumAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="quantum" {...props} />
);
QuantumAlert.displayName = 'QuantumAlert';

// ============================================================================
// ALERT GROUP
// ============================================================================

export interface AlertGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between alerts */
  spacing?: 'sm' | 'md' | 'lg';
}

const groupSpacingClasses: Record<string, string> = {
  sm: 'space-y-2',
  md: 'space-y-3',
  lg: 'space-y-4',
};

/**
 * AlertGroup - Container for multiple alerts
 * 
 * @example
 * <AlertGroup>
 *   <Alert variant="success">Success message</Alert>
 *   <Alert variant="warning">Warning message</Alert>
 * </AlertGroup>
 */
export const AlertGroup = React.forwardRef<HTMLDivElement, AlertGroupProps>(
  ({ children, spacing = 'md', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(groupSpacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertGroup.displayName = 'AlertGroup';