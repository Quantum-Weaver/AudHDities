'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { StatusBadge } from '../badges/StatusBadge';
import { formatVoteRatio, formatRelativeTime } from '@/lib/utils/components/runes/card.utils';
import type { CardData, ProposalCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface ProposalCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ProposalCardRenderer: React.FC<ProposalCardRendererProps> = ({ 
  data, 
  variant = 'elevated',
  radius,
  shadow,  
  interactive = true 
}) => {
  const proposalData = data as ProposalCardData;
  const voteRatio = proposalData.votesFor && proposalData.votesAgainst 
    ? formatVoteRatio(proposalData.votesFor, proposalData.votesAgainst)
    : null;
  
  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={proposalData.title} 
        subtitle={proposalData.description}
        badge={proposalData.status && <StatusBadge status={proposalData.status} />}
      />
      <CardContent 
        metadata={[
          ...(proposalData.votesFor !== undefined ? [{ label: 'For', value: proposalData.votesFor.toString() }] : []),
          ...(proposalData.votesAgainst !== undefined ? [{ label: 'Against', value: proposalData.votesAgainst.toString() }] : []),
          ...(voteRatio ? [{ label: 'Support', value: voteRatio }] : []),
          ...(proposalData.deadline ? [{ label: 'Deadline', value: formatRelativeTime(proposalData.deadline) || '' }] : []),
        ]}
      />
      {proposalData.proposer && (
        <CardFooter 
          actions={[
            <span key="proposer" className="text-xs text-[var(--color-star-dust)]/50">
              Proposed by {proposalData.proposer}
            </span>
          ]}
        />
      )}
    </Card>
  );
};

ProposalCardRenderer.displayName = 'ProposalCardRenderer';