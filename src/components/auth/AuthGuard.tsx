// components/auth/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = must be logged in, false = must be logged out
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const supabase = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const authenticated = !!session;
      
      setIsAuthenticated(authenticated);

      if (requireAuth && !authenticated) {
        // Redirect to login, but save where they were going
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
      } else if (!requireAuth && authenticated) {
        // If they're logged in but trying to access login/signup, send to dashboard
        router.push('/dashboard');
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, [supabase, router, pathname, requireAuth, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  // If we're still here, render children
  return <>{children}</>;
}