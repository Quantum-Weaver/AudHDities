// app/(cosmic)/environments/page.tsx
// The Realms - Environment showcase, selection
// Feeling: Immersive, beautiful, responsive, alive

import { Page } from '@/components/bifrost/Page';
import { EnvironmentGrid } from '@/components/cosmic/EnvironmentGrid';
import { ThemeCards } from '@/components/cosmic/ThemeCard';
import { MoodFilters } from '@/components/cosmic/MoodFilters';
import { PreviewPanels } from '@/components/cosmic/PreviewPanels';
import { SelectButton } from '@/components/cosmic/SelectButton';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';

export const metadata = {
  title: 'The Realms | Sovereign Sanctuary',
  description: 'Choose your environment'
};

export default async function EnvironmentsPage() {
  // Convert the prompt map to an array for the grid
  const environments = Object.entries(EnvironmentPromptMap).map(([key, value]) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    description: value.description,
    mood: value.mood,
    colors: value.colors,
    themes: value.themes,
    background: `/environments/360-panoramas/${key}/${key}-background-1.webp`,
  }));

  const moods = ['Warm', 'Sacred', 'Peaceful', 'Energetic', 'Healing', 'Cosmic', 'Intimate', 'Professional'];

  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Realms
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Choose the environment that calls to you
            </p>
          </div>

          <div className="mb-8">
            <MoodFilters moods={moods} />
          </div>

          <EnvironmentGrid environments={environments} />

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">
              Featured Themes
            </h2>
            <ThemeCards />
          </div>
        </div>
      </main>
    </Page>
  );
}