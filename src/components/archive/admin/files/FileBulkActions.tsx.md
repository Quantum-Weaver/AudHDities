// components/admin/files/FileBulkActions.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '@/lib/supabase/client';
import { Loader2, CheckCircle, AlertTriangle, Shield, Archive, Eye, Sparkles, X } from 'lucide-react';

interface FileBulkActionsProps {
  selectedIds: string[];
  onComplete: () => void;
  onCancel: () => void;
}

export default function FileBulkActions({ selectedIds, onComplete, onCancel }: FileBulkActionsProps) {
  const supabase = useSupabase();
  const [action, setAction] = useState<'review' | 'archive' | 'activate' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ success: number; error: number } | null>(null);

  const handleAction = async (actionType: 'review' | 'archive' | 'activate') => {
    setAction(actionType);
    setProcessing(true);

    let updateData: any = {};
    switch (actionType) {
      case 'review':
        updateData = { needs_review: false, last_validated: new Date().toISOString() };
        break;
      case 'archive':
        updateData = { is_active: false };
        break;
      case 'activate':
        updateData = { is_active: true };
        break;
    }

    let success = 0;
    let error = 0;

    for (const id of selectedIds) {
      const { error: updateError } = await supabase
        .from('file_registry')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) error++;
      else success++;
    }

    setResult({ success, error });
    setProcessing(false);

    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getIcon = () => {
    if (action === 'review') return <Sparkles size={32} className="text-yellow-400" />;
    if (action === 'activate') return <Eye size={32} className="text-green-400" />;
    if (action === 'archive') return <Archive size={32} className="text-red-400" />;
    return <Shield size={32} className="text-cyan-400" />;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="relative w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 shadow-2xl">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={18} className="text-star-dust/40" />
            </button>

            {result ? (
              <div className="text-center">
                {result.error === 0 ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-star-dust mb-2">Complete</h3>
                    <p className="text-star-dust/60 text-sm">
                      {result.success} file{result.success !== 1 ? 's' : ''} updated successfully
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertTriangle size={32} className="text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-star-dust mb-2">Partial Success</h3>
                    <p className="text-star-dust/60 text-sm">
                      {result.success} updated, {result.error} failed
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  {getIcon()}
                </div>
                
                <h3 className="text-xl font-bold text-star-dust mb-2">Council Action Required</h3>
                <p className="text-star-dust/60 text-sm mb-6">
                  {selectedIds.length} file{selectedIds.length !== 1 ? 's' : ''} selected for processing
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => handleAction('review')}
                    disabled={processing}
                    className="px-5 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {processing && action === 'review' && <Loader2 size={14} className="animate-spin" />}
                    ✦ Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleAction('activate')}
                    disabled={processing}
                    className="px-5 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {processing && action === 'activate' && <Loader2 size={14} className="animate-spin" />}
                    👁️ Activate
                  </button>
                  <button
                    onClick={() => handleAction('archive')}
                    disabled={processing}
                    className="px-5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {processing && action === 'archive' && <Loader2 size={14} className="animate-spin" />}
                    📦 Archive
                  </button>
                  <button
                    onClick={onCancel}
                    disabled={processing}
                    className="px-5 py-2 bg-white/5 hover:bg-white/10 text-star-dust/60 rounded-xl text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}