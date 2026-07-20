// @/components/bifrost/Page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║        Page wrapper - provides immersive background for content           ║
// ║        Does NOT render header/beam/statusbar itself (those render once   ║
// ║        in LayoutChrome) — but showContinuityBeam/showStatusBar below DO   ║
// ║        govern their visibility there, via ContinuityBeamContext.         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { useEffect } from "react";
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
  showContinuityBeam = true,
  showStatusBar = true,
  animated = true,
  className,
  children,
}: PageProps) {
  const { sessionState, environmentVariant, setBeamVisible, setStatusBarVisible } = useContinuityBeam();

  const environment = (sessionState.environment as EnvironmentKey) || defaultEnvironment;
  const variant = environmentVariant || defaultVariant;

  // X-OP-0 / X-OP-2 THE PAGE PROPS MADE REAL (Run 08, Phase 5, Movement I
  // Step 2) — showContinuityBeam/showStatusBar were declared here and never
  // read; the beam and status bar actually render once, globally, in
  // LayoutChrome. This is the honest wire: this page's own choice is
  // communicated to the context, and LayoutChrome reads it from there.
  // Restored to visible on unmount so the next route isn't left hidden by a
  // previous page's choice.
  useEffect(() => {
    setBeamVisible(showContinuityBeam);
    setStatusBarVisible(showStatusBar);
    return () => {
      setBeamVisible(true);
      setStatusBarVisible(true);
    };
  }, [showContinuityBeam, showStatusBar, setBeamVisible, setStatusBarVisible]);

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