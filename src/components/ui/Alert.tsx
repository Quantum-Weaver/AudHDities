// src/components/ui/Alert.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ALERT COMPONENT                                         ║
// ║                    The voice of the interface                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  X,
  Sparkles,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  AlertProps,
  AlertGroupProps,
  InfoAlertProps,
  SuccessAlertProps,
  WarningAlertProps,
  ErrorAlertProps,
  QuantumAlertProps,
} from '@/types/components/ui/alert.types';
import type { AlertVariant } from '@/lib/constants/components/seidr/alert.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  ALERT_ICON_SIZE,
  ALERT_DISMISS,
  ALERT_DISMISS_COLORS,
  ALERT_FOCUS_RING,
  ALERT_GROUP_SPACING,
} from '@/lib/constants/components/seidr/alert.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeAlertContainerClasses,
  getAlertIconColorClass,
  composeAlertTitleClasses,
  composeAlertBodyClasses,
  getAlertFlexGap,
} from '@/utils/components/ui/alert.utils';

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT ICONS
// ═══════════════════════════════════════════════════════════════════════════

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className={ALERT_ICON_SIZE.DEFAULT} />,
  success: <CheckCircle className={ALERT_ICON_SIZE.DEFAULT} />,
  warning: <AlertCircle className={ALERT_ICON_SIZE.DEFAULT} />,
  error: <XCircle className={ALERT_ICON_SIZE.DEFAULT} />,
  quantum: <Sparkles className={ALERT_ICON_SIZE.DEFAULT} />,
};

// ═══════════════════════════════════════════════════════════════════════════
// ALERT
// ═══════════════════════════════════════════════════════════════════════════

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

    if (dismissed) return null;

    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={composeAlertContainerClasses({ variant, compact, className })}
        {...props}
      >
        <div className={cn('flex', getAlertFlexGap())}>
          <div className={getAlertIconColorClass(variant)}>
            {displayIcon}
          </div>

          <div className="flex-1">
            {title && (
              <h5 className={composeAlertTitleClasses({ compact })}>
                {title}
              </h5>
            )}

            {description && (
              <div className={composeAlertBodyClasses({ hasTitle: !!title, compact })}>
                {description}
              </div>
            )}

            {children && (
              <div className={composeAlertBodyClasses({ hasTitle: !!title, compact })}>
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
                'flex-shrink-0 transition-colors',
                ALERT_DISMISS.PADDING,
                ALERT_DISMISS.RADIUS,
                ALERT_DISMISS_COLORS.DEFAULT,
                ALERT_DISMISS_COLORS.HOVER,
                ALERT_FOCUS_RING
              )}
              aria-label="Dismiss"
            >
              <X className={ALERT_ICON_SIZE.DISMISS} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const InfoAlert = React.forwardRef<HTMLDivElement, InfoAlertProps>(
  (props, ref) => <Alert ref={ref} variant="info" {...props} />
);
InfoAlert.displayName = 'InfoAlert';

export const SuccessAlert = React.forwardRef<HTMLDivElement, SuccessAlertProps>(
  (props, ref) => <Alert ref={ref} variant="success" {...props} />
);
SuccessAlert.displayName = 'SuccessAlert';

export const WarningAlert = React.forwardRef<HTMLDivElement, WarningAlertProps>(
  (props, ref) => <Alert ref={ref} variant="warning" {...props} />
);
WarningAlert.displayName = 'WarningAlert';

export const ErrorAlert = React.forwardRef<HTMLDivElement, ErrorAlertProps>(
  (props, ref) => <Alert ref={ref} variant="error" {...props} />
);
ErrorAlert.displayName = 'ErrorAlert';

export const QuantumAlert = React.forwardRef<HTMLDivElement, QuantumAlertProps>(
  (props, ref) => <Alert ref={ref} variant="quantum" {...props} />
);
QuantumAlert.displayName = 'QuantumAlert';

// ═══════════════════════════════════════════════════════════════════════════
// ALERT GROUP
// ═══════════════════════════════════════════════════════════════════════════

export const AlertGroup = React.forwardRef<HTMLDivElement, AlertGroupProps>(
  ({ children, spacing = 'MD', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(ALERT_GROUP_SPACING[spacing], className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertGroup.displayName = 'AlertGroup';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  AlertProps,
  AlertGroupProps,
  AlertVariant,
  AlertGroupSpacing,
} from '@/types/components/ui/alert.types';