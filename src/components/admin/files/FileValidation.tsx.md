// components/admin/files/FileValidation.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Shield } from 'lucide-react';

interface ValidationCheck {
  name: string;
  passes: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info';
}

interface FileValidationProps {
  fileType: string;
  standards?: string | null;
}

export default function FileValidation({ fileType, standards }: FileValidationProps) {
  // Example validation checks - in practice, these would come from your standards table
  const validationChecks: ValidationCheck[] = [
    { name: 'File exists in repository', passes: true, severity: 'info' },
    { name: 'Proper file extension', passes: true, severity: 'info' },
    { name: 'TypeScript types defined', passes: fileType === 'type' ? true : false, severity: 'warning' },
    { name: "'use client' directive (if needed)", passes: true, severity: 'info' },
    { name: 'Error handling implemented', passes: fileType === 'api' ? false : true, severity: 'error', message: 'API routes should have try/catch blocks' },
  ];

  const passCount = validationChecks.filter(c => c.passes).length;
  const totalCount = validationChecks.length;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle size={14} className="text-red-400" />;
      case 'warning': return <AlertCircle size={14} className="text-yellow-400" />;
      default: return <CheckCircle size={14} className="text-green-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield size={18} className="text-purple-400" />
          Standards Validation
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full ${
          passCount === totalCount 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {passCount}/{totalCount} Passed
        </span>
      </div>

      <div className="space-y-2">
        {validationChecks.map((check, idx) => (
          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
            {check.passes ? (
              <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              getSeverityIcon(check.severity || 'error')
            )}
            <div className="flex-1">
              <span className={check.passes ? 'text-white/60 text-sm' : 'text-white/80 text-sm'}>
                {check.name}
              </span>
              {check.message && !check.passes && (
                <p className="text-xs text-red-400 mt-0.5">{check.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {standards && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">📋 Standards Reference:</p>
          <pre className="text-xs text-white/30 font-mono whitespace-pre-wrap bg-white/5 p-3 rounded-lg">
            {standards}
          </pre>
        </div>
      )}
    </motion.div>
  );
}