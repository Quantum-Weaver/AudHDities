// =====================================================
// FILE: types/generated/hestia-core/agent_activities.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T00:26:45.539Z
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

export type AgentActionType = Enums<'agent_action_type'>;
export type AgentName = Enums<'agent_name'>;
export type AgentActivityStatus = Enums<'agent_activity_status'>;

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
  action: AgentActionType;
  agent_name: AgentName;
  completed_at: string | null;
  conversation_id: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  duration_ms: number | null;
  error_message: string | null;
  id: string;
  metadata: Json | null;
  parent_activity_id: string | null;
  retry_count: number | null;
  started_at: string | null;
  status: AgentActivityStatus;
  title: string;
  updated_at: string;
  user_id: string | null;
}

/**
 * Form data for agent_activities
 * All fields are optional for partial updates
 */
export interface AgentActivitiesFormData {
  action?: AgentActionType;
  agent_name?: AgentName;
  completed_at?: string | null;
  conversation_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  duration_ms?: number | null;
  error_message?: string | null;
  id?: string;
  metadata?: Json | null;
  parent_activity_id?: string | null;
  retry_count?: number | null;
  started_at?: string | null;
  status?: AgentActivityStatus;
  title?: string;
  updated_at?: string;
  user_id?: string | null;
}

/**
 * Validation result for agent_activities
 */
export interface AgentActivitiesValidationResult {
  valid: boolean;
  errors: {
    action?: string;
    agent_name?: string;
    completed_at?: string;
    conversation_id?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    duration_ms?: string;
    error_message?: string;
    id?: string;
    metadata?: string;
    parent_activity_id?: string;
    retry_count?: string;
    started_at?: string;
    status?: string;
    title?: string;
    updated_at?: string;
    user_id?: string;
  };
}

