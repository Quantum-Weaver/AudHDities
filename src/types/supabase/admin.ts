// src/types/supabase/admin.ts
// types/supabase/admin.ts
import type { Database } from './database.types';

export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];
export type AdminLogUpdate = Database['public']['Tables']['admin_logs']['Update'];

export type Application = Database['public']['Tables']['applications']['Row'];
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];
export type ApplicationUpdate = Database['public']['Tables']['applications']['Update'];

export type ApplicationWithProfile = Application & {
  profile: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    email: string | null;
  } | null;
};

export interface AdminStats {
  pendingApplications: number;
  totalUsers: number;
  pendingProducts: number;
  totalSales: number;
  pendingPayouts: number;
}