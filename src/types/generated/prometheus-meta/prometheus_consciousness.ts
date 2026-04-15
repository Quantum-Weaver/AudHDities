// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_consciousness.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.506Z
// SOURCE: database.types.ts lines 4159-4200
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ConsciousnessState = Database['public']['Enums']['consciousness_state'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusConsciousnessRow = Database['public']['Tables']['prometheus_consciousness']['Row'];
export type PrometheusConsciousnessInsert = Database['public']['Tables']['prometheus_consciousness']['Insert'];
export type PrometheusConsciousnessUpdate = Database['public']['Tables']['prometheus_consciousness']['Update'];

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
  "created_at": "string";
  id: string;
  "last_awakening": "string | null";
  metadata: Json | null;
  session_id: string;
  state: ConsciousnessState;
  "updated_at": "string";
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
    id?: string;
    last_awakening?: string;
    metadata?: string;
    session_id?: string;
    state?: string;
    updated_at?: string;
  };
}

