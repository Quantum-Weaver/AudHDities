// src/lib/utils/components/runes/card.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CARD UTILITIES                                         ║
// ║                    Color resolvers and helpers for specialized cards      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { 
  CardData, 
  ProductCardData,
  QuestCardData,
  EventCardData,
  ProposalCardData,
  EntityCardData,
  CreatorCardData,
  VendorCardData,
  StatCardData,
  StepCardData,
  ValueCardData,
  PillarCardData,
  PrincipleCardData,
  InvitationCardData,
  PathwayCardData,
  UserCardData,
  FileCardData,
  SchemaTableCardData,
  SchemaEnumCardData,
  SchemaFunctionCardData,
} from '@/types/components/runes/card.types';

import {
  DIFFICULTY_COLOR_CLASSES,
  STATUS_COLOR_CLASSES,
  TEMPERATURE_COLOR_CLASSES,
  BADGE_COLOR_CLASSES,
} from '@/lib/constants/components/runes/card.constants';

// =====================================================
// TYPE GUARDS
// =====================================================

export function isProductCard(data: CardData): data is ProductCardData {
  return data.type === 'product';
}

export function isQuestCard(data: CardData): data is QuestCardData {
  return data.type === 'quest';
}

export function isEventCard(data: CardData): data is EventCardData {
  return data.type === 'event';
}

export function isProposalCard(data: CardData): data is ProposalCardData {
  return data.type === 'proposal';
}

export function isEntityCard(data: CardData): data is EntityCardData {
  return data.type === 'entity';
}

export function isCreatorCard(data: CardData): data is CreatorCardData {
  return data.type === 'creator';
}

export function isVendorCard(data: CardData): data is VendorCardData {
  return data.type === 'vendor';
}

export function isStatCard(data: CardData): data is StatCardData {
  return data.type === 'stat';
}

export function isStepCard(data: CardData): data is StepCardData {
  return data.type === 'step';
}

export function isValueCard(data: CardData): data is ValueCardData {
  return data.type === 'value';
}

export function isPillarCard(data: CardData): data is PillarCardData {
  return data.type === 'pillar';
}

export function isPrincipleCard(data: CardData): data is PrincipleCardData {
  return data.type === 'principle';
}

export function isInvitationCard(data: CardData): data is InvitationCardData {
  return data.type === 'invitation';
}

export function isPathwayCard(data: CardData): data is PathwayCardData {
  return data.type === 'pathway';
}

export function isUserCard(data: CardData): data is UserCardData {
  return data.type === 'user';
}

export function isFileCard(data: CardData): data is FileCardData {
  return data.type === 'file';
}

export function isSchemaTableCard(data: CardData): data is SchemaTableCardData {
  return data.type === 'schema-table';
}

export function isSchemaEnumCard(data: CardData): data is SchemaEnumCardData {
  return data.type === 'schema-enum';
}

export function isSchemaFunctionCard(data: CardData): data is SchemaFunctionCardData {
  return data.type === 'schema-function';
}

// =====================================================
// PRICE FORMATTING
// =====================================================

