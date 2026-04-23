// =====================================================
// FILE: constants/generated/hestia-core/payment_structure.ts
// GENERATED: 2026-04-23T02:14:54.174Z
// SOURCE: Constants.public.Enums.payment_structure
// VALUES: 7 entries
// =====================================================

export const PAYMENT_STRUCTURE = {
  ONE_TIME: 'one_time',
  RECURRING: 'recurring',
  INSTALLMENT: 'installment',
  DEPOSIT: 'deposit',
  MILESTONE: 'milestone',
  PAY_WHAT_YOU_WANT: 'pay_what_you_want',
  TIP_BASED: 'tip_based',
} as const;

export type PaymentStructure = typeof PAYMENT_STRUCTURE[keyof typeof PAYMENT_STRUCTURE];
