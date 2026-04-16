// src/lib/auth/admin.ts
// Helper function to check if user is admin
export async function isUserAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();
  
  return data?.is_admin === true;
}