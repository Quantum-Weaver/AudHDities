/* src/app/(dashboard)/profile/edit/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from 'src/lib/supabase/client'
import AuthGuard from 'src/components/auth/AuthGuard'
import AvatarUpload from 'src/components/upload/AvatarUpload'
import BannerUpload from 'src/components/upload/BannerUpload'
import ProfileForm from 'src/components/profiles/ProfileForm'
import { Loader2 } from 'lucide-react'

export default function EditProfilePage() {
  const router = useRouter()
  const supabase = useSupabase()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [supabase, router])

  const handleAvatarUpdate = async (url: string) => {
    if (!profile) return
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', profile.id)
    if (!error) {
      setProfile({ ...profile, avatar_url: url })
    }
  }

  const handleBannerUpdate = async (url: string) => {
    if (!profile) return
    const { error } = await supabase
      .from('profiles')
      .update({ banner_url: url })
      .eq('id', profile.id)
    if (!error) {
      setProfile({ ...profile, banner_url: url })
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
      </AuthGuard>
    )
  }

  if (!profile) return null

  const displayName = profile.display_name || profile.username
  const initials = displayName?.slice(0, 2).toUpperCase() || '??'

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <div className="mx-auto max-w-2xl">
          {/* Banner Section */}
          <div className="relative">
            <BannerUpload
              userId={profile.id}
              currentUrl={profile.banner_url}
              onUploadComplete={handleBannerUpdate}
            />

            {/* Avatar - positioned over banner */}
            <div className="absolute -bottom-12 left-8">
              <AvatarUpload
                userId={profile.id}
                currentUrl={profile.avatar_url}
                onUploadComplete={handleAvatarUpdate}
                size="lg"
                fallbackInitials={initials}
              />
            </div>
          </div>

          {/* Edit Form */}
          <div className="mt-16 rounded-xl border border-white/10 bg-white/5 p-6">
            <h1 className="mb-6 text-2xl font-bold text-white">Edit Profile</h1>
            <ProfileForm
              initialProfile={profile}
              onSuccess={() => router.push(`/profile/${profile.username}`)}
            />
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}