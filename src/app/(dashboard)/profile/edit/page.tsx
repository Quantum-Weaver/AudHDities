// src/app/(dashboard)/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileForm from '@/components/profiles/ProfileForm';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import { Loader2 } from 'lucide-react';
import type { Profile } from '@/types/supabase/profiles';

export default function EditProfilePage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  // Show loading state while fetching
  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      </AuthGuard>
    );
  }

  // Handle case where profile doesn't exist (shouldn't happen due to trigger)
  if (!profile) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 mb-4">Profile not found</p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
            >
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
        <ProfileHeader profile={profile} isOwnProfile={true} />
        
        <div className="container max-w-2xl mx-auto px-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
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