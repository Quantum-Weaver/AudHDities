'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { StatusBadge } from '../badges/StatusBadge';
import { getStepStatus, getStepProgress } from '@/utils/components/ui/card.utils';
import type { CardData, StepCardData } from '@/types/components/ui/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface StepCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const StepCardRenderer: React.FC<StepCardRendererProps> = ({ 
  data, 
  variant = 'outline',
  radius,
  shadow,
  interactive = false
}) => {
  const stepData = data as StepCardData;
  const status = getStepStatus(stepData);
  const progress = getStepProgress(stepData);

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={stepData.title} 
        subtitle={stepData.description}
        badge={<StatusBadge status={status} />}
      />
      {stepData.totalSteps !== undefined && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[var(--color-star-dust)]/50">
              <span>Step {stepData.stepNumber} of {stepData.totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--color-surface)]/40 overflow-hidden">
              <div 
                className="h-full rounded-full bg-[var(--color-neurospark)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      )}
      {stepData.isCurrent && (
        <CardFooter 
          actions={[
            <span key="current" className="text-xs text-[var(--color-neurospark)]">
              Current step
            </span>
          ]}
        />
      )}
    </Card>
  );
};

StepCardRenderer.displayName = 'StepCardRenderer';