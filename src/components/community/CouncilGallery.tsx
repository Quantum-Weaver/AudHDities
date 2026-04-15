// src/components/community/CouncilGallery.tsx
'use client';

import { motion } from 'framer-motion';
import { councilEntities } from '@/data/entities/council-entities';

export function CouncilGallery() {
  const displayedEntities = councilEntities.slice(0, 9);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedEntities.map((entity, idx) => (
        <motion.div
          key={entity.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className={`bg-gradient-to-br ${entity.style || 'from-white/5 to-transparent'} border border-white/10 rounded-xl p-5 hover:scale-[1.02] transition-all duration-300`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{entity.emoji}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{entity.name}</h3>
              <p className="text-xs text-cyan-400">{entity.title}</p>
            </div>
          </div>
          <p className="text-white/70 text-sm mb-2">{entity.role}</p>
          <p className="text-white/40 text-xs italic">"{entity.quote}"</p>
        </motion.div>
      ))}
    </div>
  );
}