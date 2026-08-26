// app/(hephaestus)/apps/privacy/page.tsx
// ─────────────────────────────────────────────────────────────────────────
//   "apps keep theirs"
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
