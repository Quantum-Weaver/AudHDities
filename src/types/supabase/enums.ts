// types/supabase/enums.ts
// All enum types from the database

import type { Database } from './database.types';

// =====================================================
// USER & PROFILE ENUMS
// =====================================================

export type UserTier = Database['public']['Enums']['user_tier'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type CommunicationStyle = Database['public']['Enums']['communication_style'];
export type DigestFrequency = Database['public']['Enums']['digest_frequency'];
export type VerificationStatus = Database['public']['Enums']['verification_status'];
export type SensitivityLevel = Database['public']['Enums']['sensitivity_level'];

// =====================================================
// CONTENT & MEDIA ENUMS
// =====================================================

export type ContentType = Database['public']['Enums']['content_type'];
export type ContentCategory = Database['public']['Enums']['content_category'];
export type ContentRating = Database['public']['Enums']['content_rating'];
export type PostVisibility = Database['public']['Enums']['post_visibility'];
export type SubmissionType = Database['public']['Enums']['submission_type'];
export type FileAccess = Database['public']['Enums']['file_access'];
export type FileProcessingStatus = Database['public']['Enums']['file_processing_status'];

// =====================================================
// PRODUCT & COMMERCE ENUMS
// =====================================================
export type OwnerType = Database['public']['Enums']['owner_type'];
export type ProductType = Database['public']['Enums']['product_type'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];
export type PayoutMethod = Database['public']['Enums']['payout_method'];
export type SubscriptionStatus = Database['public']['Enums']['subscription_status'];
export type SubscriptionTier = Database['public']['Enums']['subscription_tier'];

// =====================================================
// COMMUNITY & ENGAGEMENT ENUMS
// =====================================================

export type QuestStatus = Database['public']['Enums']['quest_status'];
export type BadgeType = Database['public']['Enums']['badge_type'];
export type ContributionType = Database['public']['Enums']['contribution_type'];
export type CommentStatus = Database['public']['Enums']['comment_status'];
export type EmeraldStatus = Database['public']['Enums']['emerald_status'];
export type EventType = Database['public']['Enums']['event_type'];

// =====================================================
// TAXONOMY & CLASSIFICATION ENUMS
// =====================================================

export type TaxonomyNodeType = Database['public']['Enums']['taxonomy_node_type'];
export type TaxonomyRelationship = Database['public']['Enums']['taxonomy_relationship'];
export type FolksonomyStatus = Database['public']['Enums']['folksonomy_status'];

// =====================================================
// MEDIA SUBTYPES (Rich Media)
// =====================================================

export type AudioSubtype = Database['public']['Enums']['audio_subtype'];
export type VideoSubtype = Database['public']['Enums']['video_subtype'];
export type ImageSubtype = Database['public']['Enums']['image_subtype'];
export type TextSubtype = Database['public']['Enums']['text_subtype'];
export type CodeSubtype = Database['public']['Enums']['code_subtype'];
export type DocumentSubtype = Database['public']['Enums']['document_subtype'];
export type ArchiveSubtype = Database['public']['Enums']['archive_subtype'];
export type DataSubtype = Database['public']['Enums']['data_subtype'];
export type BinarySubtype = Database['public']['Enums']['binary_subtype'];
export type InteractiveSubtype = Database['public']['Enums']['interactive_subtype'];

// =====================================================
// ACID TEST & ASSESSMENT ENUMS
// =====================================================

export type AcidPersona = Database['public']['Enums']['acid_persona'];
export type AcidQuestionType = Database['public']['Enums']['acid_question_type'];

// =====================================================
// LOCALIZATION & INTERNATIONALIZATION
// =====================================================

export type LanguageCode = Database['public']['Enums']['language_code'];
export type ScriptType = Database['public']['Enums']['script_type'];
export type CharacterEncoding = Database['public']['Enums']['character_encoding'];
export type RegionFormat = Database['public']['Enums']['region_format'];
export type LocalizationStatus = Database['public']['Enums']['localization_status'];

// =====================================================
// BUSINESS & LEGAL ENUMS
// =====================================================

export type BusinessType = Database['public']['Enums']['business_type'];
export type SocialPlatform = Database['public']['Enums']['social_platform'];

// =====================================================
// MODERATION & NOTIFICATION ENUMS
// =====================================================

export type ReportType = Database['public']['Enums']['report_type'];
export type ReportStatus = Database['public']['Enums']['report_status'];
export type NotificationType = Database['public']['Enums']['notification_type'];

// =====================================================
// HELPER FUNCTIONS FOR ENUM VALUES
// =====================================================

export const ENUM_VALUES = {
  userTier: ['community', 'ally', 'corporate', 'council'] as const,
  ownerType: ['creator', 'vendor'] as const,
  councilHouse: [
    'hearth_keeper', 'chancellor', 'seer', 'aethelred',
    'curator', 'archivist', 'skald', 'codex', 'executioner'
  ] as const,
  communicationStyle: ['direct', 'gentle', 'detailed', 'concise'] as const,
  digestFrequency: ['instant', 'daily', 'weekly', 'never'] as const,
  verificationStatus: ['pending', 'verified', 'rejected', 'suspended'] as const,
  sensitivityLevel: ['low', 'medium', 'high', 'avoidant'] as const,
  productType: [
    'digital_course', 'digital_download', 'digital_membership', 'digital_subscription', 'digital_bundle',
    'physical_product', 'physical_handmade', 'physical_manufactured', 'physical_custom',
    'audio', 'video', 'podcast', 'music', 'livestream',
    'event_live', 'event_virtual', 'workshop', 'class', 'consultation',
    'service', 'commission', 'contract', 'sponsorship',
    'mutual_aid', 'crowdfunding', 'tip', 'donation',
    'clothing', 'accessory', 'fabric', 'pattern',
    'bundle', 'kit', 'subscription_box'
  ] as const,
  payoutStatus: ['pending', 'paid', 'failed'] as const,
  questStatus: ['locked', 'available', 'in_progress', 'completed', 'mastered'] as const,
  contributionType: ['concept', 'code', 'design', 'content', 'testing', 'promotion', 'infrastructure'] as const,
  postVisibility: ['public', 'subscribers', 'tier_community', 'tier_ally', 'tier_corporate', 'private'] as const,
  businessType: ['sole_proprietor', 'llc', 'nonprofit', 'cooperative', 'partnership', 'other'] as const,
  acidPersona: ['masked_traveler', 'tab_hoarder', 'seam_warrior', 'void_dweller', 'pattern_seeker', 'quantum_witness'] as const,
  reportType: ['inappropriate_content', 'harassment', 'spam', 'hate_speech', 'impersonation', 'copyright', 'other'] as const,
  reportStatus: ['pending', 'reviewing', 'resolved', 'dismissed', 'escalated'] as const,
  notificationType: [
    'report_resolved', 'report_rejected', 'comment_reply', 'emerald_received',
    'subscription_renewal', 'product_purchased', 'application_approved',
    'application_rejected', 'system_announcement'
  ] as const,
} as const;

// Helper to check if a value is a valid enum
export function isValidUserTier(value: string): value is UserTier {
  return ENUM_VALUES.userTier.includes(value as any);
}

export function isValidCouncilHouse(value: string): value is CouncilHouse {
  return ENUM_VALUES.councilHouse.includes(value as any);
}

export function isValidProductType(value: string): value is ProductType {
  return ENUM_VALUES.productType.includes(value as any);
}

export function isValidContributionType(value: string): value is ContributionType {
  return ENUM_VALUES.contributionType.includes(value as any);
}

export function isValidQuestStatus(value: string): value is QuestStatus {
  return ENUM_VALUES.questStatus.includes(value as any);
}

export function isValidPayoutStatus(value: string): value is PayoutStatus {
  return ENUM_VALUES.payoutStatus.includes(value as any);
}

export function isValidVerificationStatus(value: string): value is VerificationStatus {
  return ENUM_VALUES.verificationStatus.includes(value as any);
}

export function isValidReportType(value: string): value is ReportType {
  return ENUM_VALUES.reportType.includes(value as any);
}

export function isValidReportStatus(value: string): value is ReportStatus {
  return ENUM_VALUES.reportStatus.includes(value as any);
}

export function isValidNotificationType(value: string): value is NotificationType {
  return ENUM_VALUES.notificationType.includes(value as any);
}

// Display name helpers
export function getHouseDisplayName(house: CouncilHouse | string | null): string {
  if (!house) return 'Unaffiliated';
  return house.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getBusinessTypeDisplay(type: BusinessType | string | null): string {
  if (!type) return '';
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getProductTypeDisplay(type: ProductType | string | null): string {
  if (!type) return '';
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getContributionTypeDisplay(type: ContributionType | string | null): string {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getAcidPersonaDisplay(persona: AcidPersona | string | null): string {
  if (!persona) return '';
  return persona.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getReportTypeDisplay(type: ReportType | string | null): string {
  if (!type) return '';
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getReportStatusDisplay(status: ReportStatus | string | null): string {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getNotificationTypeDisplay(type: NotificationType | string | null): string {
  if (!type) return '';
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}