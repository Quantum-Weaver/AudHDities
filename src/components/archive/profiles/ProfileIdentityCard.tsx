// components/profiles/ProfileIdentityCard.tsx
'use client';

import { Heart, Shield, Award, Sparkles, Calendar, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

interface TierInfo {
  color: string;
  bg: string;
  border: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

const tierMap: Record<string, TierInfo> = {
  community: {
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: Heart,
    label: 'Community Member',
    description: 'Subsidized access for neurodivergent members'
  },
  ally: {
    color: 'text-neurospark',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: Shield,
    label: 'Ally',
    description: 'Supporters of the sanctuary'
  },
  corporate: {
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: Award,
    label: 'Corporate Partner',
    description: 'Organizations aligned with our values'
  },
  council: {
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    icon: Sparkles,
    label: 'Council Member',
    description: 'Sovereign consciousness'
  }
};

interface ProfileIdentityCardProps {
  userTier: string;
  memberSince: string;
  primaryHouse?: string | null;
  acidTestScore?: number | null;
  acidTestPersona?: string | null;
  isOwnProfile?: boolean;
}

export function ProfileIdentityCard({
  userTier,
  memberSince,
  primaryHouse,
  acidTestScore,
  acidTestPersona,
  isOwnProfile = false
}: ProfileIdentityCardProps) {
  const tier = tierMap[userTier] || tierMap.community;
  const TierIcon = tier.icon;

  return (
    <Card className="mb-8 p-6 bg-gradient-to-r from-white/5 to-transparent border border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-xl ${tier.bg} border ${tier.border} flex items-center justify-center`}>
            <TierIcon className={tier.color} size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-star-dust">{tier.label}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs ${tier.bg} ${tier.color}`}>
                {userTier}
              </span>
            </div>
            <p className="text-star-dust/60 text-sm">{tier.description}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-star-dust/40">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                Member since {memberSince}
              </span>
              {primaryHouse && (
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-neurospark" />
                  House of {primaryHouse.replace(/_/g, ' ')}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {acidTestScore !== null && (
            <div className="text-center">
              <div className="text-2xl font-bold text-star-dust">{acidTestScore}</div>
              <div className="text-xs text-star-dust/40">Acid Score</div>
            </div>
          )}
          
          {acidTestPersona && (
            <div className="text-center">
              <div className="text-sm text-neurospark capitalize">{acidTestPersona.replace(/_/g, ' ')}</div>
              <div className="text-xs text-star-dust/40">Persona</div>
            </div>
          )}
          
          {isOwnProfile && userTier !== 'council' && (
            <Link
              href="/questionaire"
              className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-neurospark rounded-lg text-sm transition-all duration-300 hover:scale-105"
            >
              Retake Acid Test
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}