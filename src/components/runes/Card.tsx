// src/components/runes/Card.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CARD COMPONENT                                         ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { cardVariants, getSemanticHoverClass } from '@/lib/constants/components/runes/card.variants';
import type { CardShadow } from '@/lib/constants/components/runes/card.variants';
import type { 
  UnifiedCardProps, 
  CardData,
  CardRadius,
} from '@/types/components/runes/card.types';
import { getRecommendedVariant, truncateText } from '@/lib/utils/components/runes/card.utils';

// Sub-components
import { CardMedia } from './cards/CardMedia';
import { CardHeader } from './cards/CardHeader';
import { CardContent } from './cards/CardContent';
import { CardFooter } from './cards/CardFooter';

// Renderers
import { ValueCardRenderer } from './cards/ValueCardRenderer';
import { PillarCardRenderer } from './cards/PillarCardRenderer';
import { StepCardRenderer } from './cards/StepCardRenderer';
import { PrincipleCardRenderer } from './cards/PrincipleCardRenderer';
import { InvitationCardRenderer } from './cards/InvitationCardRenderer';
import { PathwayCardRenderer } from './cards/PathwayCardRenderer';
import { ProductCardRenderer } from './cards/ProductCardRenderer';
import { QuestCardRenderer } from './cards/QuestCardRenderer';
import { ProposalCardRenderer } from './cards/ProposalCardRenderer';
import { EventCardRenderer } from '../asgard/domains/prometheus/EventCard';
import { CreatorCardRenderer } from '../asgard/domains/hermes/bazaar/CreatorCard';
import { VendorCardRenderer } from '../asgard//domains/hermes/bazaar/VendorCard';
import { EntityCardRenderer } from '../asgard/domains/aethelred/nexus/EntityCardRenderer';
import { StatCardRenderer } from '../asgard/domains/hephaestus/supporting/StatCard';
import { UserCardRenderer } from '../asgard/domains/hestia/vessel/UserCard';

import { FileCardRenderer } from './cards/FileCardRenderer';
import { CouncilCardRenderer } from './cards/CouncilCardRenderer';
import { SchemaTableCardRenderer } from './cards/SchemaTableCardRenderer';
import { SchemaEnumCardRenderer } from './cards/SchemaEnumCardRenderer';
import { SchemaFunctionCardRenderer } from './cards/SchemaFunctionCardRenderer';
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
   
  if (data.type === 'value') {
    return <ValueCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'pillar') {
    return <PillarCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'step') {
    return <StepCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'principle') {
    return <PrincipleCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'invitation') {
    return <InvitationCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }
  
  if (data.type === 'pathway') {
    return <PathwayCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

    if (data.type === 'file') {
    return <FileCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'council') {
    return <CouncilCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'schema-table') {
    return <SchemaTableCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'schema-enum') {
    return <SchemaEnumCardRenderer data={data} variant={effectiveVariant} {...props} />;
  }

  if (data.type === 'schema-function') {
    return <SchemaFunctionCardRenderer data={data} variant={effectiveVariant} {...props} />;
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
    </Card>
  );
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default Card;