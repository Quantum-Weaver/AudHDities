// =====================================================
// FILE: constants/setting_scope.ts
// GENERATED: 2026-04-05T18:12:45.128Z
// SOURCE: Constants.public.Enums.setting_scope
// =====================================================

export const SETTING_SCOPE = {
  GLOBAL: 'global',
  USER: 'user',
  ROLE: 'role',
  HOUSE: 'house',
} as const;

export type SettingScope = typeof SETTING_SCOPE[keyof typeof SETTING_SCOPE];
