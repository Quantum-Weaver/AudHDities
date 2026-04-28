// src/components/hephaestus/business/StatCard.tsx
'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface StatCardProps {
  value: number;
  label: string;
  description: string;
  prefix?: string;
  suffix?: string;
  color?: 'cyan' | 'purple' | 'pink' | 'green' | 'yellow' | 'blue';
  delay?: number;
}

const colorClasses = {
  cyan: 'from-cyan-500/20 to-transparent border-cyan-500/30',
  purple: 'from-purple-500/20 to-transparent border-purple-500/30',
  pink: 'from-pink-500/20 to-transparent border-pink-500/30',
  green: 'from-green-500/20 to-transparent border-green-500/30',
  yellow: 'from-yellow-500/20 to-transparent border-yellow-500/30',
  blue: 'from-blue-500/20 to-transparent border-blue-500/30',
};

const textColors = {
  cyan: 'text-neurospark',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
};

export function StatCard({ value, label, description, prefix = '', suffix = '', color = 'cyan', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6 text-center`}
    >
      <div className={`text-4xl md:text-5xl font-bold ${textColors[color]} mb-2`}>
        {prefix}
        <CountUp end={value} duration={2.5} separator="," />
        {suffix}
      </div>
      <div className="text-star-dust font-medium mb-2">{label}</div>
      <div className="text-star-dust/40 text-sm">{description}</div>
    </motion.div>
  );
}