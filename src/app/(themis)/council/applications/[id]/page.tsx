// src/app/(themis)/council/applications/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ApplicationDetail } from '@/components/asgard/domains/themis/applications/ApplicationDetail';

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  return {
    title: `Application ${id.slice(0, 8)} | The Council | Sovereign Sanctuary`,
    description: 'One application, its answers and its decision',
  };
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ApplicationDetail id={id} />
    </Page>
  );
}
