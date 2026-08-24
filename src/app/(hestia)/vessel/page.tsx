// app/(hestia)/vessel/page.tsx
// The Vessel - User profile, sovereignty, contributions
// Feeling: Reflective, sovereign, whole

import { Page } from '@/components/bifrost/Page';
import { VesselContent } from '@/components/asgard/domains/hestia/vessel/VesselContent';
import VelkominGreeting from '@/components/asgard/auth/VelkominGreeting';

export const metadata = {
  title: 'The Vessel | Sovereign Sanctuary',
  description: 'Your sovereign self'
};

export default function VesselPage() {
  return (
    <Page
      showForeground={false}
      showContinuityBeam={true}
    >
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* VELKOMIN — the door's word, once per crossing (Movement III,   */}
      {/* THE THRESHOLDS). /vessel is AUTH_ROUTES.DASHBOARD's honest      */}
      {/* landing — the convergence point for both a returning login and */}
      {/* a fresh signup's Acid Test completion. See VelkominGreeting.tsx */}
      {/* for the full provenance and the sessionStorage crossing gate.  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <VelkominGreeting />
      {/* 2026-08-24 — the second wash div is gone. It painted
          var(--gradient-weaver), a variable defined nowhere in the repo, at
          0.75; EnvironmentLayer already paints this route's wash at 0.3, and
          0.3 is the contrast floor (starDust 6.3:1 vs 1.7:1 at 0.75). Do not
          re-add a page-level wash here. */}
      <main className="min-h-screen py-12 ">
        <div className="container max-w-4xl mx-auto px-6">
          <VesselContent />
        </div>
      </main>
    </Page>
  );
}