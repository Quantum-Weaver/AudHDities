// @/components/asgard/domains/mnemosyne/schema/SchemaEnumCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, List } from 'lucide-react';
import type { SchemaEnum } from '@/lib/schema/parseDatabaseTypes';

interface SchemaEnumCardProps {
  enumType: SchemaEnum;
  defaultOpen?: boolean;
}

export function SchemaEnumCard({ enumType, defaultOpen = false }: SchemaEnumCardProps) {
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
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <List className="text-purple-400" size={14} />
          </div>
          <div>
            <h3 className="text-white font-medium">{enumType.name}</h3>
            <p className="text-xs text-white/40">{enumType.values.length} values</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-white/40" size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {enumType.values.map((value) => (
                  <span
                    key={value}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-mono"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}