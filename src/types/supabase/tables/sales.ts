// src/types/supabase/tables/sales.ts
import type { Database } from '../database.types';
import type { ResidualPayout, ResidualPayoutInsert, ResidualPayoutUpdate, ResidualWithDetails } from './residual_payouts';

export type Sale = Database['public']['Tables']['sales']['Row'];
export type SaleInsert = Database['public']['Tables']['sales']['Insert'];
export type SaleUpdate = Database['public']['Tables']['sales']['Update'];

export interface SaleWithDetails extends Sale {
  product?: {
    id: string;
    title: string;
    slug: string;
  };
  buyer?: {
    id: string;
    username: string | null;
    display_name: string | null;
  };
}

export interface SaleWithRelations extends Sale {
  buyer?: Database['public']['Tables']['profiles']['Row'];
  product?: Database['public']['Tables']['products']['Row'];
  residualPayouts?: Database['public']['Tables']['residual_payouts']['Row'][];
}

// Re-export Residual types for convenience
export type { ResidualPayout, ResidualPayoutInsert, ResidualPayoutUpdate, ResidualWithDetails };

export const saleDefaults = {
  payment_status: 'completed' as const,
  bigot_tax_applied: false,
  nd_price_applied: false,
  payment_processor_fee: 0,
} as const;