// @/components/seidr/immersive/EnvironmentLayer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE FIFTH INSTRUMENT — the token-driven environment layer              ║
// ║   (the quartet grown by one: Header · StatusBar · ContinuityBeam ·       ║
// ║    navigation · this — all dressing from the same environment-key spine) ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getEnvironmentAffect } from "@/lib/constants/systems/environments/affects";
import { AssetMapper } from "@/lib/constants/systems/assets/mapper";
import type { EnvironmentKey } from "@/lib/constants/systems/assets/mapper";
import { cn } from "@/lib/utils";

export interface EnvironmentLayerProps {
  /** Environment key (home, council, library, music, …). */
  environment: EnvironmentKey;
  /** Mood (1–4): which of the environment's four panoramas dresses the layer. */
  variant?: number;
  /** Enable the breathing (system reduced-motion preference always wins). */
  animated?: boolean;
  /** Strength of the wash over the panorama (0–1). */
  washOpacity?: number;
  /** Additional classes. */
  className?: string;
}

/** The panorama path for an environment and mood, from the mapper's own paths. */
function panoramaFor(environment: EnvironmentKey, variant: number): string | undefined {
  const dress = (AssetMapper.environments as Record<string, { background?: string }>)[environment]?.background;
  if (!dress) return undefined;
  const mood = Math.min(4, Math.max(1, Math.round(variant) || 1));
  return dress.replace(/-1(\.[a-z]+)$/, `-${mood}$1`);
}

export default function EnvironmentLayer({
  environment,
  variant = 1,
  animated = true,
  washOpacity = 0.3,
  className,
}: EnvironmentLayerProps) {
  const affect = getEnvironmentAffect(environment);
  const panorama = panoramaFor(environment, variant);
  const prefersReducedMotion = useReducedMotion();
  const breathes = animated && !prefersReducedMotion;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "environment-affect-stack relative w-full h-full overflow-hidden",
        className
      )}
    >
      {panorama && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${panorama})` }}
        />
      )}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: affect.wash,
          opacity: washOpacity,
        }}
        animate={
          breathes
            ? {
                scale: [...affect.breathing.scales] as number[],
              }
            : undefined
        }
        transition={
          breathes
            ? {
                duration: affect.breathing.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />
    </div>
  );
}
