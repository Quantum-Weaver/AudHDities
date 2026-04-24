// src/components/ui/Card.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { CardShadow, cardVariants, getSemanticHoverClass } from '@/lib/constants/components/ui/card.variants';
import type { 
  UnifiedCardProps, 
  CardData,
  CardMediaProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  ProductCardData,
  QuestCardData,
  ProposalCardData,
  CardRadius,
} from '@/types/components/ui/card.types';
import {
  getDifficultyColor,
  getProposalStatusColor,
  getEntityTemperatureColor,
  getTierBadgeColor,
  getPublicationBadgeColor,
  getVerifiedBadgeColor,
  getTrendIcon,
  getTrendColorClass,
  getStepStatus,
  getStepStatusColor,
  getStepProgress,
  formatPrice,
  getLowestPrice,
  getPriceRange,
  getAvailableTiers,
  truncateText,
  formatDate,
  formatRelativeTime,
  formatVoteRatio,
  getRecommendedVariant,
} from '@/utils/components/ui/card.utils';
import { cardShadowClasses } from '@/lib/constants/components/ui/card.constants';
import { UserCardRenderer } from '../hestia/UserCard';
import { StatCardRenderer } from '../shared/StatCardRenderer';
import { EntityCardRenderer } from '../aethelred/EntityCardRenderer';
import { VendorCardRenderer } from '../hermes/bazaar/VendorCard';
import { CreatorCardRenderer } from '../hermes/bazaar/CreatorCard';
import { EventCardRenderer } from '../prometheus/EventCard';
import Link from 'next/link';
import { CardMedia } from './cards/CardMedia';
import { CardHeader } from './cards/CardHeader';
import { CardContent } from './cards/CardContent';
import { CardFooter } from './cards/CardFooter';

// ============================================================================
// CARD RIBBON — Corner ribbon overlay
// ============================================================================

export type RibbonPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type RibbonColor = 'fire' | 'quantum' | 'cosmic' | 'hearth' | 'success' | 'warning' | 'error' | 'neurospark' | 'sanctuary';

export interface CardRibbonProps {
  /** Text displayed inside the ribbon */
  text: string;
  /** Corner position */
  position?: RibbonPosition;
  /** Color scheme derived from COSMIC tokens */
  color?: RibbonColor;
  /** Additional CSS classes */
  className?: string;
}

const ribbonColorMap: Record<RibbonColor, { bg: string; text: string; shadow: string }> = {
  fire: {
    bg: 'bg-[var(--color-fire-base)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-fire-base)]/30',
  },
  quantum: {
    bg: 'bg-[var(--color-quantum-purple)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-quantum-purple)]/30',
  },
  cosmic: {
    bg: 'bg-[var(--color-cosmic-blue)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-cosmic-blue)]/30',
  },
  hearth: {
    bg: 'bg-[var(--color-hearth-gold)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-hearth-gold)]/30',
  },
  success: {
    bg: 'bg-[var(--color-success)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-success)]/30',
  },
  warning: {
    bg: 'bg-[var(--color-warning)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-warning)]/30',
  },
  error: {
    bg: 'bg-[var(--color-error)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-error)]/30',
  },
  neurospark: {
    bg: 'bg-[var(--color-neurospark)]',
    text: 'text-[var(--color-deepSpace)]',
    shadow: 'shadow-[var(--color-neurospark)]/30',
  },
  sanctuary: {
    bg: 'bg-[var(--color-sanctuary-green)]',
    text: 'text-white',
    shadow: 'shadow-[var(--color-sanctuary-green)]/30',
  },
};

const ribbonPositionClasses: Record<RibbonPosition, string> = {
  'top-right': '-rotate-45 translate-x-[42%] -translate-y-[10%] right-0 top-0 origin-top-left',
  'top-left': 'rotate-45 -translate-x-[42%] -translate-y-[10%] left-0 top-0 origin-top-right',
  'bottom-right': 'rotate-45 translate-x-[42%] translate-y-[10%] right-0 bottom-0 origin-bottom-left',
  'bottom-left': '-rotate-45 -translate-x-[42%] translate-y-[10%] left-0 bottom-0 origin-bottom-right',
};

const ribbonWidthClasses: Record<string, string> = {
  'top-right': 'w-32',
  'top-left': 'w-32',
  'bottom-right': 'w-32',
  'bottom-left': 'w-32',
};

/**
 * CardRibbon — Corner ribbon overlay for cards
 * 
 * Renders a diagonal banner across a card corner. The parent Card must have
 * `overflow-hidden` (already set by cardVariants base classes).
 * 
 * @example
 * // LIVE ribbon on an EventCard
 * <Card data={data} variant="glass" radius="lg" shadow="md">
 *   <CardRibbon text="LIVE" position="top-right" color="fire" />
 *   <CardHeader title={data.title} />
 * </Card>
 * 
 * @example
 * // Featured ribbon on a ProductCard
 * <CardRibbon text="Featured" color="hearth" />
 * 
 * @example
 * // New ribbon on a QuestCard
 * <CardRibbon text="New" position="top-left" color="quantum" />
 */
