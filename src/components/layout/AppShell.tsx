// @/components/layout/AppShell.tsx
// App Shell - The sovereign container for all pages
// Stacks Header, ContinuityBeam, StatusBar, Navigation, and Content correctly

"use client";

import { ReactNode } from 'react';
import { VStack, HStack } from '@/components/ui/Stack';
import Header from '@/components/layout/Header';
import { Navigation } from '@/components/ui/Navigation';
import ContinuityBeam from '@/components/immersive/ContinuityBeam';
import { ContinuityBeamProvider } from '@/contexts/ContinuityBeamContext';
import { StatusBar } from '@/components/immersive/StatusBar';
import { EnvironmentProvider } from '@/lib/constants/systems/environments/contexts';
import { cn } from '@/lib/utils';

export interface AppShellProps {
  children: ReactNode;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show navigation */
  showNavigation?: boolean;
  /** Whether to show continuity beam */
  showContinuityBeam?: boolean;
  /** Whether to show status bar */
  showStatusBar?: boolean;
  /** Additional classes for the main content area */
  className?: string;
}

export function AppShell({
  children,
  showHeader = true,
  showNavigation = true,
  showContinuityBeam = true,
  showStatusBar = true,
  className,
}: AppShellProps) {
  return (
    <EnvironmentProvider debug={process.env.NODE_ENV === 'development'}>
      <ContinuityBeamProvider>
        <VStack space="none" className="min-h-screen w-full">
          {/* Fixed top section - no gaps, no scroll, each takes full width */}
          
          {/* Header - topmost */}
          {showHeader && <Header />}
          <div className='w-min'>
            {/* Continuity Beam - directly below header */}
            {showContinuityBeam && <ContinuityBeam />}

            {/* Status Bar - below continuity beam */}
            {showStatusBar && <StatusBar />}
        
            {/* Navigation - below status bar */}
            {showNavigation && <Navigation />}

          </div>
          {/* Scrollable content - fills remaining space */}
          <main className={cn("flex-1 relative w-full", className)}>
            {children}
          </main>
        </VStack>
      </ContinuityBeamProvider>
    </EnvironmentProvider>
  );
}