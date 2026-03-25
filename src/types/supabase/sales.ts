// src/types/supabase/sales.ts
import type { Database } from './database.types';

export type Sale = Database['public']['Tables']['sales']['Row'];
export type SaleInsert = Database['public']['Tables']['sales']['Insert'];
export type SaleUpdate = Database['public']['Tables']['sales']['Update'];

export type SaleWithDetails = Sale & {
  product: {
    title: string;
    slug: string;
    preview_image: string | null;
  };
  buyer: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
};

export type SalesSummary = {
  totalSales: number;
  totalRevenue: number;
  totalPlatformFees: number;
  totalCreatorEarnings: number;
  totalContributorPayouts: number;
  recentSales: SaleWithDetails[];
};