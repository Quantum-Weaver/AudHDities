// @/components/bifrost/Page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║        Page wrapper - provides immersive background for content           ║
// ║        Does NOT include header/beam/statusbar (those are in AppShell)     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { cn } from "@/lib/utils";
import PanoramaViewer from "@/components/seidr/immersive/PanoramaViewer";
import { useContinuityBeam } from "@/contexts/ContinuityBeamContext";
import type { EnvironmentKey } from "@/lib/constants/systems";

export interface PageProps {
  /** Environment key (home, council, library, music, etc.) */
  environment?: EnvironmentKey;
  /** Variant of the environment (1-4) */
  variant?: number;
  /** Show foreground elements */
  showForeground?: boolean;
  /** Show cotinuity beam*/
  showContinuityBeam?: boolean;
  /** Show status bar*/
  showStatusBar?: boolean;  
  /** Enable animations */
  animated?: boolean;
  /** Additional classes */
  className?: string;
  /** Page content */
  children: React.ReactNode;
}

export function Page({
  environment: defaultEnvironment = "home",
  variant: defaultVariant = 1,
  showForeground = true,
  animated = true,
  className,
  children,
}: PageProps) {
  const { sessionState, environmentVariant } = useContinuityBeam();
  
  const environment = (sessionState.environment as EnvironmentKey) || defaultEnvironment;
  const variant = environmentVariant || defaultVariant;

  return (
    <div className={cn("relative", className)}>
      <PanoramaViewer
        environment={environment}
        variant={variant}
        showForeground={showForeground}
        animated={animated}
        className="fixed inset-0 -z-10"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}