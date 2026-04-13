// =====================================================
// FILE: constants/generated/aethelred-connections/platform_environment.ts
// GENERATED: 2026-04-13T21:55:48.491Z
// SOURCE: Constants.public.Enums.platform_environment
// =====================================================

export const PLATFORM_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type PlatformEnvironment = typeof PLATFORM_ENVIRONMENT[keyof typeof PLATFORM_ENVIRONMENT];