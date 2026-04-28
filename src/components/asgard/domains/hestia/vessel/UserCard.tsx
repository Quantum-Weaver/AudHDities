// src/components/hestia/UserCard.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardMedia, CardHeader, CardContent, CardFooter } from '@/components/runes/cards';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Calendar } from 'lucide-react';
import type { CardData, UserCardData } from '@/types/components/runes/card.types';

interface UserCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

const roleBadgeColors: Record<string, string> = {
  admin: 'bg-red-500/20 text-red-400 border-red-500/30',
  creator: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  vendor: 'bg-cyan-500/20 text-neurospark border-cyan-500/30',
  moderator: 'bg-green-500/20 text-green-400 border-green-500/30',
  member: 'bg-white/10 text-star-dust/60 border-white/20',
  quantum_weaver: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export const UserCardRenderer: React.FC<UserCardRendererProps> = ({
  data,
  variant = 'default',
  interactive = true,
}) => {
  const userData = data as UserCardData;

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
    >
      {userData.image && (
        <CardMedia src={userData.image} alt={userData.title} />
      )}

      <CardHeader
        title={
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="bg-cyan-600 text-star-dust">
                {userData.title.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-star-dust">{userData.title}</span>
              {userData.isOnline && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              )}
            </div>
          </div>
        }
        subtitle={userData.description}
        badge={
          userData.role ? (
            <Badge variant="outline" size="sm" className={roleBadgeColors[userData.role] || ''}>
              {userData.role.replace('_', ' ')}
            </Badge>
          ) : undefined
        }
      />

      {userData.joinDate && (
        <CardContent
          metadata={[
            {
              label: 'Joined',
              value: (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {userData.joinDate}
                </span>
              )
            }
          ]}
        />
      )}

      {userData.role && (
        <CardFooter
          actions={[
            <Badge key="role" variant="outline" size="sm" className={roleBadgeColors[userData.role] || ''}>
              {userData.role.replace('_', ' ')}
            </Badge>
          ]}
        />
      )}
    </Card>
  );
};

UserCardRenderer.displayName = 'UserCardRenderer';