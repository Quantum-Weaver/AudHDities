// =====================================================
// FILE: constants/generated/iris-communications/measurement_system_type.ts
// GENERATED: 2026-04-30T04:17:48.933Z
// SOURCE: Constants.public.Enums.measurement_system_type
// VALUES: 3 entries
// =====================================================

export const MEASUREMENT_SYSTEM_TYPE = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
  US_CUSTOMARY: 'us_customary',
} as const;

export type MeasurementSystemType = typeof MEASUREMENT_SYSTEM_TYPE[keyof typeof MEASUREMENT_SYSTEM_TYPE];
