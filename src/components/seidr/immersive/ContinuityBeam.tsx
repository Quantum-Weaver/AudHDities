// @/components/immersive/ContinuityBeam.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useContinuityBeam } from "@/contexts/ContinuityBeamContext";
import { getBeamAnimation } from "@/lib/constants/components/immersive/continuity_beam";
import { GLOW_EFFECTS } from "@/lib/constants/cosmic/effects";
import { cn } from "@/lib/utils";

export interface ContinuityBeamProps {
  intensityOverride?: number;
  className?: string;
  disabled?: boolean;
}

const TRAVEL_WASH_SECONDS = 0.4;

export default function ContinuityBeam({
  intensityOverride,
  className = "",
  disabled = false,
}: ContinuityBeamProps) {
  const { beamConfig, activationState } = useContinuityBeam();
  const prefersReducedMotion = useReducedMotion();

  if (disabled || !activationState.active) return null;

  const beamAnimation = getBeamAnimation(beamConfig);

  const getIntensityValue = (intensity: string): number => {
    if (intensityOverride !== undefined) return intensityOverride;
    switch (beamConfig.intensity) {
      case "quantum": return 0.85;
      case "high": return 0.66;
      case "medium": return 0.47;
      case "low": return 0.33;
      default: return 0.47;
    }
  };

  const finalIntensity = getIntensityValue(beamConfig.intensity);
  const adjustedDuration = (beamConfig.duration || 3) / (activationState.speedMultiplier || 1);
  const glowEffect = beamConfig.glow || GLOW_EFFECTS.quantum;
  const targetOpacity = finalIntensity * activationState.glowMultiplier;

  return (
    <div
      className={cn(
        "w-full h-[12px] overflow-hidden pointer-events-none relative",
        className
      )}
      data-beam-variant={beamConfig.variant}
      data-beam-intensity={beamConfig.intensity}
      data-beam-active={activationState.active}
      data-beam-speed-multiplier={activationState.speedMultiplier}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={beamConfig.gradient}
          className="absolute inset-0 h-full w-full"
          style={{
            background: beamConfig.gradient,
            boxShadow: glowEffect,
          }}
          initial={{ opacity: prefersReducedMotion ? targetOpacity : 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: targetOpacity }
              : { opacity: targetOpacity, ...beamAnimation.animate }
          }
          exit={{ opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: TRAVEL_WASH_SECONDS, ease: "easeOut" },
                  x: { duration: adjustedDuration, repeat: Infinity, ease: beamAnimation.transition.ease },
                  y: { duration: adjustedDuration, repeat: Infinity, ease: beamAnimation.transition.ease },
                }
          }
        />
      </AnimatePresence>
    </div>
  );
}