// src/types/supabase/tables/file_registry.ts
import type { Database } from '../database.types';

export type FileRegistry = Database['public']['Tables']['file_registry']['Row'];
export type FileRegistryInsert = Database['public']['Tables']['file_registry']['Insert'];
export type FileRegistryUpdate = Database['public']['Tables']['file_registry']['Update'];

export interface FileWithContent extends FileRegistry {
  content?: string;
  validationResults?: {
    passes: boolean;
    issues: string[];
    warnings: string[];
  };
}

export const FILE_TYPE_EMOJIS: Record<string, string> = {
  page: '📄',
  layout: '📄',
  api: '🌐',
  component: '🧩',
  utility: '🔧',
  data: '📊',
  style: '🎨',
  config: '⚙️',
  type: '🧠',
  hook: '🪝',
  doc: '📚',
  database: '🗄️',
  unknown: '📄',
};

export const FILE_CATEGORIES = [
  { value: 'page', label: 'Page', emoji: '📄' },
  { value: 'layout', label: 'Layout', emoji: '📄' },
  { value: 'api', label: 'API Route', emoji: '🌐' },
  { value: 'component', label: 'Component', emoji: '🧩' },
  { value: 'utility', label: 'Utility', emoji: '🔧' },
  { value: 'data', label: 'Data File', emoji: '📊' },
  { value: 'style', label: 'Style File', emoji: '🎨' },
  { value: 'config', label: 'Config', emoji: '⚙️' },
  { value: 'type', label: 'Type Definition', emoji: '🧠' },
  { value: 'hook', label: 'React Hook', emoji: '🪝' },
  { value: 'doc', label: 'Documentation', emoji: '📚' },
  { value: 'database', label: 'Database', emoji: '🗄️' },
];