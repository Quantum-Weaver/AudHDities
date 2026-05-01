// src/app/(athena)/library/knowledge/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { KnowledgeDetail } from '@/components/asgard/domains/athena/knowledge/KnowledgeDetail';

export const metadata = { title: 'Scroll | The Archive | Sovereign Sanctuary', description: 'Ancient words, eternal truth' };

export default function KnowledgeDetailPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><KnowledgeDetail /></Page>);
}