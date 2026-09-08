// src/app/page.tsx

import { Page } from '@/components/bifrost/Page';
import { Sparkles } from 'lucide-react';

import {
  HOME_LABELS,
  HOME_DIMENSIONS,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.constants';

import {
  homeHeroSectionVariants,
  homeHeroWrapperVariants,
  homeHeroBgVariants,
  homeHeroGlossVariants,
  homeOrbVariants,
  homeContentVariants,
  homeBadgeVariants,
  homeBadgeIconVariants,
  homeBadgeTextVariants,
  homeHeadingVariants,
  homeHeadingHighlightVariants,
  homeSubtitleVariants,
  homeTrustMarkersVariants,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.variants';
import AuthenticatedGreeting from '@/components/asgard/domains/hestia/home/AuthenticatedGreeting';
import HomeDoors from '@/components/asgard/domains/hestia/home/HomeDoors';

export default function Home() {
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
          <div className={homeHeroGlossVariants()} />

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

            <HomeDoors />

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