// src/components/forge/StepCard/tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: number;
}

export function StepCard({ number, title, description, children, delay = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-6"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
          <span className="text-neurospark font-bold">{number}</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-star-dust mb-2">{title}</h3>
        <p className="text-star-dust/60 mb-4">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
}