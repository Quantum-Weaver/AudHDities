// @/components/immersive/PanoramaViewer.tsx
// ⚱ RETIRED 2026-07-29 (THE-FRONTEND-REIMAGINING, finishing session) — the
// image era's wrapper organ. KP's ✍ strokes: images retired 2026-07-19
// (lose-nothing ×2: Well archive + holodeck second life); "the quantum
// backgroud is likely being retired" 2026-07-29. Successor: EnvironmentLayer
// (token-driven, same spine). Rendered nowhere; kept whole per the piecing
// license — nothing deleted, the system rests in history and the Well.
// Refined - uses your existing constants, no breaking changes

"use client";

import { QuantumBackground } from "./QuantumBackground";
import type { EnvironmentKey } from "@/lib/constants/systems/assets/mapper";
import { cn } from "@/lib/utils";

export interface PanoramaViewerProps {
  environment: EnvironmentKey;
  variant?: number;
  showForeground?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
  parallaxIntensity?: number;
}

export default function PanoramaViewer({
  environment,
  variant = 1,
  showForeground = true,
  animated = true,
  children,
  className = "",
  parallaxIntensity = 0.5,
}: PanoramaViewerProps) {

  return (
    <div className={cn("relative w-full min-h-screen", className)}>
      {/* FULL SCREEN IMMERSIVE BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        
        <QuantumBackground
          environment={environment}
          variant={variant}
          showForeground={showForeground}
          animated={animated}
          parallaxIntensity={parallaxIntensity}
          className="w-full h-full"
        />
      </div>

      {/* CONTENT - Full screen, scrolls over background */}
      <div className="relative w-full min-h-screen z-10">{children}</div>
    </div>
  );
}