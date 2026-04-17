// src/components/hermes/bazaar/residual/FlowDiagram.tsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Infinity, ArrowRight, Heart } from 'lucide-react';

interface FlowStepProps {
  label: string;
  amount: string;
  description: string;
  color: string;
  delay?: number;
}

function FlowStep({ label, amount, description, color, delay = 0 }: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className={`bg-${color}-500/10 border border-${color}-500/30 rounded-xl p-5 text-center`}
    >
      <div className={`text-2xl font-bold text-${color}-400 mb-2`}>{amount}</div>
      <div className="text-white font-medium mb-1">{label}</div>
      <div className="text-xs text-white/40">{description}</div>
    </motion.div>
  );
}

export function FlowDiagram() {
  return (
    <div className="space-y-8">
      {/* Sale Amount */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6 text-center"
      >
        <DollarSign className="text-cyan-400 mx-auto mb-2" size={32} />
        <div className="text-3xl font-bold text-white">Sale Amount</div>
        <div className="text-2xl text-cyan-400 font-mono mt-2">$100</div>
      </motion.div>

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

      {/* First Split: 10% Platform / 90% Creator */}
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

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

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

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

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

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

      {/* Residual Pool Distribution */}
      <div className="space-y-4">
        <div className="text-center text-white/60 text-sm mb-4">
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

      {/* Covenant Pool Distribution */}
      <div className="space-y-4 mt-4">
        <div className="text-center text-white/60 text-sm mb-4">
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

      {/* Infinity Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-8"
      >
        <div className="inline-flex items-center gap-2 text-white/40 text-sm">
          <Infinity size={14} className="text-pink-400" />
          <span>Residuals flow forever • Covenant flows to community</span>
          <Heart size={12} className="text-green-400" />
        </div>
      </motion.div>
    </div>
  );
}