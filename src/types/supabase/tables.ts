// types/supabase/tables.ts
// Central export of all table types

// =====================================================
// ACID TEST TABLES
// =====================================================
export type {
  AcidTestAnswer,
  AcidTestAnswerInsert,
  AcidTestAnswerUpdate,
  AcidTestAnswerWithRelations,
} from './tables/acid_test_answers';

export type {
  AcidTestQuestion,
  AcidTestQuestionInsert,
  AcidTestQuestionUpdate,
  AcidTestQuestionWithRelations,
} from './tables/acid_test_questions';

export type {
  AcidTestResult,
  AcidTestResultInsert,
  AcidTestResultUpdate,
  AcidTestResultWithRelations,
} from './tables/acid_test_results';

// =====================================================
// ADMIN & GOVERNANCE
// =====================================================
export type {
  AdminLog,
  AdminLogInsert,
  AdminLogUpdate,
  AdminLogWithRelations,
} from './tables/admin_logs';

export type {
  Report,
  ReportInsert,
  ReportUpdate,
  ReportWithRelations,
} from './tables/reports';

export type {
  Notification,
  NotificationInsert,
  NotificationUpdate,
  NotificationWithRelations,
} from './tables/notifications';

export type {
  ModerationAction,
  ModerationActionInsert,
  ModerationActionUpdate,
  ModerationActionWithRelations,
} from './tables/';

// Add to DEFAULT VALUES section
export {
  reportDefaults,
} from './tables/reports';

export {
  notificationDefaults,
} from './tables/notifications';

export {
  moderationActionDefaults,
} from './tables/';
// =====================================================
// APPLICATIONS
// =====================================================
export type {
  Application,
  ApplicationInsert,
  ApplicationUpdate,
  ApplicationWithRelations,
  CreatorApplicationData,
  VendorApplicationData,
  ApplicationType,
} from './tables/applications';

// =====================================================
// CHANNELS & SOCIAL
// =====================================================
export type {
  Channel,
  ChannelInsert,
  ChannelUpdate,
  ChannelWithRelations,
} from './tables/channels';

export type {
  Comment,
  CommentInsert,
  CommentUpdate,
  CommentWithRelations,
} from './tables/comments';

export type {
  Post,
  PostInsert,
  PostUpdate,
  PostWithRelations,
  PostVisibility,
  PostContentType,
} from './tables/posts';

export type {
  Emerald,
  EmeraldInsert,
  EmeraldUpdate,
  EmeraldWithRelations,
} from './tables/emeralds';

export type {
  Subscription,
  SubscriptionInsert,
  SubscriptionUpdate,
  SubscriptionWithRelations,
  SubscriptionStatus,
  SubscriptionTier,
} from './tables/subscriptions';

// =====================================================
// PROFILES & EXTENSIONS
// =====================================================
export type {
  Profile,
  ProfileInsert,
  ProfileUpdate,
  ProfileWithRelations,
  NDPreferences,
  SensoryPreferences,
  UserTier,
  CommunicationStyle,
  NotificationFrequency,
} from './tables/profiles';

export type {
  CreatorProfile,
  CreatorProfileInsert,
  CreatorProfileUpdate,
  CreatorProfileWithRelations,
} from './tables/creator_profiles';

export type {
  VendorProfile,
  VendorProfileInsert,
  VendorProfileUpdate,
  VendorProfileWithRelations,
  BusinessType,
} from './tables/vendor_profiles';

export type {
  CommunityProfile,
  CommunityProfileInsert,
  CommunityProfileUpdate,
  CommunityProfileWithRelations,
  NDIdentity,
} from './tables/community_profiles';

// =====================================================
// COMMERCE & ECONOMICS
// =====================================================
export type {
  Product,
  ProductInsert,
  ProductUpdate,
  ProductWithRelations,
  ProductType,
} from './tables/products';

export type {
  Sale,
  SaleInsert,
  SaleUpdate,
  SaleWithRelations,
} from './tables/sales';

export type {
  Contribution,
  ContributionInsert,
  ContributionUpdate,
  ContributionWithRelations,
  ContributionType,
} from './tables/contributions';

export type {
  ResidualPayout,
  ResidualPayoutInsert,
  ResidualPayoutUpdate,
  ResidualPayoutWithRelations,
  PayoutStatus,
} from './tables/residual_payouts';

// =====================================================
// QUESTS & GAMIFICATION
// =====================================================
export type {
  Quest,
  QuestInsert,
  QuestUpdate,
  QuestStatus,
  CouncilHouse
} from './tables/quests';

export type {
  UserQuest,
  UserQuestInsert,
  UserQuestUpdate,
  UserQuestWithRelations
} from './tables/user_quests';

export type {
  UserBadge,
  UserBadgeInsert,
  UserBadgeUpdate,
  UserBadgeWithRelations,
  BadgeType,
} from './tables/user_badges';

// =====================================================
// COMMUNICATIONS
// =====================================================
export type {
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
  ContactSubmissionWithRelations,
} from './tables/contact_submissions';

// =====================================================
// DEFAULT VALUES (for quick initialization)
// =====================================================
export {
  acidTestAnswerDefaults,
} from './tables/acid_test_answers';

export {
  acidTestQuestionDefaults,
} from './tables/acid_test_questions';

export {
  acidTestResultDefaults,
} from './tables/acid_test_results';

export {
  adminLogDefaults,
} from './tables/admin_logs';

export {
  applicationDefaults,
} from './tables/applications';

export {
  channelDefaults,
} from './tables/channels';

export {
  commentDefaults,
} from './tables/comments';

export {
  communityProfileDefaults,
} from './tables/community_profiles';

export {
  contactSubmissionDefaults,
} from './tables/contact_submissions';

export {
  contributionDefaults,
} from './tables/contributions';

export {
  creatorProfileDefaults,
} from './tables/creator_profiles';

export {
  emeraldDefaults,
} from './tables/emeralds';

export {
  postDefaults,
} from './tables/posts';

export {
  productDefaults,
} from './tables/products';

export {
  profileDefaults,
  defaultNDPreferences,
  defaultSensoryPreferences,
} from './tables/profiles';

export {
  residualPayoutDefaults,
} from './tables/residual_payouts';

export {
  saleDefaults,
} from './tables/sales';

export {
  subscriptionDefaults,
} from './tables/subscriptions';

export {
  userBadgeDefaults,
} from './tables/user_badges';

export {
  userQuestDefaults,
} from './tables/user_quests';

export {
  vendorProfileDefaults,
} from './tables/vendor_profiles';