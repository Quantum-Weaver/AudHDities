// src/app/(dashboard)/admin/files/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '@/lib/supabase/client';
import FileRegistryTable from '@/components/admin/files/FileRegistryTable';
import FileSearchFilter from '@/components/admin/files/FileSearchFilter';
import FileBulkActions from '@/components/admin/files/FileBulkActions';
import { Loader2, RefreshCw, Database, Shield, FileText, Archive, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { FileRegistry } from '@/types/supabase/tables/file_registry';

export default function FileRegistryPage() {
  const supabase = useSupabase();
  const [files, setFiles] = useState<FileRegistry[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const loadFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('file_registry')
      .select('*')
      .order('file_path', { ascending: true });

    if (!error && data) {
      setFiles(data);
      setFilteredFiles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = files.filter(file =>
      file.file_path.toLowerCase().includes(query.toLowerCase()) ||
      file.purpose?.toLowerCase().includes(query.toLowerCase()) ||
      file.notes?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  const handleFilterType = (type: string | null) => {
    if (!type) {
      setFilteredFiles(files);
      return;
    }
    const filtered = files.filter(file => file.file_type === type);
    setFilteredFiles(filtered);
  };

  const handleFilterStatus = (status: string | null) => {
    if (!status) {
      setFilteredFiles(files);
      return;
    }
    const filtered = files.filter(file => {
      if (status === 'needs_review') return file.needs_review;
      if (status === 'active') return file.is_active;
      if (status === 'inactive') return !file.is_active;
      return true;
    });
    setFilteredFiles(filtered);
  };

  const stats = [
    {
      label: 'Total Files',
      value: files.length,
      icon: Database,
      color: 'from-cyan-500/20 to-cyan-600/10',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
    },
    {
      label: 'Needs Review',
      value: files.filter(f => f.needs_review).length,
      icon: Shield,
      color: 'from-yellow-500/20 to-yellow-600/10',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
    },
    {
      label: 'Missing Purpose',
      value: files.filter(f => !f.purpose).length,
      icon: FileText,
      color: 'from-orange-500/20 to-orange-600/10',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
    },
    {
      label: 'Active',
      value: files.filter(f => f.is_active).length,
      icon: Archive,
      color: 'from-green-500/20 to-green-600/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={48} className="text-cyan-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <Database size={16} className="text-cyan-400" />
                </div>
                <span className="text-sm text-white/40 uppercase tracking-wider">Codex Archives</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                File Registry
              </h1>
              <p className="text-white/60 max-w-2xl">
                Catalog and track every file in the sanctuary. The Codex remembers all.
              </p>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={loadFiles}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
              >
                <RefreshCw size={16} />
                Refresh
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/admin/files/scan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles size={16} />
                  Scan Repository
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/40 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <stat.icon size={18} className={stat.textColor} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FileSearchFilter
            onSearch={handleSearch}
            onFilterType={handleFilterType}
            onFilterStatus={handleFilterStatus}
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <FileRegistryTable
            files={filteredFiles}
            onBulkUpdate={async (ids, updates) => {
              for (const id of ids) {
                await supabase.from('file_registry').update(updates).eq('id', id);
              }
              loadFiles();
            }}
          />
        </motion.div>

        {/* Footer Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-xs text-white/40">🏛️</span>
            <span className="text-xs text-white/40">The Codex Archives — {files.length} files recorded</span>
            <span className="text-xs text-white/40">✦</span>
            <span className="text-xs text-white/40">Last sync: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}