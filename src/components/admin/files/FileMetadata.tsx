// components/admin/files/FileMetadata.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Hash, Tag, Layers, Activity } from 'lucide-react';
import type { FileRegistry } from '@/types/supabase/tables/file_registry';

interface FileMetadataProps {
  file: FileRegistry;
}

export default function FileMetadata({ file }: FileMetadataProps) {
  const formatDate = (date: string | null) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString();
  };

  const metadataItems = [
    { icon: Calendar, label: 'Created', value: formatDate(file.created_at) },
    { icon: Activity, label: 'Last Validated', value: formatDate(file.last_validated) },
    { icon: Tag, label: 'Type', value: file.file_type },
    { icon: Layers, label: 'Category', value: file.category || 'Uncategorized' },
    { icon: User, label: 'Created By', value: file.created_by || 'System' },
    { icon: Hash, label: 'ID', value: file.id.slice(0, 8) + '...' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Activity size={18} className="text-cyan-400" />
        File Metadata
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metadataItems.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <item.icon size={14} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-white/40">{item.label}</p>
              <p className="text-sm text-white/80 font-mono break-all">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}