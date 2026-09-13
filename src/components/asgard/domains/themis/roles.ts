// src/components/asgard/domains/themis/roles.ts

import { createClient } from '@/lib/supabase/client';
import type { Enums } from '@/lib/generated/supabase/database.helpers';

export type UserRole = Enums<'user_role'>;

/** The role every vessel keeps; it is never taken away here. */
export const BASE_ROLE: UserRole = 'community';

/** Writes the whole role set on one profile row. */
export async function setRoles(profileId: string, roles: UserRole[]): Promise<string | null> {
  const supabase = createClient();
  const next = roles.includes(BASE_ROLE) ? roles : [BASE_ROLE, ...roles];
  const { error } = await supabase
    .from('community_profiles')
    .update({ roles: next })
    .eq('id', profileId);

  return error ? error.message : null;
}

/** Adds one role to the vessel's profile, leaving the roles it already holds. */
export async function grantRole(userId: string, role: UserRole): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('community_profiles')
    .select('id, roles')
    .eq('created_by', userId)
    .maybeSingle();

  if (error) return error.message;
  if (!data) return 'This vessel has no profile to carry the role.';
  if (data.roles.includes(role)) return null;

  return setRoles(data.id, [...data.roles, role]);
}

/** Reads the catalog's label and icon for every role. */
export async function readRoleCatalog(): Promise<Record<string, { label: string; icon: string | null }>> {
  const supabase = createClient();
  const { data } = await supabase
    .from('role_catalog')
    .select('role, label, icon_emoji')
    .order('sort_order', { ascending: true });

  const catalog: Record<string, { label: string; icon: string | null }> = {};
  for (const row of data ?? []) {
    catalog[row.role] = { label: row.label, icon: row.icon_emoji };
  }
  return catalog;
}
