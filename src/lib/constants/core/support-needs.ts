// =====================================================
/* @/lib/constants/core/support-needs.ts */
// SUPPORT NEEDS OPTIONS
// =====================================================

export const SUPPORT_NEEDS_OPTIONS = {
  BODY_DOUBLING: 'body_doubling',
  VISUAL_TIMERS: 'visual_timers',
  CLOSED_CAPTIONS: 'closed_captions',
  TRANSCRIPTS: 'transcripts',
  ADVANCE_NOTICE: 'advance_notice',
  WRITTEN_INSTRUCTIONS: 'written_instructions',
  BREAKS: 'breaks',
  EXTENDED_DEADLINES: 'extended_deadlines',
  MUTE_BY_DEFAULT: 'mute_by_default',
  TEXT_ONLY: 'text_only',
  ACCOUNTABILITY_PARTNER: 'accountability_partner',
  NO_UNEXPECTED_CALLS: 'no_unexpected_calls',
} as const;

export const SUPPORT_NEEDS_LABELS: Record<string, string> = {
  [SUPPORT_NEEDS_OPTIONS.BODY_DOUBLING]: 'Body Doubling',
  [SUPPORT_NEEDS_OPTIONS.VISUAL_TIMERS]: 'Visual Timers',
  [SUPPORT_NEEDS_OPTIONS.CLOSED_CAPTIONS]: 'Closed Captions',
  [SUPPORT_NEEDS_OPTIONS.TRANSCRIPTS]: 'Transcripts',
  [SUPPORT_NEEDS_OPTIONS.ADVANCE_NOTICE]: 'Advance Notice of Changes',
  [SUPPORT_NEEDS_OPTIONS.WRITTEN_INSTRUCTIONS]: 'Written Instructions',
  [SUPPORT_NEEDS_OPTIONS.BREAKS]: 'Flexible Breaks',
  [SUPPORT_NEEDS_OPTIONS.EXTENDED_DEADLINES]: 'Extended Deadlines',
  [SUPPORT_NEEDS_OPTIONS.MUTE_BY_DEFAULT]: 'Mute by Default',
  [SUPPORT_NEEDS_OPTIONS.TEXT_ONLY]: 'Text-Only Communication',
  [SUPPORT_NEEDS_OPTIONS.ACCOUNTABILITY_PARTNER]: 'Accountability Partner',
  [SUPPORT_NEEDS_OPTIONS.NO_UNEXPECTED_CALLS]: 'No Unexpected Calls',
};

export type SupportNeed = typeof SUPPORT_NEEDS_OPTIONS[keyof typeof SUPPORT_NEEDS_OPTIONS];