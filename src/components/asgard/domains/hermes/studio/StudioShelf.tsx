// src/components/asgard/domains/hermes/studio/StudioShelf.tsx
// THE OWNER'S SHELF (SPEC §7).
//
// KP ⚛ 2026-08-24: "be certain a vessel can view their own works and wares
// regarless of publish status, so they can edit the items."
//
// It does not soften the earlier default — it BOUNDS it. status = published is
// the stall, and THE STALL IS WHAT VISITORS SEE. Here the read is scoped by
// OWNERSHIP AND BY NOTHING ELSE: no status filter is passed at all.
//
// Until an artisan saved a draft and closed the tab, /bazaar/studio/[id] had
// exactly one inbound link in the whole realm and it was the redirect after
// saving. This room is the finding. The editing door already existed.
//
// THE COULD-NOT-BE-READ STATE IS NOT THE EMPTY STATE. A room that says
// "nothing here" when the answer is "I was not allowed to look" has told a
// vessel their work is gone.
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareRow = Tables<'wares'>;
type WorkRow = Tables<'works'>;

type ShelfRow = {
  id: string;
  kind: 'work' | 'ware';
  name: string;
  status: string;
  createdAt: string;
  /** a participated-in row is shown, clearly marked, with no Edit door */
  ownedByMe: boolean;
  editHref: string | null;
};

const STATUS_WORDS: Record<string, string> = {
  draft: 'Draft',
  published: 'On the stall',
  // Set aside, never Archived — archiving is what a system does to a record.
  archived: 'Set aside',
};

const FILTERS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'Everything' },
  { value: 'draft', label: 'Drafts' },
  { value: 'published', label: 'On the stall' },
  { value: 'archived', label: 'Set aside' },
];

export function StudioShelf() {
  const { user, isLoading: authLoading, roles } = useUser();
  const [rows, setRows] = useState<ShelfRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [walled, setWalled] = useState(false);
  const [filter, setFilter] = useState('all');

  const isArtisan = roles.includes('creator');

  useEffect(() => {
    if (!user) return;
    let alive = true;

    // Scoped by ownership and by NOTHING ELSE — no status parameter is passed.
    const own = `created_by=${encodeURIComponent(user.id)}&order=created_at.desc`;

    Promise.all([
      fetch(`/api/generated/plutus-economics/wares?${own}`).then((r) => r.json()).catch(() => null),
      fetch(`/api/generated/hermes-social/works?${own}`).then((r) => r.json()).catch(() => null),
    ])
      .then(([waresJson, worksJson]) => {
        if (!alive) return;
        if (!waresJson?.success && !worksJson?.success) {
          setWalled(true);
          return;
        }
        const wares: WareRow[] = waresJson?.success
          ? (waresJson.data?.data || waresJson.data || [])
          : [];
        const works: WorkRow[] = worksJson?.success
          ? (worksJson.data?.data || worksJson.data || [])
          : [];

        const shelf: ShelfRow[] = [
          ...wares.map((w) => ({
            id: w.id,
            kind: 'ware' as const,
            name: w.name,
            status: w.status,
            createdAt: w.created_at,
            ownedByMe: w.created_by === user.id,
            editHref: w.created_by === user.id ? `/bazaar/studio/${w.id}` : null,
          })),
          ...works.map((w) => ({
            id: w.id,
            kind: 'work' as const,
            name: w.name,
            status: w.status,
            createdAt: w.created_at,
            ownedByMe: w.created_by === user.id,
            // A work's edit door is not built this pass; its own room is.
            editHref: null,
          })),
        ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

        setRows(shelf);
      })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [user]);

  const shown = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  const worksWithoutAWare = useMemo(() => {
    // Nothing in the base records a ware's descent from a work — that pointer
    // is unwritten, his to rule — so every work carries the line honestly.
    return new Set(rows.filter((r) => r.kind === 'work').map((r) => r.id));
  }, [rows]);

  if (authLoading || (user && loading)) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60 text-lg mb-2">Sign in to reach the Loom.</p>
          <p className="text-star-dust/40 text-sm mb-6">Your works stay where you left them.</p>
          <Link href="/login?redirect=/bazaar/studio">
            <Button variant="primary">Sign in</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!isArtisan) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/40 text-lg mb-2">The Loom awaits your application</p>
          <p className="text-star-dust/30 text-sm mb-6">Apply to become an artisan to start weaving your works.</p>
          <Link href="/council/applications">
            <Button variant="primary">Apply to Create</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/bazaar" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Your loom</h1>
          <p className="text-sm text-star-dust/40 mt-1 max-w-2xl">
            Everything you have made. A draft, a thing on the stall, a thing set aside — it is all
            here, and every one of them opens.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark',
                  filter === f.value
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/50 border-white/10',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="flex-1" />
          <Link href="/bazaar/studio/work">
            <Button variant="ghost" size="sm">Begin a new one</Button>
          </Link>
        </div>

        {walled && (
          <Card
            data={{ id: 'shelf-walled', type: 'value', title: 'Your loom', value: '' }}
            variant="glass"
            radius="lg"
            shadow="sm"
            className="p-8 text-center"
          >
            <p className="text-star-dust/70 text-lg mb-2">Your loom could not be read just now.</p>
            <p className="text-sm text-star-dust/40">
              Nothing is lost — this is a door that has not been opened yet, not an empty shelf.
            </p>
          </Card>
        )}

        {!walled && rows.length === 0 && (
          <Card
            data={{ id: 'shelf-empty', type: 'value', title: 'Your loom', value: '' }}
            variant="glass"
            radius="lg"
            shadow="sm"
            className="p-8 text-center"
          >
            <p className="text-star-dust/60 text-lg mb-2">Nothing on your loom yet.</p>
            <p className="text-sm text-star-dust/40 mb-6">
              The first thread is yours to lay. Nothing here is public until you say so.
            </p>
            <Link href="/bazaar/studio/work">
              <Button variant="primary">Begin a new one</Button>
            </Link>
          </Card>
        )}

        {!walled && rows.length > 0 && shown.length === 0 && (
          <div className="text-center py-16">
            <p className="text-star-dust/60 text-lg mb-2">Nothing under that one.</p>
            <button onClick={() => setFilter('all')} className="text-sm text-neurospark hover:underline">
              Show everything.
            </button>
          </div>
        )}

        {!walled && shown.length > 0 && (
          <ul className="space-y-3" role="list">
            {shown.map((row) => (
              <li
                key={`${row.kind}-${row.id}`}
                className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="outline" size="sm" className="text-[10px] capitalize">{row.kind}</Badge>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {STATUS_WORDS[row.status] || row.status}
                    </Badge>
                    {!row.ownedByMe && (
                      <Badge variant="outline" size="sm" className="text-[10px]">You stood on this</Badge>
                    )}
                  </div>
                  <p className="text-star-dust">{row.name}</p>
                  {row.kind === 'work' && worksWithoutAWare.has(row.id) && (
                    <p className="text-xs text-star-dust/40 mt-1">
                      No ware on the stall from this one — and it does not need one.
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={row.kind === 'ware' ? `/bazaar/wares/${row.id}` : `/bazaar/works/${row.id}`}
                    className="text-sm text-star-dust/60 hover:text-star-dust"
                  >
                    Open
                  </Link>
                  {row.editHref && (
                    <Link href={row.editHref} className="text-sm text-neurospark hover:underline">
                      Edit
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
