// =====================================================
// FILE: constants/time_format_type.ts
// GENERATED: 2026-04-05T18:10:53.184Z
// SOURCE: Constants.public.Enums.time_format_type
// =====================================================

export const TIME_FORMAT_TYPE = {
  '12H': '12h',
  '24H': '24h',
} as const;

export type TimeFormatType = typeof TIME_FORMAT_TYPE[keyof typeof TIME_FORMAT_TYPE];
