// @/components/schema/SchemaFunctionCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Code, Terminal, ArrowRight } from 'lucide-react';

interface FunctionInfo {
  function_name: string;
  function_args: string;
  return_type: string;
  is_aggregate?: boolean;
  is_window?: boolean;
  is_procedure?: boolean;
}

interface SchemaFunctionCardProps {
  func: FunctionInfo;
  defaultOpen?: boolean;
}

export function SchemaFunctionCard({ func, defaultOpen = false }: SchemaFunctionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Parse args for display
  const parseArgs = (args: string): { name: string; type: string }[] => {
    if (!args || args === '') return [];
    const parts = args.split(',');
    return parts.map(part => {
      const trimmed = part.trim();
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace === -1) return { name: '', type: trimmed };
      return {
        name: trimmed.substring(0, lastSpace),
        type: trimmed.substring(lastSpace + 1)
      };
    });
  };

  const parsedArgs = parseArgs(func.function_args);
  const hasArgs = parsedArgs.length > 0 && parsedArgs[0].name !== '';

  // Determine function type badge
  const getBadge = () => {
    if (func.is_aggregate) return { text: 'Aggregate', color: 'bg-orange-500/20 text-orange-400' };
    if (func.is_window) return { text: 'Window', color: 'bg-blue-500/20 text-blue-400' };
    if (func.is_procedure) return { text: 'Procedure', color: 'bg-pink-500/20 text-pink-400' };
    return { text: 'Function', color: 'bg-green-500/20 text-green-400' };
  };

  const badge = getBadge();

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
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Database className="text-green-400" size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white font-mono">{func.function_name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                {badge.text}
              </span>
            </div>
            <p className="text-xs text-white/40 mt-1">
              {func.function_args || 'No parameters'}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-white/40" size={18} />
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
            <div className="p-5 pt-0 border-t border-white/10 space-y-4">
              
              {/* Parameters Section */}
              {hasArgs && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal size={14} className="text-yellow-400" />
                    <h4 className="text-sm font-medium text-white/60">Parameters</h4>
                  </div>
                  <div className="space-y-1">
                    {parsedArgs.map((arg, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-yellow-400">{arg.name}</span>
                        <span className="text-white/30">:</span>
                        <span className="font-mono text-white/60">{arg.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Return Type Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRight size={14} className="text-cyan-400" />
                  <h4 className="text-sm font-medium text-white/60">Returns</h4>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <code className="text-sm text-cyan-400 font-mono break-all">
                    {func.return_type}
                  </code>
                </div>
              </div>

              {/* Usage Example */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code size={14} className="text-purple-400" />
                  <h4 className="text-sm font-medium text-white/60">Usage</h4>
                </div>
                <div className="bg-black/50 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-white/70 font-mono">
                    {`SELECT * FROM ${func.function_name}(${hasArgs ? parsedArgs.map(a => a.name).join(', ') : ''});`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}