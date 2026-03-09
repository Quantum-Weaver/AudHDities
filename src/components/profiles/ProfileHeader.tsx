// components/profile-dashboard/ProfileHeader.tsx
import { Profile } from '@/types/supabase';

const COUNCIL_COLORS: Record<string, string> = {
  hearth_keeper: 'text-orange-400 border-orange-400/30',
  chancellor: 'text-blue-400 border-blue-400/30',
  seer: 'text-purple-400 border-purple-400/30',
  aethelred: 'text-cyan-400 border-cyan-400/30',
  curator: 'text-emerald-400 border-emerald-400/30',
  archivist: 'text-stone-400 border-stone-400/30',
  skald: 'text-pink-400 border-pink-400/30',
  codex: 'text-yellow-400 border-yellow-400/30',
  executioner: 'text-red-400 border-red-400/30'
};

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <header className="mb-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {profile.display_name || profile.username || 'Quantum Weaver'}
          </h1>
          <div className="flex items-center gap-3 text-white/60">
            <span className="px-3 py-1 rounded-full bg-white/10 text-sm capitalize">
              {profile.user_tier}
            </span>
            {profile.primary_house && (
              <span className={`px-3 py-1 rounded-full border text-sm capitalize ${COUNCIL_COLORS[profile.primary_house]}`}>
                House of {profile.primary_house.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-white/50 mb-1">Sovereignty Score</div>
          <div className="text-5xl font-bold text-white tabular-nums">
            {profile.sovereignty_score}
          </div>
        </div>
      </div>
    </header>
  );
}