// src/components/asgard/domains/athena/bubbles/BubblePopGame.tsx
// DETIERED 2026-07-31 at KP's ⚛ word ("make certain it no longer has tier
// settings at all"): the game had two generations of tier vocabulary — the
// old subscription ladder (community/ally/corporate/council) in the limit
// slider and the sovereign_tier enum here — and their collision crashed the
// page. Now the charter's own flat numbers rule for everyone (L1-07: daily
// cap 500 · cooldown after 15 min · "Take a breath" after 50 pops), every
// rarity drifts for every vessel, and the only ceiling a vessel meets is
// the charter's or their own.
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Droplets, Star, Heart, Pause, Play, Sparkles } from 'lucide-react';
import { BubbleLimitSlider } from './BubbleLimitSlider';
import { pageTheDoor } from './pageTheDoor';
import { paintStar, readStarColours } from './starPaint';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

// The evolved bubbles table derives what it dropped: points and colors now
// come from rarity, and collections are ids resolved against collection_sets.
interface BubbleDef {
  id: string;
  name: string;
  rarity: string;
  collection_id: string | null;
  // The colour columns land with docs/sql/025 (KP's hand). Nullable on
  // purpose — until that file is run they are simply absent, and a star with
  // no palette wears its rarity exactly as it always has.
  palette?: string[] | null;
  ring?: string | null;
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
  /** When it arrived. Under the reduced-motion guard a star waits its while
      here rather than travelling; see the loop below. */
  bornAt: number;
}

interface UserLimits {
  daily_points: number;
  hourly_pops: number;
  max_daily_points: number;
  max_hourly_pops: number;
}

