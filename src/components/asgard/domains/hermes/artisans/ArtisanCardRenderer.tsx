// src/components/asgard/domains/hermes/artisans/ArtisanCardRenderer.tsx
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

interface ArtisanCardData {
  id: string;
  type: 'artisan';
  title: string;
  description?: string;
  image?: string;
  avatar?: string;
  house?: string;
  tier?: string;
  productCount?: number;
  isVerified?: boolean;
}

interface ArtisanCardRendererProps {
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

export const ArtisanCardRenderer: React.FC<ArtisanCardRendererProps> = ({
  data,
  variant = 'interactive',
  radius = 'lg',
  shadow = 'sm',
  interactive = true,
}) => {
  const artisan = data as ArtisanCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow} className="p-5 h-full">
      <CardHeader
        title={
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>
                {artisan.title?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-star-dust font-semibold">{artisan.title}</span>
                {artisan.isVerified && (
                  <Shield size={14} className="text-neurospark" />
                )}
              </div>
              {artisan.tier && (
                <span className="text-xs text-star-dust/40 capitalize">{artisan.tier}</span>
              )}
            </div>
          </div>
        }
        badge={
          artisan.house ? (
            <Badge variant="outline" size="sm" className="text-[10px]">
              House {HOUSE_LABELS[artisan.house] || artisan.house}
            </Badge>
          ) : undefined
        }
      />
      {artisan.description && (
        <CardContent description={artisan.description} />
      )}
    </Card>
  );
};

ArtisanCardRenderer.displayName = 'ArtisanCardRenderer';