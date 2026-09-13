// src/components/asgard/domains/iris/profile/ProfileRoom.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/runes/Avatar';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, Palette } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { getTierIcon, getTierLabel } from '@/lib/types/roles';
import { readRows } from '@/components/asgard/domains/iris/rows';
import { profileHref } from '@/components/asgard/domains/iris/profile/href';
import { AUTH_REDIRECT_PARAM, AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers';
import type { UserRole } from '@/lib/types/roles';

type ProfileRow = Tables<'community_profiles'>;
type ArtisanRow = Tables<'artisan_profiles'>;
type WareRow = Tables<'wares'>;
type WorkRow = Tables<'works'>;

type RoleCatalogEntry = { role: UserRole; label: string; icon_emoji: string | null; sort_order: number };

type ProfileRead = { key: string; row: ProfileRow | null };
type Offerings = { vessel: string; artisan: ArtisanRow | null; wares: WareRow[]; works: WorkRow[] };

const VESSEL_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function ProfileRoom() {
  const params = useParams();
  const key = typeof params?.slug === 'string' ? params.slug : '';
  const { user, profile: ownProfile } = useUser();
  const [read, setRead] = useState<ProfileRead | null>(null);
  const [roleCatalog, setRoleCatalog] = useState<RoleCatalogEntry[]>([]);
  const [offerings, setOfferings] = useState<Offerings | null>(null);

  const loading = read?.key !== key;
  const profile = read && read.key === key ? read.row : null;
  const stall = offerings && offerings.vessel === profile?.created_by ? offerings : null;
  const artisan = stall?.artisan ?? null;
  const wares = stall?.wares ?? [];
  const works = stall?.works ?? [];

  // The slug is the room's key; a vessel id answers too, for callers that hold one.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!key) {
        if (!cancelled) setRead({ key, row: null });
        return;
      }
      try {
        const bySlug = await fetch(
          `/api/generated/hestia-core/community_profiles?slug=${encodeURIComponent(key)}&sort=created_at&order=desc&limit=1`
        ).then((r) => r.json());
        let rows = readRows<ProfileRow>(bySlug);
        if (rows.length === 0 && VESSEL_ID.test(key)) {
          const byVessel = await fetch(
            `/api/generated/hestia-core/community_profiles?created_by=${encodeURIComponent(key)}&sort=created_at&order=desc&limit=1`
          ).then((r) => r.json());
          rows = readRows<ProfileRow>(byVessel);
        }
        if (!cancelled) setRead({ key, row: rows[0] ?? null });
      } catch {
        if (!cancelled) setRead({ key, row: null });
      }
    })();
    return () => { cancelled = true; };
  }, [key]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/generated/hestia-core/role_catalog?sort=sort_order&order=asc&limit=20')
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        const entries = readRows<RoleCatalogEntry>(payload);
        setRoleCatalog([...entries].sort((a, b) => a.sort_order - b.sort_order));
      })
      .catch(() => { if (!cancelled) setRoleCatalog([]); });
    return () => { cancelled = true; };
  }, []);

  // The public offerings: the vessel's loom, then what stands published at it.
  useEffect(() => {
    const vessel = profile?.created_by;
    if (!vessel) return;
    let cancelled = false;
    (async () => {
      try {
        const artisanPayload = await fetch(
          `/api/generated/hermes-social/artisan_profiles?created_by=${vessel}&status=active&sort=created_at&order=desc&limit=1`
        ).then((r) => r.json());
        const found = readRows<ArtisanRow>(artisanPayload)[0] ?? null;
        if (!found) {
          if (!cancelled) setOfferings({ vessel, artisan: null, wares: [], works: [] });
          return;
        }
        const [warePayload, workPayload] = await Promise.all([
          fetch(`/api/generated/plutus-economics/wares?artisan_profile_id=${found.id}&status=published&sort=updated_at&order=desc&limit=6`).then((r) => r.json()),
          fetch(`/api/generated/hermes-social/works?artisan_profile_id=${found.id}&status=published&sort=updated_at&order=desc&limit=6`).then((r) => r.json()),
        ]);
        if (!cancelled) {
          setOfferings({
            vessel,
            artisan: found,
            wares: readRows<WareRow>(warePayload),
            works: readRows<WorkRow>(workPayload),
          });
        }
      } catch {
        if (!cancelled) setOfferings({ vessel, artisan: null, wares: [], works: [] });
      }
    })();
    return () => { cancelled = true; };
  }, [profile?.created_by]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!profile) {
    const door = `${AUTH_ROUTES.LOGIN}?${AUTH_REDIRECT_PARAM}=${encodeURIComponent(profileHref(key))}`;
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">
            {user
              ? 'No public face answers here. The wall gives a vessel their own profile, and any other one only once the public read is opened.'
              : 'This room reads for a signed-in vessel.'}
          </p>
          {user ? (
            ownProfile?.slug && (
              <Link href={profileHref(ownProfile.slug)} className="text-neurospark hover:underline mt-4 inline-block">
                Your profile
              </Link>
            )
          ) : (
            <Link href={door} className="text-neurospark hover:underline mt-4 inline-block">
              Enter
            </Link>
          )}
        </div>
      </main>
    );
  }

  const roles = (profile.roles ?? []) as UserRole[];
  const shown = roleCatalog.filter((entry) => entry.role !== 'community' && roles.includes(entry.role));
  const cardData: CardData = {
    id: profile.id,
    type: 'user',
    title: profile.display_name,
    description: profile.bio || '',
    avatar: profile.avatar_url || undefined,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Bridge
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size="2xl">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.display_name?.charAt(0)?.toUpperCase() || profile.slug?.charAt(0)?.toUpperCase() || 'S'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-star-dust">
                {profile.icon_emoji && <span aria-hidden="true">{profile.icon_emoji} </span>}
                {profile.display_name}
              </h1>
              <p className="text-sm text-star-dust/40">@{profile.slug}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="default">
              <span aria-hidden="true">{getTierIcon(profile.sovereign_tier)} </span>
              {getTierLabel(profile.sovereign_tier)}
            </Badge>
            {shown.map((entry) => (
              <Badge key={entry.role} variant="default">
                {entry.icon_emoji && <span aria-hidden="true">{entry.icon_emoji} </span>}
                {entry.label}
              </Badge>
            ))}
            {profile.status !== 'active' && (
              <Badge variant="outline" size="sm" className="text-[10px]">Not published</Badge>
            )}
          </div>

          {profile.bio && <p className="text-star-dust/70 leading-relaxed">{profile.bio}</p>}

          {artisan && (
            <Link
              href={`/bazaar/artisans/${artisan.id}`}
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mt-6"
            >
              <Palette size={14} aria-hidden="true" />
              {artisan.artisan_name} at the loom
            </Link>
          )}
        </Card>

        {artisan && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-star-dust mb-1">On the stall</h2>
            {wares.length === 0 ? (
              <p className="text-sm text-star-dust/40">Nothing on the stall just now.</p>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {wares.map((ware) => {
                  const wareData: CardData = {
                    id: ware.id, type: 'product', title: ware.name, description: ware.description || '',
                  };
                  return (
                    <Link key={ware.id} href={`/bazaar/wares/${ware.id}`}>
                      <Card data={wareData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-star-dust">
                            {ware.icon_emoji && <span aria-hidden="true">{ware.icon_emoji} </span>}
                            {ware.name}
                          </h3>
                          <Badge variant="outline" size="sm" className="text-[10px] capitalize">{ware.ware_type}</Badge>
                        </div>
                        {ware.description && (
                          <p className="text-sm text-star-dust/50 line-clamp-2">{ware.description}</p>
                        )}
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {artisan && works.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-star-dust mb-1">At the loom</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {works.map((work) => {
                const workData: CardData = {
                  id: work.id, type: 'product', title: work.name, description: work.description || '',
                };
                return (
                  <Link key={work.id} href={`/bazaar/works/${work.id}`}>
                    <Card data={workData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-star-dust">
                          {work.icon_emoji && <span aria-hidden="true">{work.icon_emoji} </span>}
                          {work.name}
                        </h3>
                        <Badge variant="outline" size="sm" className="text-[10px] capitalize">{work.work_type}</Badge>
                      </div>
                      {work.description && (
                        <p className="text-sm text-star-dust/50 line-clamp-2">{work.description}</p>
                      )}
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {!artisan && (
          <div className="mt-8 flex items-center gap-2 text-sm text-star-dust/40">
            <Package size={14} aria-hidden="true" />
            No loom stands under this name.
          </div>
        )}
      </div>
    </main>
  );
}
