// components/profiles/ProfileTabs.tsx (Updated)
'use client';

import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import { MarkdownBio } from './MarkdownBio';
import { CreatorProfile } from './CreatorProfile';
import VendorProfile from './VendorProfile';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface ProfileTabsProps {
  profile: Profile;
  communityProfile?: CommunityProfile | null;
  creatorProfile?: CreatorProfile | null;
  vendorProfile?: VendorProfile | null;
  isOwnProfile?: boolean;
}

export function ProfileTabs({ 
  profile,
  communityProfile,
  creatorProfile,
  vendorProfile,
  isOwnProfile = false 
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Build tabs based on user roles
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bio', label: 'Bio' },
    { id: 'activity', label: 'Activity' },
  ];

  // Add creator tab if user is a creator
  if (profile.is_creator) {
    tabs.push({ id: 'creator', label: 'Creator' });
  }

  // Add vendor tab if user is a vendor
  if (profile.is_vendor) {
    tabs.push({ id: 'vendor', label: 'Vendor' });
  }

  // Add badges tab (always present)
  tabs.push({ id: 'badges', label: 'Badges' });

  // Add settings tab only for own profile
  if (isOwnProfile) {
    tabs.push({ id: 'settings', label: 'Settings' });
  }

  return (
    <div className="mt-8">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-white/70">Sovereignty Score: {profile.sovereignty_score}</p>
            <p className="text-white/70">House: {profile.primary_house || 'Unaffiliated'}</p>
            <p className="text-white/70">Member since: {new Date(profile.created_at || '').toLocaleDateString()}</p>
            
            {/* Community Profile Info */}
            {communityProfile && (
              <>
                {communityProfile.nd_identity && communityProfile.nd_identity.length > 0 && (
                  <p className="text-white/70">Identity: {communityProfile.nd_identity.join(', ')}</p>
                )}
                {communityProfile.is_mentor && (
                  <p className="text-green-400">✨ Mentor</p>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'bio' && (
          <MarkdownBio content={profile.bio || '*No bio yet*'} />
        )}

        {activeTab === 'activity' && (
          <ActivityFeed userId={profile.id} />
        )}

        {activeTab === 'creator' && profile.is_creator && (
          <CreatorProfile userId={profile.id} />
        )}

        {activeTab === 'vendor' && profile.is_vendor && (
          <VendorProfile userId={profile.id} />
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* You'll need to pass badges from the parent */}
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-white/60">Badges coming soon</div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && isOwnProfile && (
          <div className="space-y-4">
            <p className="text-white/70">Profile settings will go here</p>
          </div>
        )}
      </div>
    </div>
  );
}