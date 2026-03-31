// src/types/supabase/tables/residual_payouts.ts
import type { Database } from '../database.types';
import type { PayoutStatus } from '../enums';  // ← Add

export type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
export type ResidualPayoutInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutUpdate = Database['public']['Tables']['residual_payouts']['Update'];

// Remove local PayoutStatus definition

// Re-export for convenience
export type { PayoutStatus };

export interface ResidualPayoutWithRelations extends ResidualPayout {
  contributor?: Database['public']['Tables']['profiles']['Row'] | null;
  product?: Database['public']['Tables']['products']['Row'] | null;
  sale?: Database['public']['Tables']['sales']['Row'] | null;
}

export interface ResidualWithDetails extends ResidualPayout {
  product?: {
    title: string;
  };
  contributor?: {
    username: string | null;
    display_name: string | null;
  };
}

export const residualPayoutDefaults = {
  status: 'pending' as PayoutStatus,
  calculation_note: null,
} as const;