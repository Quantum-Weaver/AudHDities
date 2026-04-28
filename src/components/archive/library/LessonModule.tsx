// components/learn/LessonModule.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, CheckCircle, Lock, Star, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface ModuleProps {
  title: string;
  lessons: Lesson[];
  color: 'cyan' | 'purple' | 'pink' | 'orange';
  onStartLesson?: (lessonId: string) => void;
}

const colorClasses = {
  cyan: 'border-cyan-500/30',
  purple: 'border-purple-500/30',
  pink: 'border-pink-500/30',
  orange: 'border-orange-500/30',
};

const iconColors = {
  cyan: 'text-neurospark',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  orange: 'text-orange-400',
};

export function LessonModule({ title, lessons, color, onStartLesson }: ModuleProps) {
  const [isOpen, setIsOpen] = useState(true);

  const completedCount = lessons.filter(l => l.completed).length;
  const totalCount = lessons.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white/5 border rounded-xl overflow-hidden',
        colorClasses[color]
      )}
    >
      {/* Module Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn('text-sm font-medium', iconColors[color])}>
            {completedCount}/{totalCount}
          </div>
          <h3 className="text-lg font-semibold text-star-dust">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-star-dust/40" />
        </motion.div>
      </button>

      {/* Module Lessons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-white/5 border-t border-white/5">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => !lesson.locked && onStartLesson?.(lesson.id)}
                  className={cn(
                    'px-6 py-4 flex items-center justify-between transition-colors',
                    !lesson.locked && 'hover:bg-white/5 cursor-pointer'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle size={18} className="text-green-400" />
                    ) : lesson.locked ? (
                      <Lock size={18} className="text-star-dust/20" />
                    ) : (
                      <PlayCircle size={18} className={iconColors[color]} />
                    )}
                    <div>
                      <h4 className={cn(
                        'font-medium',
                        lesson.completed ? 'text-star-dust/60' : 'text-star-dust'
                      )}>
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-star-dust/40">{lesson.duration}</p>
                    </div>
                  </div>
                  
                  {!lesson.locked && !lesson.completed && (
                    <button className={cn(
                      'text-sm font-medium hover:underline',
                      iconColors[color]
                    )}>
                      Start
                    </button>
                  )}
                  
                  {lesson.completed && (
                    <span className="text-sm text-green-400">Completed</span>
                  )}
                  
                  {lesson.locked && (
                    <span className="text-sm text-star-dust/20">Locked</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}