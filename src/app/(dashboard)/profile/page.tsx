'use client'

import { useProfile } from '@/hooks/useProfile'

export default function ProfilePage() {
  const { profile, user, loading, error } = useProfile()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PRIMARY-500 mx-auto"></div>
          <p className="mt-4 text-TEXT-secondary">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-ERROR-500">
          <p className="text-xl">Something went wrong</p>
          <p className="text-sm mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-PRIMARY-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Not logged in</p>
          <a 
            href="/login" 
            className="mt-4 inline-block px-4 py-2 bg-PRIMARY-500 text-white rounded"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <div className="bg-SURFACE-50 rounded-lg shadow p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-PRIMARY-100 flex items-center justify-center text-3xl font-bold text-PRIMARY-700">
            {profile?.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </div>
          
          {/* Basic Info */}
          <div>
            <h2 className="text-2xl font-semibold">
              {profile?.display_name || profile?.username || 'Anonymous'}
            </h2>
            <p className="text-TEXT-secondary">{user.email}</p>
            
            {/* Role Badges */}
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
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-TEXT-secondary">Username</label>
            <p className="mt-1">@{profile?.username}</p>
          </div>

          {profile?.bio && (
            <div>
              <label className="block text-sm font-medium text-TEXT-secondary">Bio</label>
              <p className="mt-1">{profile.bio}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-TEXT-secondary">Member Since</label>
            <p className="mt-1">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>

        {/* Debug Info (remove later) */}
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <p className="text-sm font-mono">Debug: Profile loaded successfully</p>
        </div>
      </div>
    </div>
  )
}