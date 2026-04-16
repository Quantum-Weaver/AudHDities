// app/(prometheus)/stage/studio/page.tsx
// The Studio - Stream setup and configuration
// Feeling: Creative, empowering, prepared

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { StreamSetup } from '@/components/stage/StreamSetup';
import { SceneEditor } from '@/components/stage/SceneEditor';
import { OverlayManager } from '@/components/stage/OverlayManager';
import { AlertSettings } from '@/components/stage/AlertSettings';
import { GoLiveButton } from '@/components/stage/GoLiveButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Studio | Sovereign Sanctuary',
  description: 'Set up and manage your live stream'
};

export default async function StudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const supabase = await createServerSupabase();

  const { data: streamConfig } = await supabase
    .from('stream_configs')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  return (
    <Page 
      variant={1}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Studio
            </h1>
            <p className="text-white/60">
              Prepare your performance for the world
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Setup Area */}
            <div className="lg:col-span-2 space-y-8">
              <StreamSetup initialConfig={streamConfig} />
              <SceneEditor />
              <OverlayManager />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <AlertSettings />
              <GoLiveButton />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}