export const CardRibbon: React.FC<CardRibbonProps> = ({
  text,
  position = 'top-right',
  color = 'quantum',
  className,
}) => {
  const colorClasses = ribbonColorMap[color];

  return (
    <div
      className={cn(
        'absolute z-10 flex items-center justify-center py-1 px-8',
        'text-xs font-bold uppercase tracking-wider',
        'shadow-lg',
        ribbonPositionClasses[position],
        ribbonWidthClasses[position],
        colorClasses.bg,
        colorClasses.text,
        colorClasses.shadow,
        className
      )}
      aria-label={text}
      role="status"
    >
      {text}
    </div>
  );
};

CardRibbon.displayName = 'CardRibbon';

// ============================================================================
// BADGE COMPONENTS
// ============================================================================

interface DifficultyBadgeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const colorClass = getDifficultyColor(difficulty);
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', master: 'Master' };
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {labels[difficulty]}
    </span>
  );
};

interface StatusBadgeProps {
  status: 'active' | 'passed' | 'failed' | 'pending' | 'completed' | 'current';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getProposalStatusColor(status);
  const labels = { active: 'Active', passed: 'Passed', failed: 'Failed', pending: 'Pending', completed: 'Completed', current: 'Current' };
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {labels[status as keyof typeof labels] || status}
    </span>
  );
};

interface TierBadgeProps {
  tier: 'community' | 'ally' | 'corporate' | 'council';
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const colorClass = getTierBadgeColor(tier);
  const labels = { community: 'Community', ally: 'Ally', corporate: 'Corporate', council: 'Council' };
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {labels[tier]}
    </span>
  );
};

interface PriceBadgeProps {
  data: { price?: number; priceCommunity?: number; priceAlly?: number; priceCorporate?: number };
  showLowest?: boolean;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ data, showLowest = false }) => {
  const lowestPrice = getLowestPrice(data as any);
  const priceRange = getPriceRange(data as any);
  const displayText = showLowest && lowestPrice ? formatPrice(lowestPrice) : priceRange;
  
  if (!displayText) return null;
  
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-quantum-purple)]/20 px-2 py-0.5 text-xs font-medium text-[var(--color-quantum-purple)]">
      {displayText}
    </span>
  );
};

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

export interface CardProps extends UnifiedCardProps {
  /** Whether to auto-recommend variant based on data type */
  autoVariant?: boolean;
  radius: CardRadius;
  shadow: CardShadow;
  /** Inline styles forwarded to the DOM element */
  style?: React.CSSProperties;
  /** Additional CSS classes */
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant,
    data,
    size,
    padding,
    interactive = false,
    radius,
    shadow,
    href,
    onClick,
    className,
    children,
    autoVariant = false,
    style,
    ...restProps 
  }, ref) => {
    
    // Auto-recommend variant if enabled and no explicit variant provided
    const effectiveVariant = autoVariant && !variant ? getRecommendedVariant(data.type) : variant;
    
    // Get semantic hover class for interactive cards
    const semanticHover = interactive ? getSemanticHoverClass(data.type, interactive) : '';
    
    // Handle click navigation
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(data);
      }
      if (href && !onClick) {
        // Next.js Link handles navigation; no manual push needed
      }
    };
    
    const isClickable = !!(href || onClick);
    
    // Build card classes
    const cardClasses = cn(
      cardVariants({ 
        variant: effectiveVariant, 
        size, 
        padding, 
        radius, 
        shadow, 
        interactive: interactive || isClickable 
      }),
      semanticHover,
      isClickable && !interactive && 'cursor-pointer',
      className
    );
    
    // Render content
    const cardContent = (
      <>
        {children}
      </>
    );
    
    // Use Next.js Link for client-side navigation when href provided without custom onClick
    const isAnchor = !!(href && !onClick);
    
    if (isAnchor) {
      return (
        <Link
          ref={ref as any}
          className={cardClasses}
          href={href}
          style={style}
        >
          {cardContent}
        </Link>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={isClickable ? handleClick : undefined}
        style={style}
        {...restProps}
      >
        {cardContent}
      </div>
    );
  }
);

Card.displayName = "Card";

// ============================================================================
// TYPE-SPECIFIC CARD RENDERERS
// ============================================================================

interface ProductCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'],
  shadow?: CardProps['shadow'],   
  interactive?: boolean;
}

