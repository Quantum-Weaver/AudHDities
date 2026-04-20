// =====================================================
// HOOK: useProfiles
// DEITY: hestia-core
// =====================================================

import { useState, useEffect } from 'react';
import type { ProfilesRow } from '@/types/hestia-core/profiles';

export function useProfiles(id?: string) {
  const [data, setData] = useState<ProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    fetch(`/api/hestia-core/profiles/${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error, refetch: () => {} };
}

export function useProfilesList() {
  const [data, setData] = useState<ProfilesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/hestia-core/profiles`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error, refetch: () => {} };
}
