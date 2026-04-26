// components/learn/PathwayCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathwayCardProps {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'pink' | 'orange';
  delay?: number;
}

const colorClasses = {
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    hover: 'group-hover:text-cyan-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    hover: 'group-hover:text-purple-400',
  },
  pink: {
    bg: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    hover: 'group-hover:text-pink-400',
  },
  orange: {
    bg: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    hover: 'group-hover:text-orange-400',
  },
};

const levelColors = {
  Beginner: 'bg-cyan-500/10 text-cyan-400',
  Intermediate: 'bg-purple-500/10 text-purple-400',
  Advanced: 'bg-pink-500/10 text-pink-400',
};

export function PathwayCard({ 
  slug, 
  title, 
  description, 
  level, 
  duration, 
  lessons, 
  icon, 
  color,
  delay = 0 
}: PathwayCardProps) {
  const styles = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/learn/pathways/${slug}`}
        className={cn(
          'group block bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300',
          'hover:bg-white/10 hover:scale-[1.02]',
          styles.border
        )}
      >
        {/* Icon and badges */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
            styles.bg
          )}>
            {icon}
          </div>
          <div className="flex gap-2">
            <span className={cn(
              'text-xs px-2 py-1 rounded-full',
              levelColors[level]
            )}>
              {level}
            </span>
            <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/40">
              {duration}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          'text-xl font-bold text-white mb-2 transition-colors',
          styles.hover
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <BookOpen size={12} />
            <span>{lessons} lessons</span>
          </div>
          <span className={cn(
            'text-sm flex items-center gap-1 transition-transform group-hover:translate-x-1',
            styles.text
          )}>
            Start Journey <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}