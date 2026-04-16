// src/components/community/SocialPlatformGrid.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { socialPlatformsData } from '@/data/community/social-platforms';
import { BlueskyIcon, FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, PatreonIcon, ThreadsIcon, TikTokIcon, TwitchIcon, TwitterIcon, YouTubeIcon } from '../ui/icons';

const iconMap: Record<string, any> = {
  twitter: TwitterIcon,
  github: GitHubIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  twitch: TwitchIcon,
  patreon: PatreonIcon,
  threads: ThreadsIcon,
  bluesky: BlueskyIcon,
  tiktok: TikTokIcon,
};

const colorMap: Record<string, string> = {
  quantum: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
  earth: 'from-green-500/20 to-green-600/10 border-green-500/30',
  water: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  fire: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  cosmic: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  emergence: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
  bifrost: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30',
};

export function SocialPlatformGrid() {
  const featuredPlatforms = socialPlatformsData.filter(p => p.featured).slice(0, 8);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {featuredPlatforms.map((platform, idx) => {
        const Icon = iconMap[platform.icon] || PatreonIcon;
        const colors = colorMap[platform.glow] || colorMap.quantum;
        
        return (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${colors} rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 group`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon size={20} className="text-white" />
              <span className="text-white font-medium">{platform.name}</span>
            </div>
            <p className="text-white/60 text-xs mb-2">{platform.description}</p>
            <p className="text-white/30 text-xs">{platform.valueProposition}</p>
          </motion.a>
        );
      })}
    </div>
  );
}