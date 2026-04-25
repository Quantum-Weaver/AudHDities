'use client';

import { TrendingUp, HandCoins } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { CardHeader, CardContent } from '@/components/ui/cards';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// CARD DATA
// ============================================================================

const residualPoolData: CardData = {
  id: 'residual-pool',
  type: 'value',
  title: 'Residual Pool',
  description: 'Reward contributors who helped create the product',
  value: '0-50%',
};

const covenantPoolData: CardData = {
  id: 'covenant-pool',
  type: 'value',
  title: 'Covenant Pool',
  description: 'Support community dignity fund for all active members',
  value: '0-50%',
};

// ============================================================================
// METADATA ITEMS
// ============================================================================

const residualMetadata = [
  {
    label: 'Source',
    value: (
      <span className="text-[var(--color-fire-base)] font-medium">
        0-50% of the platform fee
      </span>
    ),
  },
  {
    label: 'Purpose',
    value: 'Reward contributors who helped create the product',
  },
  {
    label: 'Distribution',
    value: 'Split according to contribution percentages set by creator',
  },
  {
    label: 'Set By',
    value: 'Creator per product',
  },
];

const covenantMetadata = [
  {
    label: 'Source',
    value: (
      <span className="text-[var(--color-sanctuary-green)] font-medium">
        0-50% of creator earnings
      </span>
    ),
  },
  {
    label: 'Purpose',
    value: 'Support community dignity fund for all active members',
  },
  {
    label: 'Distribution',
    value: 'Equal share to all active community members',
  },
  {
    label: 'Set By',
    value: 'Creator in profile (voluntary)',
  },
];

// ============================================================================
// TWO POOLS SECTION COMPONENT
// ============================================================================

export function TwoPoolsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Two Pools, One Sanctuary
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Residual Pool */}
        <Card
          data={residualPoolData}
          variant="sanctuary"
          radius="lg"
          shadow="md"
          className="border-l-4 border-l-[var(--color-fire-base)]"
        >
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-fire-base)]/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-[var(--color-fire-base)]" />
                </div>
                <span>Residual Pool</span>
              </div>
            }
          />
          <CardContent
            description="0-50% of the platform fee (creator chooses per product) flows to contributors who helped create the product."
            metadata={residualMetadata}
          />
        </Card>

        {/* Covenant Pool */}
        <Card
          data={covenantPoolData}
          variant="council"
          radius="lg"
          shadow="md"
          className="border-l-4 border-l-[var(--color-sanctuary-green)]"
        >
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-sanctuary-green)]/20 flex items-center justify-center">
                  <HandCoins size={16} className="text-[var(--color-sanctuary-green)]" />
                </div>
                <span>Covenant Pool</span>
              </div>
            }
          />
          <CardContent
            description="0-50% of creator earnings (voluntary, set in profile) supports the community dignity fund for all active members."
            metadata={covenantMetadata}
          />
        </Card>
      </div>
    </section>
  );
}