// app/(dashboard)/profile/edit/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/core/useProfile';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import ProfileForm from '@/components/profiles/ProfileForm';
import { Loader2 } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, loading: profileLoading, error: profileError } = useCurrentProfile();
  
  const isLoading = profileLoading;

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      </AuthGuard>
    );
  }

  if (!profile || profileError) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 mb-4">Profile not found</p>
            <button onClick={() => router.push('/')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">
              Return Home
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader 
          profile={profile}
          isOwnProfile={true}
        />

        <div className="container max-w-4xl mx-auto px-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
            </div>
            
            <ProfileForm 
              initialProfile={profile}
              onSuccess={() => router.push('/profile')}
            />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}