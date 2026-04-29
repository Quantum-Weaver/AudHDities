// @/components/asgard/domains/mnemosyne/observatory/schema/SchemaTableCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Link, Columns } from 'lucide-react';
import type { SchemaTable } from '@/lib/schema/parseDatabaseTypes';

interface SchemaTableCardProps {
  table: SchemaTable;
  defaultOpen?: boolean;
}

export function SchemaTableCard({ table, defaultOpen = false }: SchemaTableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Database className="text-cyan-400" size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{table.name}</h3>
            {table.description && (
              <p className="text-xs text-white/40">{table.description}</p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-white/40" size={18} />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-white/10">
              
              {/* Columns Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Columns size={14} className="text-cyan-400" />
                  <h4 className="text-sm font-medium text-white/60">Columns</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-white/40 font-medium">Column</th>
                        <th className="text-left py-2 text-white/40 font-medium">Type</th>
                        <th className="text-left py-2 text-white/40 font-medium">Nullable</th>
                        <th className="text-left py-2 text-white/40 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((col) => (
                        <tr key={col.name} className="border-b border-white/5">
                          <td className="py-2 font-mono text-cyan-400 text-xs">{col.name}</td>
                          <td className="py-2 font-mono text-white/60 text-xs">{col.type}</td>
                          <td className="py-2 text-white/40 text-xs">{col.nullable ? '✓' : '✗'}</td>
                          <td className="py-2 text-white/50 text-xs">{col.description || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Relationships Section */}
              {table.relationships.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Link size={14} className="text-purple-400" />
                    <h4 className="text-sm font-medium text-white/60">Relationships</h4>
                  </div>
                  <div className="space-y-1">
                    {table.relationships.map((rel, idx) => (
                      <div key={idx} className="text-xs text-white/50 flex items-center gap-2">
                        <span className="font-mono text-cyan-400">{rel.from}</span>
                        <span className="text-white/30">→</span>
                        <span className="font-mono text-purple-400">{rel.to}</span>
                        <span className="text-white/30 bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                          {rel.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}