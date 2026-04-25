// src/components/runes/cards/PathwayCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { formatProgress } from '@/lib/utils/components/runes/card.utils';
import type { CardData, PathwayCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface PathwayCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PathwayCardRenderer: React.FC<PathwayCardRendererProps> = ({ 
  data, 
  variant = 'interactive',
  radius,
  shadow,
  interactive = true
}) => {
  const pathwayData = data as PathwayCardData;
  const progress = pathwayData.progress || 0;
  const completedModules = pathwayData.completedModules || 0;
  const totalModules = pathwayData.modules || 0;
  const progressText = formatProgress(completedModules, totalModules);

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={pathwayData.title} 
        subtitle={pathwayData.description}
      />
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[var(--color-star-dust)]/50">
            <span>{completedModules} of {totalModules} modules</span>
            <span>{progressText}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--color-surface)]/40 overflow-hidden">
            <div 
              className="h-full rounded-full bg-[var(--color-quantum-purple)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
      {progress === 100 && (
        <CardFooter 
          actions={[
            <span key="complete" className="text-xs text-[var(--color-success)]">
              Complete
            </span>
          ]}
        />
      )}
    </Card>
  );
};

PathwayCardRenderer.displayName = 'PathwayCardRenderer';