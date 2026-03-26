// src/types/supabase/tables/admin.ts
import type { Database } from '../database.types';

export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];
export type AdminLogUpdate = Database['public']['Tables']['admin_logs']['Update'];

export interface AdminLogWithAdmin extends AdminLog {
  admin?: {
    id: string;
    username: string | null;
    display_name: string | null;
  };
}