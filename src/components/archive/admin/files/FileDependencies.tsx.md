// components/admin/files/FileDependencies.tsx
'use client';

import { motion } from 'framer-motion';
import { Link, ArrowRight } from 'lucide-react';
import type { PublicFileRegistry } from '@/types/generated/hephaestus-infrastructure/file_registry';

interface FileDependenciesProps {
  file: PublicFileRegistry;
  allFiles: PublicFileRegistry[];
}

export default function FileDependencies({ file, allFiles }: FileDependenciesProps) {
  // Find dependencies (simplified - would use actual import analysis)
  const dependencies = file.dependencies?.map(depPath => 
    allFiles.find(f => f.file_path === depPath)
  ).filter(Boolean) as PublicFileRegistry[];

  const usedBy = file.used_by?.map(usePath =>
    allFiles.find(f => f.file_path === usePath)
  ).filter(Boolean) as PublicFileRegistry[];

  if ((!dependencies || dependencies.length === 0) && (!usedBy || usedBy.length === 0)) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-star-dust mb-4 flex items-center gap-2">
        <Link size={18} className="text-pink-400" />
        Dependencies
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Imports (what this file depends on) */}
        {dependencies && dependencies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-star-dust/60 mb-3">Imports</h4>
            <div className="space-y-2">
              {dependencies.map((dep, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-cyan-400">{dep.emoji}</span>
                  <code className="text-star-dust/60 font-mono text-xs">{dep.file_name}</code>
                  <ArrowRight size={12} className="text-star-dust/30" />
                  <span className="text-star-dust/40 text-xs truncate">{dep.file_path}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Used By (what depends on this file) */}
        {usedBy && usedBy.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-star-dust/60 mb-3">Used By</h4>
            <div className="space-y-2">
              {usedBy.map((user, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-purple-400">{user.emoji}</span>
                  <code className="text-star-dust/60 font-mono text-xs">{user.file_name}</code>
                  <ArrowRight size={12} className="text-star-dust/30 rotate-180" />
                  <span className="text-star-dust/40 text-xs truncate">{user.file_path}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}