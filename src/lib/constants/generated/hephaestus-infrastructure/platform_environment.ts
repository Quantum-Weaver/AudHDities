// =====================================================
// FILE: constants/hephaestus-infrastructure/platform_environment.ts
// GENERATED: 2026-04-13T16:36:33.088Z
// SOURCE: Constants.public.Enums.platform_environment
// VALUES: 3 entries
// =====================================================

export const PLATFORM_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type PlatformEnvironment = typeof PLATFORM_ENVIRONMENT[keyof typeof PLATFORM_ENVIRONMENT];
