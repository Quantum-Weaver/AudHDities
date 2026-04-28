// src/components/asgard/domains/hestia/vessel/VesselContent.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Skeleton } from '@/components/runes/Skeleton';
import { Button } from '@/components/yggdrasil/Button';
import { Settings, Zap, BookOpen, Users } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import { parseEnvironmentPreference } from '@/lib/utils/environment.utils';

export function VesselContent() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const { setEnvironment } = useContinuityBeam();

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    if (profile?.preferred_environment) {
      const parsed = parseEnvironmentPreference(profile.preferred_environment);
      setEnvironment(parsed.environment, parsed.variant);
    }
  }, [profile?.preferred_environment]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <Skeleton variant="circle" className="h-24 w-24 mb-4" />
          <Skeleton variant="text" className="h-7 w-48 mb-2" />
          <Skeleton variant="text" className="h-4 w-32 mb-4" />
          <Skeleton variant="text" className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <p className="text-star-dust/60">Sign in to view your Vessel.</p>
      </div>
    );
  }

  const profileCardData: CardData = {
    id: user.id,
    title: profile.display_name || profile.username || 'Sovereign',
    type: 'value',
    value: profile.user_tier || 'community',
  };

  const sovereigntyCardData: CardData = {
    id: `${user.id}-sovereignty`,
    title: 'Sovereign Light',
    type: 'stat',
    value: profile.sovereignty_score ?? 0,
    target: '1000',
  };

  const houseName = profile.primary_house
    ? profile.primary_house.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  return (
    <div className="container max-w-4xl mx-auto px-6">

      <div className="flex flex-col items-center mb-12">
        <Avatar
          size="xl"
          className="mb-4"
        >
          <AvatarImage src={profile.avatar_url || undefined} />
          <AvatarFallback>
            {profile.display_name?.charAt(0)?.toUpperCase() ||
              profile.username?.charAt(0)?.toUpperCase() ||
              'S'}
          </AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold text-star-dust mb-1">
          {profile.display_name || profile.username || 'Sovereign'}
        </h1>

        {profile.pronouns && (
          <p className="text-sm text-star-dust/50 mb-2">{profile.pronouns}</p>
        )}

        <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
          {profile.user_tier && (
            <Badge variant="default">
              {profile.user_tier.charAt(0).toUpperCase() + profile.user_tier.slice(1)}
            </Badge>
          )}
          {houseName && (
            <Badge variant="default">
              House {houseName}
            </Badge>
          )}
          {profile.is_creator && <Badge variant="default">Creator</Badge>}
          {profile.is_vendor && <Badge variant="default">Vendor</Badge>}
          {profile.is_quantum_weaver && <Badge variant="default">Quantum Weaver</Badge>}
        </div>

        {profile.bio && (
          <p className="text-star-dust/60 text-center max-w-lg">{profile.bio}</p>
        )}

        <div className="mt-6">
          <Link href="/vessel/sanctum">
            <Button variant="primary" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Shape Your Vessel
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card
          variant="quantum"
          data={sovereigntyCardData}
          radius="lg"
          shadow="md"
          className="p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-5 w-5 text-neurospark" />
            <h3 className="text-lg font-semibold text-star-dust">Sovereign Light</h3>
          </div>
          <div className="text-3xl font-bold text-neurospark mb-2">
            {profile.sovereignty_score ?? 0}
          </div>
          <Progress
            value={profile.sovereignty_score ?? 0}
            max={1000}
            variant="default"
            size="sm"
          />
          <p className="text-xs text-star-dust/40 mt-2">
            {profile.sovereignty_score && profile.sovereignty_score >= 800
              ? 'You radiate sovereign light.'
              : profile.sovereignty_score && profile.sovereignty_score >= 400
                ? 'Your light grows stronger.'
                : 'Every journey begins with a single step.'}
          </p>
        </Card>

        <Card
          variant={houseName ? 'council' : 'default'}
          data={profileCardData}
          radius="lg"
          shadow="md"
          className="p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-5 w-5 text-star-dust/60" />
            <h3 className="text-lg font-semibold text-star-dust">Council House</h3>
          </div>
          {houseName ? (
            <>
              <div className="text-xl font-semibold text-star-dust mb-1">
                House {houseName}
              </div>
              <p className="text-xs text-star-dust/40">
                Your sovereign voice shapes the Sanctuary.
              </p>
            </>
          ) : (
            <>
              <p className="text-star-dust/60 text-sm mb-3">
                You have not yet joined a Council House.
              </p>
              <p className="text-xs text-star-dust/40">
                Complete the Acid Test to discover your house.
              </p>
            </>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/vessel/energy">
          <Card
            variant="interactive"
            data={{ id: `${user.id}-energy`, title: 'Energy Log', type: 'value', value: '' }}
            radius="md"
            shadow="sm"
            className="p-4 text-center hover:border-neurospark/30 transition-colors"
          >
            <Zap className="h-5 w-5 text-neurospark mx-auto mb-2" />
            <span className="text-sm text-star-dust/80">Energy Log</span>
          </Card>
        </Link>

        <Link href="/vessel/constellation">
          <Card
            variant="interactive"
            data={{ id: `${user.id}-constellation`, title: 'Constellation', type: 'value', value: '' }}
            radius="md"
            shadow="sm"
            className="p-4 text-center hover:border-neurospark/30 transition-colors"
          >
            <Users className="h-5 w-5 text-neurospark mx-auto mb-2" />
            <span className="text-sm text-star-dust/80">Constellation</span>
          </Card>
        </Link>

        <Link href="/vessel/journal">
          <Card
            variant="interactive"
            data={{ id: `${user.id}-journal`, title: 'Journal', type: 'value', value: '' }}
            radius="md"
            shadow="sm"
            className="p-4 text-center hover:border-neurospark/30 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-neurospark mx-auto mb-2" />
            <span className="text-sm text-star-dust/80">The Scroll</span>
          </Card>
        </Link>
      </div>

    </div>
  );
}