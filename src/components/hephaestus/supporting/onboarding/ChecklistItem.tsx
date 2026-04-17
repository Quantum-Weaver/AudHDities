// src/components/onboarding/InfoTable.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface ChecklistItemProps {
  text: string;
  completed?: boolean;
  onClick?: () => void;
}

export function ChecklistItem({ text, completed = false, onClick }: ChecklistItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        completed 
          ? 'bg-green-500/10 border border-green-500/30' 
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      {completed ? (
        <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
      ) : (
        <Circle size={20} className="text-white/40 flex-shrink-0" />
      )}
      <span className={completed ? 'text-green-400 line-through' : 'text-white/80'}>
        {text}
      </span>
    </motion.div>
  );
}