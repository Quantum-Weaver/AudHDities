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
    path.join(process.cwd(), 'forge', 'privacy', 'privacy.md'),
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
        <PrivacyHero lastUpdated={parsedPrivacy.lastUpdated} />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          <ParsedPrivacyContent privacy={parsedPrivacy} />
        </div>
        
        <PrivacyFooter />
      </main>
    </Page>
  );
}