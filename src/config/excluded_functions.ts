// src/config/excluded_functions.ts
// ============================================================================
// ============================================================================
// ============================================================================

export const EXCLUDED_FUNCTIONS = [
  // Supabase auth internals — never expose
  'handle_new_user',
  'handle_user_update',

] as const;

export const EXCLUDED_FUNCTION_PREFIXES = [
  'supabase_',
  'auth_',
  'pgrst_',
  'pg_',
  '__',
] as const;

export type ExcludedFunction = typeof EXCLUDED_FUNCTIONS[number];
export type ExcludedFunctionPrefix = typeof EXCLUDED_FUNCTION_PREFIXES[number];

/**
 * Check if a function should be excluded from schema generation.
 */
export function isFunctionExcluded(functionName: string): boolean {
  // Exact match
  if ((EXCLUDED_FUNCTIONS as readonly string[]).includes(functionName)) {
    return true;
  }
  
  // Prefix match
  for (const prefix of EXCLUDED_FUNCTION_PREFIXES) {
    if (functionName.startsWith(prefix)) {
      return true;
    }
  }
  
  return false;
}