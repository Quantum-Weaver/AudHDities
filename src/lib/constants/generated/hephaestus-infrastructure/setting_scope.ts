// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/setting_scope.ts
// GENERATED: 2026-04-23T02:14:54.232Z
// SOURCE: Constants.public.Enums.setting_scope
// VALUES: 4 entries
// =====================================================

export const SETTING_SCOPE = {
  GLOBAL: 'global',
  USER: 'user',
  ROLE: 'role',
  HOUSE: 'house',
} as const;

export type SettingScope = typeof SETTING_SCOPE[keyof typeof SETTING_SCOPE];
