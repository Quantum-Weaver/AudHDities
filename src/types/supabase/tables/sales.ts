// src/types/supabase/sales.ts
import type { Database } from '../database.types';

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

export type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
export type ResidualPayoutInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutUpdate = Database['public']['Tables']['residual_payouts']['Update'];

export interface ResidualWithDetails extends ResidualPayout {
  product?: {
    title: string;
  };
  contributor?: {
    username: string | null;
    display_name: string | null;
  };
}

export interface SaleWithRelations extends Sale {
  buyer?: Database['public']['Tables']['profiles']['Row'];
  product?: Database['public']['Tables']['products']['Row'];
  residualPayouts?: Database['public']['Tables']['residual_payouts']['Row'][];
}

export const saleDefaults = {
  payment_status: 'completed' as const,
  bigot_tax_applied: false,
  nd_price_applied: false,
  payment_processor_fee: 0,
} as const;