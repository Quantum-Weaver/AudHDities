// =====================================================
// FILE: constants/generated/themis-governance/moderation_action_type.ts
// GENERATED: 2026-05-01T03:24:43.017Z
// SOURCE: Constants.public.Enums.moderation_action_type
// VALUES: 13 entries
// =====================================================

export const MODERATION_ACTION_TYPE = {
  HIDE: 'hide',
  UNHIDE: 'unhide',
  DELETE: 'delete',
  RESTORE: 'restore',
  WARN: 'warn',
  SUSPEND: 'suspend',
  BAN: 'ban',
  MUTE: 'mute',
  UNMUTE: 'unmute',
  VERIFY: 'verify',
  UNVERIFY: 'unverify',
  FEATURE: 'feature',
  UNFEATURE: 'unfeature',
} as const;

export type ModerationActionType = typeof MODERATION_ACTION_TYPE[keyof typeof MODERATION_ACTION_TYPE];
