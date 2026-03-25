// app/hooks/usePermissions.ts
'use client';

import { useAuth } from './useAuth';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Database } from '@/types/supabase/database.types'
export type Profile = Database['public']['Tables']['profiles']['Row']

export function usePermissions() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isCommunity, setCommunity] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsCreator(false);
      setIsVendor(false);
      setLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, is_creator, is_vendor')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setIsAdmin(data.is_admin=false);
        setIsCreator(data.is_creator=false);
        setIsVendor(data.is_vendor=false);
      }
      
      setLoading(false);
    };

    fetchPermissions();
  }, [user, supabase]);

  const can = {
    viewAll: isAdmin,
    editAny: isAdmin,
    createProducts: isCreator || isAdmin,
    createVendorItems: isVendor || isAdmin,
    moderate: isAdmin,
  };

  return { isAdmin, isCreator, isVendor, isCommunity, can, loading };
}