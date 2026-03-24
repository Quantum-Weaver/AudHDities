// src/components/residual/FlowDiagram.tsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Infinity, ArrowRight } from 'lucide-react';

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

      {/* First Split */}
      <div className="grid md:grid-cols-2 gap-6">
        <FlowStep 
          label="Platform Fee" 
          amount="$30" 
          description="30% of sale → Operations & Residual Pool"
          color="cyan"
          delay={0.2}
        />
        <FlowStep 
          label="Creator Pool" 
          amount="$70" 
          description="70% of sale → Creator & Contributors"
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

      {/* Creator Pool Split */}
      <div className="grid md:grid-cols-2 gap-6">
        <FlowStep 
          label="Creator Immediate" 
          amount="$35" 
          description="50% of creator pool → Instant payout"
          color="purple"
          delay={0.4}
        />
        <FlowStep 
          label="Contributor Pool" 
          amount="$35" 
          description="50% of creator pool → Shared forever"
          color="pink"
          delay={0.5}
        />
      </div>

      {/* Split Arrow */}
      <div className="flex justify-center">
        <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={32} />
      </div>

      {/* Contributor Split */}
      <div className="space-y-4">
        <div className="text-center text-white/60 text-sm mb-4">
          Distributed by contribution percentage
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <FlowStep 
            label="Contributor A" 
            amount="$14" 
            description="40% of contributor pool"
            color="pink"
            delay={0.6}
          />
          <FlowStep 
            label="Contributor B" 
            amount="$12.25" 
            description="35% of contributor pool"
            color="pink"
            delay={0.7}
          />
          <FlowStep 
            label="Contributor C" 
            amount="$8.75" 
            description="25% of contributor pool"
            color="pink"
            delay={0.8}
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
          <span>This flow repeats for every sale, forever</span>
        </div>
      </motion.div>
    </div>
  );
}