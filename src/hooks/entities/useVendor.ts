/* @/hooks/entitis/useVendor.ts */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import type { VendorProfile } from '@/types/supabase/tables/vendor_profiles';

export function useVendor(userId?: string) {
  const supabase = useSupabase();
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendor = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setVendor(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchVendor(userId);
  }, [userId, fetchVendor]);

  const applyForVendor = useCallback(async (applicationData: Partial<VendorProfile>) => {
    if (!userId) return { error: 'No user ID' };
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: userId,
          application_type: 'vendor',
          form_data: applicationData
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [userId, supabase]);

  return { vendor, loading, error, applyForVendor };
}