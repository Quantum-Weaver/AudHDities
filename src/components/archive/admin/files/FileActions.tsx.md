// components/admin/files/FileActions.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, AlertTriangle, Archive, RefreshCw, Eye } from 'lucide-react';
import { useSupabase } from '@/lib/supabase/client';
import type { PublicFileRegistry } from '@/types/generated/hephaestus-infrastructure/file_registry';

interface FileActionsProps {
  file: PublicFileRegistry;
  onUpdate: (updated: PublicFileRegistry) => void;
}

export default function FileActions({ file, onUpdate }: FileActionsProps) {
  const supabase = useSupabase();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: 'review' | 'activate' | 'archive' | 'validate') => {
    setLoading(action);
    
    let updates: Partial<PublicFileRegistry> = {};
    switch (action) {
      case 'review':
        updates = { needs_review: false, last_validated: new Date().toISOString() };
        break;
      case 'activate':
        updates = { is_active: true };
        break;
      case 'archive':
        updates = { is_active: false };
        break;
      case 'validate':
        updates = { last_validated: new Date().toISOString() };
        break;
    }
    
    const { error } = await supabase
      .from('file_registry')
      .update(updates)
      .eq('id', file.id);
    
    if (!error) {
      onUpdate({ ...file, ...updates });
    }
    
    setLoading(null);
  };

  const actions = [
    { id: 'validate', label: 'Validate', icon: RefreshCw, color: 'cyan', show: true },
    { id: 'review', label: 'Mark Reviewed', icon: CheckCircle, color: 'green', show: file.needs_review },
    { id: 'activate', label: 'Activate', icon: Eye, color: 'blue', show: !file.is_active },
    { id: 'archive', label: 'Archive', icon: Archive, color: 'red', show: file.is_active },
  ].filter(a => a.show);

  if (actions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-star-dust mb-4 flex items-center gap-2">
        <AlertTriangle size={18} className="text-yellow-400" />
        Actions
      </h3>

      <div className="flex flex-wrap gap-3">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id as any)}
            disabled={loading === action.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
              ${action.color === 'cyan' && 'bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400'}
              ${action.color === 'green' && 'bg-green-600/20 hover:bg-green-600/30 text-green-400'}
              ${action.color === 'blue' && 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400'}
              ${action.color === 'red' && 'bg-red-600/20 hover:bg-red-600/30 text-red-400'}
            `}
          >
            {loading === action.id ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <action.icon size={14} />
            )}
            {action.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}