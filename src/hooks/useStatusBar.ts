// hooks/useStatusBar.ts
// Status Bar Hook - Manages status bar state and metrics

"use client";

import { useMemo } from 'react';
import { useEnvironment } from '@/lib/constants/systems/environments/contexts';
import { useUser } from '@/hooks/useUser';
import { getStatusBarConfig, DEFAULT_USER_STATUS, type UserStatusData, type StatusBarConfig } from '@/lib/constants/systems/environments/status_bar';
import { statusBarUtils } from '@/lib/utils/components/immersive/status_bar';
import type { StatusType, StatusIndicator } from '@/types/components/immersive/status_bar';

export interface UseStatusBarReturn {
  /** Current status bar configuration based on environment */
  config: StatusBarConfig;
  /** User status data (sovereignty, energy, focus, etc.) */
  userStatus: UserStatusData;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether environment is transitioning */
  isTransitioning: boolean;
  /** Formatted metrics for display */
  metrics: StatusIndicator[];
  /** Current level (derived from sovereignty score) */
  level: number;
  /** Current sovereignty score */
  sovereigntyScore: number;
  /** Current currency balance */
  currency: number;
  /** Unread notification count */
  notificationCount: number;
  /** Page title from metadata */
  pageTitle: string;
  /** Page subtitle from metadata */
  pageSubtitle: string;
}

/**
 * Hook to access status bar state and metrics
 * Automatically updates when environment or user changes
 * 
 * @example
 * const { config, userStatus, level, sovereigntyScore } = useStatusBar();
 */
export function useStatusBar(): UseStatusBarReturn {
  const { environment, isTransitioning } = useEnvironment();
  const { profile, isLoading: isUserLoading } = useUser();
  
  // Get status bar config for current environment
  const config = useMemo(() => getStatusBarConfig(environment), [environment]);
  
  // Build user status data
  const userStatus = useMemo((): UserStatusData => {
    const sovereigntyScore = profile?.sovereignty_score ?? 0;
    const level = Math.floor(sovereigntyScore / 100) + 1;
    
    return {
      sovereigntyScore,
      level,
      energy: DEFAULT_USER_STATUS.energy,
      focus: DEFAULT_USER_STATUS.focus,
      health: DEFAULT_USER_STATUS.health,
      currency: DEFAULT_USER_STATUS.currency,
      notifications: DEFAULT_USER_STATUS.notifications,
      experience:  DEFAULT_USER_STATUS.experience
    };
  }, [profile]);
  
  // Calculate level
  const level = useMemo(() => {
    return Math.floor(userStatus.sovereigntyScore / 100) + 1;
  }, [userStatus.sovereigntyScore]);
  
  // Build metrics from config
  const metrics = useMemo((): StatusIndicator[] => {
    return config.metrics.map((metric) => {
      const value = statusBarUtils.getMetricValue(metric.type, userStatus);
      const maxValue = statusBarUtils.getMetricMax(metric.type);
      
      return {
        type: metric.type as StatusType,
        value,
        maxValue,
        format: metric.format,
        showValue: true,
        label: metric.label,
      };
    });
  }, [config.metrics, userStatus]);
  
  // Page metadata (would come from pathname - can be passed in or derived)
  // For now, these are placeholders - the component will override with actual metadata
  const pageTitle = '';
  const pageSubtitle = '';
  
  return {
    config,
    userStatus,
    isLoading: isUserLoading,
    isTransitioning,
    metrics,
    level,
    sovereigntyScore: userStatus.sovereigntyScore,
    currency: userStatus.currency,
    notificationCount: userStatus.notifications,
    pageTitle,
    pageSubtitle,
  };
}