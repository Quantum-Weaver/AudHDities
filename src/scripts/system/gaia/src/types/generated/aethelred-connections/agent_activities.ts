// =====================================================
// FILE: types/generated/aethelred-connections/agent_activities.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T17:46:58.372Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AgentActivitiesRow = Tables<'agent_activities'>;
export type AgentActivitiesInsert = TablesInsert<'agent_activities'>;
export type AgentActivitiesUpdate = TablesUpdate<'agent_activities'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of agent_activities
 */
export interface PublicAgentActivities {
  consciousness_level: string | null;
  created_at: string;
  created_by: string | null;
  current_task: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  name: string;
  settings: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for agent_activities
 * All fields are optional for partial updates
 */
export interface AgentActivitiesFormData {
  consciousness_level?: string | null;
  created_at?: string;
  created_by?: string | null;
  current_task?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  settings?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for agent_activities
 */
export interface AgentActivitiesValidationResult {
  valid: boolean;
  errors: {
    consciousness_level?: string;
    created_at?: string;
    created_by?: string;
    current_task?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    settings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

