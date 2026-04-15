// components/profiles/ProfileBadges.tsx
'use client';

import { Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { getBadgeDisplayName, getBadgeDescription } from '@/types/supabase/tables/user_badges';

interface UserBadge {
  badge: string;
  earned_at: string;
  earned_reason?: string | null;
}

interface ProfileBadgesProps {
  badges: UserBadge[];
}

export function ProfileBadges({ badges }: ProfileBadgesProps) {
  if (!badges || badges.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award size={32} className="text-white/20" />
        </div>
        <h3 className="text-white font-bold mb-2">No badges yet</h3>
        <p className="text-white/40 text-sm">
          Complete quests and contribute to earn badges
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div key={badge.badge} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center group hover:border-cyan-500/30 transition-all">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-sm font-medium text-white">
            {getBadgeDisplayName(badge.badge)}
          </div>
          <div className="text-xs text-white/40 mt-1">
            {getBadgeDescription(badge.badge)}
          </div>
          {badge.earned_reason && (
            <div className="text-xs text-cyan-400/60 mt-2">
              {badge.earned_reason}
            </div>
          )}
          <div className="text-xs text-white/30 mt-2">
            {new Date(badge.earned_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}