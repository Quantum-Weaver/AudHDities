// src/components/runes/cards/SchemaTableCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { getSchemaTypeIcon } from '@/lib/utils/components/runes/card.utils';
import type { CardData, SchemaTableCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface SchemaTableCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SchemaTableCardRenderer: React.FC<SchemaTableCardRendererProps> = ({ 
  data, 
  variant = 'ghost',
  radius,
  shadow,
  interactive = true
}) => {
  const tableData = data as SchemaTableCardData;
  const icon = getSchemaTypeIcon('table');

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={
          <span className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="font-mono">{tableData.title}</span>
          </span>
        }
        subtitle={tableData.description}
        badge={
          tableData.isView && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-quantum-purple)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-quantum-purple)]">
              View
            </span>
          )
        }
      />
      <CardContent 
        metadata={[
          ...(tableData.columns !== undefined ? [{ label: 'Columns', value: tableData.columns.toString() }] : []),
          ...(tableData.rows !== undefined ? [{ label: 'Rows', value: tableData.rows.toLocaleString() }] : []),
        ]}
      />
    </Card>
  );
};

SchemaTableCardRenderer.displayName = 'SchemaTableCardRenderer';