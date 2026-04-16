// components/admin/files/FileTypeBadge.tsx
'use client';

import { motion } from 'framer-motion';
import { FILE_TYPE_EMOJIS, FILE_CATEGORIES } from '@/types/supabase/tables/file_registry';

interface FileTypeBadgeProps {
  type: string;
  emoji?: string;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
};

const colorMap: Record<string, string> = {
  page: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  layout: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  api: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  component: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400',
  utility: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  data: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
  style: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
  config: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
  type: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  hook: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
  doc: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
  database: 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400',
  unknown: 'from-white/10 to-white/5 border-white/20 text-white/60',
};

export default function FileTypeBadge({ type, emoji, size = 'md' }: FileTypeBadgeProps) {
  const displayEmoji = emoji || FILE_TYPE_EMOJIS[type] || '📄';
  const category = FILE_CATEGORIES.find(c => c.value === type);
  const label = category?.label || type;
  const colors = colorMap[type] || colorMap.unknown;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center ${sizeClasses[size]} bg-gradient-to-r ${colors} rounded-full border backdrop-blur-sm`}
    >
      <span className="mr-1">{displayEmoji}</span>
      <span className="font-medium">{label}</span>
    </motion.span>
  );
}