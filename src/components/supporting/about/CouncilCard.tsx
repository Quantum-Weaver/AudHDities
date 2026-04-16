// src/components/about/CouncilCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CouncilCardProps {
  icon: ReactNode;
  name: string;
  title: string;
  description: string;
  quote: string;
  color: 'cyan' | 'purple' | 'pink';
  delay?: number;
}

const gradientColors = {
  cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 hover:border-cyan-500/40',
  purple: 'from-purple-500/10 to-transparent border-purple-500/20 hover:border-purple-500/40',
  pink: 'from-pink-500/10 to-transparent border-pink-500/20 hover:border-pink-500/40',
};

const iconBgColors = {
  cyan: 'from-cyan-500/30 to-cyan-500/10 border-cyan-400/50',
  purple: 'from-purple-500/30 to-purple-500/10 border-purple-400/50',
  pink: 'from-pink-500/30 to-pink-500/10 border-pink-400/50',
};

const titleColors = {
  cyan: 'text-cyan-400/80',
  purple: 'text-purple-400/80',
  pink: 'text-pink-400/80',
};

const iconColors = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
};

export function CouncilCard({ icon, name, title, description, quote, color, delay = 0 }: CouncilCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className={`bg-gradient-to-br ${gradientColors[color]} border rounded-2xl p-8 text-center transition-all duration-500 h-full`}>
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${iconBgColors[color]} border-2 mx-auto mb-6 flex items-center justify-center text-3xl font-bold group-hover:scale-105 transition-transform duration-500`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className={`text-sm ${titleColors[color]} mb-4`}>{title}</p>
        <p className="text-white/60 text-sm">{description}</p>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className={`text-xs text-white/40 italic ${iconColors[color]}`}>
            "{quote}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}