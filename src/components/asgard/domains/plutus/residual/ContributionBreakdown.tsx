// src/components/asgard/domains/plutus/residual/ContributionBreakdown.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Lightbulb, Users, Package, Settings } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { CardHeader, CardContent } from '@/components/runes/cards';
import type { CardData } from '@/types/components/runes/card.types';
import type { FlowStepColor } from './FlowStep';

// ============================================================================
// TYPES
// ============================================================================

interface ContributionType {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
  color: FlowStepColor;
}

// ============================================================================
// DATA
// ============================================================================

const contributionTypes: ContributionType[] = [
  { icon: Code, label: 'Code', color: 'cyan', description: 'Technical implementation' },
  { icon: Palette, label: 'Design', color: 'purple', description: 'Visual & user experience' },
  { icon: Lightbulb, label: 'Concept', color: 'pink', description: 'Ideas & intellectual property' },
  { icon: Users, label: 'Testing', color: 'green', description: 'Quality assurance & feedback' },
  { icon: Package, label: 'Content', color: 'cyan', description: 'Writing, art, media' },
  { icon: Settings, label: 'Infrastructure', color: 'purple', description: 'Hosting & operations' },
];

// ============================================================================
// COSMIC-DERIVED COLOR MAPS
// ============================================================================

const iconBgColors: Record<FlowStepColor, string> = {
  cyan: 'bg-[var(--color-cosmic-blue)]/20',
  purple: 'bg-[var(--color-quantum-purple)]/20',
  pink: 'bg-[var(--color-fire-base)]/20',
  green: 'bg-[var(--color-sanctuary-green)]/20',
};

const iconTextColors: Record<FlowStepColor, string> = {
  cyan: 'text-[var(--color-cosmic-blue)]',
  purple: 'text-[var(--color-quantum-purple)]',
  pink: 'text-[var(--color-fire-base)]',
  green: 'text-[var(--color-sanctuary-green)]',
};

const borderColors: Record<FlowStepColor, string> = {
  cyan: 'border-[var(--color-cosmic-blue)]/20',
  purple: 'border-[var(--color-quantum-purple)]/20',
  pink: 'border-[var(--color-fire-base)]/20',
  green: 'border-[var(--color-sanctuary-green)]/20',
};

const bgColors: Record<FlowStepColor, string> = {
  cyan: 'bg-[var(--color-cosmic-blue)]/5',
  purple: 'bg-[var(--color-quantum-purple)]/5',
  pink: 'bg-[var(--color-fire-base)]/5',
  green: 'bg-[var(--color-sanctuary-green)]/5',
};

// ============================================================================
// HELPERS
// ============================================================================

function buildContributionCardData(type: ContributionType): CardData {
  return {
    id: `contribution-${type.label.toLowerCase()}`,
    type: 'value',
    title: type.label,
    description: type.description,
    value: type.label,
  };
}

// ============================================================================
// CONTRIBUTION CARD
// ============================================================================

interface ContributionCardProps {
  type: ContributionType;
  delay: number;
}

function ContributionCard({ type, delay }: ContributionCardProps) {
  const cardData = buildContributionCardData(type);
  const Icon = type.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <Card
        data={cardData}
        variant="ghost"
        radius="lg"
        shadow="sm"
        className={`text-center border ${borderColors[type.color]} ${bgColors[type.color]}`}
      >
        <CardHeader
          title={type.label}
          badge={
            <div
              className={`w-12 h-12 rounded-lg ${iconBgColors[type.color]} flex items-center justify-center`}
            >
              <Icon size={24} className={iconTextColors[type.color]} />
            </div>
          }
        />
        <CardContent description={type.description} />
      </Card>
    </motion.div>
  );
}

// ============================================================================
// CONTRIBUTION BREAKDOWN COMPONENT
// ============================================================================

export function ContributionBreakdown() {
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-star-dust mb-2">Every Contribution Matters</h3>
        <p className="text-[var(--color-star-dust)]/60">
          Different types of contributions earn different shares
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {contributionTypes.map((type, idx) => (
          <ContributionCard
            key={type.label}
            type={type}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </div>
  );
}