// =====================================================
// FILE: constants/generated/iris-communications/measurement_system_type.ts
// GENERATED: 2026-04-13T21:47:20.900Z
// SOURCE: Constants.public.Enums.measurement_system_type
// =====================================================

export const MEASUREMENT_SYSTEM_TYPE = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
  US_CUSTOMARY: 'us_customary',
} as const;

export type MeasurementSystemType = typeof MEASUREMENT_SYSTEM_TYPE[keyof typeof MEASUREMENT_SYSTEM_TYPE];