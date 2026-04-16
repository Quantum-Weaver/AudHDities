// app/(hestia)/sanctum/page.tsx
// Sanctum - Settings, privacy, preferences
// Feeling: Safe, protected, personal
// Environment: home (private space)

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { SettingsForm } from '@/components/hestia/SettingsForm';
import { PrivacyControls } from '@/components/hestia/PrivacyControls';
import { AccessibilityPanel } from '@/components/hestia/AccessibilityPanel';
import { NotificationPreferences } from '@/components/hestia/NotificationPreferences';
import { ThemeSelector } from '@/components/hestia/ThemeSelector';
import { EnvironmentPicker } from '@/components/hestia/EnvironmentPicker';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Sanctum | Sovereign Sanctuary',
  description: 'Your private sanctuary settings'
};

export default async function SanctumPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  // Sanctum uses a more subdued environment
  const environment = 'support';

  return (
    <Page 
      variant={3}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Sanctum
            </h1>
            <p className="text-white/60">
              Your private sanctuary within the Sanctuary
            </p>
          </div>

          <div className="space-y-8">
            <SettingsForm profile={profile} />
            <PrivacyControls />
            <AccessibilityPanel preferences={preferences} />
            <NotificationPreferences preferences={preferences} />
            <ThemeSelector />
            <EnvironmentPicker currentEnvironment={profile?.preferred_environment} />
          </div>
        </div>
      </main>
    </Page>
  );
}