// components/admin/files/FileSearchFilter.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { FILE_CATEGORIES } from '@/types/generated/hephaestus-infrastructure/file_registry';

interface FileSearchFilterProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string | null) => void;
  onFilterStatus: (status: string | null) => void;
}

export default function FileSearchFilter({ onSearch, onFilterType, onFilterStatus }: FileSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type);
    onFilterType(type);
  };

  const handleStatusSelect = (status: string | null) => {
    setSelectedStatus(status);
    onFilterStatus(status);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType(null);
    setSelectedStatus(null);
    onSearch('');
    onFilterType(null);
    onFilterStatus(null);
  };

  const hasFilters = searchTerm || selectedType || selectedStatus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-4"
    >
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by file path, purpose, or notes..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-star-dust text-sm focus:border-cyan-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
            showFilters || hasFilters
              ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-400'
              : 'bg-white/5 border border-white/10 text-star-dust/60 hover:bg-white/10'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasFilters && (
            <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] flex items-center justify-center">
              {(searchTerm ? 1 : 0) + (selectedType ? 1 : 0) + (selectedStatus ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-star-dust/60 text-sm transition-colors"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/10">
            {/* Type Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-star-dust/40 mb-1 uppercase tracking-wider">File Type</label>
              <select
                value={selectedType || ''}
                onChange={(e) => handleTypeSelect(e.target.value || null)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-star-dust text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="">All Types</option>
                {FILE_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-star-dust/40 mb-1 uppercase tracking-wider">Status</label>
              <select
                value={selectedStatus || ''}
                onChange={(e) => handleStatusSelect(e.target.value || null)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-star-dust text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="needs_review">⚠️ Needs Review</option>
                <option value="active">✅ Active</option>
                <option value="inactive">📦 Archived</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}