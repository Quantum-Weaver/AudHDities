// =====================================================
// FILE: constants/generated/hestia-core/address_type.ts
// GENERATED: 2026-07-28T05:07:04.694Z
// SOURCE: Constants.public.Enums.address_type
// VALUES: 6 entries
// =====================================================

export const ADDRESS_TYPE = {
  HOME: 'home',
  WORK: 'work',
  BILLING: 'billing',
  SHIPPING: 'shipping',
  MAILING: 'mailing',
  OTHER: 'other',
} as const;

export type AddressType = typeof ADDRESS_TYPE[keyof typeof ADDRESS_TYPE];
