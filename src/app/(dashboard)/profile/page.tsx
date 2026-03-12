'use client'

import { useProfile } from '@/hooks/useProfile'
import { AvatarUpload } from '@/components/profiles/components/AvatarUpload'
import { BannerUpload } from '@/components/profiles/components/BannerUpload'
import { useState, useEffect } from 'react'
 
export default function ProfilePage() {
  const { profile, user, loading, error, refreshProfile } = useProfile()
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url)
  const [bannerUrl, setBannerUrl] = useState(profile?.banner_url)
  
  // In your profile page, add this useEffect
  useEffect(() => {
    console.log('Current profile:', profile)
    console.log('Avatar URL:', profile?.avatar_url)
    console.log('Banner URL:', profile?.banner_url)
  }, [profile])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>Not logged in</div>

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Banner Section */}
      <section className="page-title-section mb-8 pt-20 px-6">
        <div className="relative mb-20">
          <BannerUpload 
            userId={user.id}
            currentBannerUrl={bannerUrl}
            onUploadComplete={(url) => {
              setBannerUrl(url)
              refreshProfile?.() // if you have this function
            }}
          />
          
          {/* Avatar - positioned over banner */}
          <div className="absolute -bottom-7 left-8">
            <AvatarUpload 
              userId={user.id}
              currentAvatarUrl={avatarUrl}
              onUploadComplete={(url) => {
                setAvatarUrl(url)
                refreshProfile?.()
              }}
            />
          </div>
        </div>
      </section>

      {/* Rest of profile content */}
      <section className="section-gradient opacity-.2 mt-16 px-8">
        <h1 className="text-2xl font-bold">
          {profile?.display_name || profile?.username || 'Anonymous'}
        </h1>
        <p className="text-TEXT-secondary">{user.email}</p>
        
        {/* Role badges */}
        <div className="flex gap-2 mt-2">
          {profile?.is_creator && (
            <span className="px-2 py-1 bg-PRIMARY-100 text-PRIMARY-700 text-xs rounded">Creator</span>
          )}
          {profile?.is_vendor && (
            <span className="px-2 py-1 bg-SECONDARY-100 text-SECONDARY-700 text-xs rounded">Vendor</span>
          )}
          {profile?.is_admin && (
            <span className="px-2 py-1 bg-ERROR-100 text-ERROR-700 text-xs rounded">Admin</span>
          )}
        </div>

        {/* Bio */}
        {profile?.bio && (
          <p className="mt-4 text-TEXT-secondary">{profile.bio}</p>
        )}
      </section>
    </div>
  )
}