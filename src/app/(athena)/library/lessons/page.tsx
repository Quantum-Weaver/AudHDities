// src/app/(athena)/library/lessons/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LessonsGallery } from '@/components/asgard/domains/athena/lessons/LessonsGallery';

export const metadata = { title: 'The Lessons | Sovereign Sanctuary', description: 'Individual lessons across all domains' };

export default function LessonsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><LessonsGallery /></Page>);
}