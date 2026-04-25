// src/components/hermes/ProductCard.tsx
'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { CardMedia, CardRibbon, CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { useProduct } from '@/hooks/commerce/useProduct';
import { useContributionsList } from '@/hooks/generated/plutus-economics/contributions.js';
import { useProfile } from '@/hooks/useProfile';
import { formatPrice, truncateTextWordBoundary } from '@/lib/utils/components/ui/card.utils';
import { cn } from '@/lib/utils';
import { Package, Users, TrendingUp } from 'lucide-react';
import type { ProductsRow } from '@/types/generated/plutus-economics/products';

// ============================================================================
// TYPES
// ============================================================================

export type ProductCardVariant = 'grid' | 'list' | 'featured' | 'detail';

export interface ProductCardProps {
  product: ProductsRow;
  variant?: ProductCardVariant;
  className?: string;
  onSelect?: (product: ProductsRow) => void;
  showCreator?: boolean;
}

// ============================================================================
// PRODUCT TYPE BADGE COLORS
// ============================================================================

const productTypeBadgeVariants: Record<string, 'quantum' | 'cosmic' | 'sanctuary' | 'purple' | 'cyan'> = {
  tool: 'quantum',
  resource: 'cosmic',
  template: 'sanctuary',
  service: 'purple',
  other: 'cyan',
};

// ============================================================================
// PRODUCT CARD — GRID VARIANT
// ============================================================================

