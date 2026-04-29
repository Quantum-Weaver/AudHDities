// src/app/(athena)/library/courses/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CoursesGallery } from '@/components/asgard/domains/athena/courses/CoursesGallery';

export const metadata = { title: 'The Curriculum | Sovereign Sanctuary', description: 'Structured courses for deep learning' };

export default function CoursesPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><CoursesGallery /></Page>);
}