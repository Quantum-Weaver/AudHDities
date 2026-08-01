// =====================================================
// FILE: types/generated/plutus-economics/distribution_recipients.ts
// HANDLING: join_table
// DEITY: plutus-economics
// GENERATED: 2026-08-01T17:46:58.402Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type DistributionRecipientsRow = Tables<'distribution_recipients'>;
export type DistributionRecipientsInsert = TablesInsert<'distribution_recipients'>;
export type DistributionRecipientsUpdate = TablesUpdate<'distribution_recipients'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for distribution_recipients
 * All fields are optional for partial updates
 */
export interface DistributionRecipientsFormData {
  amount?: number;
  created_at?: string;
  created_by?: string | null;
  distribution_id?: string;
  id?: string;
  status?: string;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
}

