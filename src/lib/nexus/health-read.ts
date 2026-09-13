// src/lib/nexus/health-read.ts
// The base's own portrait, read through the visitor's session.

import { createServerSupabase } from '@/lib/supabase/server';
import type { GaiaConfigRow } from '@/lib/generated/types/daedalus-meta/gaia_config';
import { answered, refused, type ReadResult } from './read';

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabase>>;

export type HealthRegistry =
  | 'columns'
  | 'policies'
  | 'functions'
  | 'indexes'
  | 'enums'
  | 'triggers'
  | 'views'
  | 'composite_types';

/** The registries the self-knowing layer keeps. */
export const HEALTH_REGISTRIES: readonly HealthRegistry[] = [
  'columns',
  'policies',
  'functions',
  'indexes',
  'enums',
  'triggers',
  'views',
  'composite_types',
];

export interface RegistryCount {
  table: HealthRegistry;
  count: number | null;
  fault: string | null;
}

function registryQuery(supabase: SupabaseClient, table: HealthRegistry) {
  const counted = { count: 'exact', head: true } as const;
  switch (table) {
    case 'columns':
      return supabase.from('columns').select('*', counted);
    case 'policies':
      return supabase.from('policies').select('*', counted);
    case 'functions':
      return supabase.from('functions').select('*', counted);
    case 'indexes':
      return supabase.from('indexes').select('*', counted);
    case 'enums':
      return supabase.from('enums').select('*', counted);
    case 'triggers':
      return supabase.from('triggers').select('*', counted);
    case 'views':
      return supabase.from('views').select('*', counted);
    case 'composite_types':
      return supabase.from('composite_types').select('*', counted);
  }
}

/** How many rows each registry holds, counted by the base itself. */
export async function readRegistryCounts(
  registries: readonly HealthRegistry[] = HEALTH_REGISTRIES
): Promise<RegistryCount[]> {
  const supabase = await createServerSupabase();
  return Promise.all(
    registries.map(async (table) => {
      const { count, error } = await registryQuery(supabase, table);
      if (error) return { table, count: null, fault: error.message };
      return { table, count: count ?? 0, fault: null };
    })
  );
}

/** The portrait, one row per table the layer knows. */
export async function readGaiaConfig(): Promise<ReadResult<GaiaConfigRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('gaia_config')
    .select('*')
    .order('deity_group', { ascending: true })
    .order('table_name', { ascending: true });
  if (error) return refused('gaia_config', error.message);
  return answered('gaia_config', data ?? []);
}
