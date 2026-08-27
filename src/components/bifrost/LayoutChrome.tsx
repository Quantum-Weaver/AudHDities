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
import { ContinuityBeamProvider, useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { StatusBar } from '@/components/seidr/immersive/StatusBar';
import LearscailScroll from '@/components/bifrost/LearscailScroll';
import MapDialog from '@/components/bifrost/MapDialog';
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

          <div className="sticky top-0 z-40 w-full flex-cols justify-center gap-12 overflow-x-hidden">
              {showHeader && <Header />}
              <ChromeBeam allowed={showContinuityBeam} />
              <ChromeStatusBar allowed={showStatusBar} />
              <LearscailScroll />
          </div>

          {/* The map, one dialog, mounted once — opened by any door that
              flips ContinuityBeamContext's mapOpen. */}
          <MapDialog />

          {/* Content */}
          <main className={cn('w-full mx-auto flex flex-col items-center', className)}>
            {children}
          </main>

          <Footer/>

      </ContinuityBeamProvider>
    </EnvironmentProvider>
  );
}

// ── THE PAGE PROPS MADE REAL ─────────────────────────────────────────────
// Both gates must agree for the chrome to show: this instance's `allowed`
// prop and the live route's beamVisible/statusBarVisible.

function ChromeBeam({ allowed }: { allowed: boolean }) {
  const { beamVisible } = useContinuityBeam();
  if (!allowed || !beamVisible) return null;
  return <ContinuityBeam />;
}

function ChromeStatusBar({ allowed }: { allowed: boolean }) {
  const { statusBarVisible } = useContinuityBeam();
  if (!allowed || !statusBarVisible) return null;
  return <StatusBar />;
}