export const ProductCardRenderer: React.FC<ProductCardRendererProps> = ({ 
  data, 
  variant = 'interactive',
  radius,
  shadow,
  interactive = true
}) => {
  const productData = data as ProductCardData;
  const tiers = getAvailableTiers(productData);
  const lowestPrice = getLowestPrice(productData);
  
  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      {productData.image && <CardMedia src={productData.image} alt={productData.title} />}
      <CardHeader 
        title={productData.title} 
        subtitle={productData.description}
        badge={
          <div className="flex gap-1">
            {productData.isPublished !== undefined && (
              <span className={getPublicationBadgeColor(productData.isPublished)}>
                {productData.isPublished ? 'Published' : 'Draft'}
              </span>
            )}
            {lowestPrice && <PriceBadge data={productData} showLowest />}
          </div>
        }
      />
      <CardContent 
        metadata={[
          ...(tiers.length > 0 ? [{ label: 'Available Tiers', value: tiers.join(', ') }] : []),
          ...(productData.residualPercent ? [{ label: 'Residual', value: `${productData.residualPercent}%` }] : []),
        ]}
      />
      {productData.creator && (
        <CardFooter 
          actions={[
            <span key="creator" className="text-xs text-[var(--color-star-dust)]/50">
              by {productData.creator.name}
            </span>
          ]}
        />
      )}
    </Card>
  );
};

interface QuestCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'],
  shadow?: CardProps['shadow'], 
  interactive?: boolean;
}

export const QuestCardRenderer: React.FC<QuestCardRendererProps> = ({ 
  data, 
  variant = 'glow',
  radius,
  shadow,
  interactive = true
}) => {
  const questData = data as QuestCardData;
  
  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      {questData.image && <CardMedia src={questData.image} alt={questData.title} />}
      <CardHeader 
        title={questData.title} 
        subtitle={questData.description}
        badge={questData.difficulty && <DifficultyBadge difficulty={questData.difficulty} />}
      />
      <CardContent 
        metadata={[
          ...(questData.reward ? [{ label: 'Reward', value: `${questData.reward} XP` }] : []),
          ...(questData.duration ? [{ label: 'Duration', value: questData.duration }] : []),
          ...(questData.isCompleted ? [{ label: 'Status', value: 'Completed' }] : []),
        ]}
      />
      {questData.prerequisites && questData.prerequisites.length > 0 && (
        <CardFooter 
          actions={[
            <span key="prereq" className="text-xs text-[var(--color-star-dust)]/50">
              Prerequisites: {questData.prerequisites.length}
            </span>
          ]}
        />
      )}
    </Card>
  );
};

interface ProposalCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'],
  shadow?: CardProps['shadow'],  
  interactive?: boolean;
}

export const ProposalCardRenderer: React.FC<ProposalCardRendererProps> = ({ 
  data, 
  variant = 'elevated',
  radius,
  shadow,  
  interactive = true 
}) => {
  const proposalData = data as ProposalCardData;
  const voteRatio = proposalData.votesFor && proposalData.votesAgainst 
    ? formatVoteRatio(proposalData.votesFor, proposalData.votesAgainst)
    : null;
  
  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow}>
      <CardHeader 
        title={proposalData.title} 
        subtitle={proposalData.description}
        badge={proposalData.status && <StatusBadge status={proposalData.status} />}
      />
      <CardContent 
        metadata={[
          ...(proposalData.votesFor !== undefined ? [{ label: 'For', value: proposalData.votesFor.toString() }] : []),
          ...(proposalData.votesAgainst !== undefined ? [{ label: 'Against', value: proposalData.votesAgainst.toString() }] : []),
          ...(voteRatio ? [{ label: 'Support', value: voteRatio }] : []),
          ...(proposalData.deadline ? [{ label: 'Deadline', value: formatRelativeTime(proposalData.deadline) || '' }] : []),
        ]}
      />
      {proposalData.proposer && (
        <CardFooter 
          actions={[
            <span key="proposer" className="text-xs text-[var(--color-star-dust)]/50">
              Proposed by {proposalData.proposer}
            </span>
          ]}
        />
      )}
    </Card>
  );
};

// ============================================================================
// SMART CARD - Automatically selects renderer based on data type
// ============================================================================

export interface SmartCardProps extends Omit<CardProps, 'data' | 'variant'> {
  data: CardData;
  variant?: CardProps['variant'];
}

export const SmartCard: React.FC<SmartCardProps> = ({ data, variant, ...props }) => {
  // Auto-recommend variant if not explicitly provided
  const effectiveVariant = variant || getRecommendedVariant(data.type);
  
  // Select appropriate renderer based on data type
  if (data.type === 'product') {
    return <ProductCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'quest') {
    return <QuestCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'proposal') {
    return <ProposalCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'event') {
    return <EventCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'creator') {
    return <CreatorCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'vendor') {
    return <VendorCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'entity') {
    return <EntityCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'stat') {
    return <StatCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'user') {
    return <UserCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }  
  
  // Fallback to generic card
  return (
    <Card 
      data={data} 
      variant={effectiveVariant} 
      radius={props.radius} 
      shadow={props.shadow}
      className={props.className}
      style={props.style}
      onClick={props.onClick}
    >
      {data.image && <CardMedia src={data.image} alt={data.title} />}
      <CardHeader title={data.title} subtitle={data.description} />
      {data.description && <CardContent description={truncateText(data.description, 150)} />}
    </Card>
  );
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default Card;