function ProductCardGrid({
  product,
  onSelect,
}: {
  product: ProductsRow;
  onSelect?: (product: ProductsRow) => void;
}) {
  const { pricing, currentTierPrice } = useProduct(product.id);
  const { profile } = useProfile();
  const userTier = profile?.user_tier || 'ally';
  const price = currentTierPrice(userTier) ?? 0;
  const isSubsidized = userTier === 'community' && price < (product.price_ally ?? 0);
  const firstImage = product.media_urls?.[0];

  return (
    <Card
      data={{ id: product.id, title: product.title, type: 'product' }}
      variant="interactive"
      radius="lg"
      shadow="md"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="w-[300px]"
    >
      {product.is_published === false && (
        <CardRibbon text="Draft" color="warning" />
      )}
      {isSubsidized && (
        <CardRibbon text="Subsidized" position="top-left" color="sanctuary" />
      )}

      {firstImage && <CardMedia src={firstImage} alt={product.title} />}

      <CardHeader
        title={product.title}
        subtitle={truncateTextWordBoundary(product.description || '', 80)}
        badge={
          <Badge variant={productTypeBadgeVariants[product.product_type] || 'cyan'} size="sm">
            {product.product_type}
          </Badge>
        }
      />

      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[var(--color-star-dust)]">
            {price === 0 ? 'Free' : formatPrice(price)}
          </span>
          {isSubsidized && product.price_ally && (
            <span className="text-sm text-[var(--color-star-dust)]/40 line-through">
              {formatPrice(product.price_ally)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter
        actions={[
          <Button key="acquire" variant="primary" size="sm" fullWidth>
            {price === 0 ? 'Access Free' : 'Acquire Tool'}
          </Button>,
        ]}
      />
    </Card>
  );
}

// ============================================================================
// PRODUCT CARD — LIST VARIANT
// ============================================================================

function ProductCardList({
  product,
  onSelect,
}: {
  product: ProductsRow;
  onSelect?: (product: ProductsRow) => void;
}) {
  const { pricing, currentTierPrice } = useProduct(product.id);
  const { profile } = useProfile();
  const userTier = profile?.user_tier || 'ally';
  const price = currentTierPrice(userTier) ?? 0;
  const isSubsidized = userTier === 'community' && price < (product.price_ally ?? 0);
  const firstImage = product.media_urls?.[0];

  return (
    <Card
      data={{ id: product.id, title: product.title, type: 'product' }}
      variant="default"
      radius="lg"
      shadow="sm"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="flex flex-row items-center gap-4 w-full"
    >
      {firstImage && (
        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
          <CardMedia src={firstImage} alt={product.title} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <CardHeader
          title={product.title}
          subtitle={truncateTextWordBoundary(product.description || '', 100)}
          badge={
            <div className="flex gap-1">
              <Badge variant={productTypeBadgeVariants[product.product_type] || 'cyan'} size="sm">
                {product.product_type}
              </Badge>
              {isSubsidized && <Badge variant="sanctuary" size="sm">Subsidized</Badge>}
            </div>
          }
        />
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <span className="text-lg font-bold text-[var(--color-star-dust)]">
            {price === 0 ? 'Free' : formatPrice(price)}
          </span>
          {isSubsidized && product.price_ally && (
            <span className="block text-xs text-[var(--color-star-dust)]/40 line-through">
              {formatPrice(product.price_ally)}
            </span>
          )}
        </div>
        <Button variant="glow" size="sm">View</Button>
      </div>
    </Card>
  );
}

// ============================================================================
// PRODUCT CARD — FEATURED VARIANT
// ============================================================================

function ProductCardFeatured({
  product,
  onSelect,
}: {
  product: ProductsRow;
  onSelect?: (product: ProductsRow) => void;
}) {
  const { pricing, currentTierPrice } = useProduct(product.id);
  const { profile } = useProfile();
  const userTier = profile?.user_tier || 'ally';
  const price = currentTierPrice(userTier) ?? 0;
  const isSubsidized = userTier === 'community' && price < (product.price_ally ?? 0);
  const firstImage = product.media_urls?.[0];

  // Fetch contributors via generated hook
  const { data: contributions } = useContributionsList({ 
    filters: { product_id: product.id },
    sort: 'percent_share',
    order: 'desc',
    limit: 10
  });

  return (
    <Card
      data={{ id: product.id, title: product.title, type: 'product' }}
      variant="glow"
      radius="xl"
      shadow="lg"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="w-full max-w-[640px]"
    >
      {isSubsidized && <CardRibbon text="Community Subsidized" color="sanctuary" />}
      {firstImage && <CardMedia src={firstImage} alt={product.title} />}

      <CardHeader
        title={product.title}
        subtitle={product.description}
        badge={
          <div className="flex gap-1">
            <Badge variant={productTypeBadgeVariants[product.product_type] || 'cyan'} size="md">
              {product.product_type}
            </Badge>
            {product.is_published === false && <Badge variant="warning" size="md">Draft</Badge>}
          </div>
        }
      />

      <CardContent>
        {/* Pricing Tiers */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {pricing.map(p => (
            <div key={p.tier} className={cn(
              'text-center p-3 rounded-lg',
              userTier === p.tier
                ? `bg-[var(--color-${p.tier === 'community' ? 'sanctuary-green' : p.tier === 'ally' ? 'cosmic-blue' : 'quantum-purple'})]/20 border border-[var(--color-${p.tier === 'community' ? 'sanctuary-green' : p.tier === 'ally' ? 'cosmic-blue' : 'quantum-purple'})]/30`
                : 'bg-[var(--color-surface)]/20'
            )}>
              <div className="text-xs text-[var(--color-star-dust)]/50 mb-1">{p.label}</div>
              <div className="text-lg font-bold text-[var(--color-star-dust)]">
                {p.price === 0 ? 'Free' : p.available ? formatPrice(p.price!) : '—'}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-[var(--color-star-dust)]">
            {price === 0 ? 'Free' : formatPrice(price)}
          </span>
          {isSubsidized && product.price_ally && (
            <span className="text-sm text-[var(--color-star-dust)]/40 line-through">
              {formatPrice(product.price_ally)}
            </span>
          )}
          <Badge variant="ghost" size="sm" className="capitalize">{userTier} price</Badge>
        </div>

        {/* Contributors */}
        {contributions && contributions.length > 0 && (
          <div className="p-3 rounded-lg bg-[var(--color-surface)]/10 border border-[var(--color-star-dust)]/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-[var(--color-sanctuary-green)]" />
              <span className="text-sm font-medium text-[var(--color-star-dust)]">
                {product.residual_pool_percent}% flows to contributors
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {contributions.slice(0, 5).map((c) => (
                <span key={c.id} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-cosmic-blue)]/10 text-[var(--color-cosmic-blue)]">
                  Contributor ({c.percent_share}%)
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter
        actions={[
          <Button key="acquire" variant="primary" size="lg" fullWidth>
            {price === 0 ? 'Access Free' : 'Acquire Tool'}
          </Button>,
        ]}
      />
    </Card>
  );
}

// ============================================================================
// PRODUCT CARD — MAIN EXPORT
// ============================================================================

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
  className,
  onSelect,
}) => {
  switch (variant) {
    case 'list':
      return <ProductCardList product={product} onSelect={onSelect} />;
    case 'featured':
      return <ProductCardFeatured product={product} onSelect={onSelect} />;
    case 'grid':
    default:
      return <ProductCardGrid product={product} onSelect={onSelect} />;
  }
};

ProductCard.displayName = 'ProductCard';
export default ProductCard;