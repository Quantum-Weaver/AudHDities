// types/supabase/tables/emeralds.ts
import type { Database } from '../database.types';

export type Emerald = Database['public']['Tables']['emeralds']['Row'];
export type EmeraldInsert = Database['public']['Tables']['emeralds']['Insert'];
export type EmeraldUpdate = Database['public']['Tables']['emeralds']['Update'];

export interface EmeraldWithRelations extends Emerald {
  giver?: Database['public']['Tables']['profiles']['Row'];
  post?: Database['public']['Tables']['posts']['Row'];
}

export const emeraldDefaults = {
  amount: 0,
  is_residual_eligible: false,
} as const;