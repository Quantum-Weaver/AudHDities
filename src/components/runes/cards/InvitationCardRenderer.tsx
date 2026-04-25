// src/components/runes/cards/InvitationCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { formatRelativeTime } from '@/lib/utils/components/runes/card.utils';
import type { CardData, InvitationCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface InvitationCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const InvitationCardRenderer: React.FC<InvitationCardRendererProps> = ({ 
  data, 
  variant = 'glass',
  radius,
  shadow,
  interactive = true
}) => {
  const invitationData = data as InvitationCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={invitationData.title} 
        subtitle={invitationData.description}
        badge={
          invitationData.isAccepted !== undefined && (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              invitationData.isAccepted 
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' 
                : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
            }`}>
              {invitationData.isAccepted ? 'Accepted' : 'Pending'}
            </span>
          )
        }
      />
      <CardContent 
        metadata={[
          ...(invitationData.inviter ? [{ label: 'From', value: invitationData.inviter }] : []),
          ...(invitationData.expiresAt ? [{ label: 'Expires', value: formatRelativeTime(invitationData.expiresAt) || invitationData.expiresAt }] : []),
        ]}
      />
      {!invitationData.isAccepted && (
        <CardFooter 
          actions={[
            <span key="action" className="text-xs text-[var(--color-neurospark)]">
              Tap to respond
            </span>
          ]}
        />
      )}
    </Card>
  );
};

InvitationCardRenderer.displayName = 'InvitationCardRenderer';