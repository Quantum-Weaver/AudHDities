// =====================================================
// FILE: constants/generated/iris-communications/date_format_type.ts
// GENERATED: 2026-04-23T02:14:54.100Z
// SOURCE: Constants.public.Enums.date_format_type
// VALUES: 3 entries
// =====================================================

export const DATE_FORMAT_TYPE = {
  "YYYY-MM-DD": 'YYYY-MM-DD',
  "MM/DD/YYYY": 'MM/DD/YYYY',
  "DD/MM/YYYY": 'DD/MM/YYYY',
} as const;

export type DateFormatType = typeof DATE_FORMAT_TYPE[keyof typeof DATE_FORMAT_TYPE];
