// =====================================================
/* @/types/core/index.ts */
// CORE TYPES - Central Export
// =====================================================

// Profiles
export type {
  UserTier,
  UserStatus,
  CouncilHouse,
  ProfileRow,
  ProfileInsert,
  ProfileUpdate,
  PublicProfile,
  OwnProfile,
  ProfileFormData,
  ProfileValidationResult,
} from './profiles';

// User Financial
export type {
  PayoutMethod,
  PayoutFrequency,
  UserFinancialRow,
  UserFinancialInsert,
  UserFinancialUpdate,
  UserFinancial,
  UserFinancialFormData,
  UserFinancialValidationResult,
} from './user_financial';

// User Private
export type {
  UserPrivateRow,
  UserPrivateInsert,
  UserPrivateUpdate,
  UserPrivate,
  UserPrivateFormData,
  UserPrivateValidationResult,
} from './user_private';

// Creator Profiles
export type {
  CreatorVerificationStatus,
  CreatorProfileRow,
  CreatorProfileInsert,
  CreatorProfileUpdate,
  PublicCreatorProfile,
  OwnCreatorProfile,
  CreatorProfileFormData,
  CreatorProfileValidationResult,
} from './creator_profiles';

// Vendor Profiles
export type {
  VendorVerificationStatus,
  BusinessType,
  VendorProfileRow,
  VendorProfileInsert,
  VendorProfileUpdate,
  PublicVendorProfile,
  OwnVendorProfile,
  VendorProfileFormData,
  VendorProfileValidationResult,
} from './vendor_profiles';

// Community Profiles
export type {
  CommunicationStyle,
  JoinedHouse,
  CommunityProfileRow,
  CommunityProfileInsert,
  CommunityProfileUpdate,
  PublicCommunityProfile,
  OwnCommunityProfile,
  CommunityProfileFormData,
  CommunityProfileValidationResult,
} from './community_profiles';

// Channels
export type {
  ContentRating,
  ChannelRow,
  ChannelInsert,
  ChannelUpdate,
  PublicChannel,
  OwnChannel,
  ChannelFormData,
  ChannelValidationResult,
} from './channels';