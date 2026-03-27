// app/(dashboard)/profile/[id]/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import { ProfileTabs } from '@/components/profiles/ProfileTabs';
import { Card } from '@/components/ui/Card';
import { Shield, Award, Heart, Sparkles, Calendar, Star } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

export const metadata: Metadata = { title: 'Profile | AUDHDITIES', description: 'View profile' };

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', params.id).single(),
    supabase.from('community_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('creator_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('vendor_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('user_badges').select('*, badge').eq('user_id', params.id)
  ]);

  if (profileResult.error || !profileResult.data) notFound();

  const profile = profileResult.data;
  const communityProfile = communityResult.data;
  const creatorProfile = creatorResult.data;
  const vendorProfile = vendorResult.data;
  const badges = badgesResult.data || [];
  const isOwnProfile = user?.id === profile.id;

  const tierInfo = {
    community: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: Heart, label: 'Community Member' },
    ally: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: Shield, label: 'Ally' },
    corporate: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Award, label: 'Corporate Partner' },
    council: { color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: Sparkles, label: 'Council Member' },
  };
  const tier = tierInfo[profile.user_tier as keyof typeof tierInfo] || tierInfo.community;
  const TierIcon = tier.icon;
  const memberSince = profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'recently';

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader profile={profile} communityProfile={communityProfile} creatorProfile={creatorProfile} vendorProfile={vendorProfile} badges={badges} isOwnProfile={isOwnProfile} />
        <div className="container max-w-7xl mx-auto px-6 mt-8">
          <Card className="mb-8 p-6 bg-gradient-to-r from-white/5 to-transparent border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl ${tier.bg} border ${tier.border} flex items-center justify-center`}><TierIcon className={tier.color} size={28} /></div>
                <div><div className="flex items-center gap-2 flex-wrap"><h3 className="text-xl font-bold text-white">{tier.label}</h3><span className={`px-2 py-0.5 rounded-full text-xs ${tier.bg} ${tier.color}`}>{profile.user_tier}</span></div><div className="flex items-center gap-3 mt-2 text-xs text-white/40"><span className="flex items-center gap-1"><Calendar size={12} />Member since {memberSince}</span>{profile.primary_house && (<span className="flex items-center gap-1"><Star size={12} className="text-cyan-400" />House of {profile.primary_house.replace('_', ' ')}</span>)}</div></div>
              </div>
              <div className="flex items-center gap-6">
                {profile.acid_test_score !== null && (<div className="text-center"><div className="text-2xl font-bold text-white">{profile.acid_test_score}</div><div className="text-xs text-white/40">Acid Score</div></div>)}
                {profile.acid_test_persona && (<div className="text-center"><div className="text-sm text-cyan-400 capitalize">{profile.acid_test_persona.replace(/_/g, ' ')}</div><div className="text-xs text-white/40">Persona</div></div>)}
                {isOwnProfile && profile.user_tier !== 'council' && (<a href="/questionaire" className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg text-sm transition-all duration-300 hover:scale-105">Retake Acid Test</a>)}
              </div>
            </div>
          </Card>
          <ProfileTabs profile={profile} communityProfile={communityProfile} creatorProfile={creatorProfile} vendorProfile={vendorProfile} isOwnProfile={isOwnProfile} />
        </div>
      </main>
    </AuthGuard>
  );
}