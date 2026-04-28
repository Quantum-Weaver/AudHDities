// lib/utils/environment.utils.ts

import type { EnvironmentKey } from '@/lib/constants/systems';

export interface ParsedEnvironment {
  environment: EnvironmentKey;
  variant: number;
}

/**
 * Parse a stored preference string into environment + variant.
 * "home:3" → { environment: "home", variant: 3 }
 * "library" → { environment: "library", variant: 1 }
 */
export function parseEnvironmentPreference(value: string | null | undefined): ParsedEnvironment {
  if (!value) return { environment: 'home', variant: 1 };
  
  const [env, variantStr] = value.split(':');
  const variant = parseInt(variantStr || '1', 10);
  
  return {
    environment: (env || 'home') as EnvironmentKey,
    variant: Math.max(1, Math.min(4, variant || 1)),
  };
}

/**
 * Build a storage string from environment + variant.
 * { environment: "home", variant: 3 } → "home:3"
 */
export function buildEnvironmentPreference(environment: EnvironmentKey, variant: number): string {
  return `${environment}:${variant}`;
}

/** Valid variant numbers */
export const ENVIRONMENT_VARIANTS = [1, 2, 3, 4] as const;