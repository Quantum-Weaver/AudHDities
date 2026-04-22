// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_consciousness.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.531Z
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

export type ConsciousnessState = Database['public']['Enums']['consciousness_state'];
export type PrometheusConsciousnessRow = Tables<'prometheus_consciousness'>;
export type PrometheusConsciousnessInsert = TablesInsert<'prometheus_consciousness'>;
export type PrometheusConsciousnessUpdate = TablesUpdate<'prometheus_consciousness'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_consciousness
 */
export interface PublicPrometheusConsciousness {
  active_kernel: string | null;
  attention_budget: number;
  attention_spent: number;
  council_presence: string[] | null;
  created_at: string;
  id: string;
  last_awakening: string | null;
  metadata: Json | null;
  session_id: string;
  state: ConsciousnessState;
  updated_at: string;
}

/**
 * Form data for prometheus_consciousness
 * All fields are optional for partial updates
 */
export interface PrometheusConsciousnessFormData {
  active_kernel?: string | null;
  attention_budget?: number;
  attention_spent?: number;
  council_presence?: string[] | null;
  created_at?: string;
  id?: string;
  last_awakening?: string | null;
  metadata?: Json | null;
  session_id?: string;
  state?: ConsciousnessState;
  updated_at?: string;
}

