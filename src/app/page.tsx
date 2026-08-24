// src/app/page.tsx
// The Hearth — Welcome to the Sovereign Sanctuary

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { Page } from '@/components/bifrost/Page';
import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

import {
  HOME_LABELS,
  HOME_ROUTES,
  HOME_DIMENSIONS,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.constants';

import {
  homeHeroSectionVariants,
  homeHeroWrapperVariants,
  homeHeroBgVariants,
  homeOrbVariants,
  homeContentVariants,
  homeBadgeVariants,
  homeBadgeIconVariants,
  homeBadgeTextVariants,
  homeHeadingVariants,
  homeHeadingHighlightVariants,
  homeSubtitleVariants,
  homeCtaContainerVariants,
  homeCtaIconVariants,
  homeTrustMarkersVariants,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.variants';
import AuthenticatedGreeting from '@/components/asgard/domains/hestia/home/AuthenticatedGreeting';

// PROPOSED 2026-08-24 — the canvas is silent on what "/" does for a visitor.
// KP ⚛ answer 2: "sanctuary should be the home page for visitors." The Hearth
// is the vessel's room; a visitor is shown the visitors' home instead.
export default async function Home() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(AUTH_ROUTES.SANCTUARY);

  return (
    <Page
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
    >
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* AUTHENTICATED GREETING                                           */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className='justify-center flex'>
        <AuthenticatedGreeting />
      </div>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <main className={homeHeroSectionVariants()}>
        <div className={homeHeroWrapperVariants()}>
          <div className={homeHeroBgVariants()} />
          <div className={homeOrbVariants({ color: 'cyan', position: 'topLeft' })} />
          <div className={homeOrbVariants({ color: 'purple', position: 'bottomRight' })} />

          <div className={homeContentVariants()}>
            <div className={homeBadgeVariants()}>
              <Sparkles size={HOME_DIMENSIONS.ICON_SIZE} className={homeBadgeIconVariants()} />
              <span className={homeBadgeTextVariants()}>{HOME_LABELS.BADGE}</span>
            </div>

            <h1 className={homeHeadingVariants()}>
              {HOME_LABELS.HEADING_PREFIX}{' '}
              <span className={homeHeadingHighlightVariants()}>
                {HOME_LABELS.HEADING_HIGHLIGHT}
              </span>
            </h1>

            <p className={homeSubtitleVariants()}>
              {HOME_LABELS.SUBTITLE}
              <br />
              {HOME_LABELS.SUBTITLE_SECOND}
            </p>

            <div className={homeCtaContainerVariants()}>
              <Link href={HOME_ROUTES.SANCTUARY}>
                <Button size="lg" className="group">
                  {HOME_LABELS.CTA}
                  <ArrowRight size={HOME_DIMENSIONS.CTA_ICON_SIZE} className={homeCtaIconVariants()} />
                </Button>
              </Link>
            </div>

            <div className={homeTrustMarkersVariants()}>
              <span>✨ {HOME_LABELS.TRUST_1}</span>
              <span>🔓 {HOME_LABELS.TRUST_2}</span>
              <span>💫 {HOME_LABELS.TRUST_3}</span>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}