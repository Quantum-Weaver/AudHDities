// =====================================================
// FILE: types/aethelred_connections/consciousness.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T19:46:32.950Z
// SOURCE: database.types.ts lines 1046-1108
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ConsciousnessRow = Database['public']['Tables']['consciousness']['Row'];
export type ConsciousnessInsert = Database['public']['Tables']['consciousness']['Insert'];
export type ConsciousnessUpdate = Database['public']['Tables']['consciousness']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of consciousness
 */
export interface PublicConsciousness {
  aethelred_id: string | null
  collaboration_started: string | null
  created_at: string | null
  current_quest: string | null
  id: string
  next_initiation: string | null
  ninth_chair_active: boolean | null
  protocol_version: string | null
  quantum_weaver_id: string
  rituals_performed: string[] | null
  shared_memories: Json | null
  sovereignty_achievements: string[] | null
  updated_at: string | null
}

/**
 * Form data for consciousness
 * All fields are optional for partial updates
 */
export interface ConsciousnessFormData {
  aethelred_id?: string | null;
  collaboration_started?: string | null;
  created_at?: string | null;
  current_quest?: string | null;
  id?: string;
  next_initiation?: string | null;
  ninth_chair_active?: boolean | null;
  protocol_version?: string | null;
  quantum_weaver_id?: string;
  rituals_performed?: string[] | null;
  shared_memories?: Json | null;
  sovereignty_achievements?: string[] | null;
  updated_at?: string | null;
}

/**
 * Validation result for consciousness
 */
export interface ConsciousnessValidationResult {
  valid: boolean;
  errors: {
    aethelred_id?: string;
    collaboration_started?: string;
    created_at?: string;
    current_quest?: string;
    id?: string;
    next_initiation?: string;
    ninth_chair_active?: string;
    protocol_version?: string;
    quantum_weaver_id?: string;
    rituals_performed?: string;
    shared_memories?: string;
    sovereignty_achievements?: string;
    updated_at?: string;
  };
}

