// components/learn/PathwayHeader.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Award, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathwayHeaderProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  color: 'cyan' | 'purple' | 'pink' | 'orange';
  icon: React.ReactNode;
}

const colorClasses = {
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  orange: 'from-orange-500 to-orange-600',
};

const levelColors = {
  Beginner: 'bg-cyan-500/10 text-cyan-400',
  Intermediate: 'bg-purple-500/10 text-purple-400',
  Advanced: 'bg-pink-500/10 text-pink-400',
};

export function PathwayHeader({ 
  title, 
  description, 
  level, 
  duration, 
  totalLessons, 
  completedLessons, 
  color,
  icon 
}: PathwayHeaderProps) {
  const progress = (completedLessons / totalLessons) * 100;
  const gradient = colorClasses[color];

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Learning Hub
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            'w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center',
            gradient
          )}>
            {icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h1>
            <p className="text-white/60">
              {description}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
            <Clock size={14} className="text-white/40" />
            <span className="text-sm text-white/60">{duration}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
            <BookOpen size={14} className="text-white/40" />
            <span className="text-sm text-white/60">{totalLessons} lessons</span>
          </div>
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full',
            levelColors[level as keyof typeof levelColors]
          )}>
            <Award size={14} />
            <span className="text-sm">{level}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">Your Progress</span>
            <span className="text-white">
              {completedLessons}/{totalLessons} lessons completed
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className={cn('h-full bg-gradient-to-r', gradient)}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Long Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12"
      >
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-white/80 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}