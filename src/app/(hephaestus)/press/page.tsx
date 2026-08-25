// app/(hephaestus)/press/page.tsx
// The Scroll — one honest contact card and one working form
// Feeling: Professional, informative, accessible
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24, board ③ of the Forge canvas (SPEC.md ③). KP ⚛ ruled this page
// by choosing the option: one honest press-contact card (the house's one
// address) plus the interview form already wired to contact_submissions;
// the kit / media / logo / coverage frames leave until assets exist, and
// come back around real files by his hand.
//
// PressKit · MediaAssets · CoverageHighlights · LogoDownloads stay on disk,
// annotated retired, imported by nothing — lose-nothing, the PanoramaViewer
// precedent (HANDOFF.md).
//
// The three-column grid went with them: with two survivors the sidebar
// column held the only working control on the page, and a form should not
// be furniture. One column now.
//
// animated={true} → false, matching privacy/page.tsx — two reading rooms in
// one realm, one answer.
// ─────────────────────────────────────────────────────────────────────────

import { Page } from '@/components/bifrost/Page';
import { PressContact } from '@/components/asgard/domains/hephaestus/press/PressContact';
import { InterviewRequests } from '@/components/asgard/domains/hephaestus/press/InterviewRequests';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Resources for media and storytellers'
};

export default function PressPage() {
  return (
    <Page showForeground={false} animated={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Scroll
            </h1>
            <p className="text-star-dust/70">
              Resources for media and storytellers
            </p>
          </div>
          <div className="space-y-8">
            <PressContact />
            <InterviewRequests />
          </div>
        </div>
      </main>
    </Page>
  );
}
