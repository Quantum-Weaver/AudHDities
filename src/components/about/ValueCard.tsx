// src/components/about/ValueCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: 'cyan' | 'purple' | 'pink' | 'green';
  delay?: number;
}

const borderColors = {
  cyan: 'border-l-cyan-400',
  purple: 'border-l-purple-400',
  pink: 'border-l-pink-400',
  green: 'border-l-green-400',
};

const shadowColors = {
  cyan: 'shadow-cyan-500/10',
  purple: 'shadow-purple-500/10',
  pink: 'shadow-pink-500/10',
  green: 'shadow-green-500/10',
};

const iconColors = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
};

export function ValueCard({ icon, title, description, color, delay = 0 }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`p-6 border-l-4 ${borderColors[color]} hover:shadow-lg ${shadowColors[color]} transition-all duration-300`}>
        <div className={iconColors[color]}>{icon}</div>
        <h3 className="text-xl font-bold text-white mt-4 mb-2">{title}</h3>
        <p className="text-white/60">{description}</p>
      </Card>
    </motion.div>
  );
}