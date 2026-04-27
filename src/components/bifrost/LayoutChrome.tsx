// @/components/bifrost/LayoutChrome.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LAYOUT CHROME                                          ║
// ║                    Providers + sticky top bar + scrollable content        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { ReactNode } from 'react';
import { VStack } from '@/components/hof/Stack';
import Header from '@/components/bifrost/Header';
import { Navigation } from '@/components/bifrost/Navigation';
import ContinuityBeam from '@/components/seidr/immersive/ContinuityBeam';
import { ContinuityBeamProvider } from '@/contexts/ContinuityBeamContext';
import { StatusBar } from '@/components/seidr/immersive/StatusBar';
import { EnvironmentProvider } from '@/lib/constants/systems/environments/contexts';
import { cn } from '@/lib/utils';

export interface LayoutChromeProps {
  children: ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  showContinuityBeam?: boolean;
  showStatusBar?: boolean;
  className?: string;
}

export function LayoutChrome({
  children,
  showHeader = true,
  showNavigation = true,
  showContinuityBeam = true,
  showStatusBar = true,
  className,
}: LayoutChromeProps) {
  return (
    <EnvironmentProvider debug={process.env.NODE_ENV === 'development'}>
      <ContinuityBeamProvider>
        <VStack space="none" className="min-h-screen w-full overflow-x-hidden">
          {/* Sticky top chrome */}
          <div className="sticky top-0 z-40 w-full overflow-x-hidden">
            <VStack space="none">
              {showHeader && <Header />}
              {showStatusBar && <StatusBar />}
              {showContinuityBeam && <ContinuityBeam />}
              {showNavigation && <Navigation />}
            </VStack>
          </div>

          {/* Content */}
          <main className={cn('flex-1 w-full', className)}>
            {children}
          </main>
        </VStack>
      </ContinuityBeamProvider>
    </EnvironmentProvider>
  );
}