// =====================================================
// FILE: types/generated/hephaestus-infrastructure/settings.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.566Z
// SOURCE: database.types.ts lines 5794-5843
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SettingScope = Database['public']['Enums']['setting_scope'];

// =====================================================
// CORE TYPES
// =====================================================

export type SettingsRow = Database['public']['Tables']['settings']['Row'];
export type SettingsInsert = Database['public']['Tables']['settings']['Insert'];
export type SettingsUpdate = Database['public']['Tables']['settings']['Update'];

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

