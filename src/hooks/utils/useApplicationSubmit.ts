// hooks/useApplicationSubmit.ts
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function useApplicationSubmit(type: 'creator' | 'vendor') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const submitApplication = async (data: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to apply');
      }

      // Check for existing pending application
      const { data: existing } = await supabase
        .from('applications')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('application_type', type)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'pending') {
          throw new Error('You already have a pending application');
        }
        if (existing.status === 'verified') {
          throw new Error(`You are already a verified ${type}`);
        }
      }

      // Insert application
      const { error: insertError } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          application_type: type,
          form_data: data,
          status: 'pending',
          onboarding_doc_path: `docs/guides/${type}-onboarding.md`,
          onboarding_version: '1.0',
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(insertError.message);
      }

      router.push(`/dashboard?application=${type}&status=submitted`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading, error };
}