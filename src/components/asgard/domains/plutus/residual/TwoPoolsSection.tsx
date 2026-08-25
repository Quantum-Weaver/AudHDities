// src/components/asgard/domains/plutus/residual/TwoPoolsSection.tsx
'use client';

import { TrendingUp, HandCoins } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { CardHeader, CardContent } from '@/components/runes/cards';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// CARD DATA
// ============================================================================

const residualPoolData: CardData = {
  id: 'residual-pool',
  type: 'value',
  title: 'Residual Pool',
  description: 'Pays every artisan on the platform, equally',
  value: '0-50%',
};

const covenantPoolData: CardData = {
  id: 'covenant-pool',
  type: 'value',
  title: 'Covenant Pool',
  description: 'The dignity floor — pays every opted-in user, equally',
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
        30% of every sale&apos;s fee, always &mdash; plus a pledge of 0-50% of a ware&apos;s profit
      </span>
    ),
  },
  {
    label: 'Purpose',
    value:
      'Pay every artisan on the platform — any vessel ever standing as an artisan or on a contributor roster',
  },
  {
    label: 'Distribution',
    value: 'Equal shares, at intervals, arriving whole',
  },
  {
    label: 'Set By',
    value: "The ware's main artisan, per ware (default 0)",
  },
];

const covenantMetadata = [
  {
    label: 'Source',
    value: (
      <span className="text-[var(--color-sanctuary-green)] font-medium">
        0-50% of a vessel&apos;s own share of a sale
      </span>
    ),
  },
  {
    label: 'Purpose',
    value: 'The dignity floor, held open for every user of the Sanctuary',
  },
  {
    label: 'Distribution',
    value: 'Equal shares to every user who has opted in to be identified, arriving whole',
  },
  {
    label: 'Set By',
    value: 'Each vessel, in the Sanctum (voluntary, default 0)',
  },
];

// ============================================================================
// TWO POOLS SECTION COMPONENT
// ============================================================================

export function TwoPoolsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-star-dust text-center mb-8">
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
            description="The residual pool takes 30% of every sale's fee, always, plus whatever a ware's main artisan pledges out of that ware's profit — 0-50%, default 0. It pays every artisan on the platform in equal shares."
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
            description="Every vessel sets one covenant dial in the Sanctum — 0-50% of their own share of a sale, default 0. It pays every user who has opted in to be identified, in equal shares, forever."
            metadata={covenantMetadata}
          />
        </Card>
      </div>
    </section>
  );
}