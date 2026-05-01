// src/components/runes/cards/PillarCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import type { CardData, PillarCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface PillarCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PillarCardRenderer: React.FC<PillarCardRendererProps> = ({ 
  data, 
  variant = 'ghost',
  radius,
  shadow,
  interactive = false
}) => {
  const pillarData = data as PillarCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow} className="text-center">
      {pillarData.icon && (
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-quantum-purple)]/10 flex items-center justify-center text-2xl">
            {pillarData.icon}
          </div>
        </div>
      )}
      <CardHeader 
        title={pillarData.title} 
        subtitle={pillarData.description}
      />
      {pillarData.order !== undefined && (
        <CardContent>
          <span className="text-xs text-[var(--color-star-dust)]/40">
            Pillar {pillarData.order}
          </span>
        </CardContent>
      )}
    </Card>
  );
};

PillarCardRenderer.displayName = 'PillarCardRenderer';