// src/app/(athena)/library/courses/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CourseDetail } from '@/components/asgard/domains/athena/courses/CourseDetail';

export const metadata = { title: 'Course | The Curriculum | Sovereign Sanctuary', description: 'Your learning path' };

export default function CourseDetailPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><CourseDetail /></Page>);
}