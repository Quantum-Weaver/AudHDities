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

interface TimelineEvent {
  timelines_id: string;
  event_type: string;
  title: string;
  description: string | null;
  significance_score: number | null;
  occurred_at: string;
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
  const significantEvents = timeline
    .filter((e) => (e.significance_score ?? 0) >= 70)
    .slice(0, 12);

  significantEvents.forEach((event, i) => {
    const angle = (i / Math.max(significantEvents.length, 1)) * Math.PI * 2;
    const distance = 100 + (event.significance_score ?? 50) * 1.2;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    nodes.push({
      id: event.timelines_id,
      x,
      y,
      label: event.title,
      radius: 5 + (event.significance_score ?? 50) / 25,
      color: EVENT_TYPE_COLORS[event.event_type] || '#6C5CE7',
    });

    edges.push({
      from: 'self',
      to: event.timelines_id,
      strength: (event.significance_score ?? 50) / 100,
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

  // Companion stars: products, messages, etc.
  const companionData = [
    { id: 'products', label: `${productCount} Products`, icon: Package, distance: 150, angle: 2.5, color: '#00B894' },
    { id: 'messages', label: `${messageCount} Messages`, icon: MessageCircle, distance: 150, angle: 3.5, color: '#0984E3' },
    // MEND-LAW 2026-07-20: the Emeralds companion star is retired here — no living
    // table backs it (see fetchData above).
    { id: 'posts', label: `${postCount} Posts`, icon: Compass, distance: 150, angle: 5.5, color: '#6C5CE7' },
  ];

  if (channelCount > 0) {
    companionData.push({ id: 'channels', label: `${channelCount} Channel`, icon: MessageCircle, distance: 150, angle: 6.0, color: '#E84393' });
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
        // MEND-LAW 2026-07-20: hestia-core/timelines has no living equivalent —
        // verified against database.types.ts, no table anywhere carries a per-vessel
        // event_type/significance_score/occurred_at shape anymore. Rather than fake
        // a 404-driven timeline, we leave it empty and render the honest empty state.
        // (also dead in TimelineSpiral.tsx and ConstellationDetail.tsx — not mended here, out of license)

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

        // Counts
        // MEND-LAW 2026-07-20: emeralds has no living equivalent anywhere in the
        // schema (verified against database.types.ts) — the Emeralds companion star
        // is retired rather than faked; emeraldCount is gone along with it.
        const counts = [
          fetch(`/api/generated/plutus-economics/wares?created_by=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || d.data?.data?.length || d.data?.length || 0).catch(() => 0),
          fetch(`/api/generated/iris-communications/messages?limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
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

  const { nodes, edges } = useMemo(() => {
    if (timeline.length === 0 && sigils.length === 0 && quests.length === 0) {
      return { nodes: [], edges: [] };
    }
    return buildConstellation(timeline, sigils, quests, productCount, messageCount, postCount, channelCount);
  }, [timeline, sigils, quests, productCount, messageCount, postCount, channelCount]);

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
          <p className="text-star-dust/60">Sign in to view your Constellation.</p>
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
          <p className="text-sm text-star-dust/40 mt-1">The web of your sovereign journey, made visible</p>
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
            <p className="text-star-dust/40 text-lg mb-2">Your constellation awaits its first star</p>
            <p className="text-star-dust/30 text-sm">
              Complete quests, earn sigils, and connect with others to fill your sky
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
                  <span className="text-star-dust font-medium">{selectedNode.label}</span>
                  <span className="text-xs text-star-dust/40 ml-auto">Click another star to explore</span>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Legend */}
        {nodes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {Object.entries(EVENT_TYPE_COLORS).slice(0, 8).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 text-xs text-star-dust/50">
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
                data={{ id: 'summary-timeline', type: 'value', title: 'Timeline', value: `${timeline.length}` }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Clock className="h-5 w-5 text-neurospark mx-auto mb-1" />
                <span className="text-lg font-bold text-star-dust">{timeline.length}</span>
                <p className="text-xs text-star-dust/40">Events</p>
              </Card>
            </Link>
            <Link href="/library/badges">
              <Card
                data={{ id: 'summary-sigils', type: 'value', title: 'Sigils', value: `${sigils.length}` }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Award className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-star-dust">{sigils.length}</span>
                <p className="text-xs text-star-dust/40">Sigils</p>
              </Card>
            </Link>
            <Link href="/library/quests">
              <Card
                data={{ id: 'summary-quests', type: 'value', title: 'Quests', value: `${quests.length}` }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Compass className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-star-dust">{quests.length}</span>
                <p className="text-xs text-star-dust/40">Quests</p>
              </Card>
            </Link>
            <Link href="/bazaar/creations">
              <Card
                data={{ id: 'summary-products', type: 'value', title: 'Products', value: `${productCount}` }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Package className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-star-dust">{productCount}</span>
                <p className="text-xs text-star-dust/40">Products</p>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}