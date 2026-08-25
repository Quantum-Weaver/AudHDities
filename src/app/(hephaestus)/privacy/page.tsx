// app/(hephaestus)/privacy/page.tsx

import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { PrivacyHero } from '@/components/asgard/domains/hephaestus/legal/PrivacyHero';
import { ParsedPrivacyContent } from '@/components/asgard/domains/hephaestus/legal/ParsedPrivacyContent';
import { PrivacyFooter } from '@/components/asgard/domains/hephaestus/legal/PrivacyFooter';
import fs from 'fs/promises';
import path from 'path';
import { parsePrivacyMarkdown } from '@/lib/markdown/parsePrivacy';

export const metadata: Metadata = {
  title: 'Privacy Policy | AUDHDITIES',
  description: 'Your data belongs to you. We are simply temporary stewards.',
};

export default async function PrivacyPage() {
  // Read from the actual markdown file
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'docs', 'privacy', 'privacy.md'),
    'utf-8'
  );
  
  // Parse the markdown into structured sections
  const parsedPrivacy = parsePrivacyMarkdown(markdown);

  return (
    <Page 
      variant={1}
      environment="forge"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        {/* 2026-08-24, fix 2: the title is the markdown's own H1 now, which
            the parser could never reach before. `docs/privacy/privacy.md` is
            KP's legal text and is not touched by this pass. */}
        <PrivacyHero
          title={parsedPrivacy.title || 'Privacy Policy'}
          lastUpdated={parsedPrivacy.lastUpdated}
        />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          <ParsedPrivacyContent privacy={parsedPrivacy} />
        </div>
        
        <PrivacyFooter />
      </main>
    </Page>
  );
}