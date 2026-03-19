// src/app/(dashboard)/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileForm from '@/components/profiles/ProfileForm';
import ProfileHeader from '@/components/profiles/ProfileHeader';
// Import your existing Tabs component (not the shadcn one)
import Tabs from '@/components/ui/Tabs';
import { Loader2, User, Heart, Eye, Award, Shield } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

export default function EditProfilePage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch all profile data in parallel
      const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('community_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('creator_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('vendor_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('user_badges').select('*, badge').eq('user_id', user.id)
      ]);

      if (profileResult.error) {
        console.error('Error loading profile:', profileResult.error);
        return;
      }

      setProfile(profileResult.data);
      setCommunityProfile(communityResult.data || null);
      setCreatorProfile(creatorResult.data || null);
      setVendorProfile(vendorResult.data || null);
      setBadges(badgesResult.data || []);
      setLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  // Show loading state while fetching
  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      </AuthGuard>
    );
  }

  // Handle case where profile doesn't exist (shouldn't happen due to trigger)
  if (!profile) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 mb-4">Profile not found</p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
            >
              Return Home
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  // Build tabs array for your Tabs component
  const editTabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-cyan-400" />
            <h2 className="text-lg font-medium text-white">Basic Information</h2>
          </div>
          <ProfileForm 
            initialProfile={profile}
            communityProfile={communityProfile}
            creatorProfile={creatorProfile}
            vendorProfile={vendorProfile}
            onSuccess={() => router.push('/profile')}
          />
        </div>
      )
    },
    {
      id: 'community',
      label: 'Community',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={20} className="text-pink-400" />
            <h2 className="text-lg font-medium text-white">Community Preferences</h2>
          </div>
          <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg">
            Community preferences form coming soon...
          </div>
        </div>
      )
    },
    {
      id: 'sensory',
      label: 'Sensory',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={20} className="text-purple-400" />
            <h2 className="text-lg font-medium text-white">Sensory Preferences</h2>
          </div>
          <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg">
            Sensory preferences form coming soon...
          </div>
        </div>
      )
    }
  ];

  // Add creator tab if user is a creator
  if (profile.is_creator) {
    editTabs.push({
      id: 'creator',
      label: 'Creator',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} className="text-green-400" />
            <h2 className="text-lg font-medium text-white">Creator Settings</h2>
          </div>
          <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg">
            Creator settings form coming soon...
          </div>
        </div>
      )
    });
  }

  // Add vendor tab if user is a vendor
  if (profile.is_vendor) {
    editTabs.push({
      id: 'vendor',
      label: 'Vendor',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-blue-400" />
            <h2 className="text-lg font-medium text-white">Vendor Settings</h2>
          </div>
          <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg">
            Vendor settings form coming soon...
          </div>
        </div>
      )
    });
  }

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader 
          profile={profile}
          communityProfile={communityProfile}
          creatorProfile={creatorProfile}
          vendorProfile={vendorProfile}
          badges={badges}
          isOwnProfile={true}
        />
        
        <div className="container max-w-4xl mx-auto px-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
            
            {/* Using your existing Tabs component */}
            <Tabs 
              tabs={editTabs} 
              defaultTab={activeTab}
            />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
