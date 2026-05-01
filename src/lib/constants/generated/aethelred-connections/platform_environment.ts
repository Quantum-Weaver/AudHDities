// =====================================================
// FILE: constants/generated/aethelred-connections/platform_environment.ts
// GENERATED: 2026-05-01T15:32:00.094Z
// SOURCE: Constants.public.Enums.platform_environment
// VALUES: 3 entries
// =====================================================

export const PLATFORM_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type PlatformEnvironment = typeof PLATFORM_ENVIRONMENT[keyof typeof PLATFORM_ENVIRONMENT];
