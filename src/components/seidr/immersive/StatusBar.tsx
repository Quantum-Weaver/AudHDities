// @/components/seidr/immersive/StatusBar.tsx
"use client";

import { useUser, tierLight } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useRealm } from "@/hooks/useRealm";
import { HStack } from "@/components/hof/Stack";
import { cn } from "@/lib/utils";
import { Shield, Zap, Bell } from "lucide-react";
import { useEffect, useState } from "react";

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
  // systems/trio.ts), replacing the environment this bar used to hardcode.
  const { config: realmConfig } = useRealm();

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
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* ════════════════════════════════════════════════════════════ */}
        {/* LEFT — Sovereignty Score                                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        <SovereigntyDisplay score={sovereigntyScore} />

        {/* ════════════════════════════════════════════════════════════ */}
        {/* CENTER — Realm Name                                              */}
        {/* ════════════════════════════════════════════════════════════ */}
        <RealmDisplay environment={realmConfig.environment} />

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RIGHT — Energy + Notifications                                  */}
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
    <HStack align="center" space="sm" className="group cursor-default">
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
  const [energyToday, setEnergyToday] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(0);

  // Fetch today's energy and notification count
  useEffect(() => {
    // Energy — would fetch from energy_logs where user_id = profile.id AND created_at::date = today
    // Notifications — would fetch COUNT from notifications where user_id = profile.id AND is_read = false
    // Still stubbed: these need real hook wiring against energy_logs/
    // notifications, which is the L1-05 sitting's job (Sovereign Pulse /
    // Vessel Whisper / Cosmic Breath as vessel-configurable layers), not this
    // one (Run 08, Phase 5, Movement I Step 2, 2026-07-20) — honest, not
    // silently fixed. The sovereignty score just above is NOT stubbed: it
    // already reads a real value via useUser()/tierLight(sovereignTier).
    setEnergyToday(null);
    setNotifications(0);
  }, [profile?.id]);

  return (
    <HStack align="center" space="md">
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

      {/* Notifications */}
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