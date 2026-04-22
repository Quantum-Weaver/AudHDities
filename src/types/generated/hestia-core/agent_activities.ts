// =====================================================
// FILE: types/generated/hestia-core/agent_activities.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.976Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AgentActivitiesRow = Tables<'agent_activities'>;
export type AgentActivitiesInsert = TablesInsert<'agent_activities'>;
export type AgentActivitiesUpdate = TablesUpdate<'agent_activities'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAgentActivities = Omit<AgentActivitiesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AgentActivitiesFormData = Partial<AgentActivitiesInsert>;

