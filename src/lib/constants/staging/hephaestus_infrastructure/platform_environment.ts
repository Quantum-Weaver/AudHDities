// =====================================================
// FILE: constants/platform_environment.ts
// GENERATED: 2026-04-05T18:12:44.951Z
// SOURCE: Constants.public.Enums.platform_environment
// =====================================================

export const PLATFORM_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type PlatformEnvironment = typeof PLATFORM_ENVIRONMENT[keyof typeof PLATFORM_ENVIRONMENT];
