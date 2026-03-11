// components/SupabaseContinuityBridge.tsx
'use client';
import { useEffect } from 'react';
import { useSupabase } from '@/utils/supabase/client';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';

export function SupabaseContinuityBridge() {
  const supabase = useSupabase();
  const { setCurrentUser, setEnvironment } = useContinuityBeam();
  
  useEffect(() => {
    // Initial auth check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
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
    };
    
    checkUser();

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
          
          /* Optional: Set environment based on user data
          if (profile?.primary_house) {
            // You might want to map house to environment here
            // setEnvironment('council'); // Example
          }*/
        } else {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, setCurrentUser, setEnvironment]);

  return null; // This component just bridges data
}