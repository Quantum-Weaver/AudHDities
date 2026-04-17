// =====================================================
// FILE: types/generated/hestia-core/agent_activities.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.648Z
// SOURCE: database.types.ts lines 477-544
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AgentActionType = Database['public']['Enums']['agent_action_type'];
export type AgentName = Database['public']['Enums']['agent_name'];
export type AgentActivityStatus = Database['public']['Enums']['agent_activity_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type AgentActivitiesRow = Database['public']['Tables']['agent_activities']['Row'];
export type AgentActivitiesInsert = Database['public']['Tables']['agent_activities']['Insert'];
export type AgentActivitiesUpdate = Database['public']['Tables']['agent_activities']['Update'];

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

