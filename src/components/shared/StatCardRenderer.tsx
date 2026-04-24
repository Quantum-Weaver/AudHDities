'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader, CardContent } from '@/components/ui/cards';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { CardData, StatCardData } from '@/types/components/ui/card.types';

interface StatCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

export const StatCardRenderer: React.FC<StatCardRendererProps> = ({
  data,
  variant = 'elevated',
  interactive = false,
}) => {
  const statData = data as StatCardData;

  const trendIcon = statData.trend === 'up'
    ? <TrendingUp className="h-4 w-4 text-green-400" />
    : statData.trend === 'down'
    ? <TrendingDown className="h-4 w-4 text-red-400" />
    : <Minus className="h-4 w-4 text-white/40" />;

  const changeColor = statData.trend === 'up'
    ? 'text-green-400'
    : statData.trend === 'down'
    ? 'text-red-400'
    : 'text-white/40';

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
      className="text-center"
    >
      <CardHeader
        title={statData.title}
        subtitle={statData.description}
      />

      <CardContent>
        <div className="text-4xl font-bold text-white mb-2">
          {statData.value}
        </div>

        {statData.change !== undefined && (
          <div className={`flex items-center justify-center gap-1 text-sm ${changeColor}`}>
            {trendIcon}
            <span>{statData.change > 0 ? '+' : ''}{statData.change}%</span>
          </div>
        )}

        {statData.target && (
          <div className="mt-2 text-xs text-white/40">
            Target: {statData.target}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

StatCardRenderer.displayName = 'StatCardRenderer';