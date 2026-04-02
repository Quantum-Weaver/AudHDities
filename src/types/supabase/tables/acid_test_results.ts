// src/types/supabase/tables/acid_test_results.ts
import type { Database } from '../database.types';

export type AcidTestResult = Database['public']['Tables']['acid_test_results']['Row'];
export type AcidTestResultInsert = Database['public']['Tables']['acid_test_results']['Insert'];
export type AcidTestResultUpdate = Database['public']['Tables']['acid_test_results']['Update'];

export interface AcidTestResultWithRelations extends AcidTestResult {
  user?: Database['public']['Tables']['profiles']['Row'];
}

export const acidTestResultDefaults = {
  total_score: 0,
  persona_label: null,
  answers: null,
} as const;