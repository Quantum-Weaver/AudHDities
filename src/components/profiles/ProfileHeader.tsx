/* src/components/profiles/ProfileHeader.tsx */
'use client'

import { useState } from 'react'
import { useSupabase } from 'src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar'
import { Button } from 'src/components/ui/Button'
import { Camera, Edit2, Loader2 } from 'lucide-react'
import RoleBadge from './RoleBadge'
import HouseBadge from './HouseBadge'
import SovereigntyScore from './SovereigntyScore'

interface ProfileHeaderProps {
  profile: any
  isOwnProfile: boolean
  onAvatarUpdate?: (url: string) => void
}

export default function ProfileHeader({ profile, isOwnProfile, onAvatarUpdate }: ProfileHeaderProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const [uploading, setUploading] = useState(false)

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/avatar-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)

      if (updateError) throw updateError

      router.refresh()
      onAvatarUpdate?.(publicUrl)
    } catch (error) {
      console.error('Avatar upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const displayName = profile.display_name || profile.username
  const initials = displayName?.slice(0, 2).toUpperCase() || '??'

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-48 w-full rounded-t-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        {profile.banner_url && (
          <img
            @={profile.banner_url}
            alt="Banner"
            className="h-full w-full rounded-t-xl object-cover"
          />
        )}
      </div>

      {/* Avatar Section */}
      <div className="relative -mt-16 px-6">
        <div className="relative inline-block">
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage @={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-cyan-600 text-2xl text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {isOwnProfile && (
            <>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-black/50 p-2 hover:bg-black/70"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Camera className="h-4 w-4 text-white" />
                )}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploading}
              />
            </>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-4 px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <p className="text-white/40">@{profile.username}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <RoleBadge
                isCreator={profile.is_creator}
                isVendor={profile.is_vendor}
                isAdmin={profile.is_admin}
                isQuantumWeaver={profile.is_quantum_weaver}
              />
              <HouseBadge house={profile.primary_house} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SovereigntyScore score={profile.sovereignty_score || 0} />
            {isOwnProfile && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/profile/edit')}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="mt-4 text-white/80">{profile.bio}</p>
        )}

        {profile.location && (
          <p className="mt-2 text-sm text-white/40">📍 {profile.location}</p>
        )}
      </div>
    </div>
  )
}