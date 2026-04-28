// components/admin/files/FileStandardsChecklist.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Shield, Sparkles } from 'lucide-react';

interface StandardCheck {
  name: string;
  passes: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info';
}

interface FileStandardsChecklistProps {
  standards: StandardCheck[];
  fileType: string;
}

const severityColors = {
  error: 'from-red-500/20 to-red-600/10 border-red-500/30',
  warning: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
  info: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
};

export default function FileStandardsChecklist({ standards, fileType }: FileStandardsChecklistProps) {
  const passCount = standards.filter(s => s.passes).length;
  const totalCount = standards.length;

  const getIcon = (passes: boolean, severity?: string) => {
    if (passes) return <CheckCircle size={14} className="text-green-400" />;
    if (severity === 'warning') return <AlertCircle size={14} className="text-yellow-400" />;
    return <XCircle size={14} className="text-red-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Shield size={14} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-star-dust">Codex Standards</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          passCount === totalCount 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        }`}>
          <Sparkles size={10} />
          {passCount}/{totalCount} Compliant
        </div>
      </div>

      <div className="space-y-2">
        {standards.map((standard, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
              !standard.passes && `bg-gradient-to-r ${severityColors[standard.severity || 'info']}`
            }`}
          >
            {getIcon(standard.passes, standard.severity)}
            <div className="flex-1">
              <span className={standard.passes ? 'text-star-dust/60 text-sm' : 'text-star-dust/80 text-sm'}>
                {standard.name}
              </span>
              {standard.message && !standard.passes && (
                <p className="text-xs text-red-400 mt-0.5">{standard.message}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {passCount !== totalCount && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-xs text-yellow-400 flex items-center gap-1">
            <AlertCircle size={12} />
            Some standards not met. Review the file for improvements.
          </p>
        </div>
      )}
    </motion.div>
  );
}