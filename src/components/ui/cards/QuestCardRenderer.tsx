'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardMedia } from './CardMedia';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { DifficultyBadge } from '../badges/DifficultyBadge';
import type { CardData, QuestCardData } from '@/types/components/ui/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface QuestCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const QuestCardRenderer: React.FC<QuestCardRendererProps> = ({ 
  data, 
  variant = 'glow',
  radius,
  shadow,
  interactive = true
}) => {
  const questData = data as QuestCardData;
  
  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      {questData.image && <CardMedia src={questData.image} alt={questData.title} />}
      <CardHeader 
        title={questData.title} 
        subtitle={questData.description}
        badge={questData.difficulty && <DifficultyBadge difficulty={questData.difficulty} />}
      />
      <CardContent 
        metadata={[
          ...(questData.reward ? [{ label: 'Reward', value: `${questData.reward} XP` }] : []),
          ...(questData.duration ? [{ label: 'Duration', value: questData.duration }] : []),
          ...(questData.isCompleted ? [{ label: 'Status', value: 'Completed' }] : []),
        ]}
      />
      {questData.prerequisites && questData.prerequisites.length > 0 && (
        <CardFooter 
          actions={[
            <span key="prereq" className="text-xs text-[var(--color-star-dust)]/50">
              Prerequisites: {questData.prerequisites.length}
            </span>
          ]}
        />
      )}
    </Card>
  );
};

QuestCardRenderer.displayName = 'QuestCardRenderer';