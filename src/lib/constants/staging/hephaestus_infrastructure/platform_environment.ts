// =====================================================
// FILE: constants/platform_environment.ts
// GENERATED: 2026-04-05T21:48:03.574Z
// SOURCE: Constants.public.Enums.platform_environment
// =====================================================

export const PLATFORM_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type PlatformEnvironment = typeof PLATFORM_ENVIRONMENT[keyof typeof PLATFORM_ENVIRONMENT];
