// @/components/schema/SchemaEnumCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, List, Copy, Check } from 'lucide-react';

interface EnumInfo {
  enum_name: string;
  values: string[];
}

interface SchemaEnumCardProps {
  enumType: EnumInfo;
  defaultOpen?: boolean;
}

export function SchemaEnumCard({ enumType, defaultOpen = false }: SchemaEnumCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 1500);
  };

  // Convert enum_name to TypeScript type name (PascalCase)
  const typeName = enumType.enum_name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

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
            <div className="flex items-center gap-2">
              <h3 className="text-white font-medium font-mono">{enumType.enum_name}</h3>
              <span className="text-xs text-white/30">→</span>
              <code className="text-xs text-cyan-400">{typeName}</code>
            </div>
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
                  <button
                    key={value}
                    onClick={() => copyToClipboard(value)}
                    className="group px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-mono hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                  >
                    {copiedValue === value ? (
                      <Check size={12} className="inline mr-1 text-green-400" />
                    ) : (
                      <Copy size={10} className="inline mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}