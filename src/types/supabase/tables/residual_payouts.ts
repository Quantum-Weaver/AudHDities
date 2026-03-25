// src/types/supabase/tables/residual_payouts.ts
import type { Database } from '../database.types';

export type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
export type ResidualPayoutInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutUpdate = Database['public']['Tables']['residual_payouts']['Update'];

export type PayoutStatus = 'pending' | 'paid' | 'failed';

export interface ResidualPayoutWithRelations extends ResidualPayout {
  contributor?: Database['public']['Tables']['profiles']['Row'];
  product?: Database['public']['Tables']['products']['Row'];
  sale?: Database['public']['Tables']['sales']['Row'];
}

export const residualPayoutDefaults = {
  status: 'pending' as const,
  calculation_note: null,
} as const;