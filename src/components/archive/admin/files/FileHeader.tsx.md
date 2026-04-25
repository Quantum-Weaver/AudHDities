// components/admin/files/FileHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Save, X, Trash2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import FileTypeBadge from './FileTypeBadge';
import type { PublicFileRegistry } from '@/types/generated/hephaestus-infrastructure/file_registry';

interface FileHeaderProps {
  file: PublicFileRegistry;
  onUpdate: (updated: PublicFileRegistry) => void;
}

export default function FileHeader({ file, onUpdate }: FileHeaderProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const [isEditing, setIsEditing] = useState(false);
  const [purpose, setPurpose] = useState(file.purpose || '');
  const [saving, setSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('file_registry')
      .update({ purpose: purpose || null })
      .eq('id', file.id);

    if (!error) {
      onUpdate({ ...file, purpose: purpose || null });
      setIsEditing(false);
    }
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
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
      
      <div className="relative p-8">
        {/* Back button */}
        <button
          onClick={() => router.push('/admin/files')}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Registry</span>
        </button>

        {/* Main header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-4xl backdrop-blur-sm border border-white/20">
              {file.emoji}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <FileTypeBadge type={file.file_type} emoji={file.emoji} />
                {file.needs_review && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Needs Review
                  </span>
                )}
                {!file.is_active && (
                  <span className="px-2 py-1 bg-white/10 text-white/40 text-xs rounded-full">
                    Inactive
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-mono break-all">
                {file.file_name}
              </h1>
              <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
                <code className="text-xs">{file.file_path}</code>
                <button
                  onClick={copyPath}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copySuccess ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-white/40" />}
                </button>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <X size={16} className="inline mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
                >
                  <Save size={16} className="inline mr-1" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <Edit size={16} className="inline mr-1" />
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="inline mr-1" />
                  Archive
                </button>
              </>
            )}
          </div>
        </div>

        {/* Purpose section */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-2">Purpose</h3>
          {isEditing ? (
            <Textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              placeholder="What does this file do? Why does it exist?"
            />
          ) : (
            <p className="text-white/80 leading-relaxed">
              {file.purpose || (
                <span className="italic text-white/40">No description yet. Click Edit to add one.</span>
              )}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}