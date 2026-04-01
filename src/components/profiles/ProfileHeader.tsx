// app/components/profiles/ProfileHeader.tsx
'use client';

import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Edit2, Camera, Loader2, Shield, Award, Home, Heart, Store, Users } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  communityProfile?: CommunityProfile | null;
  creatorProfile?: CreatorProfile | null;
  vendorProfile?: VendorProfile | null;
  badges?: any[];
  isOwnProfile: boolean;
}

export default function ProfileHeader({ 
  profile, 
  communityProfile,
  creatorProfile,
  vendorProfile,
  badges = [],
  isOwnProfile 
}: ProfileHeaderProps) {
  const supabase = useSupabase();
  const router = useRouter();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
//  const [uploadingBanner, setUploadingBanner] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      router.refresh();
    } catch (error) {
      console.error('Avatar upload failed:', error);
      alert('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

/*  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/banner-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      router.refresh();
    } catch (error) {
      console.error('Banner upload failed:', error);
      alert('Failed to upload banner');
    } finally {
      setUploadingBanner(false);
    }
  };
*/  

  // Get house display name with proper formatting
  const getHouseDisplay = (house: string | null) => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="wrapper relative">

      {/* Avatar - positioned absolutely */}
      <div className="absolute -bottom-12 left-8 flex items-end gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black bg-white/5">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.display_name || profile.username || 'User'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/40">
                {profile.display_name?.[0] || profile.username?.[0] || '?'}
              </div>
            )}
          </div>

          {isOwnProfile && (
            <label className="absolute -bottom-2 -right-2 cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploadingAvatar}
              />
              <div className="w-8 h-8 bg-cyan-600 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors">
                {uploadingAvatar ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} className="text-white" />
                )}
              </div>
            </label>
          )}
        </div>

        {/* Sovereignty Score Badge */}
        <div className="mb-2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/30">
          <Shield size={14} className="text-cyan-400" />
          <span className="text-sm font-medium text-white">{profile.sovereignty_score || 0}</span>
          <span className="text-xs text-white/40">Sovereignty</span>
        </div>
      </div>

      {/* Edit Profile Button (if own profile) */}
      {isOwnProfile && (
        <Link
          href="/profile/edit"
          className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2 transition-colors"
        >
          <Edit2 size={16} />
          Edit Profile
        </Link>
      )}

      {/* Profile Info Section - Now below avatar */}
      <div className="pt-16 px-8 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {profile.display_name || profile.username}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {/* Username */}
              <span className="text-white/40 text-sm">@{profile.username}</span>
              
              {/* Primary House */}
              {profile.primary_house && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                  <Home size={12} />
                  House of {getHouseDisplay(profile.primary_house)}
                </span>
              )}
              
              {/* Quantum Weaver Badge */}
              {profile.is_quantum_weaver && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400">
                  <Award size={12} />
                  Quantum Weaver
                </span>
              )}
              
              {/* Admin Badge */}
              {profile.is_admin && (
                <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                  Admin
                </span>
              )}
              
              {/* Creator Badge */}
              {profile.is_creator && (
                <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                  Creator
                </span>
              )}
              
              {/* Vendor Badge */}
              {profile.is_vendor && (
                <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">
                  Vendor
                </span>
              )}

              {/* Mentor Badge from community profile */}
              {communityProfile?.is_mentor && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                  <Users size={12} />
                  Mentor
                </span>
              )}
            </div>

            {/* Badge count */}
            {badges.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <Award size={14} className="text-purple-400" />
                <span className="text-sm text-white/60">{badges.length} badges earned</span>
              </div>
            )}
          </div>

          {/* User Tier */}
          <div className="text-right">
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${profile.user_tier === 'community' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
              ${profile.user_tier === 'ally' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
              ${profile.user_tier === 'corporate' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
            `}>
              {profile.user_tier?.toUpperCase() || 'COMMUNITY'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}