export function formatPrice(price: number | undefined): string | null {
  if (price === undefined || price === null) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getLowestPrice(data: ProductCardData): number | null {
  const prices = [
    data.priceCommunity,
    data.priceAlly,
    data.priceCorporate,
  ].filter((p): p is number => p !== undefined && p !== null && p > 0);
  
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getPriceRange(data: ProductCardData): string | null {
  const prices = [
    data.priceCommunity,
    data.priceAlly,
    data.priceCorporate,
  ].filter((p): p is number => p !== undefined && p !== null && p > 0);
  
  if (prices.length === 0) return null;
  if (prices.length === 1) return formatPrice(prices[0]);
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function getAvailableTiers(data: ProductCardData): string[] {
  const tiers: string[] = [];
  if (data.priceCommunity !== undefined && data.priceCommunity > 0) tiers.push('community');
  if (data.priceAlly !== undefined && data.priceAlly > 0) tiers.push('ally');
  if (data.priceCorporate !== undefined && data.priceCorporate > 0) tiers.push('corporate');
  return tiers;
}

// =====================================================
// COLOR HELPERS (Derived from card.constants.ts)
// =====================================================

/**
 * Get CSS classes for quest difficulty badges
 * Derived from DIFFICULTY_COLOR_CLASSES constant
 */
export function getDifficultyColor(difficulty: QuestCardData['difficulty']): string {
  if (!difficulty) return DIFFICULTY_COLOR_CLASSES.beginner;
  return DIFFICULTY_COLOR_CLASSES[difficulty] || DIFFICULTY_COLOR_CLASSES.beginner;
}

/**
 * Get CSS classes for proposal status badges
 * Derived from STATUS_COLOR_CLASSES constant
 */
export function getProposalStatusColor(status: ProposalCardData['status']): string {
  if (!status) return STATUS_COLOR_CLASSES.pending;
  return STATUS_COLOR_CLASSES[status] || STATUS_COLOR_CLASSES.pending;
}

/**
 * Get CSS classes for entity temperature indicator
 * Derived from TEMPERATURE_COLOR_CLASSES constant
 * Maps numeric temperature (0-1) to semantic classes
 */
export function getEntityTemperatureColor(temperature: number): string {
  if (temperature >= 0.7) return TEMPERATURE_COLOR_CLASSES.high;
  if (temperature >= 0.4) return TEMPERATURE_COLOR_CLASSES.medium;
  return TEMPERATURE_COLOR_CLASSES.low;
}

/**
 * Get CSS classes for user tier badges (community, ally, corporate, council)
 * Derived from BADGE_COLOR_CLASSES constant
 */
export function getTierBadgeColor(tier: string): string {
  const validTiers = ['community', 'ally', 'corporate', 'council'];
  if (validTiers.includes(tier)) {
    return BADGE_COLOR_CLASSES[tier as keyof typeof BADGE_COLOR_CLASSES];
  }
  return BADGE_COLOR_CLASSES.community;
}

/**
 * Get CSS classes for publication status badges (draft, published)
 * Derived from BADGE_COLOR_CLASSES constant
 */
export function getPublicationBadgeColor(isPublished: boolean): string {
  return isPublished ? BADGE_COLOR_CLASSES.published : BADGE_COLOR_CLASSES.draft;
}

/**
 * Get CSS classes for verification status badges
 * Derived from BADGE_COLOR_CLASSES constant
 */
export function getVerifiedBadgeColor(isVerified: boolean): string {
  return isVerified ? BADGE_COLOR_CLASSES.verified : BADGE_COLOR_CLASSES.draft;
}

/**
 * Get CSS classes for house/council affiliation badges
 * Derived from BADGE_COLOR_CLASSES constant
 */
export function getHouseBadgeColor(house?: string): string {
  if (!house) return BADGE_COLOR_CLASSES.house;
  return BADGE_COLOR_CLASSES.house;
}

/**
 * Get CSS classes for role badges
 * Derived from BADGE_COLOR_CLASSES constant
 */
export function getRoleBadgeColor(role?: string): string {
  if (!role) return BADGE_COLOR_CLASSES.role;
  return BADGE_COLOR_CLASSES.role;
}

/**
 * Get trend icon based on trend direction
 */
export function getTrendIcon(trend: StatCardData['trend']): string {
  switch (trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    case 'stable': return '→';
    default: return '';
  }
}

/**
 * Get trend color class based on trend direction and value
 */
export function getTrendColorClass(trend: StatCardData['trend'], value?: number): string {
  if (trend === 'up' && value && value > 0) return 'text-[var(--color-success)]';
  if (trend === 'down' && value && value < 0) return 'text-[var(--color-error)]';
  if (trend === 'up') return 'text-[var(--color-success)]';
  if (trend === 'down') return 'text-[var(--color-error)]';
  return 'text-[var(--color-star-dust)]/60';
}

// =====================================================
// STEP CARD HELPERS
// =====================================================

export function getStepStatus(data: StepCardData): 'completed' | 'current' | 'pending' {
  if (data.isCompleted) return 'completed';
  if (data.isCurrent) return 'current';
  return 'pending';
}

export function getStepStatusColor(status: 'completed' | 'current' | 'pending'): string {
  return STATUS_COLOR_CLASSES[status] || STATUS_COLOR_CLASSES.pending;
}

export function getStepProgress(data: StepCardData): number {
  if (!data.totalSteps) return 0;
  return (data.stepNumber / data.totalSteps) * 100;
}

// =====================================================
// TEXT UTILITIES
// =====================================================

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Truncate text at word boundary
 */
export function truncateTextWordBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace === -1) return truncated + '…';
  return truncated.slice(0, lastSpace) + '…';
}

// =====================================================
// FILE & SCHEMA HELPERS
// =====================================================

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileTypeIcon(fileType?: string): string {
  const icons: Record<string, string> = {
    pdf: '📄',
    image: '🖼️',
    video: '🎬',
    audio: '🎵',
    code: '💻',
    text: '📝',
    archive: '🗜️',
    default: '📁',
  };
  return icons[fileType || 'default'] || icons.default;
}

export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot + 1).toLowerCase();
}

export function getSchemaTypeIcon(type: 'table' | 'enum' | 'function'): string {
  const icons = {
    table: '🗄️',
    enum: '🔢',
    function: '⚙️',
  };
  return icons[type];
}

// =====================================================
// PATHWAY/PROGRESS HELPERS
// =====================================================

export function getProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return (current / total) * 100;
}

export function formatProgress(current: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((current / total) * 100)}%`;
}

// =====================================================
// DATE FORMATTING
// =====================================================

export function formatDate(dateString?: string): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatRelativeTime(dateString?: string): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// =====================================================
// VOTE FORMATTING
// =====================================================

export function formatVoteRatio(votesFor: number, votesAgainst: number): string {
  const total = votesFor + votesAgainst;
  if (total === 0) return '0%';
  return `${Math.round((votesFor / total) * 100)}%`;
}

export function getVoteStatus(votesFor: number, votesAgainst: number): 'passed' | 'failed' | 'tied' {
  if (votesFor > votesAgainst) return 'passed';
  if (votesAgainst > votesFor) return 'failed';
  return 'tied';
}

// =====================================================
// TYPE-TO-VARIANT RECOMMENDATION
// =====================================================

import { CARD_TYPE_TO_VISUAL_VARIANT, type CardVariant } from '@/lib/constants/components/runes/card.constants';

export function getRecommendedVariant(cardType: string): CardVariant {
  const variant = CARD_TYPE_TO_VISUAL_VARIANT[cardType as keyof typeof CARD_TYPE_TO_VISUAL_VARIANT];
  return variant || 'default';
}