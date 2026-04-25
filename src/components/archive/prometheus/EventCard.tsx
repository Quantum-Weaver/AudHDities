// src/components/prometheus/EventCardRenderer.tsx
'use client';

import React from 'react';
import { Card, CardRibbon } from '@/components/runes/cards/Card';
import { CardMedia, CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Badge } from '@/components/runes/Badge';
import { Calendar, Clock, MapPin, Radio } from 'lucide-react';
import type { CardData, EventCardData } from '@/types/components/runes/card.types';

interface EventCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

export const EventCardRenderer: React.FC<EventCardRendererProps> = ({
  data,
  variant = 'glass',
  interactive = true,
}) => {
  const eventData = data as EventCardData;

  const locationIcons: Record<string, React.ReactNode> = {
    'online': <Radio className="h-3 w-3" />,
    'in-person': <MapPin className="h-3 w-3" />,
    'hybrid': <MapPin className="h-3 w-3" />,
  };

  const genreColors: Record<string, string> = {
    music: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    comedy: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    workshop: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    council: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
    >
      {eventData.isLive && <CardRibbon text="LIVE" color="fire" />}
      {eventData.image && (<CardMedia src={eventData.image} alt={eventData.title} />)}

      <CardHeader
        title={eventData.title}
        subtitle={eventData.description}
        badge={
          <div className="flex gap-1 flex-wrap">
            {eventData.genre && (
              <Badge variant="outline" size="sm" className={genreColors[eventData.genre] || ''}>
                {eventData.genre}
              </Badge>
            )}
          </div>
        }
      />

      <CardContent
        metadata={[
          ...(eventData.date ? [{ label: 'Date', value: eventData.date }] : []),
          ...(eventData.time ? [{ label: 'Time', value: eventData.time }] : []),
          ...(eventData.location ? [{
            label: 'Location',
            value: (
              <span className="flex items-center gap-1">
                {locationIcons[eventData.location]}
                {eventData.location}
              </span>
            )
          }] : []),
          ...(eventData.price !== undefined ? [{
            label: 'Price',
            value: eventData.price === 0 ? 'Free' : `$${eventData.price}`
          }] : []),
        ]}
      />

      {(eventData.date || eventData.time) && (
        <CardFooter
          actions={[
            <div key="datetime" className="flex items-center gap-3 text-xs text-[var(--color-star-dust)]/50">
              {eventData.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {eventData.date}
                </span>
              )}
              {eventData.time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {eventData.time}
                </span>
              )}
            </div>
          ]}
        />
      )}
    </Card>
  );
};

EventCardRenderer.displayName = 'EventCardRenderer';