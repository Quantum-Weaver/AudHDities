// src/components/business/TwoStreamFlow.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, DollarSign, Users, Heart, ArrowRight } from 'lucide-react';

export function TwoStreamFlow() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Advertising Stream - UNCHANGED */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Shield className="text-neurospark" size={20} />
          </div>
          <h3 className="text-xl font-bold text-star-dust">Advertising Stream</h3>
        </div>
        
        <div className="space-y-4">
          <FlowItem 
            from="Advertiser" 
            to="Sanctuary Treasury" 
            amount="100%" 
            color="cyan"
            description="Payment for ethical ad placement"
          />
          <FlowItem 
            from="Sanctuary Treasury" 
            to="Operations" 
            amount="First" 
            color="cyan"
            description="Servers, tools, development"
          />
          <FlowItem 
            from="Remaining" 
            to="Opt-in Users" 
            amount="Equal Share" 
            color="cyan"
            description="Distributed equally among all who choose to see ads"
          />
        </div>
        
        <div className="mt-6 pt-4 border-t border-cyan-500/20">
          <p className="text-neurospark text-sm flex items-center gap-2">
            <Heart size={12} />
            No competition — all opt-in users receive the same share
          </p>
        </div>
      </motion.div>
      
      {/* Sales Stream - UPDATED with 10% fee + Covenant Pool */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <DollarSign className="text-purple-400" size={20} />
          </div>
          <h3 className="text-xl font-bold text-star-dust">Sales Stream</h3>
        </div>
        
        <div className="space-y-4">
          <FlowItem 
            from="Buyer" 
            to="Sanctuary Treasury" 
            amount="100%" 
            color="purple"
            description="Tiered pricing based on Acid Test"
          />
          
          {/* UPDATED: 90% Creator, 10% Platform */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <FlowItemMini label="Creator" percent="90%" color="purple" />
            <FlowItemMini label="Platform Fee" percent="10%" color="cyan" />
          </div>
          
          {/* UPDATED: Platform Fee splits into Operations + Residual Pool */}
          <div className="ml-4 pl-4 border-l-2 border-white/10">
            <FlowItem 
              from="Platform Fee (10%)" 
              to="Operations" 
              amount="50-70%" 
              color="cyan"
              description="Hosting, tools, development"
            />
            <FlowItem 
              from="Platform Fee (10%)" 
              to="Residual Pool" 
              amount="30-50%" 
              color="pink"
              description="Shared with product contributors (creator sets per product)"
            />
          </div>
          
          {/* UPDATED: Creator Earnings splits into Immediate + Covenant Pool */}
          <div className="ml-4 pl-4 border-l-2 border-white/10">
            <FlowItem 
              from="Creator Earnings (90%)" 
              to="Immediate Payment" 
              amount="50-100%" 
              color="purple"
              description="Creator keeps after covenant pledge"
            />
            <FlowItem 
              from="Creator Earnings (90%)" 
              to="Covenant Pool" 
              amount="0-50%" 
              color="green"
              description="Voluntary pledge to community dignity fund (creator sets in profile)"
            />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <p className="text-purple-400 text-sm flex items-center gap-2">
            <Heart size={12} />
            Creators set residual percentage (0-50% of platform fee) and covenant pledge (0-50% of earnings)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// FlowItem component (unchanged)
interface FlowItemProps {
  from: string;
  to: string;
  amount: string;
  color: 'cyan' | 'purple' | 'pink' | 'green';
  description?: string;
}

function FlowItem({ from, to, amount, color, description }: FlowItemProps) {
  const colors = {
    cyan: 'border-cyan-500/20 bg-cyan-500/5 text-neurospark',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
    pink: 'border-pink-500/20 bg-pink-500/5 text-pink-400',
    green: 'border-green-500/20 bg-green-500/5 text-green-400',
  };
  
  return (
    <div className={`border ${colors[color]} rounded-xl p-3`}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <span className="text-star-dust/80 text-sm">{from}</span>
        <ArrowRight size={14} className="text-star-dust/30" />
        <span className="text-star-dust font-medium">{to}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${colors[color]} border`}>{amount}</span>
      </div>
      {description && <p className="text-star-dust/40 text-xs mt-2">{description}</p>}
    </div>
  );
}

// FlowItemMini component (unchanged)
interface FlowItemMiniProps {
  label: string;
  percent: string;
  color: 'cyan' | 'purple' | 'pink' | 'green';
}

function FlowItemMini({ label, percent, color }: FlowItemMiniProps) {
  const colors = {
    cyan: 'border-cyan-500/20 bg-cyan-500/5 text-neurospark',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
    pink: 'border-pink-500/20 bg-pink-500/5 text-pink-400',
    green: 'border-green-500/20 bg-green-500/5 text-green-400',
  };
  
  return (
    <div className={`border ${colors[color]} rounded-lg p-2 text-center`}>
      <div className="text-star-dust/60 text-xs">{label}</div>
      <div className={`text-sm font-bold ${colors[color]}`}>{percent}</div>
    </div>
  );
}