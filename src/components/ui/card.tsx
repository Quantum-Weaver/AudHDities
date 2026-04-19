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

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ src, alt, fallbackIcon, className, ...props }, ref) => {
    if (!src && !fallbackIcon) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-[var(--color-surface)]/20",
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Card image"}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : fallbackIcon ? (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            {fallbackIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

CardMedia.displayName = "CardMedia";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, badge, actions, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-[var(--color-star-dust)] line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-[var(--color-star-dust)]/60 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ description, metadata, className, ...props }, ref) => {
    if (!description && (!metadata || metadata.length === 0)) return null;
    
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {description && (
          <p className="text-sm text-[var(--color-star-dust)]/80 line-clamp-3">
            {description}
          </p>
        )}
        {metadata && metadata.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-[var(--color-star-dust)]/50">{item.label}:</span>
                <span className="font-medium text-[var(--color-star-dust)]/80">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ actions, className, ...props }, ref) => {
    if (!actions || actions.length === 0) return null;
    
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

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
    ...props 
  }, ref) => {
    
    // Auto-recommend variant if enabled and no explicit variant provided
    const effectiveVariant = autoVariant && !variant ? getRecommendedVariant(data.type) : variant;
    
    // Get semantic hover class for interactive cards
    const semanticHover = interactive ? getSemanticHoverClass(data.type, interactive) : '';
    
    // Handle click navigation if href provided
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(data);
      }
      if (href && !onClick) {
        window.location.href = href;
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
    
    // Wrap with anchor or div - separated to avoid onClick type conflict
    const isAnchor = !!(href && !onClick);
    
    if (isAnchor) {
      return (
        <a
          ref={ref as any}
          className={cardClasses}
          href={href}
          {...props}
        >
          {cardContent}
        </a>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={handleClick}
        {...props}
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
  
  // Fallback to generic card
  return (
    <Card data={data} variant={effectiveVariant} {...props}>
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