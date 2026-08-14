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
              <ChromeBeam allowed={showContinuityBeam} />
              <ChromeStatusBar allowed={showStatusBar} />
              {/* THE LÉARSCÁIL, hung LAST on purpose — KP's ⚛ stroke
                  2026-08-11: "scroll out from the bottom of the continuity
                  bar section" · "or statsus bar, whichever is the botom of
                  the stack." Being last is how it never needs to know which
                  chrome is showing. */}
              <LearscailScroll />
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

// ── X-OP-0 THE PAGE PROPS MADE REAL (Run 08, Phase 5, Movement I Step 2) ──
// The beam + status bar render once here, globally — every page's own
// showContinuityBeam/showStatusBar prop (on <Page>, bifrost/Page.tsx) used to
// be accepted and silently dropped. These two small gates live inside
// ContinuityBeamProvider so they can read the per-page visibility Page.tsx
// now sets on the context; `allowed` is this LayoutChrome instance's own
// (still-honored) prop, `beamVisible`/`statusBarVisible` is the live route's
// own choice — both must agree for the chrome to show.

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