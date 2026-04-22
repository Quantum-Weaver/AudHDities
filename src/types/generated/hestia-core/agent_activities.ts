// =====================================================
// FILE: types/generated/hestia-core/agent_activities.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.538Z
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

export type AgentActionType = Database['public']['Enums']['agent_action_type'];
export type AgentName = Database['public']['Enums']['agent_name'];
export type AgentActivityStatus = Database['public']['Enums']['agent_activity_status'];
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

