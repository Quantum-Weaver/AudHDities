// @/components/layout/AppShell.tsx
// App Shell - The sovereign container for all pages
// Stacks Header, ContinuityBeam, StatusBar, Navigation, and Content correctly

"use client";

import { ReactNode } from 'react';
import { VStack, HStack } from '@/components/hof/Stack';
import Header from '@/components/bifrost/Header';
import { Navigation } from '@/components/bifrost/Navigation';
import ContinuityBeam from '@/components/immersive/ContinuityBeam';
import { ContinuityBeamProvider } from '@/contexts/ContinuityBeamContext';
import { StatusBar } from '@/components/immersive/StatusBar';
import { EnvironmentProvider } from '@/lib/constants/systems/environments/contexts';
import { ScrollArea } from '../hof/ScrollArea';
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
          
          {/* Continuity Beam - directly below header */}
          {showContinuityBeam && <ContinuityBeam />}

          {/* Status Bar - below continuity beam */}
          {showStatusBar && <StatusBar />}
      
          {/* Navigation - below status bar */}
          {showNavigation && <Navigation />}
          
          {/* Scrollable content - fills remaining space */}
          <ScrollArea className={cn("flex-1 relative w-full", className)}>
            {children}
          </ScrollArea>
        </VStack>        
      </ContinuityBeamProvider>
    </EnvironmentProvider>
  );
}