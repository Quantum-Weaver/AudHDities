// src/app/(athena)/library/knowledge/page.tsx
import { Page } from '@/components/bifrost/Page';
import { KnowledgeGallery } from '@/components/asgard/domains/athena/knowledge/KnowledgeGallery';

export const metadata = { title: 'The Archive | Sovereign Sanctuary', description: 'Mythology, taxonomy, and ancient wisdom' };

export default function KnowledgePage() {
  return (<Page showForeground={false} showContinuityBeam={true}><KnowledgeGallery /></Page>);
}