// =====================================================
// FILE: types/generated/hephaestus-infrastructure/settings.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.705Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SettingScope = Database['public']['Enums']['setting_scope'];
export type SettingsRow = Tables<'settings'>;
export type SettingsInsert = TablesInsert<'settings'>;
export type SettingsUpdate = TablesUpdate<'settings'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of settings
 */
export interface PublicSettings {
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  id: string;
  is_public: boolean | null;
  key: string;
  scope: SettingScope;
  scope_id: string | null;
  type: string;
  updated_at: string | null;
  value: Json;
}

/**
 * Form data for settings
 * All fields are optional for partial updates
 */
export interface SettingsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_public?: boolean | null;
  key?: string;
  scope?: SettingScope;
  scope_id?: string | null;
  type?: string;
  updated_at?: string | null;
  value?: Json;
}

