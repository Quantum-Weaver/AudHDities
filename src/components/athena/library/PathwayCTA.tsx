// components/learn/PathwayCTA.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathwayCTAProps {
  hasStarted: boolean;
  nextLessonId?: string;
  onStart: () => void;
  color: 'cyan' | 'purple' | 'pink' | 'orange';
}

const buttonGradients = {
  cyan: 'from-cyan-600 to-cyan-500',
  purple: 'from-purple-600 to-purple-500',
  pink: 'from-pink-600 to-pink-500',
  orange: 'from-orange-600 to-orange-500',
};

export function PathwayCTA({ hasStarted, nextLessonId, onStart, color }: PathwayCTAProps) {
  const gradient = buttonGradients[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 text-center"
    >
      <button
        onClick={onStart}
        className={cn(
          'px-8 py-4 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300',
          'hover:scale-105 hover:shadow-lg',
          gradient
        )}
      >
        <span className="flex items-center gap-2">
          {hasStarted ? (
            <>Continue Journey <ArrowRight size={18} /></>
          ) : (
            <>Begin First Lesson <Sparkles size={18} /></>
          )}
        </span>
      </button>
      <p className="text-sm text-white/40 mt-4">
        All pathways are self-paced. No deadlines. No pressure.
      </p>
    </motion.div>
  );
}