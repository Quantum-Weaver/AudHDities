// components/profiles/ProfileTabs.tsx
'use client';

import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import { MarkdownBio } from './MarkdownBio';
import { CreatorProfile } from './CreatorProfile';
import VendorProfile from './VendorProfile';
import CommunityProfile from './CommunityProfile';
import { ProfileBadges } from './ProfileBadges';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfileType = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfileType = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfileType = Database['public']['Tables']['vendor_profiles']['Row'];

interface ProfileTabsProps {
  profile: Profile;
  communityProfile?: CommunityProfileType | null;
  creatorProfile?: CreatorProfileType | null;
  vendorProfile?: VendorProfileType | null;
  badges?: any[];
  isOwnProfile?: boolean;
}

export function ProfileTabs({ 
  profile,
  communityProfile,
  creatorProfile,
  vendorProfile,
  badges = [],
  isOwnProfile = false 
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bio', label: 'Bio' },
    { id: 'activity', label: 'Activity' },
    { id: 'community', label: 'Community' },
  ];

  if (profile.is_creator) {
    tabs.push({ id: 'creator', label: 'Creator' });
  }

  if (profile.is_vendor) {
    tabs.push({ id: 'vendor', label: 'Vendor' });
  }

  tabs.push({ id: 'badges', label: 'Badges' });

  if (isOwnProfile) {
    tabs.push({ id: 'settings', label: 'Settings' });
  }

  return (
    <div className="mt-8">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-white/40 text-sm">Sovereignty Score</p>
                  <p className="text-2xl font-bold text-white">{profile.sovereignty_score || 0}</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm">House</p>
                  <p className="text-white">{profile.primary_house?.replace(/_/g, ' ') || 'Unaffiliated'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm">Member Since</p>
                  <p className="text-white">{new Date(profile.created_at || '').toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm">Badges Earned</p>
                  <p className="text-white">{badges.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <MarkdownBio content={profile.bio || '*No bio yet*'} />
        )}

        {activeTab === 'activity' && (
          <ActivityFeed userId={profile.id} />
        )}

        {activeTab === 'community' && communityProfile && (
          <CommunityProfile 
            community={communityProfile}
            isOwnProfile={isOwnProfile}
          />
        )}

        {activeTab === 'creator' && profile.is_creator && (
          <CreatorProfile userId={profile.id} />
        )}

        {activeTab === 'vendor' && profile.is_vendor && (
          <VendorProfile userId={profile.id} />
        )}

        {activeTab === 'badges' && (
          <ProfileBadges badges={badges} />
        )}

        {activeTab === 'settings' && isOwnProfile && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-white/60">Profile settings coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}