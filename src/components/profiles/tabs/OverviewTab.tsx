// components/profile-dashboard/tabs/OverviewTab.tsx
import { BookOpen } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Profile, Contribution } from '@/types/supabase';
import { Coins, Zap, Crown } from 'lucide-react';

interface OverviewTabProps {
  profile: Profile;
  stats: { totalEarned: number; completedQuests: number; activeProducts: number };
  contributions: Contribution[];
}

export default function OverviewTab({ profile, stats, contributions }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={Coins} 
        label="Total Residuals Earned" 
        value={`$${stats.totalEarned.toFixed(2)}`} 
        color="text-yellow-400"
      />
      <StatCard 
        icon={Zap} 
        label="Quests Completed" 
        value={stats.completedQuests} 
        color="text-cyan-400"
      />
      <StatCard 
        icon={Crown} 
        label="Active Contributions" 
        value={stats.activeProducts} 
        color="text-purple-400"
      />

      {profile.acid_test_score && (
        <div className="md:col-span-2 bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-cyan-400" />
            Acid Test Results
          </h3>
          <div className="flex items-end gap-4 mb-4">
            <div>
              <div className="text-sm text-white/50">Score</div>
              <div className="text-4xl font-bold text-white">{profile.acid_test_score}</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-white/50">Recognition</div>
              <div className="text-2xl text-cyan-400">{profile.acid_test_label || 'Unclassified'}</div>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Your responses to the diagnostic suggest {profile.user_tier === 'community' 
              ? 'alignment with the Sanctuary Community tier. Access is subsidized.' 
              : 'support capacity for the Ally tier.'}
          </p>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Contributions</h3>
        <div className="space-y-3">
          {contributions.slice(0, 3).map((contrib) => (
            <div key={contrib.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/80 text-sm truncate">{contrib.product_id}</span>
              <span className="text-cyan-400 text-sm">{contrib.percent_share}%</span>
            </div>
          ))}
          {contributions.length === 0 && (
            <p className="text-white/40 text-sm italic">No contributions registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}