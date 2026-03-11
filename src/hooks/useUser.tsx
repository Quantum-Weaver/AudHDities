'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/utils/supabase/client';
import { Profile } from '@/types/supabase';

export function useUser() {
  const supabase = useSupabase();
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          setError(authError);
          setUser(null);
          setLoading(false);
          return;
        }
        
        if (authUser) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (profileError) {
            setError(profileError);
            setUser(null);
          } else {
            setUser(profile);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err as Error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setUser(profile);
          } catch (err) {
            console.error('Error fetching profile on auth change:', err);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading, error };
}