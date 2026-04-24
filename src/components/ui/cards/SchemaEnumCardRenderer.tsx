'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { getSchemaTypeIcon } from '@/utils/components/ui/card.utils';
import type { CardData, SchemaEnumCardData } from '@/types/components/ui/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface SchemaEnumCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SchemaEnumCardRenderer: React.FC<SchemaEnumCardRendererProps> = ({ 
  data, 
  variant = 'ghost',
  radius,
  shadow,
  interactive = false
}) => {
  const enumData = data as SchemaEnumCardData;
  const icon = getSchemaTypeIcon('enum');

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={
          <span className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="font-mono">{enumData.title}</span>
          </span>
        }
        subtitle={enumData.description}
      />
      <CardContent 
        metadata={[
          ...(enumData.valueCount !== undefined ? [{ label: 'Values', value: enumData.valueCount.toString() }] : []),
        ]}
      />
      {enumData.values && enumData.values.length > 0 && (
        <CardFooter 
          actions={enumData.values.slice(0, 8).map((value, i) => (
            <span 
              key={i}
              className="inline-flex items-center rounded-full bg-[var(--color-surface)]/40 px-2 py-0.5 text-xs font-mono text-[var(--color-star-dust)]/50"
            >
              {value}
            </span>
          ))}
        />
      )}
    </Card>
  );
};

SchemaEnumCardRenderer.displayName = 'SchemaEnumCardRenderer';