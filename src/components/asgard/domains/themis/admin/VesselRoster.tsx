// src/components/asgard/domains/themis/admin/VesselRoster.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_ROLE, readRoleCatalog, setRoles, type UserRole } from '@/components/asgard/domains/themis/roles';
import type { CommunityProfilesRow } from '@/lib/generated/types/hestia-core/community_profiles';
import type { CardData } from '@/types/components/runes/card.types';

type Vessel = Pick<
  CommunityProfilesRow,
  'id' | 'display_name' | 'slug' | 'icon_emoji' | 'roles' | 'sovereign_tier' | 'status' | 'created_at'
>;

const PAGE_SIZE = 50;

export function VesselRoster() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [catalog, setCatalog] = useState<Record<string, { label: string; icon: string | null }>>({});
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [term, setTerm] = useState('');

  useEffect(() => {
    let alive = true;

    const read = async () => {
      const supabase = createClient();
      const [roster, roles] = await Promise.all([
        supabase
          .from('community_profiles')
          .select('id, display_name, slug, icon_emoji, roles, sovereign_tier, status, created_at')
          .order('display_name', { ascending: true })
          .limit(PAGE_SIZE),
        readRoleCatalog(),
      ]);

      if (!alive) return;
      if (roster.error) setFault(roster.error.message);
      else setVessels(roster.data ?? []);
      setCatalog(roles);
      setReading(false);
    };

    void read();
    return () => { alive = false; };
  }, []);

  const roleNames = useMemo(() => Object.keys(catalog) as UserRole[], [catalog]);

  const toggle = useCallback(async (vessel: Vessel, role: UserRole) => {
    if (role === BASE_ROLE) return;
    setSaving(vessel.id);
    setFault(null);
    const next = vessel.roles.includes(role)
      ? vessel.roles.filter((held) => held !== role)
      : [...vessel.roles, role];
    const error = await setRoles(vessel.id, next);
    if (error) setFault(error);
    else setVessels((prev) => prev.map((row) => (row.id === vessel.id ? { ...row, roles: next } : row)));
    setSaving(null);
  }, []);

  const filtered = useMemo(() => {
    const needle = term.toLowerCase();
    return vessels.filter((v) => v.display_name.toLowerCase().includes(needle) || v.slug.includes(needle));
  }, [vessels, term]);

  if (reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (<Skeleton key={i} variant="card" className="h-24" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council/admin" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to Administration
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Vessel Management</h1>
          <p className="text-sm text-star-dust/40 mt-1">The vessels of the Sanctuary and the roles they carry</p>
        </div>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
          <input
            type="text"
            placeholder="Search vessels..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No vessel answers</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((vessel) => {
              const cardData: CardData = {
                id: vessel.id,
                type: 'value',
                title: vessel.display_name,
                value: vessel.sovereign_tier,
              };
              return (
                <Card key={vessel.id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-star-dust font-medium">
                        {vessel.icon_emoji ? `${vessel.icon_emoji} ` : ''}{vessel.display_name}
                      </p>
                      <p className="text-xs text-star-dust/40">{vessel.slug} · {vessel.sovereign_tier} · {vessel.status}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {roleNames.map((role) => {
                        const held = vessel.roles.includes(role);
                        return (
                          <Button
                            key={role}
                            variant={held ? 'primary' : 'ghost'}
                            size="xs"
                            disabled={role === BASE_ROLE}
                            loading={saving === vessel.id}
                            onClick={() => toggle(vessel, role)}
                          >
                            {catalog[role]?.label ?? role}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {vessel.roles.map((role) => (
                      <Badge key={role} variant="outline" size="sm" className={cn('text-[10px] capitalize')}>
                        {catalog[role]?.icon ? `${catalog[role].icon} ` : ''}{catalog[role]?.label ?? role}
                      </Badge>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
