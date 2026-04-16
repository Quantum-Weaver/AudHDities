// @/components/layout/Page.tsx
// Page wrapper - every page uses this
// Provides environment, continuity beam, status bar structure

"use client"

import { cn } from "@/lib/utils"
import PanoramaViewer from "@/components/immersive/PanoramaViewer"
import ContinuityBeam from "@/components/nexus/ContinuityBeam"
import { StatusBar } from "@/components/immersive/StatusBar"
import { EnvironmentKey } from "@/lib/constants/systems"

export interface PageProps {
  /** Environment key (home, council, library, music, etc.) */
  environment?: EnvironmentKey
  /** Variant of the environment (1-4) */
  variant?: number
  /** Show foreground elements */
  showForeground?: boolean
  /** Enable animations */
  animated?: boolean
  /** Show continuity beam */
  showContinuityBeam?: boolean
  /** Show status bar */
  showStatusBar?: boolean
  /** Additional classes */
  className?: string
  /** Page content */
  children: React.ReactNode
}

export function Page({
  environment = "home",
  variant = 1,
  showForeground = true,
  animated = true,
  showContinuityBeam = true,
  showStatusBar = true,
  className,
  children,
}: PageProps) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Immersive Background */}
      <PanoramaViewer
        environment={environment}
        variant={variant}
        showForeground={showForeground}
        animated={animated}
        className="fixed inset-0 -z-10"
      />
      
      {/* Continuity Beam (top/bottom animated line) */}
      {showContinuityBeam && <ContinuityBeam />}
      
      {/* Status Bar (sovereignty, energy, notifications) */}
      {showStatusBar && <StatusBar />}
      
      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}