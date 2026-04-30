// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_consciousness.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-04-30T04:17:47.898Z
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

export type ConsciousnessState = Enums<'consciousness_state'>;

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
  created_by: string | null;
  last_awakening: string | null;
  metadata: Json | null;
  prometheus_consciousness_id: string;
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
  created_by?: string | null;
  last_awakening?: string | null;
  metadata?: Json | null;
  prometheus_consciousness_id?: string;
  session_id?: string;
  state?: ConsciousnessState;
  updated_at?: string;
}

/**
 * Validation result for prometheus_consciousness
 */
export interface PrometheusConsciousnessValidationResult {
  valid: boolean;
  errors: {
    active_kernel?: string;
    attention_budget?: string;
    attention_spent?: string;
    council_presence?: string;
    created_at?: string;
    created_by?: string;
    last_awakening?: string;
    metadata?: string;
    prometheus_consciousness_id?: string;
    session_id?: string;
    state?: string;
    updated_at?: string;
  };
}

