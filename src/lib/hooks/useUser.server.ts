// hooks/useUser.server.ts

import { auth, type Session, type Profile } from '@/lib/auth';

export interface ServerUserReturn {
  user: Session['user'];
  profile: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCreator: boolean;
  isVendor: boolean;
  isQuantumWeaver: boolean;
  userTier: Profile['user_tier'] | 'ally';
  sovereigntyScore: number;
}

/**
 * Server-side hook to get current user (for server components)
 * 
 * @example
 * const { user, profile, isAuthenticated } = await useServerUser();
 */
export async function useServerUser(): Promise<ServerUserReturn> {
  const { user, profile } = await auth();
  
  return {
    user,
    profile,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin === true,
    isCreator: profile?.is_creator === true,
    isVendor: profile?.is_vendor === true,
    isQuantumWeaver: profile?.is_quantum_weaver === true,
    userTier: profile?.user_tier || 'ally',
    sovereigntyScore: profile?.sovereignty_score || 0,
  };
}