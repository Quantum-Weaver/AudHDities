// src/components/asgard/domains/hermes/contributions/ContributionsGallery.tsx
// Wares edition (2026-07-31): contributions became ware_participants, and
// the room became what the 2026-07-09 verdict named it — a provenance
// gallery. Credit, not payout math.
//
// THE PARTICIPANT'S MENU SPACE (2026-08-01, KP's ⚛ ruling, his words on
// the realm bus): the room now shows BOTH tables — the wares and the
// works the vessel participated in — each with the visibility toggle.
// The row always exists (residual distribution rides on it, regardless
// of published status); only PUBLICATION is the vessel's toggle, opt-in,
// default quiet (033-the-participants-consent.sql). The toggle writes
// through the supabase client under the participant-own UPDATE policy —
// RLS is the guard, not the UI.
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Switch } from '@/components/forging/Switch';
import { ArrowLeft, HandHeart, Search, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import type { CardData } from '@/types/components/runes/card.types';
// Repointed 2026-08-11 to the layer GAIA now delivers — the old helpers were
// six columns behind the base, which is what hid `is_public` on the
// participants tables (the column exists live; the photograph was stale).
import type { Tables } from '@/lib/generated/supabase/database.helpers';

type WareParticipation = Tables<'ware_participants'>;
type WorkParticipation = Tables<'work_participants'>;

interface Participation {
  kind: 'ware' | 'work';
  id: string;
  targetId: string;
  role: string | null;
  notes: string | null;
  createdAt: string;
  isPublic: boolean;
}

const ROLE_COLORS: Record<string, string> = {
  concept: 'bg-purple-500/20 text-purple-400', code: 'bg-cyan-500/20 text-cyan-400',
  design: 'bg-pink-500/20 text-pink-400', content: 'bg-emerald-500/20 text-emerald-400',
  testing: 'bg-amber-500/20 text-amber-400', promotion: 'bg-rose-500/20 text-rose-400',
  infrastructure: 'bg-slate-500/20 text-slate-400',
};

export function ContributionsGallery() {
  const { user } = useAuth();
  const [items, setItems] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toggling, setToggling] = useState<string | null>(null);
  const [toggleNote, setToggleNote] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      fetch(`/api/generated/plutus-economics/ware_participants?user_id=${user.id}&order=created_at.desc`).then(r => r.json()),
      fetch(`/api/generated/hermes-social/work_participants?user_id=${user.id}&order=created_at.desc`).then(r => r.json()),
    ])
      .then(([wares, works]) => {
        const wareRows: WareParticipation[] = wares.success ? (wares.data?.data || wares.data || []) : [];
        const workRows: WorkParticipation[] = works.success ? (works.data?.data || works.data || []) : [];
        const all: Participation[] = [
          ...wareRows.map((r): Participation => ({
            kind: 'ware', id: r.id, targetId: r.ware_id, role: r.role,
            notes: r.notes, createdAt: r.created_at, isPublic: r.is_public,
          })),
          ...workRows.map((r): Participation => ({
            kind: 'work', id: r.id, targetId: r.work_id, role: r.role,
            notes: r.notes, createdAt: r.created_at, isPublic: r.is_public,
          })),
        ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setItems(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const toggleVisibility = useCallback(async (item: Participation, next: boolean) => {
    setToggling(item.id);
    setToggleNote(null);
    const supabase = createClient();
    const table = item.kind === 'ware' ? 'ware_participants' : 'work_participants';
    const { error } = await supabase.from(table).update({ is_public: next }).eq('id', item.id);
    if (error) {
      setToggleNote('The change did not take this time. It is safe to try again.');
    } else {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, isPublic: next } : i));
    }
    setToggling(null);
  }, []);

  const filtered = useMemo(() => items.filter(i =>
    (i.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.notes || '').toLowerCase().includes(searchTerm.toLowerCase())
  ), [items, searchTerm]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-32" />)}</div></div></main>);

  if (!user) return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6 text-center">
        <p className="text-star-dust/60 text-lg mb-2">This room is yours alone.</p>
        <p className="text-star-dust/40 text-sm mb-6">Sign in and it will show what you have helped make.</p>
        <Link href="/login?redirect=/bazaar/contributions">
          <Button variant="primary">Sign in</Button>
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/bazaar" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Bazaar</Link><h1 className="text-2xl font-bold text-star-dust">Contributions</h1><p className="text-sm text-star-dust/40 mt-1">Your part in every work, recorded</p></div>

      <p className="text-sm text-star-dust/50 mb-8 max-w-2xl">
        Your name on a work is yours to show or keep quiet. The credit — and the
        residual share — stand either way.
      </p>

      <div className="relative mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} aria-hidden="true" /><input type="text" placeholder="Filter by role..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none" /></div>
      {toggleNote && <p role="status" className="text-xs text-star-dust/50 mb-4">{toggleNote}</p>}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <HandHeart className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          {searchTerm ? (
            <>
              <p className="text-star-dust/60 text-lg mb-2">Nothing matches that.</p>
              <button onClick={() => setSearchTerm('')} className="text-sm text-neurospark hover:underline">
                Your contributions are still here — clear the filter to see them.
              </button>
            </>
          ) : (
            <>
              <p className="text-star-dust/60 text-lg mb-2">Nothing here yet.</p>
              <p className="text-sm text-star-dust/40">
                When you help make something, it is recorded here — whether or not your name goes on it.
              </p>
            </>
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(i => {
          const role = i.role || 'contributor';
          const cd: CardData = { id: i.id, type: 'value', title: role, value: '' };
          return (
            <Card key={i.id} data={cd} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${ROLE_COLORS[role] || ''}`}>{role}</Badge>
                  <Badge variant="outline" size="sm" className="text-[10px] capitalize bg-white/5 text-star-dust/50">{i.kind}</Badge>
                </div>
                <span className="text-xs text-star-dust/30">{new Date(i.createdAt).toLocaleDateString()}</span>
              </div>
              {i.notes && <p className="text-sm text-star-dust/50 mb-3">{i.notes}</p>}
              <Link
                href={i.kind === 'ware' ? `/bazaar/wares/${i.targetId}` : `/bazaar/works/${i.targetId}`}
                className="text-sm text-neurospark hover:underline"
              >
                View the work
              </Link>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                {i.isPublic
                  ? <Eye className="h-3.5 w-3.5 text-sanctuary-green" aria-hidden="true" />
                  : <EyeOff className="h-3.5 w-3.5 text-star-dust/40" aria-hidden="true" />}
                <Switch
                  label={i.isPublic ? 'Shown with the work' : 'Kept quiet'}
                  size="sm"
                  checked={i.isPublic}
                  onChange={(checked) => toggleVisibility(i, checked)}
                  disabled={toggling === i.id}
                />
              </div>
            </Card>
          );
        })}
      </div>

      {!searchTerm && filtered.length > 0 && (
        <p className="text-center text-xs text-star-dust/30 mt-10">
          {say(filtered.length)}. That is all of them.
        </p>
      )}
    </div></main>
  );
}

/** Drawn from what arrived. Never a stored count. */
function say(n: number): string {
  const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const word = n < words.length ? words[n] : String(n);
  return `${word} ${n === 1 ? 'contribution' : 'contributions'}`;
}
