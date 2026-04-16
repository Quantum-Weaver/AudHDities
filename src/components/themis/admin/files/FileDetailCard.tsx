// components/admin/files/FileDetailCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '@/lib/supabase/client';
import { Save, Edit, X, Check, AlertTriangle, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import FileTypeBadge from './FileTypeBadge';
import type { FileRegistry } from '@/types/supabase/tables/file_registry';

interface FileDetailCardProps {
  file: FileRegistry;
  onUpdate?: (updated: FileRegistry) => void;
  onClose?: () => void;
}

export default function FileDetailCard({ file, onUpdate, onClose }: FileDetailCardProps) {
  const supabase = useSupabase();
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    purpose: file.purpose || '',
    notes: file.notes || '',
    needs_review: file.needs_review || false,
    is_active: file.is_active !== false,
  });
  const [saving, setSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('file_registry')
      .update({
        purpose: formData.purpose || null,
        notes: formData.notes || null,
        needs_review: formData.needs_review,
        is_active: formData.is_active,
        last_validated: new Date().toISOString(),
      })
      .eq('id', file.id);

    if (!error && onUpdate) {
      onUpdate({ ...file, ...formData });
    }
    setIsEditing(false);
    setSaving(false);
  };

  const copyPath = () => {
    navigator.clipboard.writeText(file.file_path);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0"
    >
      {/* Header */}
      <div className="relative p-5 border-b border-white/10 bg-white/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
              {file.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <FileTypeBadge type={file.file_type} size="sm" />
                {file.needs_review && (
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full flex items-center gap-1">
                    <AlertTriangle size={10} /> Needs Review
                  </span>
                )}
              </div>
              <code className="text-sm text-white/80 font-mono break-all">{file.file_path}</code>
              <p className="text-xs text-white/40 mt-1 flex items-center gap-2">
                Created: {formatDate(file.created_at)}
                <button
                  onClick={copyPath}
                  className="p-0.5 hover:bg-white/10 rounded transition-colors"
                >
                  {copySuccess ? <Check size={10} className="text-green-400" /> : <Copy size={10} className="text-white/40" />}
                </button>
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Edit size={16} className="text-white/60" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} className="text-white/60" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="p-2 bg-cyan-600/50 hover:bg-cyan-600 rounded-lg transition-colors"
                >
                  <Save size={16} className="text-white" />
                </button>
              </>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={16} className="text-white/60" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Purpose */}
        <div>
          <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Purpose</label>
          {isEditing ? (
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
              placeholder="What does this file do? Why does it exist?"
            />
          ) : (
            <p className="text-white/80 text-sm">
              {file.purpose || <span className="italic text-white/40">No description yet</span>}
            </p>
          )}
        </div>

        {/* Expandable Notes Section */}
        {file.notes && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              Developer Notes
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/60 text-xs mt-2 p-3 bg-white/5 rounded-lg">
                    {file.notes}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Status Toggles */}
        <div className="flex gap-6 pt-2 border-t border-white/10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.needs_review}
              onChange={(e) => setFormData({ ...formData, needs_review: e.target.checked })}
              disabled={!isEditing}
              className="w-3.5 h-3.5 rounded border-white/20 bg-white/5"
            />
            <span className="text-xs text-white/60">Needs Review</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              disabled={!isEditing}
              className="w-3.5 h-3.5 rounded border-white/20 bg-white/5"
            />
            <span className="text-xs text-white/60">Active</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}