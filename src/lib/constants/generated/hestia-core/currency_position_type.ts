// =====================================================
// FILE: constants/hestia-core/currency_position_type.ts
// GENERATED: 2026-04-13T16:36:33.082Z
// SOURCE: Constants.public.Enums.currency_position_type
// VALUES: 2 entries
// =====================================================

export const CURRENCY_POSITION_TYPE = {
  BEFORE: 'before',
  AFTER: 'after',
} as const;

export type CurrencyPositionType = typeof CURRENCY_POSITION_TYPE[keyof typeof CURRENCY_POSITION_TYPE];
