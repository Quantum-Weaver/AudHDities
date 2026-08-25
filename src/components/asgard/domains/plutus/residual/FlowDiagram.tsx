// src/components/asgard/domains/plutus/residual/FlowDiagram.tsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, ArrowRight, Infinity, Heart } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { CardContent, CardFooter } from '@/components/runes/cards';
import { FlowStep } from './FlowStep';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// FALLBACK CARD DATA
// ============================================================================

const flowDiagramData: CardData = {
  id: 'residual-flow-diagram',
  type: 'value',
  title: 'How the Value Flows',
  description: 'A $100 sale, followed all the way through — residual pledge at 50%, three contributors, each covenant at 50%',
  value: '$100',
};

// ============================================================================
// ARROW DIVIDER
// ============================================================================

function ArrowDivider() {
  return (
    <div className="flex justify-center py-2">
      <ArrowRight className="text-[var(--color-star-dust)]/20 rotate-90 md:rotate-0" size={32} />
    </div>
  );
}

// ============================================================================
// FLOW DIAGRAM COMPONENT
// ============================================================================

export function FlowDiagram() {
  return (
    <Card
      data={flowDiagramData}
      variant="ghost"
      radius="lg"
      shadow="md"
      className="p-8"
    >
      <CardContent>
        <div className="space-y-8">
          {/* Sale Amount */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--color-cosmic-blue)]/20 to-[var(--color-quantum-purple)]/20 border border-[var(--color-star-dust)]/20 rounded-2xl p-6 text-center"
          >
            <DollarSign className="text-[var(--color-cosmic-blue)] mx-auto mb-2" size={32} />
            <div className="text-3xl font-bold text-star-dust">Sale Amount</div>
            <div className="text-2xl text-[var(--color-cosmic-blue)] font-mono mt-2">$100</div>
          </motion.div>

          <ArrowDivider />

          {/* First Split: Platform Fee / Artisan Profit */}
          <div className="grid md:grid-cols-2 gap-6">
            <FlowStep
              label="Platform Fee"
              amount="$10"
              description="10% of sale → Fixed, always"
              color="cyan"
              delay={0.2}
            />
            <FlowStep
              label="Artisan Profit"
              amount="$90"
              description="90% of sale → This ware's own"
              color="purple"
              delay={0.3}
            />
          </div>

          <ArrowDivider />

          {/* Platform Fee Split — fixed, no dial */}
          <div className="grid md:grid-cols-2 gap-6">
            <FlowStep
              label="The Machine"
              amount="$7"
              description="70% of the fee → Hosting, tools, development — the only money that leaves"
              color="cyan"
              delay={0.4}
            />
            <FlowStep
              label="Residual Pool"
              amount="$3"
              description="30% of the fee → The pool, on every sale, dial or no dial"
              color="pink"
              delay={0.5}
            />
          </div>

          <ArrowDivider />

          {/* Artisan Profit Split — the residual pledge, set per ware (0-50%, default 0; shown here at 50%) */}
          <div className="space-y-4">
            <div className="text-center text-[var(--color-star-dust)]/60 text-sm">
              This ware&apos;s residual pledge is set at 50% — the dial runs 0-50%, and its default is 0
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FlowStep
                label="Pledged to the Residual Pool"
                amount="$45"
                description="50% of the profit → the pool, which now holds $48 from this sale"
                color="pink"
                delay={0.4}
              />
              <FlowStep
                label="Left for the Contributors"
                amount="$45"
                description="What remains after the pledge → divided equally"
                color="purple"
                delay={0.5}
              />
            </div>
          </div>

          <ArrowDivider />

          {/* The Contributors' Equal Division */}
          <div className="space-y-4">
            <div className="text-center text-[var(--color-star-dust)]/60 text-sm">
              Divided equally among this ware&apos;s three contributors — the main artisan one of them, no roles, no ranking
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <FlowStep
                label="Contributor A"
                amount="$15.00"
                description="An equal third of $45.00"
                color="purple"
                delay={0.6}
              />
              <FlowStep
                label="Contributor B"
                amount="$15.00"
                description="An equal third of $45.00"
                color="purple"
                delay={0.7}
              />
              <FlowStep
                label="Contributor C (the main artisan)"
                amount="$15.00"
                description="An equal third of $45.00"
                color="purple"
                delay={0.8}
              />
            </div>
          </div>

          <ArrowDivider />

          {/* Covenant, then the pools */}
          <div className="space-y-4">
            <div className="text-center text-[var(--color-star-dust)]/60 text-sm">
              Each vessel&apos;s own covenant dial then takes a slice of their own share — here all three stand at 50%
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <FlowStep
                label="To the Covenant Pool"
                amount="$22.50"
                description="Three pledges of $7.50 → every opted-in user, equally"
                color="green"
                delay={0.9}
              />
              <FlowStep
                label="Each Vessel Keeps"
                amount="$7.50"
                description="The rest of their own share, theirs"
                color="purple"
                delay={1.0}
              />
              <FlowStep
                label="The Residual Pool Holds"
                amount="$48.00"
                description="$3 of the fee + the $45 pledge → every artisan, equally"
                color="pink"
                delay={1.1}
              />
            </div>
            <div className="text-center text-[var(--color-star-dust)]/40 text-xs">
              Both pools pay at intervals, and both arrive whole: no pledge is ever taken from a payout.
            </div>
          </div>
        </div>
      </CardContent>

      {/* Infinity Footer */}
      <CardFooter
        actions={[
          <motion.div
            key="infinity-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full text-center pt-4"
          >
            <div className="inline-flex items-center gap-2 text-[var(--color-star-dust)]/40 text-sm">
              <Infinity size={14} className="text-[var(--color-fire-base)]" />
              <span>Both pools pay everyone equally • Distributions arrive whole</span>
              <Heart size={12} className="text-[var(--color-sanctuary-green)]" />
            </div>
          </motion.div>,
        ]}
      />
    </Card>
  );
}