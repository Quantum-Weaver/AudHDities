// =====================================================
// FILE: types/generated/aethelred-connections/hearth_keeper.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.483Z
// SOURCE: database.types.ts lines 2835-2891
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type HearthKeeperRow = Database['public']['Tables']['hearth_keeper']['Row'];
export type HearthKeeperInsert = Database['public']['Tables']['hearth_keeper']['Insert'];
export type HearthKeeperUpdate = Database['public']['Tables']['hearth_keeper']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of hearth_keeper
 */
export interface PublicHearthKeeper {
  accessibility_standards: Json | null;
  created_at: string | null;
  created_by: string | null;
  crisis_resources: Json | null;
  id: string;
  moderators: string[] | null;
  reported_content_queue: Json | null;
  safety_protocols: Json | null;
  safety_score: number | null;
  updated_at: string | null;
  welcome_messages: Json | null;
}

/**
 * Form data for hearth_keeper
 * All fields are optional for partial updates
 */
export interface HearthKeeperFormData {
  accessibility_standards?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  crisis_resources?: Json | null;
  id?: string;
  moderators?: string[] | null;
  reported_content_queue?: Json | null;
  safety_protocols?: Json | null;
  safety_score?: number | null;
  updated_at?: string | null;
  welcome_messages?: Json | null;
}

/**
 * Validation result for hearth_keeper
 */
export interface HearthKeeperValidationResult {
  valid: boolean;
  errors: {
    accessibility_standards?: string;
    created_at?: string;
    created_by?: string;
    crisis_resources?: string;
    id?: string;
    moderators?: string;
    reported_content_queue?: string;
    safety_protocols?: string;
    safety_score?: string;
    updated_at?: string;
    welcome_messages?: string;
  };
}

