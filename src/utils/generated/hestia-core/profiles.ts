// =====================================================
// UTILITIES: Profiles
// DEITY: hestia-core
// =====================================================

import { createClient } from '@/lib/supabase/client';
import type { ProfilesRow, ProfilesInsert, ProfilesUpdate } from '@/types/generated/hestia-core/profiles';
import { ProfilesInsertSchema, ProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/profiles';

export async function createProfiles(data: ProfilesInsert): Promise<ProfilesRow> {
  const validated = ProfilesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('profiles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function getProfiles(id: string): Promise<ProfilesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function listProfiles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProfilesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('profiles').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

export async function updateProfiles(id: string, data: ProfilesUpdate): Promise<ProfilesRow> {
  const validated = ProfilesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('profiles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function deleteProfiles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
