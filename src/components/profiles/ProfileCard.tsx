// components/profiles/ProfileCard.tsx
'use client';

import Link from 'next/link';
import { Shield, Award, Home } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileCardProps {
  profile: Profile;
  badgeCount?: number;
  showStats?: boolean;
}

export default function ProfileCard({ 
  profile, 
  badgeCount = 0,
  showStats = true 
}: ProfileCardProps) {
  
  const getHouseDisplay = (house: string | null) => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Link 
      href={`/profile/${profile.id}`}
      className="block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] hover:border-cyan-500/30 group"
    >
      {/* Banner preview */}
      <div className="h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        {profile.banner_url && (
          <img 
            src={profile.banner_url} 
            alt="" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Avatar - overlaps banner */}
      <div className="relative px-4 pb-4">
        <div className="absolute -top-8 left-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black bg-white/5">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.display_name || profile.username || 'User'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white/40">
                {profile.display_name?.[0] || profile.username?.[0] || '?'}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="pt-10">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            {profile.display_name || profile.username}
          </h3>
          
          <p className="text-sm text-white/40 mb-2">@{profile.username}</p>

          {/* Badges and flags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.is_quantum_weaver && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400">
                <Award size={10} />
                Quantum Weaver
              </span>
            )}
            
            {profile.primary_house && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                <Home size={10} />
                {getHouseDisplay(profile.primary_house)}
              </span>
            )}
          </div>

          {/* Stats */}
          {showStats && (
            <div className="flex items-center gap-4 text-xs text-white/40 border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-cyan-400" />
                <span>{profile.sovereignty_score || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={12} className="text-purple-400" />
                <span>{badgeCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}