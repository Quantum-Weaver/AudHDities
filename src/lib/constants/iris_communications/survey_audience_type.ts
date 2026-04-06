// =====================================================
// FILE: constants/survey_audience_type.ts
// GENERATED: 2026-04-05T21:55:13.289Z
// SOURCE: Constants.public.Enums.survey_audience_type
// =====================================================

export const SURVEY_AUDIENCE_TYPE = {
  ALL: 'all',
  CREATORS: 'creators',
  VENDORS: 'vendors',
  SUBSCRIBERS: 'subscribers',
  COUNCIL: 'council',
} as const;

export type SurveyAudienceType = typeof SURVEY_AUDIENCE_TYPE[keyof typeof SURVEY_AUDIENCE_TYPE];
