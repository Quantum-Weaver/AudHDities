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

interface BadgeItem {
  badge_id: string;
  name: string;
  rarity: string;
  earned_reason: string | null;
  earned_at: string | null;
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
  badge_earned: 'Badge',
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
  badges: BadgeItem[],
  quests: QuestItem[],
  productCount: number,
  messageCount: number,
  emeraldCount: number,
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

  // Orbit 2: Badges (middle ring)
  badges.forEach((badge, i) => {
    const angle = (i / Math.max(badges.length, 1)) * Math.PI * 2 + 0.5;
    const distance = 180;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    nodes.push({
      id: `badge-${badge.badge_id}`,
      x,
      y,
      label: badge.name,
      radius: 6,
      color: badge.rarity === 'mythic' ? '#22D3EE' : badge.rarity === 'legendary' ? '#FDCB6E' : '#6C5CE7',
    });

    edges.push({
      from: 'self',
      to: `badge-${badge.badge_id}`,
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
    { id: 'emeralds', label: `${emeraldCount} Emeralds`, icon: Star, distance: 150, angle: 4.5, color: '#FDCB6E' },
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
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [quests, setQuests] = useState<QuestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  // Counts
  const [productCount, setProductCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [emeraldCount, setEmeraldCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchData = async () => {
      try {
        // Timeline
        const tRes = await fetch(`/api/generated/hestia-core/timelines?user_id=${user.id}&order=significance_score.desc&limit=20`);
        const tData = await tRes.json();
        if (tData.success) setTimeline(tData.data?.data || tData.data || []);

        // Badges
        const bRes = await fetch(`/api/generated/athena-gamification/user_badges?user_id=${user.id}&limit=20`);
        const bData = await bRes.json();
        if (bData.success) {
          const rawBadges = bData.data?.data || bData.data || [];
          // Fetch badge details
          const badgeDetails = await Promise.all(
            rawBadges.map(async (ub: any) => {
              try {
                const bdRes = await fetch(`/api/generated/athena-gamification/badges/${ub.badge_id}`);
                const bdData = await bdRes.json();
                return {
                  badge_id: ub.badge_id,
                  name: bdData.success ? bdData.data?.name : 'Badge',
                  rarity: bdData.success ? bdData.data?.rarity : 'common',
                  earned_reason: ub.earned_reason || null,
                  earned_at: ub.earned_at || null,
                };
              } catch {
                return { badge_id: ub.badge_id, name: 'Badge', rarity: 'common', earned_reason: null, earned_at: null };
              }
            })
          );
          setBadges(badgeDetails);
        }

        // Quests
        const qRes = await fetch(`/api/generated/athena-gamification/user_quests?user_id=${user.id}&status=completed&limit=20`);
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
                  title: qdData.success ? qdData.data?.title : 'Quest',
                  house: qdData.success ? qdData.data?.house || 'hearth_keeper' : 'hearth_keeper',
                  status: uq.status || 'completed',
                };
              } catch {
                return { quest_id: uq.quest_id, title: 'Quest', house: 'hearth_keeper', status: 'completed' };
              }
            })
          );
          setQuests(questDetails);
        }

        // Counts
        const counts = [
          fetch(`/api/generated/plutus-economics/products?creator_id=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || d.data?.data?.length || d.data?.length || 0).catch(() => 0),
          fetch(`/api/generated/iris-communications/messages?limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
          fetch(`/api/generated/hermes-social/emeralds?limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
          fetch(`/api/generated/hermes-social/posts?author_id=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
          fetch(`/api/generated/hermes-social/channels?owner_id=${user.id}&limit=1`).then(r => r.json()).then(d => d.data?.pagination?.total || 0).catch(() => 0),
        ];

        const [pCount, mCount, eCount, poCount, chCount] = await Promise.all(counts);
        setProductCount(pCount || 0);
        setMessageCount(mCount || 0);
        setEmeraldCount(eCount || 0);
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
    if (timeline.length === 0 && badges.length === 0 && quests.length === 0) {
      return { nodes: [], edges: [] };
    }
    return buildConstellation(timeline, badges, quests, productCount, messageCount, emeraldCount, postCount, channelCount);
  }, [timeline, badges, quests, productCount, messageCount, emeraldCount, postCount, channelCount]);

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
              Complete quests, earn badges, and connect with others to fill your sky
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
                data={{ id: 'summary-badges', type: 'value', title: 'Badges', value: `${badges.length}` }}
                variant="interactive"
                radius="lg"
                shadow="sm"
                className="p-4 text-center"
              >
                <Award className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-star-dust">{badges.length}</span>
                <p className="text-xs text-star-dust/40">Badges</p>
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