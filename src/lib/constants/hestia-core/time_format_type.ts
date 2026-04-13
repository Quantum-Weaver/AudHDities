// =====================================================
// FILE: constants/hestia-core/time_format_type.ts
// GENERATED: 2026-04-13T01:15:57.370Z
// SOURCE: Constants.public.Enums.time_format_type
// VALUES: 2 entries
// =====================================================

export const TIME_FORMAT_TYPE = {
  12H: '12h',
  24H: '24h',
} as const;

export type TimeFormatType = typeof TIME_FORMAT_TYPE[keyof typeof TIME_FORMAT_TYPE];
