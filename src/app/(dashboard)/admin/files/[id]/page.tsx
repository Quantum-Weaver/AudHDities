// src/app/(dashboard)/admin/files/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FileHeader from '@/components/admin/files/FileHeader';
import FileMetadata from '@/components/admin/files/FileMetadata';
import FileValidation from '@/components/admin/files/FileValidation';
import FileDependencies from '@/components/admin/files/FileDependencies';
import FileHistory from '@/components/admin/files/FileHistory';
import FileActions from '@/components/admin/files/FileActions';
import FileContent from '@/components/admin/files/FileContent';
import type { FileRegistry } from '@/types/supabase/tables/file_registry';

export default function FileDetailPage() {
  const params = useParams();
  const supabase = useSupabase();
  const [file, setFile] = useState<FileRegistry | null>(null);
  const [allFiles, setAllFiles] = useState<FileRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safely extract the id - handle both string and array cases
  const fileId = typeof params.id === 'string' 
    ? params.id 
    : Array.isArray(params.id) 
      ? params.id[0] 
      : null;

  useEffect(() => {
    if (!fileId) {
      setError('No file ID provided');
      setLoading(false);
      return;
    }

    const loadFile = async () => {
      const { data: fileData, error: fileError } = await supabase
        .from('file_registry')
        .select('*')
        .eq('id', fileId)
        .single();

      if (fileError) {
        setError(fileError.message);
        setLoading(false);
        return;
      }

      setFile(fileData);

      // Load all files for dependency resolution
      const { data: allData } = await supabase
        .from('file_registry')
        .select('*')
        .order('file_path');

      if (allData) setAllFiles(allData);
      setLoading(false);
    };

    loadFile();
  }, [fileId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'File not found'}</p>
          <a href="/admin/files" className="text-cyan-400 hover:underline">
            Back to Registry
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <FileHeader file={file} onUpdate={setFile} />

        {/* Metadata Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <FileMetadata file={file} />
          <FileActions file={file} onUpdate={setFile} />
        </div>

        {/* File Content Viewer */}
        <FileContent file={file} />

        {/* Validation */}
        <FileValidation 
          fileType={file.file_type} 
          standards={file.standards} 
        />

        {/* Dependencies */}
        <FileDependencies file={file} allFiles={allFiles} />

        {/* History */}
        <FileHistory fileId={file.id} />

        {/* Decorative Council Seal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <span className="text-xs text-white/40">🏛️</span>
            <span className="text-xs text-white/40">The Codex Archives</span>
            <span className="text-xs text-white/40">✦</span>
            <span className="text-xs text-white/40">File ID: {file.id.slice(0, 8)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}