// =====================================================
// FILE: constants/generated/hestia-core/date_format_type.ts
// GENERATED: 2026-04-15T05:16:17.341Z
// SOURCE: Constants.public.Enums.date_format_type
// VALUES: 3 entries
// =====================================================

export const DATE_FORMAT_TYPE = {
  "YYYY-MM-DD": 'YYYY-MM-DD',
  "MM/DD/YYYY": 'MM/DD/YYYY',
  "DD/MM/YYYY": 'DD/MM/YYYY',
} as const;

export type DateFormatType = typeof DATE_FORMAT_TYPE[keyof typeof DATE_FORMAT_TYPE];
