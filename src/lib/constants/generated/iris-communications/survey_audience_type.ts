// =====================================================
// FILE: constants/generated/iris-communications/survey_audience_type.ts
// GENERATED: 2026-04-22T18:15:11.445Z
// SOURCE: Constants.public.Enums.survey_audience_type
// VALUES: 5 entries
// =====================================================

export const SURVEY_AUDIENCE_TYPE = {
  ALL: 'all',
  CREATORS: 'creators',
  VENDORS: 'vendors',
  SUBSCRIBERS: 'subscribers',
  COUNCIL: 'council',
} as const;

export type SurveyAudienceType = typeof SURVEY_AUDIENCE_TYPE[keyof typeof SURVEY_AUDIENCE_TYPE];
