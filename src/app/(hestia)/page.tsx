// app/(hestia)/page.tsx
// The Hearth - Home, overview, what matters now
// Feeling: Warm, welcoming, safe, reflective
// Environment: home (dynamic based on user state)

import { Page } from '@/components/arrchive/layout/Page';
import { VesselCard } from '@/components/hestia/VesselCard';
import { EnergyMeter } from '@/components/hestia/EnergyMeter';
import { NotificationBell } from '@/components/hestia/NotificationBell';
import { QuickActions } from '@/components/hestia/QuickActions';
import { RecentActivity } from '@/components/hestia/RecentActivity';
import { ContinueJourney } from '@/components/hestia/ContinueJourney';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Hearth | Sovereign Sanctuary',
  description: 'Welcome to your sanctuary'
};

export default async function HearthPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  // Dynamic environment based on user state
  let environment = 'home';
  let variant = 1;
  
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('preferred_environment, sovereignty_score, energy_level')
      .eq('id', session.user.id)
      .single();
    
    // Map user state to environment
    if (profile?.energy_level && profile.energy_level < 30) {
      environment = 'support';  // Low energy → Healing Flame
      variant = 3;
    } else if (profile?.sovereignty_score && profile.sovereignty_score > 500) {
      environment = 'council';  // High sovereignty → Council Chamber
      variant = 2;
    } else if (profile?.preferred_environment) {
      environment = profile.preferred_environment;
    }
  }

  // Fetch recent activity
  let recentActivity = [];
  if (session) {
    const { data } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    recentActivity = data || [];
  }

  return (
    <Page 
      variant={variant}
      environment={environment}
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome{session?.user?.display_name ? `, ${session.user.display_name}` : ' Home'}
            </h1>
            <p className="text-white/60">
              The Hearth is warm. You are safe here.
            </p>
          </div>

          {/* User Status Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <VesselCard user={session?.user} />
            <EnergyMeter userId={session?.user?.id} />
            <NotificationBell />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContinueJourney userId={session?.user?.id} />
            </div>
            <div>
              <RecentActivity activities={recentActivity} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}