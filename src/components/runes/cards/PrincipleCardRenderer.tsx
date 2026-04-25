// src/components/runes/cards/PricipleCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import type { CardData, PrincipleCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface PrincipleCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PrincipleCardRenderer: React.FC<PrincipleCardRendererProps> = ({ 
  data, 
  variant = 'ghost',
  radius,
  shadow,
  interactive = false
}) => {
  const principleData = data as PrincipleCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={principleData.title} 
        subtitle={principleData.description}
      />
      {principleData.order !== undefined && (
        <CardContent>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-quantum-purple)]/10 text-[var(--color-quantum-purple)] text-sm font-bold">
            {principleData.order}
          </span>
        </CardContent>
      )}
    </Card>
  );
};

PrincipleCardRenderer.displayName = 'PrincipleCardRenderer';