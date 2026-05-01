// src/components/ux/PrincipleCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';

interface PrincipleCardProps {
  title: string;
  description: string;
  examples?: {
    avoid: string[];
    use: string[];
  };
  defaultOpen?: boolean;
}

export function PrincipleCard({ title, description, examples, defaultOpen = false }: PrincipleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div>
          <h3 className="text-xl font-bold text-star-dust">{title}</h3>
          <p className="text-star-dust/60 text-sm mt-1">{description}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-star-dust/40" size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && examples && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <X size={16} />
                    <span className="text-sm font-medium">Avoid</span>
                  </div>
                  {examples.avoid.map((item, idx) => (
                    <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-star-dust/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Check size={16} />
                    <span className="text-sm font-medium">Use Instead</span>
                  </div>
                  {examples.use.map((item, idx) => (
                    <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-star-dust/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}