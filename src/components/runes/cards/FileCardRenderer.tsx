// src/components/runes/cards/FileCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { formatFileSize, getFileTypeIcon, getFileExtension, formatRelativeTime } from '@/lib/utils/components/runes/card.utils';
import type { CardData, FileCardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

// ============================================================================
// TYPES
// ============================================================================

interface FileCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const FileCardRenderer: React.FC<FileCardRendererProps> = ({ 
  data, 
  variant = 'outline',
  radius,
  shadow,
  interactive = true
}) => {
  const fileData = data as FileCardData;
  const extension = getFileExtension(fileData.title);
  const fileIcon = getFileTypeIcon(fileData.fileType);

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={
          <span className="flex items-center gap-2">
            <span className="text-xl">{fileIcon}</span>
            <span className="font-mono">{fileData.title}</span>
          </span>
        }
        subtitle={fileData.description}
        badge={
          extension && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-surface)]/40 px-2 py-0.5 text-xs font-mono text-[var(--color-star-dust)]/50">
              .{extension}
            </span>
          )
        }
      />
      <CardContent 
        metadata={[
          ...(fileData.size !== undefined ? [{ label: 'Size', value: formatFileSize(fileData.size) }] : []),
          ...(fileData.category ? [{ label: 'Category', value: fileData.category }] : []),
          ...(fileData.modifiedAt ? [{ label: 'Modified', value: formatRelativeTime(fileData.modifiedAt) || fileData.modifiedAt }] : []),
        ]}
      />
    </Card>
  );
};

FileCardRenderer.displayName = 'FileCardRenderer';