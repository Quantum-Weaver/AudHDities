// =====================================================
// FILE: types/generated/hestia-core/badge_award_triggers.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:47.023Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type BadgeAwardTriggersRow = Tables<'badge_award_triggers'>;
export type BadgeAwardTriggersInsert = TablesInsert<'badge_award_triggers'>;
export type BadgeAwardTriggersUpdate = TablesUpdate<'badge_award_triggers'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of badge_award_triggers
 */
export interface PublicBadgeAwardTriggers {
  badge_award_triggers_id: string;
  badge_id: string;
  created_at: string | null;
  created_by: string | null;
  is_active: boolean | null;
  trigger_config: Json;
  trigger_type: string;
  updated_at: string | null;
}

/**
 * Form data for badge_award_triggers
 * All fields are optional for partial updates
 */
export interface BadgeAwardTriggersFormData {
  badge_award_triggers_id?: string;
  badge_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  is_active?: boolean | null;
  trigger_config?: Json;
  trigger_type?: string;
  updated_at?: string | null;
}

/**
 * Validation result for badge_award_triggers
 */
export interface BadgeAwardTriggersValidationResult {
  valid: boolean;
  errors: {
    badge_award_triggers_id?: string;
    badge_id?: string;
    created_at?: string;
    created_by?: string;
    is_active?: string;
    trigger_config?: string;
    trigger_type?: string;
    updated_at?: string;
  };
}

