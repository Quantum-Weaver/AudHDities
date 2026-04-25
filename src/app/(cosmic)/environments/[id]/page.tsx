// app/(cosmic)/environments/[id]/page.tsx
// Realm Detail - Single environment view
// Feeling: Immersive, alive, transformative

import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import PanoramaViewer  from '@/components/immersive/PanoramaViewer';
import { MoodIndicators } from '@/components/cosmic/MoodIndicators';
import { ColorPalette } from '@/components/cosmic/ColorPalette';
import { ThemeInfo } from '@/components/cosmic/ThemeInfo';
import { ApplyButton } from '@/components/cosmic/ApplyButton';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';

interface RealmDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RealmDetailPage({ params }: RealmDetailPageProps) {
  const { id } = await params;
  const environment = EnvironmentPromptMap[id as keyof typeof EnvironmentPromptMap];

  if (!environment) {
    notFound();
  }

  const environmentName = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <Page 
      variant={1}
      environment={id as any}
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Live Preview Banner */}
          <div className="mb-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
            <p className="text-cyan-400 text-sm">
              🎨 You are currently experiencing the {environmentName} realm
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                {environmentName}
              </h1>
              <p className="text-white/60">
                {environment.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <MoodIndicators moods={environment.mood || []} />
              <ColorPalette colors={environment.colors || []} />
            </div>

            <ThemeInfo themes={environment.themes || []} />

            <div className="pt-4 flex justify-center">
              <ApplyButton environmentId={id} />
            </div>
          </div>

          {/* Prompt Section (for creators) */}
          <div className="mt-8 p-6 bg-white/5 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-2">
              Creation Prompt
            </h3>
            <p className="text-white/40 text-sm font-mono">
              {environment.prompt}
            </p>
          </div>
        </div>
      </main>
    </Page>
  );
}