// =====================================================
// FILE: constants/hestia-core/setting_scope.ts
// GENERATED: 2026-04-13T16:36:33.091Z
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
