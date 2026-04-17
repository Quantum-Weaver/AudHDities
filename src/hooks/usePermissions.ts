// src/hooks/usePermissions.ts
'use client';

import { useAuth } from './useAuth';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Database } from '@/types/supabase/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export function usePermissions() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isCommunity, setIsCommunity] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsCreator(false);
      setIsVendor(false);
      setIsCommunity(false);
      setLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, is_creator, is_vendor, user_tier')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        // FIXED: Remove hardcoded =false assignments
        setIsAdmin(data.is_admin === true);
        setIsCreator(data.is_creator === true);
        setIsVendor(data.is_vendor === true);
        setIsCommunity(data.user_tier === 'community' || data.user_tier === 'council');
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
    accessCommunityTier: isCommunity,
  };

  return { isAdmin, isCreator, isVendor, isCommunity, can, loading };
}