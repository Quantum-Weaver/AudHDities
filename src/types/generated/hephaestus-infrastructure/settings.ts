// =====================================================
// FILE: types/generated/hephaestus-infrastructure/settings.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.270Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SettingsRow = Tables<'settings'>;
export type SettingsInsert = TablesInsert<'settings'>;
export type SettingsUpdate = TablesUpdate<'settings'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSettings = Omit<SettingsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SettingsFormData = Partial<SettingsInsert>;

