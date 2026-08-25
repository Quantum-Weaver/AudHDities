// src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ConstellationViewer } from '@/components/seidr/immersive/ConstellationViewer';
import type { ConstellationNode, ConstellationEdge } from '@/components/seidr/immersive/ConstellationViewer';
import { ArrowLeft, Star, Shield, Zap, MessageCircle, Package, Award, Compass, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

// MEND-III 2026-07-20: `hestia-core/timelines` never actually died — Mend II
// (earlier today) removed this fetch believing no living home existed; the
// conductor's genealogy check found it living under its settled name,
// `current` (sovereign_id-scoped). `current` carries no `title` or
// `significance_score` (those only existed on the old table) — the label
// below is synthesized from `event_type` via EVENT_TYPE_LABELS, and the ring
// layout uses recency instead of a significance score it no longer has.
interface TimelineEvent {
  id: string;
  event_type: string;
  description: string | null;
  event_at: string;
}

interface SigilItem {
  sigil_id: string;
  name: string;
  rarity: string;
  earned_at: string | null;
  // MEND-LAW 2026-07-19: earned_reason dropped in the badges -> sigils repoint.
  // Neither `sigils` nor `vessel_sigils` carries a display-text reason field
  // (vessel_sigils.award_context is an opaque Json blob, not prose) — degraded
  // gracefully rather than invented. See journal for the fuller note.
}

interface QuestItem {
  quest_id: string;
  title: string;
  house: string;
  status: string;
}

interface MessageItem {
  messages_id: string;
  content: string;
  created_at: string;
  direction: 'sent' | 'received';
}

interface ProductItem {
  products_id: string;
  title: string;
  product_type: string;
}

// THE OWNED SKY (KP's word 2026-08-24, ruled "6 looks good"): what a vessel
// holds becomes stars, never a list — one star per work, per collection, and
// one per profile they actually hold. Nothing unheld is drawn: no outline, no
// ghost, no locked slot. A dark sky is not an incomplete sky.
interface OwnedStar {
  id: string;
  label: string;
  href: string;
  color: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const EVENT_TYPE_COLORS: Record<string, string> = {
  sovereign_joined: '#FDCB6E',
  consciousness_emerged: '#22D3EE',
  collaboration_began: '#DA70D6',
  sovereign_milestone: '#6C5CE7',
  sanctuary_completed: '#00B894',
  badge_earned: '#E84393',
  quest_completed: '#0984E3',
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  sovereign_joined: 'Arrival',
  consciousness_emerged: 'Awakening',
  collaboration_began: 'Collaboration',
  sovereign_milestone: 'Milestone',
  sanctuary_completed: 'Completion',
  badge_earned: 'Sigil',
  quest_completed: 'Quest',
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400',
  rare: 'bg-cyan-500/20 text-cyan-400',
  epic: 'bg-purple-500/20 text-purple-400',
  legendary: 'bg-amber-500/20 text-amber-400',
  mythic: 'bg-rose-500/20 text-rose-400',
};

const HOUSE_COLORS: Record<string, string> = {
  hearth_keeper: '#C44B2D',
  chancellor: '#00CEC9',
  seer: '#6C5CE7',
  aethelred: '#2E0B1C',
  curator: '#E84393',
  archivist: '#636E72',
  skald: '#FD79A8',
  codex: '#00B894',
  executioner: '#E17055',
};

// ═══════════════════════════════════════════════════════════════════════════
// CONSTELLATION BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildConstellation(
  timeline: TimelineEvent[],
  sigils: SigilItem[],
  quests: QuestItem[],
  owned: OwnedStar[],
  productCount: number,
  messageCount: number,
  postCount: number,
  channelCount: number
): { nodes: ConstellationNode[]; edges: ConstellationEdge[] } {
  const nodes: ConstellationNode[] = [];
  const edges: ConstellationEdge[] = [];
  const centerX = 400;
  const centerY = 300;

  // Center: The Self
  nodes.push({
    id: 'self',
    x: centerX,
    y: centerY,
    label: 'You',
    radius: 14,
    color: '#22D3EE',
  });

  // Orbit 1: Timeline events (inner ring)
  // MEND-III 2026-07-20: `current` has no significance_score, so the ring
  // shows the most recent events (already ordered event_at.desc from the
  // fetch) at a fixed distance/radius rather than inventing a score.
  const recentEvents = timeline.slice(0, 12);

  recentEvents.forEach((event, i) => {
    const angle = (i / Math.max(recentEvents.length, 1)) * Math.PI * 2;
    const distance = 160;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    nodes.push({
      id: event.id,
      x,
      y,
      label: EVENT_TYPE_LABELS[event.event_type] || event.event_type,
      radius: 6,
      color: EVENT_TYPE_COLORS[event.event_type] || '#6C5CE7',
    });

    edges.push({
      from: 'self',
      to: event.id,
      strength: 0.5,
    });
  });

  // Orbit 2: Sigils (middle ring)
  sigils.forEach((sigil, i) => {
    const angle = (i / Math.max(sigils.length, 1)) * Math.PI * 2 + 0.5;
    const distance = 180;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    nodes.push({
      id: `sigil-${sigil.sigil_id}`,
      x,
      y,
      label: sigil.name,
      radius: 6,
      color: sigil.rarity === 'mythic' ? '#22D3EE' : sigil.rarity === 'legendary' ? '#FDCB6E' : '#6C5CE7',
    });

    edges.push({
      from: 'self',
      to: `sigil-${sigil.sigil_id}`,
      strength: 0.6,
    });
  });

  // Orbit 3: Quests (outer ring)
  quests.forEach((quest, i) => {
    const angle = (i / Math.max(quests.length, 1)) * Math.PI * 2 + 1.0;
    const distance = 240;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    nodes.push({
      id: `quest-${quest.quest_id}`,
      x,
      y,
      label: quest.title,
      radius: 5,
      color: HOUSE_COLORS[quest.house] || '#636E72',
    });

    edges.push({
      from: 'self',
      to: `quest-${quest.quest_id}`,
      strength: 0.4,
    });
  });

  // Orbit 4: what the vessel holds. ONE ring at a fixed distance however many
  // there are — a ring with forty members does not grow outward; the ring IS
  // the group, and density reads as a busier band, never as forty things
  // competing for the eye.
  owned.forEach((thing, i) => {
    const angle = (i / Math.max(owned.length, 1)) * Math.PI * 2 + 0.25;
    const distance = 300;
    nodes.push({
      id: thing.id,
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      label: thing.label,
      radius: 6,
      color: thing.color,
    });
    edges.push({ from: 'self', to: thing.id, strength: 0.5 });
  });

  // Companion stars: a star is a thing that exists — it does not say how many
  // of it there are, and it is not drawn at all when there are none.
  const companionData: Array<{ id: string; label: string; icon: typeof Package; distance: number; angle: number; color: string }> = [];
  if (productCount > 0) {
    companionData.push({ id: 'products', label: 'Your wares', icon: Package, distance: 150, angle: 2.5, color: '#00B894' });
  }
  if (messageCount > 0) {
    companionData.push({ id: 'messages', label: 'Your letters', icon: MessageCircle, distance: 150, angle: 3.5, color: '#0984E3' });
  }
  // MEND-LAW 2026-07-20: the Emeralds companion star is retired here — no living
  // table backs it (see fetchData above).
  if (postCount > 0) {
    companionData.push({ id: 'posts', label: 'Your posts', icon: Compass, distance: 150, angle: 5.5, color: '#6C5CE7' });
  }
  if (channelCount > 0) {
    companionData.push({ id: 'channels', label: 'Your channels', icon: MessageCircle, distance: 150, angle: 6.0, color: '#E84393' });
  }

  companionData.forEach((c) => {
    nodes.push({
      id: c.id,
      x: centerX + Math.cos(c.angle) * c.distance,
      y: centerY + Math.sin(c.angle) * c.distance,
      label: c.label,
      radius: 6,
      color: c.color,
    });
    edges.push({ from: 'self', to: c.id, strength: 0.5 });
  });

  return { nodes, edges };
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ConstellationContent() {
  const { user, loading: authLoading } = useAuth();
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [sigils, setSigils] = useState<SigilItem[]>([]);
  const [quests, setQuests] = useState<QuestItem[]>([]);
  const [owned, setOwned] = useState<OwnedStar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  // Counts
  const [productCount, setProductCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchData = async () => {
      try {
        // MEND-III 2026-07-20: corrects Mend II's removal above (same day) — the
        // conductor's genealogy check found `timelines` living under its settled
        // name, `current` (hestia-core, sovereign_id-scoped). Re-wired for real.
        const tRes = await fetch(`/api/generated/hestia-core/current?sovereign_id=${user.id}&order=event_at.desc&limit=50`);
        const tData = await tRes.json();
        if (tData.success) {
          setTimeline(tData.data?.data || []);
        }

        // Sigils earned by this vessel (badges/user_badges are gone — GAIA now
        // emits vessel_sigils for the earning record and sigils for the definition)
        const vsRes = await fetch(`/api/generated/hestia-core/vessel_sigils?user_id=${user.id}&limit=20`);
        const vsData = await vsRes.json();
        if (vsData.success) {
          const rawVesselSigils = vsData.data?.data || vsData.data || [];
          // Fetch sigil details
          const sigilDetails = await Promise.all(
            rawVesselSigils.map(async (vs: any) => {
              try {
                const sRes = await fetch(`/api/generated/athena-gamification/sigils/${vs.sigil_id}`);
                const sData = await sRes.json();
                return {
                  sigil_id: vs.sigil_id,
                  name: sData.success ? sData.data?.name : 'Sigil',
                  rarity: sData.success ? sData.data?.rarity : 'common',
                  earned_at: vs.awarded_at || null,
                };
              } catch {
                return { sigil_id: vs.sigil_id, name: 'Sigil', rarity: 'common', earned_at: null };
              }
            })
          );
          setSigils(sigilDetails);
        }

        // Quests completed by this vessel (user_quests is gone — hestia-core now
        // tracks per-vessel quest completion as vessel_quests)
        const qRes = await fetch(`/api/generated/hestia-core/vessel_quests?user_id=${user.id}&status=completed&limit=20`);
        const qData = await qRes.json();
        if (qData.success) {
          const rawQuests = qData.data?.data || qData.data || [];
          const questDetails = await Promise.all(
            rawQuests.map(async (uq: any) => {
              try {
                const qdRes = await fetch(`/api/generated/athena-gamification/quests/${uq.quest_id}`);
                const qdData = await qdRes.json();
                return {
                  quest_id: uq.quest_id,
                  // quests.title -> quests.name in the settle
                  title: qdData.success ? qdData.data?.name : 'Quest',
                  // MEND-LAW 2026-07-20: `house` dropped from the quests table in the
                  // settle — no field carries it anymore, so we no longer invent one.
                  // Left blank; HOUSE_COLORS/HOUSE_LABELS fall back to their neutral default.
                  house: '',
                  status: uq.status || 'completed',
                };
              } catch {
                return { quest_id: uq.quest_id, title: 'Quest', house: '', status: 'completed' };
              }
            })
          );
          setQuests(questDetails);
        }

        // WHAT THIS VESSEL HOLDS — works, collections, and the profiles they
        // actually have. Each read is own-scoped; a profile that does not
        // exist simply returns nothing and is never drawn.
        const heldStars: OwnedStar[] = [];
        try {
          const [wRes, cRes, csRes, aRes, mRes] = await Promise.all([
            fetch(`/api/generated/hermes-social/works?created_by=${user.id}&limit=100`).then(r => r.json()).catch(() => null),
            fetch(`/api/generated/hestia-core/vessel_collections?user_id=${user.id}&limit=100`).then(r => r.json()).catch(() => null),
            fetch(`/api/generated/hestia-core/collection_sets?limit=100`).then(r => r.json()).catch(() => null),
            fetch(`/api/generated/hermes-social/artisan_profiles?created_by=${user.id}&limit=1`).then(r => r.json()).catch(() => null),
            fetch(`/api/generated/hermes-social/merchant_profiles?created_by=${user.id}&limit=1`).then(r => r.json()).catch(() => null),
          ]);

          const works: any[] = wRes?.success ? (wRes.data?.data || []) : [];
          for (const w of works) {
            heldStars.push({ id: `work-${w.id}`, label: w.name || 'A work', href: `/bazaar/studio/${w.id}`, color: '#00B894' });
          }

          const held: any[] = cRes?.success ? (cRes.data?.data || []) : [];
          const catalog: any[] = csRes?.success ? (csRes.data?.data || []) : [];
          const setById = new Map(catalog.map((c: any) => [c.id, c]));
          for (const h of held) {
            const set = h.collection_id ? setById.get(h.collection_id) : undefined;
            heldStars.push({ id: `collection-${h.id}`, label: (set as any)?.name || 'A collection', href: '/vessel/home', color: '#FDCB6E' });
          }

          const artisan = aRes?.success ? (aRes.data?.data || [])[0] : undefined;
          if (artisan) {
            heldStars.push({ id: 'creator-profile', label: 'Your artisan profile', href: `/bazaar/artisans/${artisan.id}`, color: '#6C5CE7' });
          }
          const merchant = mRes?.success ? (mRes.data?.data || [])[0] : undefined;
          if (merchant) {
            heldStars.push({ id: 'merchant-profile', label: 'Your merchant profile', href: `/bazaar/merchants/${merchant.id}`, color: '#E84393' });
          }
        } catch {
          // A door that will not open is not a star that gets invented.
        }
        setOwned(heldStars);

        // Counts
        // MEND-LAW 2026-07-20: emeralds has no living equivalent anywhere in the
        // schema (verified against database.types.ts) — the Emeralds companion star
        // is retired rather than faked; emeraldCount is gone along with it.
        const counts = [
          fetch(`/api/generated/plutus-economics/wares?created_by=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || d.data?.data?.length || d.data?.length || 0).catch(() => 0),
          fetch(`/api/generated/iris-communications/messages?created_by=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
          fetch(`/api/generated/iris-communications/signals?created_by=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
          fetch(`/api/generated/iris-communications/channels?created_by=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
        ];

        const [pCount, mCount, poCount, chCount] = await Promise.all(counts);
        setProductCount(pCount || 0);
        setMessageCount(mCount || 0);
        setPostCount(poCount || 0);
        setChannelCount(chCount || 0);
      } catch (err) {
        console.error('Failed to fetch constellation data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // The home is a star, and it is the community profile — KP's word: the
  // community profile IS "the outside of a vessels home", so it is not a star
  // of its own. It joins the ring only once the sky has something in it; an
  // untouched sky keeps its own dignified empty state.
  const skyIsEmpty =
    timeline.length === 0 && sigils.length === 0 && quests.length === 0 && owned.length === 0;

  const ownedWithHome = useMemo<OwnedStar[]>(
    () =>
      skyIsEmpty
        ? []
        : [{ id: 'home', label: 'Your home', href: '/vessel/home', color: '#C44B2D' }, ...owned],
    [skyIsEmpty, owned]
  );

  const { nodes, edges } = useMemo(() => {
    if (skyIsEmpty) {
      return { nodes: [], edges: [] };
    }
    return buildConstellation(timeline, sigils, quests, ownedWithHome, productCount, messageCount, postCount, channelCount);
  }, [skyIsEmpty, timeline, sigils, quests, ownedWithHome, productCount, messageCount, postCount, channelCount]);

  // Tap a star, arrive in its room. The viewer is another realm's organ and
  // selects rather than navigates, so the door stands on the selected star's
  // own name below the sky.
  const starRooms = useMemo<Record<string, string>>(() => {
    const rooms: Record<string, string> = {};
    for (const thing of ownedWithHome) rooms[thing.id] = thing.href;
    for (const event of timeline) rooms[event.id] = `/vessel/constellation/${event.id}`;
    return rooms;
  }, [ownedWithHome, timeline]);

  const handleNodeClick = (node: ConstellationNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-[400px]" />
        </div>
      </main>
    );
  }

  // ─── Unauthenticated ─────────────────────────────────────────────────
  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Enter the Sanctuary to see your vessel.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/vessel"
            className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Vessel
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Your Constellation</h1>
          <p className="text-sm text-star-dust/70 mt-1">The web of your sovereign journey, made visible</p>
        </div>

        {/* Constellation Viewer */}
        {nodes.length === 0 ? (
          <Card
            data={{ id: 'empty-constellation', type: 'value', title: 'Empty Constellation', value: '' }}
            variant="glass"
            radius="xl"
            shadow="md"
            className="p-12 text-center"
          >
            <Star className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/70 text-lg mb-2">Your constellation awaits its first star</p>
            <p className="text-star-dust/70 text-sm">
              Nothing has been missed. The sky fills as you live here — a first
              arrival is already a star.
            </p>
          </Card>
        ) : (
          <>
            <Card
              data={{ id: 'constellation-map', type: 'value', title: 'Constellation', value: '' }}
              variant="glass"
              radius="xl"
              shadow="md"
              className="p-2 mb-6"
            >
              <ConstellationViewer
                nodes={nodes}
                edges={edges}
                onNodeClick={handleNodeClick}
              />
            </Card>

            {/* Selected Node Info */}
            {selectedNode && (
              <Card
                data={{ id: 'selected-node', type: 'value', title: selectedNode.label, value: '' }}
                variant="sanctuary"
                radius="lg"
                shadow="md"
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedNode.color }}
                  />
                  {starRooms[selectedNode.id] ? (
                    <Link href={starRooms[selectedNode.id]} className="text-star-dust font-medium hover:underline">
                      {selectedNode.label}
                    </Link>
                  ) : (
                    <span className="text-star-dust font-medium">{selectedNode.label}</span>
                  )}
                  <span className="text-xs text-star-dust/70 ml-auto">Click another star to explore</span>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Legend */}
        {nodes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {Object.entries(EVENT_TYPE_COLORS).slice(0, 8).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 text-xs text-star-dust/70">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{EVENT_TYPE_LABELS[type] || type}</span>
              </div>
            ))}
          </div>
        )}

        {/* Summary Cards */}
        {nodes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <Link href="/vessel/journal">
              <Card
                data={{ id: 'summary-timeline', type: 'value', title: 'Your timeline', value: '' }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Clock className="h-5 w-5 text-neurospark mx-auto mb-2" />
                <p className="text-sm text-star-dust/80">Your timeline</p>
              </Card>
            </Link>
            <Link href="/library/badges">
              <Card
                data={{ id: 'summary-sigils', type: 'value', title: 'Your sigils', value: '' }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Award className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-star-dust/80">Your sigils</p>
              </Card>
            </Link>
            <Link href="/library/quests">
              <Card
                data={{ id: 'summary-quests', type: 'value', title: 'Your quests', value: '' }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Compass className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-star-dust/80">Your quests</p>
              </Card>
            </Link>
            <Link href="/bazaar/wares">
              <Card
                data={{ id: 'summary-products', type: 'value', title: 'Your creations', value: '' }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Package className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-star-dust/80">Your creations</p>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}