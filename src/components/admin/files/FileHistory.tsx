// components/admin/files/FileHistory.tsx
'use client';

import { motion } from 'framer-motion';
import { History, GitCommit, User, Clock } from 'lucide-react';

interface HistoryEntry {
  date: string;
  action: string;
  user: string;
  details?: string;
}

interface FileHistoryProps {
  fileId: string;
}

// Mock history - would fetch from actual audit log
const mockHistory: HistoryEntry[] = [
  { date: '2026-03-30', action: 'Created', user: 'Quantum Weaver', details: 'Initial file registration' },
  { date: '2026-03-29', action: 'Updated', user: 'System', details: 'Standards validation completed' },
  { date: '2026-03-28', action: 'Reviewed', user: 'Admin', details: 'Marked as needs review' },
];

export default function FileHistory({ fileId }: FileHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <History size={18} className="text-orange-400" />
        History
      </h3>

      <div className="space-y-4">
        {mockHistory.map((entry, idx) => (
          <div key={idx} className="relative pl-6 pb-4 last:pb-0">
            {/* Timeline line */}
            {idx !== mockHistory.length - 1 && (
              <div className="absolute left-[7px] top-6 bottom-0 w-px bg-white/10" />
            )}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-cyan-400/30 border border-cyan-400/50" />
            
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <GitCommit size={12} className="text-cyan-400" />
              <span className="text-sm font-medium text-white">{entry.action}</span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <User size={10} />
                {entry.user}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock size={10} />
                {entry.date}
              </span>
            </div>
            {entry.details && (
              <p className="text-xs text-white/50">{entry.details}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}