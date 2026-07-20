// @/components/seidr/immersive/StatusBar.tsx
"use client";

import { useUser, tierLight } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useRealm } from "@/hooks/useRealm";
import { useEnergyEntriesList } from "@/hooks/generated/hestia-core/energy_entries";
import { HStack } from "@/components/hof/Stack";
import { cn } from "@/lib/utils";
import { Shield, Zap, Bell } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { RealmKey } from "@/lib/constants/systems/trio";
import {
  SOVEREIGN_PULSE,
  VESSEL_WHISPER,
  COSMIC_BREATH,
  VOICE_CADENCE,
} from "@/lib/constants/systems/voice";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG DEFERRED, MARKED (Run 08, Phase 5, Movement I Step 3, 2026-07-20).
// L1-05's Sanctum half — the vessel-configurable surface for this bar: the
// visual modes (Solid / Frosted / Ghost / Adaptive), custom messages the vessel
// writes, sovereignty display mode, rotation speed — needs `vessel_config`
// columns + a Sanctum UI. That is NOT this sitting; it belongs to the Sanctum
// sitting (Movement IV, Hestia). This bar ships its three voice layers with
// gentle house defaults; the toggles that make them the vessel's own arrive
// there. Thread left findable by this note.
// ─────────────────────────────────────────────────────────────────────────────

export interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { user } = useAuth();
  const { profile, sovereignTier, isAuthenticated } = useUser();
  const sovereigntyScore = tierLight(sovereignTier);
  const { config } = useStatusBar();
  // X-OP-0 THE TRIO ADDRESSABLE (Run 08, Phase 5, Movement I Step 2) —
  // the realm this route belongs to, per the driver map (lib/constants/
  // systems/trio.ts). Step 3 uses the realm KEY (not just its config) to
  // address the Sovereign Pulse.
  const { realm, config: realmConfig } = useRealm();

  if (!isAuthenticated || !user) {
    return (
      <div className={cn(
        "w-full bg-deep-space/40 backdrop-blur-sm border-b border-white/5",
        config.height === 'sm' ? 'h-7' : config.height === 'lg' ? 'h-10' : 'h-8',
        className
      )} />
    );
  }

  return (
    <div className={cn(
      "w-full bg-deep-space/40 backdrop-blur-sm border-b border-white/5",
      config.height === 'sm' ? 'h-7' : config.height === 'lg' ? 'h-10' : 'h-8',
      className
    )}>
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* ════════════════════════════════════════════════════════════ */}
        {/* LEFT — Sovereignty Score                                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        <SovereigntyDisplay score={sovereigntyScore} />

        {/* ════════════════════════════════════════════════════════════ */}
        {/* CENTER — Realm name + THE VOICE (L1-05's three cycling layers)  */}
        {/* ════════════════════════════════════════════════════════════ */}
        <CenterVoice realm={realm} environment={realmConfig.environment} />

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RIGHT — Energy + Heralds                                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        <MetricsDisplay />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function SovereigntyDisplay({ score }: { score: number }) {
  const percentage = Math.min(100, (score / 1000) * 100);
  const milestone = score >= 800 ? 'You radiate sovereign light.'
    : score >= 500 ? 'Your light grows stronger.'
    : score >= 200 ? 'The path unfolds before you.'
    : 'Every journey begins with a single step.';

  return (
    <HStack align="center" space="sm" className="group cursor-default shrink-0">
      <Shield className="h-3.5 w-3.5 text-neurospark" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-star-dust/70 font-medium tabular-nums">
          <span className="text-neurospark">{score.toLocaleString()}</span>
          <span className="text-star-dust/30"> / 1000</span>
        </span>
        {/* Mini progress bar */}
        <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neurospark to-quantum-purple transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {/* Tooltip on hover */}
      <span className="hidden group-hover:block absolute top-full mt-1 left-0 bg-deep-space/95 backdrop-blur-lg border border-white/10 rounded-lg px-2 py-1 text-[10px] text-star-dust/60 whitespace-nowrap">
        {milestone}
      </span>
    </HStack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THE VOICE — L1-05's three cycling content layers, driven from voice.ts.
//   · Sovereign Pulse : updates on realm change (navigation) — the realm's own
//                       arrival line, in its Feeling register.
//   · Vessel Whisper  : rotates every 30–60s (a gentle, energy-adjacent phrase).
//   · Cosmic Breath   : surfaces every 5–10 min (an ancient-one quote, verbatim).
// The realm NAME stays as the glanceable anchor (X-OP-1) beside the voice; the
// voice never names the location (L1-05). Transitions are discrete and calm —
// a soft fade at most, and INSTANT under prefers-reduced-motion. The bar stays
// glanceable and never demands attention (no aria-live; the voice is ambient).
// ─────────────────────────────────────────────────────────────────────────────

function CenterVoice({ realm, environment }: { realm: RealmKey; environment?: string | null }) {
  const line = useVoiceRotation(realm);

  return (
    <div className="min-w-0 flex-1 flex items-center justify-center gap-2 overflow-hidden">
      <div className="shrink-0">
        <RealmDisplay environment={environment} />
      </div>
      <span className="hidden sm:inline text-star-dust/20 shrink-0" aria-hidden>·</span>
      <FadingText
        text={line}
        className="hidden sm:block truncate text-xs font-light text-star-dust/55 max-w-[22rem]"
      />
    </div>
  );
}

/**
 * Discrete, calm text swap. A soft opacity fade by default; an instant swap
 * under prefers-reduced-motion (both belt — the JS branch — and suspenders —
 * the `motion-reduce:transition-none` class).
 */
function FadingText({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (text === shown) return;
    if (prefersReducedMotion()) {
      setShown(text); // instant swap, no animated transition
      return;
    }
    setVisible(false); // fade out, then swap + fade in
    const t = setTimeout(() => {
      setShown(text);
      setVisible(true);
    }, 220);
    return () => clearTimeout(t);
  }, [text, shown]);

  return (
    <span
      className={cn(
        "transition-opacity duration-500 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {shown}
    </span>
  );
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const randBetween = (min: number, max: number) => min + Math.random() * (max - min);
const pickOne = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** The three-layer rotation. Returns the current center-voice line. */
function useVoiceRotation(realm: RealmKey): string {
  const pulse = SOVEREIGN_PULSE[realm];
  const [line, setLine] = useState<string>(pulse);

  // Sovereign Pulse — updates on realm change (navigation).
  useEffect(() => {
    setLine(pulse);
  }, [pulse]);

  // Vessel Whisper — a fresh random delay in the 30–60s window each cycle.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setLine(pickOne(VESSEL_WHISPER));
        schedule();
      }, randBetween(VOICE_CADENCE.vesselWhisperMinMs, VOICE_CADENCE.vesselWhisperMaxMs));
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  // Cosmic Breath — a fresh random delay in the 5–10 min window each cycle.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setLine(pickOne(COSMIC_BREATH).text);
        schedule();
      }, randBetween(VOICE_CADENCE.cosmicBreathMinMs, VOICE_CADENCE.cosmicBreathMaxMs));
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return line;
}

function RealmDisplay({ environment }: { environment?: string | null }) {
  if (!environment) {
    return <div className="text-xs text-star-dust/40 font-medium tracking-wide uppercase">The Sanctuary</div>;
  }

  const [realm, variant] = environment.split(':');
  const realmNames: Record<string, string> = {
    home: 'The Hearth', council: 'The Council', library: 'The Library',
    community: 'The Bazaar', music: 'The Stage', origin: 'The Origin',
    support: 'The Healing Flame', observatory: 'The Observatory',
    architecture: 'The Nexus', invitation: 'The Chamber', lounge: 'The Lounge',
    forge: 'The Forge', // hephaestus, added with the trio driver map (Run 08 Phase 5 Movement I Step 2)
  };
  const variantLabels: Record<string, string> = {
    '1': 'Warm', '2': 'Mystical', '3': 'Sacred', '4': 'Ethereal',
  };

  return (
    <div className="text-xs text-star-dust/40 font-medium tracking-wide uppercase">
      {realmNames[realm] || realm}
      {variant && variantLabels[variant] && (
        <span className="text-star-dust/20"> · {variantLabels[variant]}</span>
      )}
    </div>
  );
}

