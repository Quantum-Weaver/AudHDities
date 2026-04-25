'use client';

import { motion } from 'framer-motion';
import { DollarSign, ArrowRight, Infinity, Heart } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CardContent, CardFooter } from '@/components/ui/cards';
import { FlowStep } from './FlowStep';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// FALLBACK CARD DATA
// ============================================================================

const flowDiagramData: CardData = {
  id: 'residual-flow-diagram',
  type: 'value',
  title: 'How the Value Flows',
  description: 'Visual breakdown of a $100 sale through the residual system',
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
            <div className="text-3xl font-bold text-white">Sale Amount</div>
            <div className="text-2xl text-[var(--color-cosmic-blue)] font-mono mt-2">$100</div>
          </motion.div>

          <ArrowDivider />

          {/* First Split: Platform Fee / Creator Earnings */}
          <div className="grid md:grid-cols-2 gap-6">
            <FlowStep
              label="Platform Fee"
              amount="$10"
              description="10% of sale → Fixed platform fee"
              color="cyan"
              delay={0.2}
            />
            <FlowStep
              label="Creator Earnings"
              amount="$90"
              description="90% of sale → Creator receives"
              color="purple"
              delay={0.3}
            />
          </div>

          <ArrowDivider />

          {/* Platform Fee Split */}
          <div className="grid md:grid-cols-2 gap-6">
            <FlowStep
              label="Operations"
              amount="$7"
              description="70% of platform fee → Hosting, tools, development"
              color="cyan"
              delay={0.4}
            />
            <FlowStep
              label="Residual Pool"
              amount="$3"
              description="30% of platform fee → Shared with contributors"
              color="pink"
              delay={0.5}
            />
          </div>

          <ArrowDivider />

          {/* Creator Earnings Split */}
          <div className="grid md:grid-cols-2 gap-6">
            <FlowStep
              label="Creator Immediate"
              amount="$72"
              description="80% of earnings → Instant payout"
              color="purple"
              delay={0.4}
            />
            <FlowStep
              label="Covenant Pool"
              amount="$18"
              description="20% of earnings → Community dignity fund"
              color="green"
              delay={0.5}
            />
          </div>

          <ArrowDivider />

          {/* Residual Pool Distribution */}
          <div className="space-y-4">
            <div className="text-center text-[var(--color-star-dust)]/60 text-sm">
              Distributed by contribution percentage
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <FlowStep
                label="Contributor A"
                amount="$1.20"
                description="40% of residual pool"
                color="pink"
                delay={0.6}
              />
              <FlowStep
                label="Contributor B"
                amount="$1.05"
                description="35% of residual pool"
                color="pink"
                delay={0.7}
              />
              <FlowStep
                label="Contributor C"
                amount="$0.75"
                description="25% of residual pool"
                color="pink"
                delay={0.8}
              />
            </div>
          </div>

          <ArrowDivider />

          {/* Covenant Pool Distribution */}
          <div className="space-y-4">
            <div className="text-center text-[var(--color-star-dust)]/60 text-sm">
              Distributed equally among active community members
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <FlowStep
                label="Community Member"
                amount="$0.036"
                description="Equal share for 500 members"
                color="green"
                delay={0.9}
              />
              <FlowStep
                label="Community Member"
                amount="$0.036"
                description="Equal share for 500 members"
                color="green"
                delay={1.0}
              />
              <FlowStep
                label="Community Member"
                amount="$0.036"
                description="Equal share for 500 members"
                color="green"
                delay={1.1}
              />
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
              <span>Residuals flow forever • Covenant flows to community</span>
              <Heart size={12} className="text-[var(--color-sanctuary-green)]" />
            </div>
          </motion.div>,
        ]}
      />
    </Card>
  );
}