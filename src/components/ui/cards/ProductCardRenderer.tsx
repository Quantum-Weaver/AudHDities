'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardMedia } from './CardMedia';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { PriceBadge } from '../badges/PriceBadge';
import { getAvailableTiers, getLowestPrice, getPublicationBadgeColor } from '@/lib/utils/components/ui/card.utils';
import type { CardData, ProductCardData } from '@/types/components/ui/card.types';
import type { CardProps } from '@/components/ui/Card';

// ============================================================================
// TYPES
// ============================================================================

interface ProductCardRendererProps {
  data: CardData;
  variant?: CardProps['variant'];
  radius: CardProps['radius'];
  shadow?: CardProps['shadow'];
  interactive?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

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

ProductCardRenderer.displayName = 'ProductCardRenderer';