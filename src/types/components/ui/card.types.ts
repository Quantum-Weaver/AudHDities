// src/types/components/ui/card.types.ts

import type { ReactNode } from 'react';
import type { 
  CardType,
  CardVariant,
  CardSize,
  CardPadding,
  CardRadius
} from '@/lib/constants/components/ui/card.constants';
import { CardShadow } from '@/lib/constants/components/ui/card.variants'

// Re-export the primitive types from constants
export type { CardType, CardVariant, CardSize, CardPadding, CardRadius };

// =====================================================
// BASE CARD DATA
// =====================================================

export interface BaseCardData {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  type: CardType;
}

// =====================================================
// VARIANT-SPECIFIC CARD DATA
// =====================================================

export interface ProductCardData extends BaseCardData {
  type: 'product';
  price?: number;
  priceCommunity?: number;
  priceAlly?: number;
  priceCorporate?: number;
  residualPercent?: number;
  isPublished?: boolean;
  creator?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface QuestCardData extends BaseCardData {
  type: 'quest';
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'master';
  reward?: number;
  duration?: string;
  prerequisites?: string[];
  isCompleted?: boolean;
}

export interface EventCardData extends BaseCardData {
  type: 'event';
  date?: string;
  time?: string;
  location?: 'online' | 'in-person' | 'hybrid';
  isLive?: boolean;
  price?: number;
  genre?: 'music' | 'comedy' | 'workshop' | 'council';
}

export interface ProposalCardData extends BaseCardData {
  type: 'proposal';
  status?: 'active' | 'passed' | 'failed' | 'pending' | 'completed' | 'current';
  votesFor?: number;
  votesAgainst?: number;
  deadline?: string;
  proposer?: string;
}

export interface EntityCardData extends BaseCardData {
  type: 'entity';
  temperature?: number;
  role?: string;
  domain?: string;
  isActive?: boolean;
}

export interface CreatorCardData extends BaseCardData {
  type: 'creator';
  avatar?: string;
  house?: string;
  tier?: string;
  productCount?: number;
  isVerified?: boolean;
}

export interface VendorCardData extends BaseCardData {
  type: 'vendor';
  logo?: string;
  businessType?: string;
  productCount?: number;
  isVerified?: boolean;
}

export interface CouncilCardData extends BaseCardData {
  type: 'council';
  members?: number;
  meetingSchedule?: string;
  nextMeeting?: string;
}

export interface ValueCardData extends BaseCardData {
  type: 'value';
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface PillarCardData extends BaseCardData {
  type: 'pillar';
  icon?: ReactNode;
  order?: number;
}

export interface StatCardData extends BaseCardData {
  type: 'stat';
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  target?: string | number;
}

export interface StepCardData extends BaseCardData {
  type: 'step';
  stepNumber: number;
  totalSteps?: number;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface PrincipleCardData extends BaseCardData {
  type: 'principle';
  order?: number;
}

export interface InvitationCardData extends BaseCardData {
  type: 'invitation';
  inviter?: string;
  expiresAt?: string;
  isAccepted?: boolean;
}

export interface PathwayCardData extends BaseCardData {
  type: 'pathway';
  progress?: number;
  modules?: number;
  completedModules?: number;
}

export interface UserCardData extends BaseCardData {
  type: 'user';
  avatar?: string;
  role?: string;
  joinDate?: string;
  isOnline?: boolean;
}

export interface FileCardData extends BaseCardData {
  type: 'file';
  fileType?: string;
  size?: number;
  modifiedAt?: string;
  category?: string;
}

export interface SchemaTableCardData extends BaseCardData {
  type: 'schema-table';
  columns?: number;
  rows?: number;
  isView?: boolean;
}

export interface SchemaEnumCardData extends BaseCardData {
  type: 'schema-enum';
  values?: string[];
  valueCount?: number;
}

export interface SchemaFunctionCardData extends BaseCardData {
  type: 'schema-function';
  parameters?: string[];
  returnType?: string;
  isProcedure?: boolean;
}

// =====================================================
// CARD DATA UNION TYPE
// =====================================================

export type CardData =
  | ProductCardData
  | QuestCardData
  | CouncilCardData
  | EventCardData
  | ProposalCardData
  | EntityCardData
  | CreatorCardData
  | VendorCardData
  | ValueCardData
  | PillarCardData
  | StatCardData
  | StepCardData
  | PrincipleCardData
  | InvitationCardData
  | PathwayCardData
  | UserCardData
  | FileCardData
  | SchemaTableCardData
  | SchemaEnumCardData
  | SchemaFunctionCardData;

// =====================================================
// COMPONENT PROPS
// =====================================================

export interface UnifiedCardProps {
  variant: CardVariant;
  data: CardData;
  size?: CardSize;
  padding?: CardPadding;
  interactive?: boolean;
  href?: string;
  onClick?: (data: CardData) => void;
  className?: string;
  children?: ReactNode;
  radius: CardRadius;    // Required but not in UnifiedCardProps
  shadow: CardShadow; 
}

// =====================================================
// SUB-COMPONENT PROPS
// =====================================================

export interface CardMediaProps {
  src?: string;
  alt?: string;
  fallbackIcon?: ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  description?: string;
  metadata?: Array<{ label: string; value: ReactNode }>;
  className?: string;
}

export interface CardFooterProps {
  actions?: ReactNode[];
  className?: string;
}