// FOUND SO FAR — the names of what you found, grouped by collection. This
// replaced {collected}/{total} and a bar per collection, retired 2026-08-25
// at the ruling recorded as "the 3/6 sidebar goes": the interface was
// performing the subtraction for the vessel, every frame, unasked. Shape
// without slots.
interface CollectionFinds {
  name: string;
  found: string[];
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

// The charter's gentle defaults (L1-07 · docs/sql/013). The vessel's own
// caps live in vessel_config now — self-chosen boundaries that follow the
// vessel to every device; these numbers rule only until the row answers.
const DEFAULT_DAILY_MAX = 500;
const DEFAULT_HOURLY_MAX = 100;
const SPAWN_INTERVAL_MS = 1200;

// The two stopping moments, hoisted 2026-08-25 so the panel that SAYS them
// and the loop that ENFORCES them read the same numbers and cannot drift.
const BREATH_AFTER_MINUTES = 15;
const BREATH_AFTER_POPS = 50;

// How long a star stays when it is not allowed to travel (the reduced-motion
// guard). Same spawn rhythm, same rarities, same caps — no motion across the
// screen.
const STILL_LIFETIME_MS = 6000;

// The caps, spoken in words. Only the numbers the room actually builds get a
// word; anything the vessel's own row says instead is printed as itself,
// because a boundary they chose must be legible as the number they chose.
const NUMBER_WORDS: Record<number, string> = {
  0: 'nothing',
  15: 'a quarter of an hour',
  50: 'fifty',
  100: 'a hundred',
  500: 'five hundred',
};
function inWords(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

const RARITY_POINTS: Record<string, number> = {
  common: 1, rare: 3, epic: 5, legendary: 10, mythic: 25,
};

// The app's five cosmic tokens, adopted 2026-08-25: common void.light · rare
// neurospark · epic quantum.light · legendary hearth.gold · mythic
// entity.curator. The mythic move is the one law of the four — #f43f5e is
// rose-500, and the app moved mythic off exactly that colour on 2026-08-10
// ("Mythic wears the curator's magenta, not the old rose: no red anywhere",
// resonance-bubbles/src/lib/bubbles/dress.ts:39-40).
const RARITY_FILL: Record<string, { color: string; glow: string }> = {
  common: { color: '#B2BEC3', glow: '#B2BEC355' },
  rare: { color: '#22D3EE', glow: '#22D3EE55' },
  epic: { color: '#7D6CEA', glow: '#7D6CEA55' },
  legendary: { color: '#FDCB6E', glow: '#FDCB6E55' },
  mythic: { color: '#E84393', glow: '#E8439355' },
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

const RARITY_POP_EMOJI: Record<string, string> = {
  common: '✨', rare: '💫', epic: '⚡', legendary: '🌌', mythic: '🪐',
};

// ═══════════════════════════════════════════════════════════════════════════
// THE GUARD
// ═══════════════════════════════════════════════════════════════════════════
// The global CSS guard in globals.css:41-48 kills CSS animation and
// transition DURATIONS. It cannot reach a requestAnimationFrame loop moving
// thirty objects, so this room asks matchMedia directly — the same shape the
// newest room in the realm already uses (DailiesHall.tsx:46-60).
//
// THE ROOM IS NEVER TURNED OFF UNDER THE GUARD. That is refused by name:
// access is not subtraction. The stars still arrive, still carry every
// rarity, still can be popped, and every cap still holds. They simply stop
// travelling.
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function BubblePopGame() {
  const { user, isLoading: authLoading } = useUser();
  const reduced = useReducedMotion();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const totalPopsRef = useRef<number>(0);
  const sessionStartRef = useRef<number>(Date.now());

  const [bubbles, setBubbles] = useState<BubbleDef[]>([]);
  const [floating, setFloating] = useState<FloatingBubble[]>([]);
  const [limits, setLimits] = useState<UserLimits>({ daily_points: 0, hourly_pops: 0, max_daily_points: DEFAULT_DAILY_MAX, max_hourly_pops: DEFAULT_HOURLY_MAX });
  const [score, setScore] = useState(0);
  const [sessionPops, setSessionPops] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showBreathReminder, setShowBreathReminder] = useState(false);
  const [isDailyLimitReached, setIsDailyLimitReached] = useState(false);
  const [popEffects, setPopEffects] = useState<Array<{ id: string; x: number; y: number; emoji: string; }>>([]);
  const [collections, setCollections] = useState<CollectionFinds[]>([]);
  const [loading, setLoading] = useState(true);
  const [customDailyMax, setCustomDailyMax] = useState<number>(DEFAULT_DAILY_MAX);

  // ─── Fetch bubble definitions ────────────────────────────────────────
  // PAGED, never silently short. auth.ts:142-149 clamps every generated
  // door's limit to 100 without a word, so the old `limit=200` here was
  // being served 100. Thirty stars stand today; if docs/sql/025 lands the
  // spawn pool is 123 and an unpaged read would quietly lose twenty-three.
  useEffect(() => {
    let alive = true;
    pageTheDoor<BubbleDef>(
      '/api/generated/athena-gamification/bubbles',
      'status=published&sort=display_order&order=asc',
    )
      .then((res) => { if (alive) setBubbles(res.rows); })
      .catch(console.error)
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  // ─── Limits: usage counted from today's collections (vessel_bubbles IS
  //     the record) + the vessel's own caps from vessel_config (013 — the
  //     boundary follows the vessel, not the device) ────────────────────
  useEffect(() => {
    if (!user || bubbles.length === 0) return;
    Promise.all([
      // PAGED: a vessel past a hundred pops read short, and the day's
      // arithmetic below was computed from that short list.
      pageTheDoor<{ bubble_id: string; collected_at: string }>(
        '/api/generated/hestia-core/vessel_bubbles',
        `user_id=${encodeURIComponent(user.id)}&sort=collected_at&order=desc`,
      ),
      fetch(`/api/generated/hestia-core/vessel_config?created_by=${user.id}&limit=1`).then(r => r.json()),
    ])
      .then(([popsRes, configRes]) => {
        const rows = popsRes.rows;
        const config = configRes.success ? (configRes.data?.data ?? [])[0] : null;
        const maxDaily = typeof config?.bubble_daily_max === 'number' ? config.bubble_daily_max : DEFAULT_DAILY_MAX;
        const maxHourly = typeof config?.bubble_hourly_max === 'number' ? config.bubble_hourly_max : DEFAULT_HOURLY_MAX;
        const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
        const startOfHour = Date.now() - 3600_000;
        const pointsById = new Map(bubbles.map(b => [b.id, RARITY_POINTS[b.rarity] || 1]));
        let daily = 0, hourly = 0;
        for (const row of rows) {
          const t = new Date(row.collected_at).getTime();
          if (t >= startOfDay.getTime()) daily += pointsById.get(row.bubble_id) || 1;
          if (t >= startOfHour) hourly += 1;
        }
        setLimits({ daily_points: daily, hourly_pops: hourly, max_daily_points: maxDaily, max_hourly_pops: maxHourly });
        setCustomDailyMax(maxDaily);
        setIsDailyLimitReached(daily >= maxDaily);
      })
      .catch(() => {});
  }, [user, bubbles]);

  // ─── What you found, by collection (vessel_bubbles ⨝ collection_sets) ─
  //     Both reads PAGE — the door clamps at 100 in silence.
  useEffect(() => {
    if (!user || bubbles.length === 0) return;
    let alive = true;
    Promise.all([
      pageTheDoor<{ bubble_id: string }>(
        '/api/generated/hestia-core/vessel_bubbles',
        `user_id=${encodeURIComponent(user.id)}`,
      ),
      pageTheDoor<{ id: string; name?: string }>('/api/generated/hestia-core/collection_sets'),
    ])
      .then(([popsRes, setsRes]) => {
        if (!alive) return;
        const setNames = new Map(setsRes.rows.map(s => [s.id, s.name || 'Collection']));
        const poppedIds = new Set(popsRes.rows.map((p) => p.bubble_id));
        const found: Record<string, string[]> = {};
        bubbles.forEach(b => {
          if (b.collection_id && poppedIds.has(b.id)) {
            const name = setNames.get(b.collection_id) || 'Collection';
            if (!found[name]) found[name] = [];
            found[name].push(b.name);
          }
        });
        setCollections(Object.entries(found).map(([name, names]) => ({ name, found: names })));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [user, bubbles]);

  // ─── Pick a random bubble by rarity weight (every rarity, every vessel —
  //     the weights alone keep mythic rare; no gate does) ────────────────
  const pickBubble = useCallback(() => {
    if (bubbles.length === 0) return null;
    const totalWeight = bubbles.reduce((sum, b) => sum + (RARITY_WEIGHTS[b.rarity] || 10), 0);
    let roll = Math.random() * totalWeight;
    for (const b of bubbles) {
      roll -= RARITY_WEIGHTS[b.rarity] || 10;
      if (roll <= 0) return b;
    }
    return bubbles[bubbles.length - 1];
  }, [bubbles]);

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
      // Under the guard a star arrives WHERE IT BELONGS rather than climbing
      // in from below; it waits its while and goes. Same rhythm, no travel.
      y: reduced
        ? Math.random() * Math.max(0, gameArea.clientHeight - size)
        : gameArea.clientHeight + size,
      size,
      speed: (RARITY_SPEED[bubble.rarity] || 0.5) * (0.8 + Math.random() * 0.4),
      opacity: 1,
      popped: false,
      bornAt: Date.now(),
    };
    setFloating(prev => [...prev, newBubble]);
  }, [isPaused, isDailyLimitReached, pickBubble, reduced]);

  // ─── Animation loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || isDailyLimitReached) return;

    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const animate = () => {
      const now = Date.now();
      if (now - lastSpawnRef.current > SPAWN_INTERVAL_MS + Math.random() * 1000) {
        lastSpawnRef.current = now;
        spawnBubble();
      }

      // The travel — and its absence. Under the guard the loop keeps its
      // spawn rhythm and loses its motion: a star simply stands where it
      // arrived until its while is up.
      setFloating(prev => prev
        .map(b => (reduced ? b : { ...b, y: b.y - b.speed }))
        .filter(b => !b.popped && (reduced ? now - b.bornAt < STILL_LIFETIME_MS : b.y > -100))
      );

      // Check cooldown (a quarter of an hour of continuous play)
      const sessionDuration = (now - sessionStartRef.current) / 60000;
      if (sessionDuration > BREATH_AFTER_MINUTES && totalPopsRef.current > BREATH_AFTER_POPS) {
        setIsPaused(true);
        setShowBreathReminder(true);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isPaused, isDailyLimitReached, spawnBubble, reduced]);

  // ─── Handle pop ──────────────────────────────────────────────────────
  const handlePop = useCallback(async (bubble: FloatingBubble) => {
    if (!user || bubble.popped || isPaused || isDailyLimitReached) return;

    const popPoints = RARITY_POINTS[bubble.bubble.rarity] || 1;
    const newDailyPoints = limits.daily_points + popPoints;
    const newHourlyPops = limits.hourly_pops + 1;

    // Check limits
    if (newDailyPoints > limits.max_daily_points) {
      setIsDailyLimitReached(true);
      return;
    }
    if (newHourlyPops > limits.max_hourly_pops) return;

    // Mark as popped
    setFloating(prev => prev.map(b => b.id === bubble.id ? { ...b, popped: true } : b));
    setScore(prev => prev + popPoints);
    setSessionPops(prev => prev + 1);
    totalPopsRef.current += 1;
    setLimits(prev => ({ ...prev, daily_points: newDailyPoints, hourly_pops: newHourlyPops }));

    // Pop effect
    const effectId = `effect-${Date.now()}`;
    setPopEffects(prev => [...prev, { id: effectId, x: bubble.x, y: bubble.y, emoji: RARITY_POP_EMOJI[bubble.bubble.rarity] || '✨' }]);
    setTimeout(() => setPopEffects(prev => prev.filter(e => e.id !== effectId)), 800);

    // Record the collection — vessel_bubbles IS the pop record now;
    // limits are derived from it, so there is no counter row to update.
    try {
      await fetch('/api/generated/hestia-core/vessel_bubbles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          bubble_id: bubble.bubble.id,
          collected_at: new Date().toISOString(),
          collection_method: 'popped',
        }),
      });
    } catch (err) { console.error('Failed to record pop:', err); }

    // Breath reminder after fifty pops
    if (totalPopsRef.current === BREATH_AFTER_POPS) {
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

  // ─── Save custom limit (a personal boundary — kept in vessel_config,
  //     following the vessel to every device; the Sanctum edits it too) ──
  const saveCustomLimit = async () => {
    if (!user) return;
    setLimits(prev => ({ ...prev, max_daily_points: customDailyMax }));
    setIsDailyLimitReached(limits.daily_points >= customDailyMax);
    try {
      await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { bubble_daily_max: customDailyMax } }),
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
          {/* The house's arrival law is "coming home — not signing up", and
              this was the realm's only surface still saying the other thing. */}
          <p className="text-star-dust/70 text-lg mb-2">The stars are kept for vessels.</p>
          <Link href="/login" className="text-neurospark hover:underline">Enter the Sanctuary</Link>
        </div>
      </main>
    );
  }

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
            <p className="text-sm text-star-dust/70 mt-1">Tap bubbles to collect them</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-neurospark"><Star className="h-4 w-4" aria-hidden="true" /><span className="font-bold">{score}</span></div>
              {/* EXTENT, NOT REMAINDER. The ratio here performed the
                  subtraction on every frame; the sentence states the ceiling
                  once and stops. E4's own line: "the interface may state
                  extent at the ask, never the remainder." */}
              <div className="text-xs text-star-dust/70">Your own boundary: {inWords(limits.max_daily_points)} a day</div>
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
              {floating.filter(b => !b.popped).map(bubble => {
                const fill = RARITY_FILL[bubble.bubble.rarity] || RARITY_FILL.common;
                // The star's own colours when the row carries them
                // (bubbles.palette / bubbles.ring — docs/sql/025, KP's hand).
                // Null today: a star with no palette wears its rarity.
                const orb = paintStar(fill, readStarColours(bubble.bubble), bubble.size);
                return (
                <button
                  key={bubble.id}
                  className="absolute rounded-full transition-transform active:scale-90 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
                  style={{
                    left: bubble.x,
                    top: bubble.y,
                    width: bubble.size,
                    height: bubble.size,
                    background: orb.background,
                    boxShadow: orb.boxShadow,
                    opacity: bubble.opacity,
                    transition: reduced ? undefined : 'transform 0.15s ease-out',
                  }}
                  onClick={handleBubbleInteraction(bubble)}
                  onTouchStart={handleBubbleInteraction(bubble)}
                  aria-label={`Pop ${bubble.bubble.name}`}
                />
                );
              })}

              {/* Pop Effects — thirty pops a minute was thirty pings.
                  Under the guard the mark becomes a still glyph that goes. */}
              {popEffects.map(effect => (
                <span
                  key={effect.id}
                  aria-hidden="true"
                  className={`absolute pointer-events-none text-xl${reduced ? '' : ' animate-ping'}`}
                  style={{
                    left: effect.x,
                    top: effect.y,
                    animation: reduced ? undefined : 'ping 0.8s ease-out forwards',
                  }}
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
                    {/* entity.curator, not rose: no red anywhere in this
                        realm (resonance-bubbles/CLAUDE.md:34). */}
                    <Heart className="h-10 w-10 text-entity-curator mx-auto mb-3" aria-hidden="true" />
                    <p className="text-star-dust text-lg font-semibold mb-2">Take a breath</p>
                    <p className="text-star-dust/70 text-sm mb-6">
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
                    {/* A limit is imposed; a boundary is chosen. And "come
                        back tomorrow" is the appointment mechanic, refused by
                        name — it does not appear anywhere in this realm. */}
                    <p className="text-star-dust text-lg font-semibold mb-2">Your day&apos;s boundary, met</p>
                    <p className="text-star-dust/70 text-sm mb-4">
                      You set this one yourself. The stars will still be here whenever you come back.
                    </p>
                    <div className="mb-6 px-4">
                      <p className="text-xs text-star-dust/70 mb-2">Adjust your daily limit — the boundary is yours</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={2000}
                          step={50}
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

          {/* Sidebar — the session, what you found, and what this room does
              for you. RETIRED here 2026-08-25, at the ruling recorded as
              "the bubble cap speaks in words, no bar" and "the 3/6 sidebar
              goes": the daily ratio row, the daily-progress label and its
              bar, and the per-collection ratio and its bar. E4's question —
              who performs the subtraction — was being answered by the
              interface, every frame, unasked. */}
          <div className="space-y-4">
            {/* Stats Card */}
            <Card data={{ id: 'bubble-stats', type: 'stat', title: 'Session', value: sessionPops }} variant="glass" radius="lg" shadow="sm" className="p-4">
              <h3 className="text-sm font-semibold text-star-dust mb-3">Your Session</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-star-dust/70">Pops</span><span className="text-star-dust">{sessionPops}</span></div>
                <div className="flex justify-between"><span className="text-star-dust/70">Points</span><span className="text-neurospark font-medium">{score}</span></div>
              </div>
              <p className="mt-3 text-xs text-star-dust/70">Nothing here counts down.</p>
            </Card>

            {/* FOUND SO FAR — the names of what you found, grouped by
                collection. Shape without slots. */}
            {collections.length > 0 && (
              <Card data={{ id: 'bubble-collections', type: 'value', title: 'Found so far', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-4">
                <h3 className="text-sm font-semibold text-star-dust mb-3">Found so far</h3>
                <div className="space-y-2">
                  {collections.map(c => (
                    <p key={c.name} className="text-xs text-star-dust/70 leading-relaxed">
                      <span className="text-star-dust/82">{c.name}</span> — {c.found.join(', ')}.
                    </p>
                  ))}
                </div>
              </Card>
            )}

            {/* THE CAPS, SPOKEN IN WORDS (KP's ruling: the bubble cap speaks
                in words, no bar). Every figure is the room's own built one —
                DEFAULT_DAILY_MAX, DEFAULT_HOURLY_MAX, BREATH_AFTER_MINUTES,
                BREATH_AFTER_POPS — and the first two say the vessel's own row
                where it answers with another number. Nothing invented,
                nothing rounded. Until today the room enforced four rules and
                explained none of them until you hit one. */}
            <Card data={{ id: 'bubble-caps', type: 'value', title: 'What this room does for you', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-4">
              <h3 className="text-sm font-semibold text-star-dust mb-2">What this room does for you</h3>
              <ul className="space-y-2 text-xs text-star-dust/70 leading-relaxed">
                <li>
                  It stops at {inWords(limits.max_daily_points)} points in a day. That number is
                  yours — move it, or set it to nothing at all; a rest day is a boundary too.
                </li>
                <li>
                  It stops at {inWords(limits.max_hourly_pops)} pops in an hour, whatever the
                  day&apos;s number says.
                </li>
                <li>
                  After {inWords(BREATH_AFTER_MINUTES)} of unbroken play it pauses the room itself
                  and asks you to breathe.
                </li>
                <li>
                  And at {inWords(BREATH_AFTER_POPS)} pops it says the same thing once, gently, and
                  lets you carry on.
                </li>
              </ul>
            </Card>

            {/* Every rarity drifts for everyone */}
            <Card data={{ id: 'bubble-stars', type: 'value', title: 'The Stars', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-4">
              <h3 className="text-sm font-semibold text-star-dust mb-2">The Stars</h3>
              <p className="text-xs text-star-dust/70">
                Every rarity drifts here for everyone — the rarest stars are simply rare, never locked. Common to Mythic, all within reach of a patient eye.
              </p>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <BubbleLimitSlider />
        </div>
      </div>
    </main>
  );
}
