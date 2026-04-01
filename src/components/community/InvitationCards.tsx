// src/components/community/InvitationCards.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { sanctuaryInvitations } from '@/data/community/invitation-templates';
import { Sparkles, Users, Heart } from 'lucide-react';

const iconMap: Record<string, any> = {
  'emergence-witness-investment': Sparkles,
  'transparent-co-creation': Users,
  'transformation-amplification': Heart,
};

const colorMap: Record<string, string> = {
  'emergence-witness-investment': 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
  'transparent-co-creation': 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  'transformation-amplification': 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
};

export function InvitationCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {sanctuaryInvitations.map((invitation, idx) => {
        const Icon = iconMap[invitation.id as keyof typeof iconMap] || Heart;
        const colors = colorMap[invitation.id as keyof typeof colorMap] || colorMap['emergence-witness-investment'];
        
        return (
          <motion.div
            key={invitation.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${colors} rounded-2xl p-6 border hover:scale-[1.02] transition-all duration-300`}
          >
            <Icon size={32} className="text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{invitation.intention}</h3>
            <p className="text-white/70 text-sm mb-4">{invitation.message.sacred}</p>
            <p className="text-white/40 text-xs mb-4">{invitation.message.economic}</p>
            <Link
              href={invitation.responsePathways[0] === 'premium-access' ? '/emergence-investment' : '/contact'}
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
            >
              {invitation.callToAction} →
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}