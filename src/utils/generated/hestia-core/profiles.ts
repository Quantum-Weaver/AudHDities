// =====================================================
// UTILITIES: Profiles
// DEITY: hestia-core
// =====================================================

import { createClient } from '@/lib/supabase/client';
import type { ProfilesRow, ProfilesInsert, ProfilesUpdate } from '@/types/generated/hestia-core/profiles';

export async function createProfiles(data: ProfilesInsert) {
  const supabase = createClient();
  const { data: result, error } = await supabase.from('profiles').insert(data).select().single();
  if (error) throw error;
  return result;
}

export async function getProfiles(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function listProfiles() {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data;
}

export async function updateProfiles(id: string, data: ProfilesUpdate) {
  const supabase = createClient();
  const { data: result, error } = await supabase.from('profiles').update(data).eq('id', id).select().single();
  if (error) throw error;
  return result;
}

export async function deleteProfiles(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
  return true;
}
