// src/components/asgard/domains/plutus/residual/SourceAttribution.tsx
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
    name: 'wares.residual_pool_percent · works.residual_pool_percent',
    icon: Database,
    color: 'cyan',
    description:
      "The residual pledge, per ware: 0-50% of that ware's profit — the 90% left after the fee — set by its main artisan, default 0",
  },
  {
    name: 'ware_participants · work_participants · artisan_profiles',
    icon: Database,
    color: 'purple',
    description:
      'Who contributed — never by how much. The residual pool’s headcount is every distinct vessel standing on any of the three, ever',
  },
  {
    name: 'residual_pool · covenant_pool',
    icon: Database,
    color: 'pink',
    description:
      'One balance each, and that balance is the whole state. A share is worked out at the moment of distribution: pool divided by recipients, less the transaction cost',
  },
  {
    name: 'user_financial.covenant_pool_percent',
    icon: Code,
    color: 'green',
    description:
      "Each vessel's own covenant dial, set in the Sanctum: 0-50% of their own share of a sale, default 0, never applied to a pool payout",
  },
  {
    name: 'ledger',
    icon: FileText,
    color: 'cyan',
    description:
      "Every movement, viewable by anyone — the fee's own 70/30 split included, and what each pool is holding",
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
            <span className="font-mono text-sm text-star-dust">{source.name}</span>
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