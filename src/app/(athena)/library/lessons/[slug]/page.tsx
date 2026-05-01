// src/app/(athena)/library/lessons/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LessonDetail } from '@/components/asgard/domains/athena/lessons/LessonDetail';

export const metadata = { title: 'Lesson | The Lessons | Sovereign Sanctuary', description: 'Wisdom unfolds' };

export default function LessonDetailPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><LessonDetail /></Page>);
}