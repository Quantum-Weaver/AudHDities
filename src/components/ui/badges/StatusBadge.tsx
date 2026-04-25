'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getProposalStatusColor } from '@/lib/utils/components/ui/card.utils';

// ============================================================================
// TYPES
// ============================================================================

export type StatusType = 'active' | 'passed' | 'failed' | 'pending' | 'completed' | 'current';

export interface StatusBadgeProps {
  status: StatusType;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const statusLabels: Record<StatusType, string> = {
  active: 'Active',
  passed: 'Passed',
  failed: 'Failed',
  pending: 'Pending',
  completed: 'Completed',
  current: 'Current',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * StatusBadge — Color-coded status indicator for proposal cards and steps.
 * Colors are derived from COSMIC tokens via getProposalStatusColor().
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getProposalStatusColor(status);
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {statusLabels[status] || status}
    </span>
  );
};

StatusBadge.displayName = 'StatusBadge';