function MetricsDisplay() {
  const { profile } = useUser();

  // ── ENERGY — WIRED FOR REAL (Run 08, Phase 5, Movement I Step 3) ──────────
  // `energy_entries` is a real GAIA-generated hook (hestia-core). `created_by`
  // scopes rows to the vessel (RLS), `energy_level` is the value, `logged_at`
  // orders them. We take the vessel's latest entry and show it only when it was
  // logged TODAY (the bar tells how the vessel IS today; a stale reading is
  // not today's). The params object is memoized so the persistent chrome does
  // not re-fetch on every render. With DATA-SEEDS not yet seeded, this honestly
  // reads empty → '—' (no vessel has logged energy yet), never a faked number.
  const energyParams = useMemo(
    () => ({
      limit: 1,
      sort: 'logged_at',
      order: 'desc' as const,
      ...(profile?.id ? { filters: { created_by: profile.id } } : {}),
    }),
    [profile?.id],
  );
  const { data: energyRows } = useEnergyEntriesList(energyParams);
  const energyToday = useMemo<number | null>(() => {
    const latest = energyRows?.[0];
    if (!latest || latest.energy_level == null) return null;
    const loggedAt = latest.logged_at ?? latest.created_at;
    if (loggedAt && !isToday(loggedAt)) return null;
    return latest.energy_level;
  }, [energyRows]);

  // ── HERALDS — HONESTLY STILL STUBBED (Run 08, Phase 5, Movement I Step 3) ──
  // The `heralds` hook exists (hestia-core) and carries `is_read`/`is_dismissed`,
  // BUT the settled `heralds` row exposes no recipient column — only `created_by`
  // (the herald's author). "Unread heralds for THIS vessel" is therefore not a
  // single-table filter (created_by would count heralds the vessel AUTHORED, not
  // received); a correct count needs recipient-scoping (RLS or a reference
  // resolution) that isn't verifiable from the generated surface. So this stays
  // a real 0 rather than a faked count — wire it once the recipient path is
  // settled (a Movement IV / schema-adjacent follow-up). The original stub
  // assumed a `notifications.user_id`; the settled schema has no such column.
  const [notifications] = useState(0);

  return (
    <HStack align="center" space="md" className="shrink-0">
      {/* Energy */}
      <HStack align="center" space="xs">
        <Zap className={cn(
          "h-3 w-3",
          energyToday !== null
            ? energyToday >= 7 ? 'text-amber-400'
            : energyToday >= 4 ? 'text-hearth-gold/70'
            : 'text-star-dust/30'
            : 'text-star-dust/20'
        )} />
        <span className={cn(
          "text-xs tabular-nums",
          energyToday !== null ? 'text-star-dust/60' : 'text-star-dust/30'
        )}>
          {energyToday !== null ? energyToday : '—'}
        </span>
      </HStack>

      {/* Heralds */}
      <HStack align="center" space="xs">
        <Bell className={cn(
          "h-3 w-3",
          notifications > 0 ? 'text-hearth-gold' : 'text-star-dust/30'
        )} />
        <span className={cn(
          "text-xs tabular-nums",
          notifications > 0 ? 'text-hearth-gold font-medium' : 'text-star-dust/30'
        )}>
          {notifications}
        </span>
      </HStack>
    </HStack>
  );
}

/** True when an ISO timestamp falls on the local current date. */
function isToday(iso: string): boolean {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
