// src/components/runes/cards/CouncilCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { formatDate } from '@/lib/utils/components/runes/card.utils';
import type { CardData, CouncilCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface CouncilCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CouncilCardRenderer: React.FC<CouncilCardRendererProps> = ({ 
  data, 
  variant = 'council',
  radius,
  shadow,
  interactive = true
}) => {
  const councilData = data as CouncilCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={councilData.title} 
        subtitle={councilData.description}
      />
      <CardContent 
        metadata={[
          ...(councilData.members !== undefined ? [{ label: 'Members', value: councilData.members.toString() }] : []),
          ...(councilData.meetingSchedule ? [{ label: 'Meets', value: councilData.meetingSchedule }] : []),
          ...(councilData.nextMeeting ? [{ label: 'Next Meeting', value: formatDate(councilData.nextMeeting) || councilData.nextMeeting }] : []),
        ]}
      />
    </Card>
  );
};

CouncilCardRenderer.displayName = 'CouncilCardRenderer';