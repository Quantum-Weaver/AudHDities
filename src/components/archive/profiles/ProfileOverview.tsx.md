// components/profiles/ProfileOverview.tsx
'use client';

import { Calendar, Shield, Award, Heart, Users, Package } from 'lucide-react';
import { MarkdownBio } from './MarkdownBio';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface ProfileOverviewProps {
  profile: Profile;
  communityProfile?: CommunityProfile | null;
  creatorProfile?: CreatorProfile | null;
  vendorProfile?: VendorProfile | null;
  badges: any[];
  isOwnProfile: boolean;
}

export default function ProfileOverview({
  profile,
  communityProfile,
  creatorProfile,
  vendorProfile,
  badges,
  isOwnProfile
}: ProfileOverviewProps) {
  
  const getHouseDisplay = (house: string | null) => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Shield size={16} />
            <span className="text-xs uppercase tracking-wider">Sovereignty</span>
          </div>
          <p className="text-2xl font-bold text-star-dust">{profile.sovereignty_score || 0}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Award size={16} />
            <span className="text-xs uppercase tracking-wider">Badges</span>
          </div>
          <p className="text-2xl font-bold text-star-dust">{badges.length}</p>
        </div>

        {creatorProfile && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Package size={16} />
              <span className="text-xs uppercase tracking-wider">Products</span>
            </div>
            <p className="text-2xl font-bold text-star-dust">{creatorProfile.total_products || 0}</p>
          </div>
        )}

        {communityProfile?.is_mentor && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-pink-400 mb-2">
              <Users size={16} />
              <span className="text-xs uppercase tracking-wider">Mentees</span>
            </div>
            <p className="text-2xl font-bold text-star-dust">{communityProfile.mentee_count || 0}</p>
          </div>
        )}
      </div>

      {/* Quick Info Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Joined Date */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 text-star-dust/40 mb-2">
            <Calendar size={14} />
            <span className="text-xs">Joined</span>
          </div>
          <p className="text-star-dust">
            {new Date(profile.created_at!).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Communication Style */}
        {profile.communication_style && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-star-dust/40 mb-2">
              <Heart size={14} />
              <span className="text-xs">Communication Style</span>
            </div>
            <p className="text-star-dust capitalize">{profile.communication_style}</p>
          </div>
        )}

        {/* Primary House */}
        {profile.primary_house && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-star-dust/40 mb-2">
              <span className="text-xs">🏠</span>
              <span className="text-xs">Primary House</span>
            </div>
            <p className="text-star-dust">{getHouseDisplay(profile.primary_house)}</p>
          </div>
        )}

        {/* User Tier */}
        {profile.user_tier && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-star-dust/40 mb-2">
              <span className="text-xs">⭐</span>
              <span className="text-xs">Tier</span>
            </div>
            <p className="text-star-dust capitalize">{profile.user_tier}</p>
          </div>
        )}
      </div>
      {/* Bio Section */}
      {profile.bio ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-star-dust mb-4">About</h2>
          <MarkdownBio content={profile.bio} />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <p className="text-star-dust/40">
            {isOwnProfile 
              ? 'Add a bio to tell your story' 
              : 'This user has not added a bio yet'}
          </p>
        </div>
      )}
      {/* 50% Covenant Pledge (Own profile only) */}
      {isOwnProfile && profile.residual_pledge_percent ? (
        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-xl p-4">
          <p className="text-sm text-star-dust/70">
            You've pledged <span className="text-purple-400 font-bold">{profile.residual_pledge_percent}%</span> of your residuals to the Sanctuary Commons.
          </p>
        </div>
      ) : null}
    </div>
  );
}