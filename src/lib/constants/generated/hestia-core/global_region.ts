// =====================================================
// FILE: constants/generated/hestia-core/global_region.ts
// GENERATED: 2026-07-31T01:03:41.933Z
// SOURCE: Constants.public.Enums.global_region
// VALUES: 17 entries
// =====================================================

export const GLOBAL_REGION = {
  NORTH_AMERICA: 'north_america',
  CENTRAL_AMERICA: 'central_america',
  SOUTH_AMERICA: 'south_america',
  CARIBBEAN: 'caribbean',
  WESTERN_EUROPE: 'western_europe',
  EASTERN_EUROPE: 'eastern_europe',
  NORTHERN_EUROPE: 'northern_europe',
  SOUTHERN_EUROPE: 'southern_europe',
  NORTH_AFRICA: 'north_africa',
  SUB_SAHARAN_AFRICA: 'sub_saharan_africa',
  MIDDLE_EAST: 'middle_east',
  CENTRAL_ASIA: 'central_asia',
  SOUTH_ASIA: 'south_asia',
  EAST_ASIA: 'east_asia',
  SOUTHEAST_ASIA: 'southeast_asia',
  OCEANIA: 'oceania',
  PACIFIC_ISLANDS: 'pacific_islands',
} as const;

export type GlobalRegion = typeof GLOBAL_REGION[keyof typeof GLOBAL_REGION];
