// =====================================================
// GENERATED ENUMS HELPER - DO NOT EDIT MANUALLY
// =====================================================
// Generated: 2026-07-31T23:16:53.345Z
// Source: database.types.ts Constants.Enums
// Purpose: Runtime enum values and type-safe helpers
// =====================================================

import type { Database } from './database.types';
import type { Enums } from './database.helpers';

// =====================================================
// TYPE EXPORTS (using database.helpers)
// =====================================================

export type AddressType = Enums<'address_type'>;
export type ApplicationStatus = Enums<'application_status'>;
export type ApplicationType = Enums<'application_type'>;
export type ContentStatus = Enums<'content_status'>;
export type DisplayTheme = Enums<'display_theme'>;
export type ExchangeStatus = Enums<'exchange_status'>;
export type GlobalRegion = Enums<'global_region'>;
export type HeraldDigest = Enums<'herald_digest'>;
export type NotificationChannel = Enums<'notification_channel'>;
export type PricingModel = Enums<'pricing_model'>;
export type ProcessingSpeed = Enums<'processing_speed'>;
export type ProfileStatus = Enums<'profile_status'>;
export type RelationshipType = Enums<'relationship_type'>;
export type SensoryLevel = Enums<'sensory_level'>;
export type SovereignTier = Enums<'sovereign_tier'>;
export type SubscriptionTier = Enums<'subscription_tier'>;
export type UserRole = Enums<'user_role'>;
export type Visibility = Enums<'visibility'>;
export type WareType = Enums<'ware_type'>;
export type WorkType = Enums<'work_type'>;

// =====================================================
// RUNTIME ENUM VALUES
// =====================================================

export const ENUM_VALUES = {
  addressType: ['home', 'work', 'billing', 'shipping', 'mailing', 'other'] as const,
  applicationStatus: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'suspended', 'withdrawn'] as const,
  applicationType: ['creator', 'vendor', 'curator', 'council'] as const,
  contentStatus: ['draft', 'published', 'archived'] as const,
  displayTheme: ['cosmic_dark', 'cosmic_light', 'quantum', 'sanctuary', 'high_contrast'] as const,
  exchangeStatus: ['pending', 'completed', 'failed', 'refunded'] as const,
  globalRegion: ['north_america', 'central_america', 'south_america', 'caribbean', 'western_europe', 'eastern_europe', 'northern_europe', 'southern_europe', 'north_africa', 'sub_saharan_africa', 'middle_east', 'central_asia', 'south_asia', 'east_asia', 'southeast_asia', 'oceania', 'pacific_islands'] as const,
  heraldDigest: ['instant', 'hourly', 'daily', 'weekly', 'never'] as const,
  notificationChannel: ['in_app', 'email', 'push', 'none'] as const,
  pricingModel: ['free', 'fixed', 'pay_what_you_want', 'patronage_only'] as const,
  processingSpeed: ['slower', 'standard', 'faster'] as const,
  profileStatus: ['draft', 'pending', 'active', 'inactive', 'suspended', 'closed'] as const,
  relationshipType: ['spouse', 'partner', 'parent', 'child', 'sibling', 'grandparent', 'grandchild', 'aunt', 'uncle', 'cousin', 'friend', 'roommate', 'caregiver', 'doctor', 'therapist', 'social_worker', 'other'] as const,
  sensoryLevel: ['low', 'medium', 'high', 'extreme'] as const,
  sovereignTier: ['dweller', 'guild', 'outlander', 'sovereign_weaver'] as const,
  subscriptionTier: ['community', 'ally', 'council', 'corporate'] as const,
  userRole: ['community', 'creator', 'vendor', 'curator', 'council', 'admin'] as const,
  visibility: ['public', 'community', 'connections', 'private'] as const,
  wareType: ['physical', 'digital', 'service'] as const,
  workType: ['music', 'writing', 'vision', 'performance', 'code', 'other'] as const,
} as const;

// =====================================================
// TYPE-SAFE VALIDATION HELPERS
// =====================================================

export function isValidAddressType(value: string): value is AddressType {
  return ENUM_VALUES.addressType.includes(value as any);
}

export function isValidApplicationStatus(value: string): value is ApplicationStatus {
  return ENUM_VALUES.applicationStatus.includes(value as any);
}

export function isValidApplicationType(value: string): value is ApplicationType {
  return ENUM_VALUES.applicationType.includes(value as any);
}

export function isValidContentStatus(value: string): value is ContentStatus {
  return ENUM_VALUES.contentStatus.includes(value as any);
}

export function isValidDisplayTheme(value: string): value is DisplayTheme {
  return ENUM_VALUES.displayTheme.includes(value as any);
}

export function isValidExchangeStatus(value: string): value is ExchangeStatus {
  return ENUM_VALUES.exchangeStatus.includes(value as any);
}

export function isValidGlobalRegion(value: string): value is GlobalRegion {
  return ENUM_VALUES.globalRegion.includes(value as any);
}

export function isValidHeraldDigest(value: string): value is HeraldDigest {
  return ENUM_VALUES.heraldDigest.includes(value as any);
}

export function isValidNotificationChannel(value: string): value is NotificationChannel {
  return ENUM_VALUES.notificationChannel.includes(value as any);
}

export function isValidPricingModel(value: string): value is PricingModel {
  return ENUM_VALUES.pricingModel.includes(value as any);
}

export function isValidProcessingSpeed(value: string): value is ProcessingSpeed {
  return ENUM_VALUES.processingSpeed.includes(value as any);
}

export function isValidProfileStatus(value: string): value is ProfileStatus {
  return ENUM_VALUES.profileStatus.includes(value as any);
}

export function isValidRelationshipType(value: string): value is RelationshipType {
  return ENUM_VALUES.relationshipType.includes(value as any);
}

export function isValidSensoryLevel(value: string): value is SensoryLevel {
  return ENUM_VALUES.sensoryLevel.includes(value as any);
}

export function isValidSovereignTier(value: string): value is SovereignTier {
  return ENUM_VALUES.sovereignTier.includes(value as any);
}

export function isValidSubscriptionTier(value: string): value is SubscriptionTier {
  return ENUM_VALUES.subscriptionTier.includes(value as any);
}

export function isValidUserRole(value: string): value is UserRole {
  return ENUM_VALUES.userRole.includes(value as any);
}

export function isValidVisibility(value: string): value is Visibility {
  return ENUM_VALUES.visibility.includes(value as any);
}

export function isValidWareType(value: string): value is WareType {
  return ENUM_VALUES.wareType.includes(value as any);
}

export function isValidWorkType(value: string): value is WorkType {
  return ENUM_VALUES.workType.includes(value as any);
}

// =====================================================
// DISPLAY NAME HELPERS
// =====================================================

// =====================================================
// ALL ENUM NAMES (for iteration)
// =====================================================

export const ALL_ENUM_NAMES = [
  'address_type',
  'application_status',
  'application_type',
  'content_status',
  'display_theme',
  'exchange_status',
  'global_region',
  'herald_digest',
  'notification_channel',
  'pricing_model',
  'processing_speed',
  'profile_status',
  'relationship_type',
  'sensory_level',
  'sovereign_tier',
  'subscription_tier',
  'user_role',
  'visibility',
  'ware_type',
  'work_type',
] as const;

export type EnumName = typeof ALL_ENUM_NAMES[number];