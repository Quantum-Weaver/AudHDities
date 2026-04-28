// src/components/hephaestus/business/DignityFloor.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, Award, Heart, TrendingDown, Shield, Sparkles } from 'lucide-react';

const comparisons = [
  {
    metric: 'Monthly Active Users',
    traditional: 'Primary metric',
    audhdities: 'Not tracked',
    audhditiesIcon: Users,
    note: 'Activity level does not determine dignity',
  },
  {
    metric: 'Revenue Per User',
    traditional: 'Maximized',
    audhdities: 'Not measured',
    audhditiesIcon: TrendingDown,
    note: 'Extraction is not the goal',
  },
  {
    metric: 'Engagement Metrics',
    traditional: 'Optimized for addiction',
    audhdities: 'Designed for sovereignty',
    audhditiesIcon: Shield,
    note: 'Your attention is yours',
  },
  {
    metric: 'Disabled Members',
    traditional: 'Excluded by design',
    audhdities: 'Guaranteed dignity share',
    audhditiesIcon: Heart,
    note: 'Everyone belongs',
  },
  {
    metric: 'Residual Recipients',
    traditional: '0',
    audhdities: 'Every contributor, forever',
    audhditiesIcon: Award,
    note: 'No one is forgotten',
  },
  {
    metric: 'Data Ownership',
    traditional: 'Extracted and sold',
    audhdities: 'User sovereign',
    audhditiesIcon: Shield,
    note: 'Your data is yours',
  },
];

export function DignityFloor() {
  return (
    <div className="space-y-8">
      {/* Hero Statement */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-full mb-4">
          <Sparkles size={14} className="text-pink-400" />
          <span className="text-pink-400 text-sm">The Dignity Floor</span>
        </div>
        <p className="text-star-dust/70 max-w-2xl mx-auto">
          We measure what matters: how many people have dignity, not how many dollars we extract.
        </p>
      </div>
      
      {/* Comparison Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
          <div className="text-star-dust font-bold">What We Measure</div>
          <div className="text-star-dust/40 text-sm">Traditional Platforms</div>
          <div className="text-neurospark text-sm">AUDHDITIES</div>
        </div>
        
        {comparisons.map((comp, idx) => (
          <motion.div
            key={comp.metric}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <div className="text-star-dust text-sm">{comp.metric}</div>
            <div className="text-star-dust/40 text-sm">{comp.traditional}</div>
            <div className="flex items-center gap-2">
              <comp.audhditiesIcon size={14} className="text-neurospark" />
              <span className="text-neurospark text-sm">{comp.audhdities}</span>
              <span className="text-star-dust/30 text-xs ml-1">({comp.note})</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Closing Statement */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-xl p-6 text-center border border-white/10">
        <Heart className="text-pink-400 mx-auto mb-3" size={28} />
        <p className="text-star-dust/80 max-w-2xl mx-auto">
          In the sanctuary economy, your value is not determined by your productivity.
          <br />
          <span className="text-neurospark">You have dignity because you exist.</span>
        </p>
      </div>
    </div>
  );
}