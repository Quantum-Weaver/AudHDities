'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { getTrendIcon, getTrendColorClass } from '@/utils/components/ui/card.utils';
import type { CardData, ValueCardData } from '@/types/components/ui/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface ValueCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ValueCardRenderer: React.FC<ValueCardRendererProps> = ({ 
  data, 
  variant = 'outline',
  radius,
  shadow,
  interactive = false
}) => {
  const valueData = data as ValueCardData;
  const trendIcon = getTrendIcon(valueData.trend);
  const trendColorClass = getTrendColorClass(valueData.trend, valueData.change);

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow} className="text-center">
      <CardHeader 
        title={valueData.title} 
        subtitle={valueData.description}
      />
      <CardContent>
        <div className="text-3xl font-bold text-[var(--color-star-dust)] mb-2">
          {valueData.value}
        </div>
        {valueData.trend && (
          <div className={`flex items-center justify-center gap-1 text-sm ${trendColorClass}`}>
            <span>{trendIcon}</span>
            {valueData.change !== undefined && (
              <span>{valueData.change > 0 ? '+' : ''}{valueData.change}%</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

ValueCardRenderer.displayName = 'ValueCardRenderer';