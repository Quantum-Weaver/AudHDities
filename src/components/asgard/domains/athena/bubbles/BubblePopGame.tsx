// src/components/asgard/domains/athena/bubbles/BubblePopGame.tsx
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Progress } from '@/components/runes/Progress';
import { Skeleton } from '@/components/runes/Skeleton';
import { Slider } from '@/components/forging/Slider';
import { ArrowLeft, Droplets, Star, Heart, Pause, Play, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface BubbleDef {
  bubbles_id: string;
  name: string;
  rarity: string;
  color: string;
  glow_color: string | null;
  points_value: number;
  collection_name: string | null;
}

interface FloatingBubble {
  id: string;
  bubble: BubbleDef;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  popped: boolean;
}

interface UserLimits {
  daily_points: number;
  hourly_pops: number;
  max_daily_points: number;
  max_hourly_pops: number;
}

interface CollectionProgress {
  name: string;
  total: number;
  collected: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const TIER_LIMITS: Record<string, { daily: number; hourly: number }> = {
  community: { daily: 500, hourly: 100 },
  ally: { daily: 1500, hourly: 300 },
  corporate: { daily: 5000, hourly: 500 },
  council: { daily: 99999, hourly: 9999 },
};

const RARITY_WEIGHTS: Record<string, number> = {
  common: 60, rare: 25, epic: 10, legendary: 4, mythic: 1,
};

const RARITY_SIZE: Record<string, number> = {
  common: 40, rare: 48, epic: 56, legendary: 64, mythic: 80,
};

const RARITY_SPEED: Record<string, number> = {
  common: 0.6, rare: 0.5, epic: 0.4, legendary: 0.3, mythic: 0.2,
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const RARITY_POP_EMOJI: Record<string, string> = {
  common: '✨', rare: '💫', epic: '⚡', legendary: '🌌', mythic: '🪐',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function BubblePopGame() {
  const { user, profile, loading: authLoading } = useAuth();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const totalPopsRef = useRef<number>(0);
  const sessionStartRef = useRef<number>(Date.now());

  const [bubbles, setBubbles] = useState<BubbleDef[]>([]);
  const [floating, setFloating] = useState<FloatingBubble[]>([]);
  const [limits, setLimits] = useState<UserLimits>({ daily_points: 0, hourly_pops: 0, max_daily_points: 500, max_hourly_pops: 100 });
  const [score, setScore] = useState(0);
  const [sessionPops, setSessionPops] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showBreathReminder, setShowBreathReminder] = useState(false);
  const [isDailyLimitReached, setIsDailyLimitReached] = useState(false);
  const [popEffects, setPopEffects] = useState<Array<{ id: string; x: number; y: number; emoji: string; }>>([]);
  const [collections, setCollections] = useState<CollectionProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [customDailyMax, setCustomDailyMax] = useState<number>(500);

  // ─── Fetch bubble definitions ────────────────────────────────────────
  useEffect(() => {
    fetch('/api/generated/athena-gamification/bubbles?is_active=true&order=rarity.desc')
      .then(r => r.json())
      .then(result => { if (result.success) setBubbles(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ─── Fetch user limits ───────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/hestia-core/user_bubble_limits?user_id=eq.${user.id}&limit=1`)
      .then(r => r.json())
      .then(result => {
        const data = result.data?.data?.[0] || result.data?.[0];
        if (data) {
          const tier = profile?.user_tier || 'community';
          const tierMax = TIER_LIMITS[tier] || TIER_LIMITS.community;
          setLimits({
            daily_points: data.daily_points || 0,
            hourly_pops: data.hourly_pops || 0,
            max_daily_points: Math.min(tierMax.daily, data.max_daily_points || tierMax.daily),
            max_hourly_pops: tierMax.hourly,
          });
          setCustomDailyMax(Math.min(tierMax.daily, data.max_daily_points || tierMax.daily));
          setIsDailyLimitReached((data.daily_points || 0) >= (data.max_daily_points || tierMax.daily));
        }
      })
      .catch(() => {});
  }, [user, profile?.user_tier]);

  // ─── Fetch collection progress ────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/athena-gamification/user_bubble_pops?user_id=eq.${user.id}&select=bubble_id`)
      .then(r => r.json())
      .then(result => {
        const pops = result.data?.data || result.data || [];
        const poppedIds = new Set(pops.map((p: any) => p.bubble_id));
        const collectionMap: Record<string, { total: number; collected: number }> = {};
        bubbles.forEach(b => {
          if (b.collection_name) {
            if (!collectionMap[b.collection_name]) collectionMap[b.collection_name] = { total: 0, collected: 0 };
            collectionMap[b.collection_name].total++;
            if (poppedIds.has(b.bubbles_id)) collectionMap[b.collection_name].collected++;
          }
        });
        setCollections(Object.entries(collectionMap).map(([name, data]) => ({ name, ...data })));
      })
      .catch(() => {});
  }, [user, bubbles]);

  // ─── Pick a random bubble by rarity weight ────────────────────────────
  const pickBubble = useCallback(() => {
    if (bubbles.length === 0) return null;
    const tier = profile?.user_tier || 'community';
    const eligible = bubbles.filter(b => {
      if (tier === 'community') return b.rarity === 'common' || b.rarity === 'rare';
      if (tier === 'ally') return b.rarity !== 'legendary' && b.rarity !== 'mythic';
      return true;
    });
    if (eligible.length === 0) return bubbles[Math.floor(Math.random() * bubbles.length)];

    const totalWeight = eligible.reduce((sum, b) => sum + (RARITY_WEIGHTS[b.rarity] || 10), 0);
    let roll = Math.random() * totalWeight;
    for (const b of eligible) {
      roll -= RARITY_WEIGHTS[b.rarity] || 10;
      if (roll <= 0) return b;
    }
    return eligible[eligible.length - 1];
  }, [bubbles, profile?.user_tier]);

  // ─── Spawn a bubble ──────────────────────────────────────────────────
  const spawnBubble = useCallback(() => {
    if (isPaused || isDailyLimitReached) return;
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    const areaWidth = gameArea.clientWidth;
    const bubble = pickBubble();
    if (!bubble) return;

    const size = RARITY_SIZE[bubble.rarity] || 40;
    const newBubble: FloatingBubble = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      bubble,
      x: Math.random() * (areaWidth - size),
      y: gameArea.clientHeight + size,
      size,
      speed: (RARITY_SPEED[bubble.rarity] || 0.5) * (0.8 + Math.random() * 0.4),
      opacity: 1,
      popped: false,
    };
    setFloating(prev => [...prev, newBubble]);
  }, [isPaused, isDailyLimitReached, pickBubble]);

  // ─── Animation loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || isDailyLimitReached) return;

    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const animate = () => {
      const now = Date.now();
      // Spawn new bubble every 1-3 seconds based on tier
      const tier = profile?.user_tier || 'community';
      const spawnInterval = tier === 'council' ? 600 : tier === 'corporate' ? 900 : tier === 'ally' ? 1200 : 1800;
      if (now - lastSpawnRef.current > spawnInterval + Math.random() * 1000) {
        lastSpawnRef.current = now;
        spawnBubble();
      }

      // Move bubbles upward
      setFloating(prev => prev
        .map(b => ({ ...b, y: b.y - b.speed }))
        .filter(b => b.y > -100 && !b.popped)
      );

      // Check cooldown (15 min continuous play)
      const sessionDuration = (now - sessionStartRef.current) / 60000;
      if (sessionDuration > 15 && totalPopsRef.current > 50) {
        setIsPaused(true);
        setShowBreathReminder(true);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isPaused, isDailyLimitReached, spawnBubble, profile?.user_tier]);

  // ─── Handle pop ──────────────────────────────────────────────────────
  const handlePop = useCallback(async (bubble: FloatingBubble) => {
    if (!user || bubble.popped || isPaused || isDailyLimitReached) return;

    const newDailyPoints = limits.daily_points + bubble.bubble.points_value;
    const newHourlyPops = limits.hourly_pops + 1;

    // Check limits
    if (newDailyPoints > limits.max_daily_points) {
      setIsDailyLimitReached(true);
      return;
    }
    if (newHourlyPops > limits.max_hourly_pops) return;

    // Mark as popped
    setFloating(prev => prev.map(b => b.id === bubble.id ? { ...b, popped: true } : b));
    setScore(prev => prev + bubble.bubble.points_value);
    setSessionPops(prev => prev + 1);
    totalPopsRef.current += 1;
    setLimits(prev => ({ ...prev, daily_points: newDailyPoints, hourly_pops: newHourlyPops }));

    // Pop effect
    const effectId = `effect-${Date.now()}`;
    setPopEffects(prev => [...prev, { id: effectId, x: bubble.x, y: bubble.y, emoji: RARITY_POP_EMOJI[bubble.bubble.rarity] || '✨' }]);
    setTimeout(() => setPopEffects(prev => prev.filter(e => e.id !== effectId)), 800);

    // Record pop
    try {
      await fetch('/api/generated/athena-gamification/user_bubble_pops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, bubble_id: bubble.bubble.bubbles_id, points_awarded: bubble.bubble.points_value }),
      });
      // Update limits
      await fetch('/api/generated/hestia-core/user_bubble_limits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ daily_points: newDailyPoints, hourly_pops: newHourlyPops, last_pop_at: new Date().toISOString() }),
      });
    } catch (err) { console.error('Failed to record pop:', err); }

    // Breath reminder after 50 pops
    if (totalPopsRef.current === 50) {
      setShowBreathReminder(true);
    }
  }, [user, limits, isPaused, isDailyLimitReached]);

  // ─── Handle touch/mouse on bubble ────────────────────────────────────
  const handleBubbleInteraction = useCallback((bubble: FloatingBubble) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePop(bubble);
  }, [handlePop]);

  // ─── Resume after pause ──────────────────────────────────────────────
  const handleResume = () => {
    setIsPaused(false);
    setShowBreathReminder(false);
    sessionStartRef.current = Date.now();
    totalPopsRef.current = 0;
    lastSpawnRef.current = Date.now();
  };

  // ─── Save custom limit ───────────────────────────────────────────────
  const saveCustomLimit = async () => {
    if (!user) return;
    setLimits(prev => ({ ...prev, max_daily_points: customDailyMax }));
    setIsDailyLimitReached(limits.daily_points >= customDailyMax);
    try {
      await fetch('/api/generated/hestia-core/user_bubble_limits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, max_daily_points: customDailyMax }),
      });
    } catch (err) { console.error('Failed to save limit:', err); }
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <Droplets className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40 text-lg mb-2">Sign in to play</p>
          <Link href="/login" className="text-neurospark hover:underline">Enter the Sanctuary</Link>
        </div>
      </main>
    );
  }

  const tier = profile?.user_tier || 'community';
  const tierMax = TIER_LIMITS[tier] || TIER_LIMITS.community;

  return (
    <main className="min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/library/bubbles" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Floating Stars
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Pop the Stars</h1>
            <p className="text-sm text-star-dust/40 mt-1">Tap bubbles to collect them</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-neurospark"><Star className="h-4 w-4" /><span className="font-bold">{score}</span></div>
              <div className="text-xs text-star-dust/40">{limits.daily_points} / {limits.max_daily_points} today</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <div
              ref={gameAreaRef}
              className="relative w-full rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                height: '70vh',
                minHeight: '500px',
                background: 'radial-gradient(ellipse at center, rgba(108,92,231,0.15) 0%, rgba(12,15,29,0.95) 70%)',
                border: '1px solid rgba(255,255,255,0.08)',
                touchAction: 'none',
              }}
              onClick={() => {}} // Prevent background click issues
            >
              {/* Floating Bubbles */}
              {floating.filter(b => !b.popped).map(bubble => (
                <button
                  key={bubble.id}
                  className="absolute rounded-full transition-transform active:scale-90 hover:scale-110 cursor-pointer focus:outline-none"
                  style={{
                    left: bubble.x,
                    top: bubble.y,
                    width: bubble.size,
                    height: bubble.size,
                    background: `radial-gradient(circle at 30% 30%, ${bubble.bubble.glow_color || bubble.bubble.color}, ${bubble.bubble.color})`,
                    boxShadow: bubble.bubble.glow_color ? `0 0 ${bubble.size / 2}px ${bubble.bubble.glow_color}` : `0 0 ${bubble.size / 3}px ${bubble.bubble.color}40`,
                    opacity: bubble.opacity,
                    transition: 'transform 0.15s ease-out',
                  }}
                  onClick={handleBubbleInteraction(bubble)}
                  onTouchStart={handleBubbleInteraction(bubble)}
                  aria-label={`Pop ${bubble.bubble.name}`}
                />
              ))}

              {/* Pop Effects */}
              {popEffects.map(effect => (
                <span
                  key={effect.id}
                  className="absolute pointer-events-none text-xl animate-ping"
                  style={{ left: effect.x, top: effect.y, animation: 'ping 0.8s ease-out forwards' }}
                >
                  {effect.emoji}
                </span>
              ))}

              {/* Pause Overlay */}
              {isPaused && !showBreathReminder && (
                <div className="absolute inset-0 bg-deep-space/70 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <Pause className="h-12 w-12 text-star-dust/40 mx-auto mb-4" />
                    <p className="text-star-dust/60 text-lg mb-4">Paused</p>
                    <Button variant="primary" onClick={handleResume}><Play className="h-4 w-4 mr-2" />Resume</Button>
                  </div>
                </div>
              )}

              {/* Breath Reminder */}
              {showBreathReminder && (
                <div className="absolute inset-0 bg-deep-space/80 backdrop-blur-md flex items-center justify-center z-20">
                  <div className="text-center max-w-sm">
                    <Heart className="h-10 w-10 text-rose-400 mx-auto mb-3" />
                    <p className="text-star-dust text-lg font-semibold mb-2">Take a breath</p>
                    <p className="text-star-dust/50 text-sm mb-6">
                      You've been playing for a while. The stars will still be here when you return.
                    </p>
                    <Button variant="primary" onClick={handleResume}><Play className="h-4 w-4 mr-2" />Continue Playing</Button>
                    <div className="mt-3">
                      <Link href="/library/bubbles" className="text-xs text-star-dust/40 hover:text-star-dust">Return to Gallery</Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Limit Reached */}
              {isDailyLimitReached && (
                <div className="absolute inset-0 bg-deep-space/80 backdrop-blur-md flex items-center justify-center z-20">
                  <div className="text-center max-w-sm">
                    <Sparkles className="h-10 w-10 text-neurospark mx-auto mb-3" />
                    <p className="text-star-dust text-lg font-semibold mb-2">You've reached your daily limit</p>
                    <p className="text-star-dust/50 text-sm mb-4">
                      You've collected {limits.daily_points} points today. Come back tomorrow for more stars!
                    </p>
                    <div className="mb-6 px-4">
                      <p className="text-xs text-star-dust/40 mb-2">Adjust your daily limit (max {tierMax.daily})</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={tierMax.daily}
                          value={customDailyMax}
                          onChange={(e) => setCustomDailyMax(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-xs text-star-dust/60 w-16 text-right">{customDailyMax}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={saveCustomLimit} className="mt-2">Save</Button>
                    </div>
                    <Link href="/library/bubbles" className="text-xs text-star-dust/40 hover:text-star-dust">Return to Gallery</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — Stats + Collections */}
          <div className="space-y-4">
            {/* Stats Card */}
            <Card data={{ id: 'bubble-stats', type: 'stat', title: 'Session', value: sessionPops }} variant="glass" radius="lg" shadow="sm" className="p-4">
              <h3 className="text-sm font-semibold text-star-dust mb-3">Your Session</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-star-dust/50">Pops</span><span className="text-star-dust">{sessionPops}</span></div>
                <div className="flex justify-between"><span className="text-star-dust/50">Points</span><span className="text-neurospark font-medium">{score}</span></div>
                <div className="flex justify-between"><span className="text-star-dust/50">Daily</span><span className="text-star-dust">{limits.daily_points}/{limits.max_daily_points}</span></div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-star-dust/30 mb-1">Daily progress</p>
                <Progress value={limits.daily_points} max={limits.max_daily_points} variant="default" size="sm" />
              </div>
              <div className="mt-3">
                <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[tier] || '')}>{tier} tier</Badge>
              </div>
            </Card>

            {/* Collections */}
            {collections.length > 0 && (
              <Card data={{ id: 'bubble-collections', type: 'value', title: 'Collections', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-4">
                <h3 className="text-sm font-semibold text-star-dust mb-3">Collections</h3>
                <div className="space-y-2">
                  {collections.map(c => (
                    <div key={c.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-star-dust/50">{c.name}</span>
                        <span className="text-star-dust/30">{c.collected}/{c.total}</span>
                      </div>
                      <Progress value={c.collected} max={c.total} variant="default" size="sm" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tier Info */}
            <Card data={{ id: 'bubble-tier', type: 'value', title: 'Your Tier', value: tier }} variant="glass" radius="lg" shadow="sm" className="p-4">
              <h3 className="text-sm font-semibold text-star-dust mb-2">Your Tier: <span className="capitalize">{tier}</span></h3>
              <p className="text-xs text-star-dust/40 mb-3">
                {tier === 'community' && 'Access to Common and Rare bubbles. Upgrade to unlock Epic, Legendary, and Mythic stars.'}
                {tier === 'ally' && 'Access to Common, Rare, and Epic bubbles. Upgrade for Legendary and Mythic.'}
                {tier === 'corporate' && 'Access to all rarities except Mythic. Upgrade for the rarest stars.'}
                {tier === 'council' && 'Full access to all rarities including Mythic. The complete collection.'}
              </p>
              {tier !== 'council' && (
                <Link href="/bazaar/creations">
                  <Button variant="ghost" size="sm" className="w-full text-xs">Upgrade Tier</Button>
                </Link>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}