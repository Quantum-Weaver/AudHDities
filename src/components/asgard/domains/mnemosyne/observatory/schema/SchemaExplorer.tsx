// @/components/asgard/domains/mnemosyne/observatory/schema/SchemaExplorer.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  Table, Database, Key, Link, List,
  ChevronDown, ChevronRight, Search,
} from 'lucide-react';
import { parseDatabaseTypes } from '@/lib/schema/parseDatabaseTypes';

interface Column {
  column_name: string;
  column_type: string;
  is_nullable: string;
  column_default: string | null;
  is_primary_key: boolean;
  is_foreign_key: boolean;
  foreign_key_table: string | null;
  foreign_key_column: string | null;
}

export function SchemaExplorer() {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'tables' | 'enums' | 'functions'>('tables');

  const { tables: tablesData, enums: enumsData, functions: functionsData } = useMemo(
    () => parseDatabaseTypes(),
    []
  );

  const tables = useMemo(() => {
    const map = new Map<string, Column[]>();
    for (const table of tablesData) {
      map.set(
        table.name,
        table.columns.map((col) => ({
          column_name: col.name,
          column_type: col.type,
          is_nullable: col.nullable ? 'YES' : 'NO',
          column_default: null,
          is_primary_key: col.name === 'id',
          is_foreign_key: col.name.endsWith('_id') && col.name !== 'id',
          foreign_key_table: col.name.endsWith('_id') ? col.name.replace('_id', '') : null,
          foreign_key_column: 'id',
        }))
      );
    }
    return map;
  }, [tablesData]);

  const enumList = useMemo(
    () =>
      enumsData.map((e) => ({
        enum_name: e.name,
        values: e.values,
      })),
    [enumsData]
  );

  const functionList = useMemo(
    () =>
      functionsData.map((f) => ({
        function_name: f.name,
        function_args: f.args,
        return_type: f.returnType,
      })),
    [functionsData]
  );

  const toggleTable = (tableName: string) => {
    const newSet = new Set(expandedTables);
    if (newSet.has(tableName)) {
      newSet.delete(tableName);
    } else {
      newSet.add(tableName);
    }
    setExpandedTables(newSet);
  };

  const filteredTables = Array.from(tables.keys()).filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnums = enumList.filter((e) =>
    e.enum_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFunctions = functionList.filter((f) =>
    f.function_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Database className="text-neurospark" size={24} />
          <h2 className="text-xl font-bold text-star-dust">Schema Explorer</h2>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Table size={14} className="text-neurospark" />
            <span className="text-star-dust/60">{tables.size} Tables</span>
          </div>
          <div className="flex items-center gap-2">
            <List size={14} className="text-purple-400" />
            <span className="text-star-dust/60">{enumList.length} Enums</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={14} className="text-green-400" />
            <span className="text-star-dust/60">{functionList.length} Functions</span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
          <input
            type="text"
            placeholder="Search tables, enums, or functions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust placeholder-white/40 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-white/10">
          {(['tables', 'enums', 'functions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-neurospark border-b-2 border-cyan-400'
                  : 'text-star-dust/60 hover:text-star-dust'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/10">
                {tab === 'tables' ? tables.size : tab === 'enums' ? enumList.length : functionList.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {activeTab === 'tables' && (
          <div className="space-y-2">
            {filteredTables.length === 0 && (
              <div className="text-center py-12 text-star-dust/40">
                No tables matching "{searchTerm}"
              </div>
            )}
            {filteredTables.map((tableName) => {
              const columns = tables.get(tableName) || [];
              const isExpanded = expandedTables.has(tableName);
              const primaryKeys = columns.filter((c) => c.is_primary_key);
              const foreignKeys = columns.filter((c) => c.is_foreign_key);

              return (
                <div key={tableName} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleTable(tableName)}
                    className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <Table size={16} className="text-neurospark" />
                      <span className="text-star-dust font-medium">{tableName}</span>
                      <span className="text-xs text-star-dust/40">({columns.length} columns)</span>
                    </div>
                    <div className="flex gap-2">
                      {primaryKeys.length > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                          PK: {primaryKeys.map((c) => c.column_name).join(', ')}
                        </span>
                      )}
                      {foreignKeys.length > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                          FK: {foreignKeys.length}
                        </span>
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t border-white/10 bg-black/20">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-star-dust/50 border-b border-white/10">
                            <th className="pb-2">Column</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Nullable</th>
                            <th className="pb-2">Default</th>
                            <th className="pb-2">Constraints</th>
                          </tr>
                        </thead>
                        <tbody>
                          {columns.map((col) => (
                            <tr key={col.column_name} className="border-b border-white/5">
                              <td className="py-2 font-mono text-star-dust/80">
                                {col.column_name}
                              </td>
                              <td className="py-2 font-mono text-neurospark text-xs">
                                {col.column_type}
                              </td>
                              <td className="py-2">
                                {col.is_nullable === 'YES' ? (
                                  <span className="text-yellow-400">✓</span>
                                ) : (
                                  <span className="text-red-400">✗</span>
                                )}
                              </td>
                              <td className="py-2 font-mono text-xs text-star-dust/40">
                                {col.column_default || '—'}
                              </td>
                              <td className="py-2">
                                <div className="flex gap-1">
                                  {col.is_primary_key && (
                                    <Key size={12} className="text-yellow-400" aria-label="Primary Key" />
                                  )}
                                  {col.is_foreign_key && (
                                    <Link size={12} className="text-blue-400" aria-label={`FK to ${col.foreign_key_table}.${col.foreign_key_column}`} />
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'enums' && (
          <div className="space-y-2">
            {filteredEnums.length === 0 && (
              <div className="text-center py-12 text-star-dust/40">
                No enums matching "{searchTerm}"
              </div>
            )}
            {filteredEnums.map((enumInfo) => (
              <div key={enumInfo.enum_name} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <List size={16} className="text-purple-400" />
                  <span className="text-star-dust font-mono">{enumInfo.enum_name}</span>
                  <span className="text-xs text-star-dust/40">({enumInfo.values.length} values)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enumInfo.values.map((value) => (
                    <span
                      key={value}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-neurospark font-mono"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'functions' && (
          <div className="space-y-2">
            {filteredFunctions.length === 0 && (
              <div className="text-center py-12 text-star-dust/40">
                No functions matching "{searchTerm}"
              </div>
            )}
            {filteredFunctions.map((func) => (
              <div key={func.function_name} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} className="text-green-400" />
                  <span className="text-star-dust font-mono">{func.function_name}</span>
                </div>
                <div className="text-sm">
                  <div className="text-star-dust/60 mb-1">
                    <span className="text-yellow-400">Args:</span> {func.function_args}
                  </div>
                  <div className="text-star-dust/60">
                    <span className="text-blue-400">Returns:</span> {func.return_type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-center text-xs text-star-dust/40">
        Schema generated from database.types.ts via GAIA pipeline
      </div>
    </div>
  );
}