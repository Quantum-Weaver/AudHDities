// @/components/immersive/QuantumBackground.tsx
// ⚱ RETIRED 2026-07-29 (THE-FRONTEND-REIMAGINING, finishing session) — the
// five-layer environment ENGINE of the image era (base · foreground ·
// parallax · hotspots · breathing). Its layers were the design brief for the
// token successor: wash/breathing live in EnvironmentLayer; hotspots re-
// ground on scene elements (ZoomTarget is already element-based); the
// depictive scene layer succeeds it over the database's rooms (the scene
// renderer). KP's ✍ strokes 2026-07-19 + 2026-07-29. Rendered nowhere; kept
// whole per the piecing license — nothing deleted.
// FIXED - scale array now mutable

"use client";

import { motion } from "framer-motion";
import { AssetMapper, type EnvironmentKey } from "@/lib/constants/systems/assets/mapper";
import {
  SCALING_CONFIG,
  backgroundScales,
  foregroundScales,
} from "@/lib/constants/components/immersive/quantum_background";
import { cn } from "@/lib/utils";

export interface QuantumBackgroundProps {
  environment: EnvironmentKey;
  variant?: number;
  showForeground?: boolean;
  animated?: boolean;
  parallaxIntensity?: number;
  interactiveSpots?: Array<{
    x: number;
    y: number;
    component: React.ReactNode;
    trigger?: "hover" | "click";
  }>;
  className?: string;
}

export function QuantumBackground({
  environment,
  variant = 2,
  showForeground = false,
  animated = true,
  parallaxIntensity = 0.112358,
  interactiveSpots = [],
  className = "",
}: QuantumBackgroundProps) {
  const assets = AssetMapper.utils.getEnvironment(environment, variant);

  return (
    <div
      className={cn(
        "quantum-environment-stack relative w-full h-full overflow-hidden",
        className
      )}
    >
      {/* LAYER 1: Base Environment */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.background})`,
          backgroundSize: "cover",
        }}
        animate={
          animated
            ? {
                scale: [...backgroundScales] as number[], // Spread to create mutable array
                transition: {
                  duration: SCALING_CONFIG.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {}
        }
      />

      {/* LAYER 2: Extracted Foreground Elements */}
      {showForeground && assets.foreground && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${assets.foreground})`,
            backgroundSize: "cover",
          }}
          animate={
            animated
              ? {
                  scale: [...foregroundScales] as number[], // Spread to create mutable array
                  transition: {
                    duration: SCALING_CONFIG.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  },
                }
              : {}
          }
        />
      )}

      {/* LAYER 3: Interactive Hotspots */}
      {interactiveSpots.map((spot, index) => (
        <motion.div
          key={index}
          className="absolute interactive-hotspot"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {spot.component}
        </motion.div>
      ))}
    </div>
  );
}