// src/components/asgard/domains/hermes/creators/CreatorCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from '@/components/runes/cards/CardHeader';
import { CardContent } from '@/components/runes/cards/CardContent';
import { Badge } from '@/components/runes/Badge';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Shield, Package } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

interface CreatorCardData {
  id: string;
  type: 'creator';
  title: string;
  description?: string;
  image?: string;
  avatar?: string;
  house?: string;
  tier?: string;
  productCount?: number;
  isVerified?: boolean;
}

interface CreatorCardRendererProps {
  data: CardData;
  variant: CardProps['variant'];
  radius: CardProps['radius'];
  shadow: CardProps['shadow'];
  interactive?: boolean;
}

const HOUSE_LABELS: Record<string, string> = {
  hearth_keeper: 'Hearth-Keeper', chancellor: 'Chancellor', seer: 'Seer',
  aethelred: 'Aethelred', curator: 'Curator', archivist: 'Archivist',
  skald: 'Skald', codex: 'Codex', executioner: 'Executioner',
};

export const CreatorCardRenderer: React.FC<CreatorCardRendererProps> = ({
  data,
  variant = 'interactive',
  radius = 'lg',
  shadow = 'sm',
  interactive = true,
}) => {
  const creator = data as CreatorCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow} className="p-5 h-full">
      <CardHeader
        title={
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>
                {creator.title?.charAt(0)?.toUpperCase() || 'C'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-star-dust font-semibold">{creator.title}</span>
                {creator.isVerified && (
                  <Shield size={14} className="text-neurospark" />
                )}
              </div>
              {creator.tier && (
                <span className="text-xs text-star-dust/40 capitalize">{creator.tier}</span>
              )}
            </div>
          </div>
        }
        badge={
          creator.house ? (
            <Badge variant="outline" size="sm" className="text-[10px]">
              House {HOUSE_LABELS[creator.house] || creator.house}
            </Badge>
          ) : undefined
        }
      />
      {creator.description && (
        <CardContent description={creator.description} />
      )}
      {creator.productCount !== undefined && (
        <div className="flex items-center gap-1 text-xs text-star-dust/40 mt-2">
          <Package size={12} />
          <span>{creator.productCount} creations</span>
        </div>
      )}
    </Card>
  );
};

CreatorCardRenderer.displayName = 'CreatorCardRenderer';