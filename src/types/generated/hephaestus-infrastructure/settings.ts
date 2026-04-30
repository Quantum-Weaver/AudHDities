// =====================================================
// FILE: types/generated/hephaestus-infrastructure/settings.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T00:26:46.641Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SettingScope = Enums<'setting_scope'>;

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

/**
 * Validation result for settings
 */
export interface SettingsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_public?: string;
    key?: string;
    scope?: string;
    scope_id?: string;
    type?: string;
    updated_at?: string;
    value?: string;
  };
}

