// src/lib/auth/admin.ts
export async function isUserAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('profiles_id', userId)
    .single();
  
  return data?.is_admin === true;
}