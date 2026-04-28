// src/components/vision/PillarCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: 'cyan' | 'purple' | 'pink' | 'orange';
  delay?: number;
}

const iconBgColors = {
  cyan: 'bg-cyan-500/20',
  purple: 'bg-purple-500/20',
  pink: 'bg-pink-500/20',
  orange: 'bg-orange-500/20',
};

const iconColors = {
  cyan: 'text-neurospark',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  orange: 'text-orange-400',
};

const titleColors = {
  cyan: 'text-neurospark',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  orange: 'text-orange-400',
};

export function PillarCard({ icon, title, description, color, delay = 0 }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-full ${iconBgColors[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <div className={iconColors[color]}>{icon}</div>
          </div>
        </div>
        <div>
          <h3 className={`text-xl font-bold text-star-dust mb-2 ${titleColors[color]}`}>{title}</h3>
          <p className="text-star-dust/60">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}