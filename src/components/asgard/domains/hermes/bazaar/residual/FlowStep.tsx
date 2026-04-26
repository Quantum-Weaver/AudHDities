'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type FlowStepColor = 'cyan' | 'purple' | 'pink' | 'green';

interface FlowStepProps {
  label: string;
  amount: string;
  description: string;
  color: FlowStepColor;
  delay?: number;
}

// ============================================================================
// COSMIC-DERIVED COLOR MAPS
// ============================================================================

const bgColors: Record<FlowStepColor, string> = {
  cyan: 'bg-[var(--color-cosmic-blue)]/10',
  purple: 'bg-[var(--color-quantum-purple)]/10',
  pink: 'bg-[var(--color-fire-base)]/10',
  green: 'bg-[var(--color-sanctuary-green)]/10',
};

const borderColors: Record<FlowStepColor, string> = {
  cyan: 'border-[var(--color-cosmic-blue)]/30',
  purple: 'border-[var(--color-quantum-purple)]/30',
  pink: 'border-[var(--color-fire-base)]/30',
  green: 'border-[var(--color-sanctuary-green)]/30',
};

const textColors: Record<FlowStepColor, string> = {
  cyan: 'text-[var(--color-cosmic-blue)]',
  purple: 'text-[var(--color-quantum-purple)]',
  pink: 'text-[var(--color-fire-base)]',
  green: 'text-[var(--color-sanctuary-green)]',
};

// ============================================================================
// FLOW STEP COMPONENT
// ============================================================================

export function FlowStep({ label, amount, description, color, delay = 0 }: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className={cn(
        'rounded-xl p-5 text-center border',
        bgColors[color],
        borderColors[color]
      )}
    >
      <div className={cn('text-2xl font-bold mb-2', textColors[color])}>
        {amount}
      </div>
      <div className="text-white font-medium mb-1">{label}</div>
      <div className="text-xs text-[var(--color-star-dust)]/40">{description}</div>
    </motion.div>
  );
}