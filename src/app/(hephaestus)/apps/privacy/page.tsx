// app/(hephaestus)/apps/privacy/page.tsx
// ─────────────────────────────────────────────────────────────────────────
// THE APPS' ONE POLICY — born 2026-08-25, board ① of the Forge canvas
// (.journals/proofs/11-hephaestus/design/Main.dc.html · SPEC.md ①).
//
// KP ⚛ 2026-08-24, verbatim:
//   "we already have a terms/ and privacy/ we will need an apps/privacy"
// and, on whose address stands on it:
//   "apps keep theirs"
//
// So the address on this page is the apps' OWN, read from the markdown —
// audhdities@proton.me — and NOT CONTACT_LABELS.EMAIL_ADDRESS, which is the
// website's. No substitution.
//
// Built exactly as /privacy is: a build-time fs.readFile of a markdown under
// docs/, parsed by parsePrivacyMarkdown, rendered by the same three
// components. NEVER a live cross-repo read — a sibling repo is not in a
// deploy's build container, so the policy's text lives here, in this repo,
// and the apps' own PRIVACY.md files remain their own.
//
// EIGHT APPS ARE NAMED, and each is named only with what its own repo
// verifies. resonance-weaver is deliberately ABSENT: it is clean in code,
// but its README calls it "One canonical record of a life" for KP and it
// has not been ruled a public app. Unwritten — his to rule. It is not
// listed until he says so.
//
// This page asks nothing and gates nothing, so signed-in and signed-out are
// the same page. No cookie banner, no preference maze, no accept-all — a
// policy that collects nothing has nothing to ask consent for.
// ─────────────────────────────────────────────────────────────────────────

import { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/bifrost/Page';
import { PrivacyHero } from '@/components/asgard/domains/hephaestus/legal/PrivacyHero';
import { ParsedPrivacyContent } from '@/components/asgard/domains/hephaestus/legal/ParsedPrivacyContent';
import { PrivacyFooter } from '@/components/asgard/domains/hephaestus/legal/PrivacyFooter';
import fs from 'fs/promises';
import path from 'path';
import { parsePrivacyMarkdown } from '@/lib/markdown/parsePrivacy';

export const metadata: Metadata = {
  title: 'App Privacy | AUDHDITIES',
  description: 'The apps collect nothing. This is the policy that says so.',
};

export default async function AppsPrivacyPage() {
  // Build-time read of this repo's own copy. A missing file fails the build,
  // which is why this room has no empty state: it cannot render empty.
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'docs', 'privacy-apps', 'privacy-apps.md'),
    'utf-8'
  );

  const parsed = parsePrivacyMarkdown(markdown);

  return (
    <Page
      variant={1}
      environment="forge"
      showForeground={false}
      animated={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        {/* The title and the date are the MARKDOWN'S OWN — never a default,
            never a version badge, never a count. */}
        <PrivacyHero
          title={parsed.title}
          lastUpdated={parsed.lastUpdated}
          eyebrow="The apps"
          showVersion={false}
          promise={
            <>
              If you only use the apps, only this page applies to you.
              <br />
              The website has its own policy.
            </>
          }
        />

        <div className="container max-w-4xl mx-auto px-6 pb-20">
          <ParsedPrivacyContent privacy={parsed} />
        </div>

        <PrivacyFooter
          heading="The Apps Collect Nothing"
          closing={
            <p>
              Every app named on this page was read in its own repository
              before it was named here. An app that has not been read is not
              listed.
            </p>
          }
        >
          <p>
            These apps run on your device and keep what you make on your
            device. There are no accounts, no servers of ours that receive
            your content, and no telemetry. Where one app reaches out at all,
            it is named above with what it sends and what makes it happen.
          </p>
          <p className="mt-4">
            The website and marketplace are a different thing with different
            needs, and they have their own policy:{' '}
            <Link href="/privacy" className="text-neurospark hover:underline">
              the site&rsquo;s privacy policy
            </Link>
            .
          </p>
        </PrivacyFooter>
      </main>
    </Page>
  );
}
