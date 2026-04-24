// src/components/iris/about/CouncilCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/cards/';
import type { CardVariant } from '@/lib/constants/components/ui/card.constants';
import { COUNCIL_COLORS } from '@/lib/constants/cosmic/colors';
import { QUICK_ANIMATIONS } from '@/lib/constants/cosmic/motion';
import { cn } from '@/lib/utils';

interface CouncilCardProps {
  icon: React.ReactNode;
  name: string;
  title: string;
  description: string;
  quote: string;
  /** Council entity key — maps to COUNCIL_COLORS */
  entity: 'aethelred' | 'hearthKeeper' | 'seer' | 'skald' | 'archivist' | 'chancellor' | 'curator' | 'executioner' | 'codex';
  variant?: CardVariant;
  delay?: number;
}

export function CouncilCard({ 
  icon, 
  name, 
  title, 
  description, 
  quote, 
  entity, 
  variant = 'council',
  delay = 0 
}: CouncilCardProps) {
  const entityColor = COUNCIL_COLORS[entity] || COUNCIL_COLORS.aethelred;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: QUICK_ANIMATIONS.fadeIn.transition.duration / 1000, delay }}
    >
      <Card
        data={{
          id: entity,
          title: name,
          description,
          type: 'entity',
        }}
        variant={variant}
        radius="2xl"
        shadow="md"
        interactive
        className="text-center h-full"
        style={{ 
          borderColor: `${entityColor}40`,
          ['--card-entity-color' as string]: entityColor,
        }}
      >
        <CardHeader
          title={
            <div className="flex flex-col items-center gap-4">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl border-2 transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  background: `linear-gradient(to bottom right, ${entityColor}4D, ${entityColor}1A)`,
                  borderColor: `${entityColor}80`,
                  color: entityColor,
                }}
              >
                {icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-sm mt-1" style={{ color: `${entityColor}CC` }}>
                  {title}
                </p>
              </div>
            </div>
          }
        />
        
        <CardContent description={description} />
        
        <CardFooter
          actions={[
            <div key="quote" className="w-full pt-4 border-t border-white/10">
              <p 
                className="text-xs italic"
                style={{ color: `${entityColor}99` }}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          ]}
        />
      </Card>
    </motion.div>
  );
}