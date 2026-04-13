// @/components/schema/SchemaExplorer.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Table, 
  Database, 
  Key, 
  Link, 
  List,
  ChevronDown,
  ChevronRight,
  Search,
  RefreshCw
} from 'lucide-react';

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

interface TableInfo {
  table_name: string;
  columns: Column[];
}

interface EnumInfo {
  enum_name: string;
  values: string[];
}

interface FunctionInfo {
  function_name: string;
  function_args: string;
  return_type: string;
}

export function SchemaExplorer() {
  const [tables, setTables] = useState<Map<string, Column[]>>(new Map());
  const [enums, setEnums] = useState<EnumInfo[]>([]);
  const [functions, setFunctions] = useState<FunctionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'tables' | 'enums' | 'functions'>('tables');
  const [error, setError] = useState<string | null>(null);

  const fetchSchema = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/schema');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Group columns by table
      const tableMap = new Map<string, Column[]>();
      for (const col of result.data.tables) {
        if (!tableMap.has(col.table_name)) {
          tableMap.set(col.table_name, []);
        }
        tableMap.get(col.table_name)!.push({
          column_name: col.column_name,
          column_type: col.column_type,
          is_nullable: col.is_nullable,
          column_default: col.column_default,
          is_primary_key: col.is_primary_key,
          is_foreign_key: col.is_foreign_key,
          foreign_key_table: col.foreign_key_table,
          foreign_key_column: col.foreign_key_column,
        });
      }
      
      // Group enum values
      const enumMap = new Map<string, string[]>();
      for (const enumItem of result.data.enums) {
        if (!enumMap.has(enumItem.enum_name)) {
          enumMap.set(enumItem.enum_name, []);
        }
        enumMap.get(enumItem.enum_name)!.push(enumItem.enum_value);
      }
      
      const enumList: EnumInfo[] = Array.from(enumMap.entries()).map(([name, values]) => ({
        enum_name: name,
        values,
      }));
      
      setTables(tableMap);
      setEnums(enumList);
      setFunctions(result.data.functions || []);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load schema');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchema();
  }, []);

  const toggleTable = (tableName: string) => {
    const newSet = new Set(expandedTables);
    if (newSet.has(tableName)) {
      newSet.delete(tableName);
    } else {
      newSet.add(tableName);
    }
    setExpandedTables(newSet);
  };

  const filteredTables = Array.from(tables.keys()).filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnums = enums.filter(e =>
    e.enum_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFunctions = functions.filter(f =>
    f.function_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        <span className="ml-3 text-white/60">Loading schema...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 mb-4">⚠️ {error}</div>
        <button
          onClick={fetchSchema}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Database className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white">Schema Explorer</h2>
          </div>
          <button
            onClick={fetchSchema}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={18} className="text-white/60" />
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Table size={14} className="text-cyan-400" />
            <span className="text-white/60">{tables.size} Tables</span>
          </div>
          <div className="flex items-center gap-2">
            <List size={14} className="text-purple-400" />
            <span className="text-white/60">{enums.length} Enums</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={14} className="text-green-400" />
            <span className="text-white/60">{functions.length} Functions</span>
          </div>
        </div>
        
        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search tables, enums, or functions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:border-cyan-500 focus:outline-none"
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
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/10">
                {tab === 'tables' ? tables.size : tab === 'enums' ? enums.length : functions.length}
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
              <div className="text-center py-12 text-white/40">
                No tables matching "{searchTerm}"
              </div>
            )}
            {filteredTables.map((tableName) => {
              const columns = tables.get(tableName) || [];
              const isExpanded = expandedTables.has(tableName);
              const primaryKeys = columns.filter(c => c.is_primary_key);
              const foreignKeys = columns.filter(c => c.is_foreign_key);
              
              return (
                <div key={tableName} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleTable(tableName)}
                    className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <Table size={16} className="text-cyan-400" />
                      <span className="text-white font-medium">{tableName}</span>
                      <span className="text-xs text-white/40">({columns.length} columns)</span>
                    </div>
                    <div className="flex gap-2">
                      {primaryKeys.length > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                          PK: {primaryKeys.map(c => c.column_name).join(', ')}
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
                          <tr className="text-left text-white/50 border-b border-white/10">
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
                              <td className="py-2 font-mono text-white/80">
                                {col.column_name}
                              </td>
                              <td className="py-2 font-mono text-cyan-400 text-xs">
                                {col.column_type}
                              </td>
                              <td className="py-2">
                                {col.is_nullable === 'YES' ? (
                                  <span className="text-yellow-400">✓</span>
                                ) : (
                                  <span className="text-red-400">✗</span>
                                )}
                              </td>
                              <td className="py-2 font-mono text-xs text-white/40">
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
              <div className="text-center py-12 text-white/40">
                No enums matching "{searchTerm}"
              </div>
            )}
            {filteredEnums.map((enumInfo) => (
              <div key={enumInfo.enum_name} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <List size={16} className="text-purple-400" />
                  <span className="text-white font-mono">{enumInfo.enum_name}</span>
                  <span className="text-xs text-white/40">({enumInfo.values.length} values)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enumInfo.values.map((value) => (
                    <span
                      key={value}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-cyan-400 font-mono"
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
              <div className="text-center py-12 text-white/40">
                No functions matching "{searchTerm}"
              </div>
            )}
            {filteredFunctions.map((func) => (
              <div key={func.function_name} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} className="text-green-400" />
                  <span className="text-white font-mono">{func.function_name}</span>
                </div>
                <div className="text-sm">
                  <div className="text-white/60 mb-1">
                    <span className="text-yellow-400">Args:</span> {func.function_args}
                  </div>
                  <div className="text-white/60">
                    <span className="text-blue-400">Returns:</span> {func.return_type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-center text-xs text-white/40">
        Schema loaded dynamically from PostgreSQL system catalogs
      </div>
    </div>
  );
}