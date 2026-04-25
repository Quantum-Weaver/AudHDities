// @/components/bifrost/Page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║        Page wrapper - provides immersive background for content           ║
// ║        Does NOT include header/beam/statusbar (those are in AppShell)     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { cn } from "@/lib/utils";
import PanoramaViewer from "@/components/immersive/PanoramaViewer";
import type { EnvironmentKey } from "@/lib/constants/systems";

export interface PageProps {
  /** Environment key (home, council, library, music, etc.) */
  environment?: EnvironmentKey;
  /** Variant of the environment (1-4) */
  variant?: number;
  /** Show foreground elements */
  showForeground?: boolean;
  /** Enable animations */
  animated?: boolean;
  /** Show continuity beam (deprecated - use AppShell prop instead) */
  showContinuityBeam?: boolean;
  /** Show status bar (deprecated - use AppShell prop instead) */
  showStatusBar?: boolean;
  /** Additional classes */
  className?: string;
  /** Page content */
  children: React.ReactNode;
}

export function Page({
  environment = "home",
  variant = 1,
  showForeground = true,
  animated = true,
  className,
  children,
}: PageProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Immersive Background - fixed, behind content */}
      <PanoramaViewer
        environment={environment}
        variant={variant}
        showForeground={showForeground}
        animated={animated}
        className="fixed inset-0 -z-10"
      />
      
      {/* Page Content - scrolls over background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}