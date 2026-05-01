// src/components/asgard/domains/hephaestus/onboarding/StepCard.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface StepCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
  completed?: boolean;
  isLast?: boolean;
}

export function StepCard({ step, title, children, completed = false, isLast = false }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.1 }}
      className="relative"
    >
      <div className="flex gap-6">
        {/* Step Number / Icon */}
        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
            completed 
              ? 'bg-green-500/20 border-green-400 text-green-400'
              : 'bg-white/10 border-white/30 text-star-dust/60'
          }`}>
            {completed ? (
              <CheckCircle size={20} />
            ) : (
              <span className="text-lg font-bold">{step}</span>
            )}
          </div>
          {!isLast && (
            <div className="w-0.5 h-full min-h-[4rem] bg-white/20 mt-2" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-12">
          <h3 className="text-xl font-bold text-star-dust mb-4">{title}</h3>
          <div className="prose prose-invert max-w-none text-star-dust/70">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}