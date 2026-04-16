// src/lib/utils/components/ui/unified_card.ts
// Pure logic only - no values, no side effects

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
} from '@/types/components/ui/unified_card';

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
// COLOR HELPERS (Return CSS classes)
// =====================================================

export function getDifficultyColor(difficulty: QuestCardData['difficulty']): string {
  switch (difficulty) {
    case 'beginner': return 'text-green-400 bg-green-500/10';
    case 'intermediate': return 'text-yellow-400 bg-yellow-500/10';
    case 'advanced': return 'text-orange-400 bg-orange-500/10';
    case 'master': return 'text-red-400 bg-red-500/10';
    default: return 'text-gray-400 bg-gray-500/10';
  }
}

export function getProposalStatusColor(status: ProposalCardData['status']): string {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-500/10';
    case 'passed': return 'text-blue-400 bg-blue-500/10';
    case 'failed': return 'text-red-400 bg-red-500/10';
    case 'pending': return 'text-yellow-400 bg-yellow-500/10';
    default: return 'text-gray-400 bg-gray-500/10';
  }
}

export function getEntityTemperatureColor(temperature: number): string {
  if (temperature >= 0.7) return 'text-red-400 bg-red-500/10';
  if (temperature >= 0.4) return 'text-yellow-400 bg-yellow-500/10';
  return 'text-blue-400 bg-blue-500/10';
}

export function getTrendIcon(trend: StatCardData['trend']): string {
  switch (trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    case 'stable': return '→';
    default: return '';
  }
}

export function getStepStatus(data: StepCardData): 'completed' | 'current' | 'pending' {
  if (data.isCompleted) return 'completed';
  if (data.isCurrent) return 'current';
  return 'pending';
}

export function getStepStatusColor(status: 'completed' | 'current' | 'pending'): string {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'current': return 'text-cyan-400';
    case 'pending': return 'text-gray-400';
  }
}

// =====================================================
// TEXT UTILITIES
// =====================================================

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
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

export function getSchemaTypeIcon(type: 'table' | 'enum' | 'function'): string {
  const icons = {
    table: '🗄️',
    enum: '🔢',
    function: '⚙️',
  };
  return icons[type];
}