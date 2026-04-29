// @/components/immersive/PanoramaViewer.tsx
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