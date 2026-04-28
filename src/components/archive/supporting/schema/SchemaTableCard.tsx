// @/components/schema/SchemaTableCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Link, Columns, Key, Shield } from 'lucide-react';

interface Column {
  column_name: string;
  column_type: string;
  is_nullable: string;
  column_default: string | null;
  is_primary_key: boolean;
  is_foreign_key: boolean;
  foreign_key_table: string | null;
  foreign_key_column: string | null;
}

interface SchemaTableCardProps {
  tableName: string;
  columns: Column[];
  defaultOpen?: boolean;
}

export function SchemaTableCard({ tableName, columns, defaultOpen = false }: SchemaTableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const primaryKeys = columns.filter(c => c.is_primary_key);
  const foreignKeys = columns.filter(c => c.is_foreign_key);

  // Get column type color
  const getTypeColor = (type: string): string => {
    if (type.includes('uuid')) return 'text-purple-400';
    if (type.includes('text') || type.includes('char')) return 'text-green-400';
    if (type.includes('int') || type.includes('numeric') || type.includes('decimal')) return 'text-yellow-400';
    if (type.includes('bool')) return 'text-pink-400';
    if (type.includes('timestamp') || type.includes('date')) return 'text-blue-400';
    if (type.includes('json')) return 'text-orange-400';
    return 'text-star-dust/40';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Database className="text-neurospark" size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-star-dust font-mono">{tableName}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-star-dust/40">{columns.length} columns</span>
              {primaryKeys.length > 0 && (
                <span className="text-xs flex items-center gap-1 text-yellow-400/60">
                  <Key size={10} />
                  PK: {primaryKeys.map(c => c.column_name).join(', ')}
                </span>
              )}
              {foreignKeys.length > 0 && (
                <span className="text-xs flex items-center gap-1 text-blue-400/60">
                  <Link size={10} />
                  FK: {foreignKeys.length}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-star-dust/40" size={18} />
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
            <div className="p-5 pt-0 border-t border-white/10">
              
              {/* RLS Badge */}
              <div className="mb-4 p-2 bg-cyan-500/5 rounded-lg border border-cyan-500/20 flex items-center gap-2">
                <Shield size={12} className="text-neurospark" />
                <span className="text-xs text-neurospark">Row Level Security Enabled</span>
              </div>

              {/* Columns Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-star-dust/40 font-medium">Column</th>
                      <th className="text-left py-2 text-star-dust/40 font-medium">Type</th>
                      <th className="text-left py-2 text-star-dust/40 font-medium">Nullable</th>
                      <th className="text-left py-2 text-star-dust/40 font-medium">Default</th>
                      <th className="text-left py-2 text-star-dust/40 font-medium">Constraints</th>
                    </tr>
                  </thead>
                  <tbody>
                    {columns.map((col) => (
                      <tr key={col.column_name} className="border-b border-white/5">
                        <td className="py-2 font-mono text-neurospark text-xs">
                          {col.column_name}
                        </td>
                        <td className={`py-2 font-mono text-xs ${getTypeColor(col.column_type)}`}>
                          {col.column_type}
                        </td>
                        <td className="py-2 text-xs">
                          {col.is_nullable === 'YES' ? (
                            <span className="text-yellow-400">NULL</span>
                          ) : (
                            <span className="text-red-400">NOT NULL</span>
                          )}
                        </td>
                        <td className="py-2 font-mono text-xs text-star-dust/40">
                          {col.column_default || '—'}
                        </td>
                        <td className="py-2">
                          <div className="flex gap-1">
                            {col.is_primary_key && (
                              <Key size={12} className="text-yellow-400" aria-label="Primary Key" />
                            )}
                            {col.is_foreign_key && (
                              <Link size={12} className="text-blue-400" aria-label={`FK to ${col.foreign_key_table}.${col.foreign_key_column}`} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Foreign Key Details */}
              {foreignKeys.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Link size={12} className="text-blue-400" />
                    <h4 className="text-xs font-medium text-star-dust/60">Foreign Key References</h4>
                  </div>
                  <div className="space-y-1">
                    {foreignKeys.map((fk) => (
                      <div key={fk.column_name} className="text-xs text-star-dust/50 flex items-center gap-2">
                        <span className="font-mono text-neurospark">{fk.column_name}</span>
                        <span className="text-star-dust/30">→</span>
                        <span className="font-mono text-blue-400">{fk.foreign_key_table}.{fk.foreign_key_column}</span>
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