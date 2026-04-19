// lib/constants/systems/environments/resolver.ts
// Main environment resolution engine

import type { 
  BaseEnvironmentKey, 
  EnvironmentContext, 
  EnvironmentResolution,
  EnvironmentRule 
} from './types';
import { ALL_ENVIRONMENT_RULES, DEFAULT_ENVIRONMENT } from './rules';
import { getPageEnvironment } from './page_mapping';

export interface ResolveEnvironmentOptions {
  context: EnvironmentContext;
  route?: string;
  variantPreference?: number;
}

/**
 * Resolve the best environment based on context and rules
 */
export function resolveEnvironment(options: ResolveEnvironmentOptions): EnvironmentResolution {
  const { context, route, variantPreference = 1 } = options;
  
  // Start with page default
  let selectedEnvironment: BaseEnvironmentKey = route 
    ? getPageEnvironment(route)
    : DEFAULT_ENVIRONMENT;
  
  let selectedReason = `Page default: ${selectedEnvironment}`;
  let highestPriority = -1;
  
  // Apply rules in priority order
  const sortedRules = [...ALL_ENVIRONMENT_RULES].sort((a, b) => b.priority - a.priority);
  
  for (const rule of sortedRules) {
    try {
      if (rule.condition(context)) {
        selectedEnvironment = rule.result;
        selectedReason = `Rule matched: ${rule.name}`;
        highestPriority = rule.priority;
        break; // First matching rule with highest priority wins
      }
    } catch (error) {
      console.warn(`Error evaluating rule ${rule.name}:`, error);
    }
  }
  
  // Determine variant (1-4) based on context
  let variant = variantPreference;
  if (context.sovereigntyScore) {
    // Higher sovereignty gets more advanced variants
    const variantOffset = Math.floor(context.sovereigntyScore / 500);
    variant = Math.min(4, Math.max(1, variantPreference + variantOffset));
  }
  
  // Calculate confidence score
  let confidence = 0.5; // Base confidence
  if (highestPriority > 0) {
    confidence = Math.min(1, highestPriority / 1000);
  }
  
  return {
    variant,
    reason: selectedReason,
    environment: selectedEnvironment
  };
}

/**
 * Get variant for an environment based on context
 */
export function getEnvironmentVariant(
  environment: BaseEnvironmentKey,
  context: EnvironmentContext
): number {
  // Default variant 1
  let variant = 1;
  
  // Adjust based on sovereignty
  if (context.sovereigntyScore) {
    variant = Math.min(4, Math.max(1, 1 + Math.floor(context.sovereigntyScore / 500)));
  }
  
  // Adjust based on time of day
  if (context.timeOfDay === 'night') {
    variant = Math.min(4, variant + 1);
  }
  
  return variant;
}

/**
 * Quick resolve for server-side rendering (no user context)
 */
export function quickResolveEnvironment(route: string): BaseEnvironmentKey {
  return getPageEnvironment(route);
}