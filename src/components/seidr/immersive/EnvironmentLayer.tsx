// @/components/seidr/immersive/EnvironmentLayer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE FIFTH INSTRUMENT — the token-driven environment layer              ║
// ║   (the quartet grown by one: Header · StatusBar · ContinuityBeam ·       ║
// ║    navigation · this — all dressing from the same environment-key spine) ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: THE-FRONTEND-REIMAGINING, finishing session 2026-07-29 (study
// record: fable lanes/study/e2-the-ux-study-bus.md, round 8a work-order step
// ②). KP's ✍ strokes honored: the background images are RETIRED (2026-07-19,
// lose-nothing ×2) and "the quantum backgroud is likely being retired"
// (2026-07-29) — this layer succeeds PanoramaViewer/QuantumBackground under
// every page. Affect from constants, not from pictures: the wash is the
// beam's own cosmic gradient, worn at ambient strength (the realm is
// weather, not wallpaper); the breathing keeps the image era's measured
// 47.7s tempo, and stills to nothing under reduced motion (the sensory law:
// motion is content, so it needs consent).

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getEnvironmentAffect } from "@/lib/constants/systems/environments/affects";
import type { EnvironmentKey } from "@/lib/constants/systems/assets/mapper";
import { cn } from "@/lib/utils";

export interface EnvironmentLayerProps {
  /** Environment key (home, council, library, music, …). */
  environment: EnvironmentKey;
  /** Variant (1–4) — accepted for API continuity with the image era; the
   *  token era currently wears one dress per environment. Kept so callers
   *  and the resolver's variant arithmetic need no change. */
  variant?: number;
  /** Enable the breathing (system reduced-motion preference always wins). */
  animated?: boolean;
  /** Ambient strength of the wash over the app's dark base (0–1). The old
   *  panoramas were photographs behind content; the token wash is calmer on
   *  purpose — attention returned, never harvested. */
  washOpacity?: number;
  /** Additional classes. */
  className?: string;
}

export default function EnvironmentLayer({
  environment,
  variant: _variant = 1,
  animated = true,
  washOpacity = 0.3,
  className,
}: EnvironmentLayerProps) {
  const affect = getEnvironmentAffect(environment);
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
      {/* THE WASH — the realm's cosmic gradient at ambient strength,
          breathing at the image era's own tempo (still under reduced motion) */}
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
