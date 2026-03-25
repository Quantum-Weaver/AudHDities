// src/types/supabase/tables/admin_logs.ts
import type { Database } from '../database.types';

export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];
export type AdminLogUpdate = Database['public']['Tables']['admin_logs']['Update'];

export interface AdminLogWithRelations extends AdminLog {
  admin?: Database['public']['Tables']['profiles']['Row'];
}

export const adminLogDefaults = {
  metadata: null,
  public_note: null,
  target_id: null,
  target_type: null,
} as const;