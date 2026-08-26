// src/components/hephaestus/about/ValueCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from '@/components/runes/Card';
import { quickAnimations } from '@/lib/constants/cosmic/motion';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// TYPES
// ============================================================================

export type ValueCardAccent = 'cyan' | 'purple' | 'pink' | 'green';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: ValueCardAccent;
  delay?: number;
}

// ============================================================================
// COSMIC-DERIVED COLOR MAPS
// ============================================================================

const borderColors: Record<ValueCardAccent, string> = {
  cyan: 'border-l-[var(--color-cosmic-blue)]',
  purple: 'border-l-[var(--color-quantum-purple)]',
  pink: 'border-l-[var(--color-fire-base)]',
  green: 'border-l-[var(--color-sanctuary-green)]',
};

const shadowColors: Record<ValueCardAccent, string> = {
  cyan: 'shadow-[var(--color-cosmic-blue)]/10',
  purple: 'shadow-[var(--color-quantum-purple)]/10',
  pink: 'shadow-[var(--color-fire-base)]/10',
  green: 'shadow-[var(--color-sanctuary-green)]/10',
};

const iconColors: Record<ValueCardAccent, string> = {
  cyan: 'text-[var(--color-cosmic-blue)]',
  purple: 'text-[var(--color-quantum-purple)]',
  pink: 'text-[var(--color-fire-base)]',
  green: 'text-[var(--color-sanctuary-green)]',
};

function buildValueCardData(title: string, description: string): CardData {
  return {
    id: `value-${title.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'value',
    title,
    description,
    value: title, // Required by ValueCardData — serves as display fallback
  };
}

// ============================================================================
// VALUE CARD COMPONENT
// ============================================================================

export function ValueCard({ icon, title, description, color, delay = 0 }: ValueCardProps) {
  const cardData = buildValueCardData(title, description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        data={cardData}
        variant="ghost"
        radius="lg"
        shadow="md"
        className={`p-6 border-l-4 ${borderColors[color]} hover:shadow-lg ${shadowColors[color]} transition-all duration-300`}
      >
        <div className={iconColors[color]}>{icon}</div>
        <h3 className="text-xl font-bold text-star-dust mt-4 mb-2">{title}</h3>
        <p className="text-star-dust/60">{description}</p>
      </Card>
    </motion.div>
  );
}