// src/components/asgard/domains/hestia/home/AuthenticatedGreeting.tsx
'use client';

import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  HOME_LABELS,
  HOME_ROUTES,
  HOME_DIMENSIONS,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.constants';
import { CardData } from '@/types/components/runes/card.types';

export default function AuthenticatedGreeting() {
  const { user, profile, sovereignTier, isLoading: loading } = useUser();
  const tierLabel = sovereignTier ? sovereignTier.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : null;

  // ─── Loading State ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 pt-12">
        <div className="flex justify-center items-center gap-4">
          <Skeleton variant="circle" className="h-14 w-14" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="h-5 w-48" />
            <Skeleton variant="text" className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  // ─── Unauthenticated ─────────────────────────────────────────────────
  if (!user || !profile) {
    return null;
  }

  const greetingCardData: CardData = {
  id: user.id,
  title: profile.display_name || profile.slug || HOME_LABELS.GREETING_FALLBACK,
  type: 'value',
  value: tierLabel || 'Sovereign',
  };
  
  // ─── Authenticated ───────────────────────────────────────────────────
  return (
    <div className="w-full items-center max-w-3xl flex-1 mx-auto px-6 pt-12 pb-4">
      <Card
        variant="sanctuary"
        data={greetingCardData}
        radius="md"
        shadow="lg"
        className="p-6"
      >
        <div className="flex items-center gap-4">
          <Avatar
            src={profile.avatar_url || undefined}
            alt={profile.display_name || profile.slug || HOME_LABELS.GREETING_FALLBACK}
            size="lg"
          >
            <AvatarFallback>
                {profile.display_name?.charAt(0)?.toUpperCase() || 'S'}
            </AvatarFallback>
          </Avatar>
          {/* Greeting & Details */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-widest text-neurospark/70 mb-1">
              {HOME_LABELS.HEARTH_GREETING}
            </p>
            <h2 className="text-xl font-semibold text-star-dust">
              {profile.display_name || profile.slug || HOME_LABELS.GREETING_FALLBACK}
            </h2>

            {profile.bio && (
              <p className="text-sm text-star-dust/60 mt-1 line-clamp-2">
                {profile.bio}
              </p>
            )}

            {/* Badges Row */}
            <div className="flex inline-flex items-center gap-2 mt-3 flex-wrap">
              {tierLabel && (
                <Badge variant="default">{tierLabel}</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}