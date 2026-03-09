'use client';

import { useEffect } from 'react';
import { useSupabase } from '@/lib/utils/supabase/client';
import { useContinuityBeam } from './ContinuityBeamContext'; // Your existing hook

export function SupabaseContinuityBridge() {
  const supabase = useSupabase();
  const { setCurrentUser, setEnvironment } = useContinuityBeam(); // Your existing context methods
  
  useEffect(() => {
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch full profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setCurrentUser(profile);
        } else {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, setCurrentUser]);

  return null; // This component just bridges data
}