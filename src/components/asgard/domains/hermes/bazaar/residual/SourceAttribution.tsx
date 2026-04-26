'use client';

import { motion } from 'framer-motion';
import { Database, Code, FileText } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from '@/components/runes/cards';
import type { CardData } from '@/types/components/runes/card.types';
import type { FlowStepColor } from './FlowStep';

// ============================================================================
// TYPES
// ============================================================================

interface AttributionSource {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: FlowStepColor;
  description: string;
}

// ============================================================================
// DATA
// ============================================================================

const sources: AttributionSource[] = [
  {
    name: 'products.residual_pool_percent',
    icon: Database,
    color: 'cyan',
    description: 'Sets the percentage of platform fees that flow to contributors',
  },
  {
    name: 'contributions table',
    icon: Database,
    color: 'purple',
    description: 'Stores who contributed what and their share percentage',
  },
  {
    name: 'residual_payouts table',
    icon: Database,
    color: 'pink',
    description: 'Records every residual payment to every contributor',
  },
  {
    name: 'Database Triggers',
    icon: Code,
    color: 'green',
    description: 'Automatically calculate and create payouts on every sale',
  },
  {
    name: 'Public Ledger View',
    icon: FileText,
    color: 'cyan',
    description: 'Viewable by anyone for full transparency',
  },
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

function buildSourceCardData(source: AttributionSource): CardData {
  return {
    id: `source-${source.name.replace(/[.\s]/g, '-')}`,
    type: 'value',
    title: source.name,
    description: source.description,
    value: source.name,
  };
}

// ============================================================================
// SOURCE CARD
// ============================================================================

interface SourceCardProps {
  source: AttributionSource;
  delay: number;
}

function SourceCard({ source, delay }: SourceCardProps) {
  const cardData = buildSourceCardData(source);
  const Icon = source.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <Card
        data={cardData}
        variant="ghost"
        radius="md"
        shadow="none"
        className={`border ${borderColors[source.color]} ${bgColors[source.color]}`}
      >
        <CardHeader
          title={
            <span className="font-mono text-sm text-white">{source.name}</span>
          }
          subtitle={source.description}
          badge={
            <div
              className={`w-10 h-10 rounded-lg ${iconBgColors[source.color]} flex items-center justify-center flex-shrink-0`}
            >
              <Icon size={18} className={iconTextColors[source.color]} />
            </div>
          }
        />
      </Card>
    </motion.div>
  );
}

// ============================================================================
// SOURCE ATTRIBUTION COMPONENT
// ============================================================================

export function SourceAttribution() {
  return (
    <div className="space-y-3">
      {sources.map((source, idx) => (
        <SourceCard
          key={source.name}
          source={source}
          delay={idx * 0.1}
        />
      ))}
    </div>
  );
}