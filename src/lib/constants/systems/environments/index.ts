// lib/constants/systems/environments/index.ts
// Central export for all environment utilities

// Types
export type {
  BaseEnvironmentKey,
  DynamicEnvironmentKey,
  EnvironmentContext,
  EnvironmentResolution,
  EnvironmentRule,
  PageEnvironmentMap,
} from './types';

// Page mapping
export { PAGE_ENVIRONMENT_MAP, getPageEnvironment } from './page_mapping';

// Rules
export {
  userTierRules,
  sovereigntyRules,
  energyRules,
  timeRules,
  seasonRules,
  accessibilityRules,
  performanceRules,
  ALL_ENVIRONMENT_RULES,
  DEFAULT_ENVIRONMENT,
} from './rules';

// Resolver
export {
  resolveEnvironment,
  getEnvironmentVariant,
  quickResolveEnvironment,
} from './resolver';