// src/components/asgard/domains/themis/admin/gate.ts

import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';

/** Sends a visitor to the door and a non-admin back to the Council. */
export async function requireAdmin(route: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, route));

  const { data: profile } = await supabase
    .from('community_profiles')
    .select('roles')
    .eq('created_by', user.id)
    .maybeSingle();

  if (!profile?.roles?.includes('admin')) redirect('/council');
}
