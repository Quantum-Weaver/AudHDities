// components/admin/files/FileRegistryTable.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit, Eye, AlertTriangle, CheckCircle, Archive, Search } from 'lucide-react';
import FileTypeBadge from './FileTypeBadge';
import type { FileRegistry } from '@/types/supabase/tables/file_registry';

interface FileRegistryTableProps {
  files: FileRegistry[];
  onSelect?: (id: string) => void;
  onBulkUpdate?: (ids: string[], updates: Partial<FileRegistry>) => void;
}

export default function FileRegistryTable({ files, onBulkUpdate }: FileRegistryTableProps) {
  const [sortField, setSortField] = useState<keyof FileRegistry>('file_path');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const handleSort = (field: keyof FileRegistry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = searchTerm === '' || 
      file.file_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.purpose?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.file_type === filterType;
    return matchesSearch && matchesType;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredFiles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFiles.map(f => f.id)));
    }
  };

  const SortIcon = ({ field }: { field: keyof FileRegistry }) => {
    if (sortField !== field) return <ChevronDown size={14} className="opacity-30" />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const getFileTypes = () => {
    const types = new Set(files.map(f => f.file_type));
    return ['all', ...Array.from(types)];
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
        >
          {getFileTypes().map(type => (
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr className="text-left text-white/60 text-sm">
              <th className="p-4 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.size === filteredFiles.length && filteredFiles.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-white/20 bg-white/5"
                />
              </th>
              <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('emoji')}>
                <div className="flex items-center gap-1">Type <SortIcon field="emoji" /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('file_path')}>
                <div className="flex items-center gap-1">File Path <SortIcon field="file_path" /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('purpose')}>
                <div className="flex items-center gap-1">Purpose <SortIcon field="purpose" /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('needs_review')}>
                <div className="flex items-center gap-1">Status <SortIcon field="needs_review" /></div>
              </th>
              <th className="p-4 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedFiles.map((file, idx) => (
                <motion.tr
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.01 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(file.id)}
                      onChange={() => toggleSelect(file.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5"
                    />
                  </td>
                  <td className="p-4">
                    <FileTypeBadge type={file.file_type} emoji={file.emoji} size="sm" />
                  </td>
                  <td className="p-4">
                    <code className="text-sm text-white/80 font-mono group-hover:text-cyan-400 transition-colors">
                      {file.file_path}
                    </code>
                  </td>
                  <td className="p-4">
                    {file.purpose ? (
                      <span className="text-sm text-white/60 line-clamp-1">{file.purpose}</span>
                    ) : (
                      <span className="text-sm text-yellow-400/60 italic">Needs description</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {file.needs_review ? (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <AlertTriangle size={14} />
                          Needs Review
                        </span>
                      ) : file.is_active ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <CheckCircle size={14} />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-white/40 text-sm">
                          <Archive size={14} />
                          Archived
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/files/${file.id}`}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors inline-block group-hover:text-cyan-400"
                    >
                      <Eye size={16} className="text-white/60 group-hover:text-cyan-400" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {sortedFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No files found</p>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
          >
            <span className="text-sm text-white">{selectedIds.size} file{selectedIds.size !== 1 ? 's' : ''} selected</span>
            <button
              onClick={() => onBulkUpdate?.(Array.from(selectedIds), { needs_review: false, last_validated: new Date().toISOString() })}
              className="px-4 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-full text-sm transition-colors"
            >
              Mark Reviewed
            </button>
            <button
              onClick={() => onBulkUpdate?.(Array.from(selectedIds), { is_active: true })}
              className="px-4 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-full text-sm transition-colors"
            >
              Activate
            </button>
            <button
              onClick={() => onBulkUpdate?.(Array.from(selectedIds), { is_active: false })}
              className="px-4 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-full text-sm transition-colors"
            >
              Archive
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}