// app/components/profiles/ProfileHeader.tsx
'use client';

import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Edit2, Camera, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  profile: {
    id: string;
    avatar_url: string | null;
    banner_url: string | null;
    display_name: string | null;
    username: string | null;
  };
  isOwnProfile: boolean;
}

export default function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  const supabase = useSupabase();
  const router = useRouter();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

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

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-t-lg overflow-hidden">
        {profile.banner_url ? (
          <img 
            src={profile.banner_url} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            No banner
          </div>
        )}

        {isOwnProfile && (
          <label className="absolute bottom-4 right-4 cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleBannerUpload}
              className="hidden"
              disabled={uploadingBanner}
            />
            <div className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg text-white text-sm flex items-center gap-2 transition-colors">
              {uploadingBanner ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Camera size={16} />
              )}
              Change Banner
            </div>
          </label>
        )}
      </div>

      {/* Avatar - positioned absolutely */}
      <div className="absolute -bottom-12 left-8">
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
    </div>
  );
}