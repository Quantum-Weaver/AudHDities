// @/components/bifrost/LayoutChrome.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LAYOUT CHROME                                          ║
// ║                    Providers + sticky top bar + scrollable content        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { ReactNode } from 'react';
import { VStack } from '@/components/hof/Stack';
import Header from '@/components/bifrost/Header';
import ContinuityBeam from '@/components/seidr/immersive/ContinuityBeam';
import { ContinuityBeamProvider } from '@/contexts/ContinuityBeamContext';
import { StatusBar } from '@/components/seidr/immersive/StatusBar';
import { EnvironmentProvider } from '@/lib/constants/systems/environments/contexts';
import { cn } from '@/lib/utils';
import Footer from './Footer';

export interface LayoutChromeProps {
  children: ReactNode;
  showHeader?: boolean;
  showContinuityBeam?: boolean;
  showStatusBar?: boolean;
  className?: string;
}

export function LayoutChrome({
  children,
  showHeader = true,
  showContinuityBeam = true,
  showStatusBar = true,
  className,
}: LayoutChromeProps) {
  return (
    <EnvironmentProvider debug={process.env.NODE_ENV === 'development'}>
      <ContinuityBeamProvider>

          {/* Sticky top chrome */}
          <div className="sticky top-0 z-40 w-full flex-cols justify-center gap-12 overflow-x-hidden">
              {showHeader && <Header />}              
              {showContinuityBeam && <ContinuityBeam />}
              {showStatusBar && <StatusBar />}
          </div>

          {/* Content */}
          <main className={cn('w-full mx-auto flex flex-col items-center', className)}>
            {children}
          </main>
          
          <Footer/>

      </ContinuityBeamProvider>
    </EnvironmentProvider>
  );
}