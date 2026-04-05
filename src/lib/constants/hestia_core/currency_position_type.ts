// =====================================================
// FILE: constants/currency_position_type.ts
// GENERATED: 2026-04-05T18:10:53.179Z
// SOURCE: Constants.public.Enums.currency_position_type
// =====================================================

export const CURRENCY_POSITION_TYPE = {
  BEFORE: 'before',
  AFTER: 'after',
} as const;

export type CurrencyPositionType = typeof CURRENCY_POSITION_TYPE[keyof typeof CURRENCY_POSITION_TYPE];
