// @/components/seidr/immersive/StatusBar.tsx
"use client";

import { useUser, tierLight } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useRealm } from "@/hooks/useRealm";
import { useEnergyEntriesList } from "@/lib/generated/hooks/hestia-core/energy_entries";
import { useHeraldsList } from "@/lib/generated/hooks/hestia-core/heralds";
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

export interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { user } = useAuth();
  const { profile, sovereignTier, isAuthenticated } = useUser();
  const sovereigntyScore = tierLight(sovereignTier);
  const { config } = useStatusBar();
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
    forge: 'The Forge',
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

  // ── HERALDS — WIRED FOR REAL (Run 08, the heralds mend, 2026-07-20) ───────
  const heraldParams = useMemo(
    () => ({
      limit: 1,
      ...(profile?.id
        ? { filters: { recipient: profile.id, is_read: 'false' } }
        : {}),
    }),
    [profile?.id],
  );
  const { total: heraldTotal } = useHeraldsList(heraldParams);
  const notifications = profile?.id ? heraldTotal : 0;

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
