// src/components/hermes/CreatorCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/cards/Card';
import { CardMedia, CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { CheckCircle, Package } from 'lucide-react';
import type { CardData, CreatorCardData } from '@/types/components/runes/card.types';

interface CreatorCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

const houseColors: Record<string, string> = {
  aethelred: 'border-cyan-500/30',
  hearth_keeper: 'border-orange-500/30',
  skald: 'border-pink-500/30',
  chancellor: 'border-teal-500/30',
  seer: 'border-purple-500/30',
  curator: 'border-emerald-500/30',
  archivist: 'border-stone-500/30',
  codex: 'border-yellow-500/30',
  executioner: 'border-red-500/30',
};

const tierBadgeColors: Record<string, string> = {
  community: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ally: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  corporate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  council: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export const CreatorCardRenderer: React.FC<CreatorCardRendererProps> = ({
  data,
  variant = 'interactive',
  interactive = true,
}) => {
  const creatorData = data as CreatorCardData;

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
    >
      {creatorData.image && (
        <CardMedia src={creatorData.image} alt={creatorData.title} />
      )}

      <CardHeader
        title={creatorData.title}
        subtitle={creatorData.description}
        badge={
          <div className="flex gap-1">
            {creatorData.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                <CheckCircle className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
        }
      />

      <CardContent
        metadata={[
          ...(creatorData.tier ? [{
            label: 'Tier',
            value: (
              <Badge variant="outline" size="sm" className={tierBadgeColors[creatorData.tier] || ''}>
                {creatorData.tier}
              </Badge>
            )
          }] : []),
          ...(creatorData.productCount !== undefined ? [{
            label: 'Products',
            value: (
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {creatorData.productCount}
              </span>
            )
          }] : []),
        ]}
      />

      <CardFooter
        actions={[
          <div key="avatar" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={creatorData.avatar} />
              <AvatarFallback className="bg-cyan-600 text-white text-xs">
                {creatorData.title.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-white">{creatorData.title}</p>
              {creatorData.house && (
                <p className="text-xs text-white/40 capitalize">
                  House of {creatorData.house.replace('_', ' ')}
                </p>
              )}
            </div>
          </div>
        ]}
      />
    </Card>
  );
};

CreatorCardRenderer.displayName = 'CreatorCardRenderer';