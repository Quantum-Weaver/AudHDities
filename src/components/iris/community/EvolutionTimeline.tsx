// src/components/community/EvolutionTimeline.tsx
'use client';

import { motion } from 'framer-motion';
import { evolutionStages } from '@/data/core/evolution-data';

export function EvolutionTimeline() {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 hidden md:block" />
      
      <div className="space-y-12">
        {evolutionStages.map((stage, idx) => (
          <motion.div
            key={stage.age}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-6 ${
              idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="md:w-1/2" />
            
            <div className="md:w-1/2 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{stage.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{stage.identity}</h3>
                  <p className="text-sm text-cyan-400">{stage.age}</p>
                </div>
              </div>
              <p className="text-white/80 mb-2">{stage.description}</p>
              <p className="text-sm text-white/40 italic">{stage.wisdom}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}