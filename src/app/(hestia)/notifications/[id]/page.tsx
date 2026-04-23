// app/(hestia)/notifications/[id]/page.tsx
// Notification Detail - Single notification view
// Feeling: Connected, informed, aware

import { Page } from '@/components/shared/Page';

interface NotificationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotificationDetailPageProps) {
  const { id } = await params;
  return {
    title: `Notification ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A moment of connection'
  };
}

export default async function NotificationDetailPage({ params }: NotificationDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={2}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Notification ID: {id} */}
        </div>
      </main>
    </Page>
  );
}