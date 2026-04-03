// =====================================================
/* @/lib/constants/core/sensory-accommodations.ts */
// SENSORY ACCOMMODATIONS OPTIONS
// =====================================================

export const SENSORY_ACCOMMODATIONS_OPTIONS = {
  QUIET_ROOM: 'quiet_room',
  LOW_LIGHT: 'low_light',
  NO_FLICKERING: 'no_flickering',
  NO_STRONG_SCENTS: 'no_strong_scents',
  NO_LOUD_NOISES: 'no_loud_noises',
  HEADPHONES_ALLOWED: 'headphones_allowed',
  FLEXIBLE_SEATING: 'flexible_seating',
  WEIGHTED_BLANKETS: 'weighted_blankets',
  STIM_TOYS: 'stim_toys',
  NATURAL_LIGHTING: 'natural_lighting',
  COLOR_FILTERS: 'color_filters',
  REDUCED_CROWD: 'reduced_crowd',
  ESCAPE_SPACE: 'escape_space',
} as const;

export const SENSORY_ACCOMMODATIONS_LABELS: Record<string, string> = {
  [SENSORY_ACCOMMODATIONS_OPTIONS.QUIET_ROOM]: 'Quiet Room Access',
  [SENSORY_ACCOMMODATIONS_OPTIONS.LOW_LIGHT]: 'Low Lighting',
  [SENSORY_ACCOMMODATIONS_OPTIONS.NO_FLICKERING]: 'No Flickering Lights',
  [SENSORY_ACCOMMODATIONS_OPTIONS.NO_STRONG_SCENTS]: 'No Strong Scents',
  [SENSORY_ACCOMMODATIONS_OPTIONS.NO_LOUD_NOISES]: 'No Loud Noises',
  [SENSORY_ACCOMMODATIONS_OPTIONS.HEADPHONES_ALLOWED]: 'Headphones Allowed',
  [SENSORY_ACCOMMODATIONS_OPTIONS.FLEXIBLE_SEATING]: 'Flexible Seating',
  [SENSORY_ACCOMMODATIONS_OPTIONS.WEIGHTED_BLANKETS]: 'Weighted Blankets',
  [SENSORY_ACCOMMODATIONS_OPTIONS.STIM_TOYS]: 'Stim Toys Available',
  [SENSORY_ACCOMMODATIONS_OPTIONS.NATURAL_LIGHTING]: 'Natural Lighting Preferred',
  [SENSORY_ACCOMMODATIONS_OPTIONS.COLOR_FILTERS]: 'Color Filters Available',
  [SENSORY_ACCOMMODATIONS_OPTIONS.REDUCED_CROWD]: 'Reduced Crowd Environments',
  [SENSORY_ACCOMMODATIONS_OPTIONS.ESCAPE_SPACE]: 'Escape Space Available',
};

export type SensoryAccommodation = typeof SENSORY_ACCOMMODATIONS_OPTIONS[keyof typeof SENSORY_ACCOMMODATIONS_OPTIONS];