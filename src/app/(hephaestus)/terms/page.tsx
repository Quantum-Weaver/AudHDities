// app/(hephaestus)/terms/terms/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { TermsHero } from '@/components/asgard/domains/hephaestus/legal/TermsHero';
import { ParsedTermsContent } from '@/components/asgard/domains/hephaestus/legal/ParsedTermsContent';
import { TermsFooter } from '@/components/asgard/domains/hephaestus/legal/TermsFooter';
import fs from 'fs/promises';
import path from 'path';
import { parseTermsMarkdown } from '@/lib/markdown/parseTerms';

export const metadata: Metadata = {
  title: 'Terms of Service | AUDHDITIES',
  description: 'The sacred covenant of our sanctuary',
};

export default async function TermsPage() {
  // Read from the actual markdown file
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'docs', 'terms', 'terms-of-service.md'),
    'utf-8'
  );
  
  // Parse the markdown into structured sections
  const parsedTerms = parseTermsMarkdown(markdown);

  return (
    <Page 
      variant={1}
      environment="forge"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <TermsHero lastUpdated={parsedTerms.lastUpdated} />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          <ParsedTermsContent terms={parsedTerms} />
        </div>
        
        <TermsFooter />
      </main>
    </Page>
  );
}