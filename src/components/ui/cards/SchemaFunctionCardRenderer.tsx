'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { getSchemaTypeIcon } from '@/lib/utils/components/runes/card.utils';
import type { CardData, SchemaFunctionCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface SchemaFunctionCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SchemaFunctionCardRenderer: React.FC<SchemaFunctionCardRendererProps> = ({ 
  data, 
  variant = 'ghost',
  radius,
  shadow,
  interactive = false
}) => {
  const funcData = data as SchemaFunctionCardData;
  const icon = getSchemaTypeIcon('function');

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={
          <span className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="font-mono">{funcData.title}</span>
            <span className="text-xs text-[var(--color-star-dust)]/30">()</span>
          </span>
        }
        subtitle={funcData.description}
        badge={
          funcData.isProcedure && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-fire-base)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-fire-base)]">
              Procedure
            </span>
          )
        }
      />
      <CardContent 
        metadata={[
          ...(funcData.returnType ? [{ label: 'Returns', value: funcData.returnType }] : []),
          ...(funcData.parameters && funcData.parameters.length > 0 ? [{ label: 'Params', value: funcData.parameters.join(', ') }] : []),
        ]}
      />
    </Card>
  );
};

SchemaFunctionCardRenderer.displayName = 'SchemaFunctionCardRenderer';