// src/components/runes/ErrorBoundary.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY COMPONENT                               ║
// ║                    Graceful error handling with variant support           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { Component } from 'react';
import type { ErrorInfo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/yggdrasil/Button';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '@/types/components/runes/error_boundary.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  ERROR_BOUNDARY_DEFAULTS,
  ERROR_BOUNDARY_VARIANTS,
  type ErrorBoundaryVariant,
} from '@/lib/constants/components/runes/error_boundary.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  errorBoundaryContainerVariants,
  errorBoundaryIconVariants,
  errorBoundaryTitleVariants,
  errorBoundaryMessageVariants,
  ERROR_BOUNDARY_ACTION_VARIANT_MAP,
} from '@/lib/constants/components/runes/error_boundary.variants';
import { executeRecovery, getRecoveryAction, getSeverity, serializeError, createResetState, logError } from '@/lib/utils/components/runes/error_boundary.utils';

/**
 * ErrorBoundary — Catches render errors and displays a variant-aware fallback.
 *
 * Four variants map to different severity levels:
 * - graceful_degradation: Warning-styled, low severity, recovery focused
 * - recovery_assistance: Error-styled, medium severity, action oriented
 * - user_guidance: Info-styled, informational, gentle guidance
 * - system_reporting: Void-styled, critical, diagnostic
 *
 * @example
 * <ErrorBoundary variant="recovery_assistance" onError={logError}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const severity = getSeverity(
      this.props.variant ?? ERROR_BOUNDARY_VARIANTS.GRACEFUL_DEGRADATION
    );
    const serialized = serializeError(error, errorInfo, severity);
    logError(serialized);  // Pass the full serialized object
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    const severity = getSeverity(this.props.variant ?? ERROR_BOUNDARY_VARIANTS.GRACEFUL_DEGRADATION);
    const action = getRecoveryAction(severity);

    if (action === 'retry') {
      this.setState(createResetState());
    } else {
      executeRecovery(action, this.props.safeRoute);
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const variant: ErrorBoundaryVariant =
        this.props.variant ?? 'graceful_degradation';

      return (
        <div
          className={cn(
            errorBoundaryContainerVariants({ variant }),
            'flex flex-col items-center justify-center'
          )}
        >
          <div className={errorBoundaryIconVariants({ variant })}>
            {ERROR_BOUNDARY_DEFAULTS.ICON}
          </div>

          <h3 className={errorBoundaryTitleVariants({ variant })}>
            {ERROR_BOUNDARY_DEFAULTS.TITLE}
          </h3>

          <p className={errorBoundaryMessageVariants({ variant })}>
            {this.state.error?.message || ERROR_BOUNDARY_DEFAULTS.MESSAGE}
          </p>

          <Button
            onClick={this.handleReset}
            variant={ERROR_BOUNDARY_ACTION_VARIANT_MAP[variant]}
            size="sm"
          >
            {ERROR_BOUNDARY_DEFAULTS.ACTION_LABEL}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}