// src/components/asgard/domains/hermes/creations/ProductCard.tsx
// Wares edition (2026-07-18): products became wares. One base price plus a
// pricing_model; per-user solidarity pricing is computed server-side by
// calculate_sovereign_price at checkout, so the card shows the base price
// with the solidarity note instead of the old three-tier grid. The
// contributions fetch died with its table (ware_participants is the
// successor; participant chips can return when that surface is designed).
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardMedia, CardRibbon, CardHeader, CardContent, CardFooter } from '@/components/runes/cards';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { formatPrice, truncateTextWordBoundary } from '@/lib/utils/components/runes/card.utils';
import { TrendingUp } from 'lucide-react';
import type { Tables } from '@/types/supabase/database.helpers.js';

// ============================================================================
// TYPES
// ============================================================================

export type WaresRow = Tables<'wares'>;

export type ProductCardVariant = 'grid' | 'list' | 'featured' | 'detail';

export interface ProductCardProps {
  product: WaresRow;
  variant?: ProductCardVariant;
  className?: string;
  onSelect?: (product: WaresRow) => void;
  showCreator?: boolean;
}

// ============================================================================
// WARE TYPE BADGE COLORS
// ============================================================================

const wareTypeBadgeVariants: Record<string, 'quantum' | 'cosmic' | 'sanctuary' | 'purple' | 'cyan'> = {
  physical: 'sanctuary',
  digital: 'quantum',
  service: 'purple',
};

function priceLabel(ware: WaresRow): string {
  if (ware.pricing_model === 'free') return 'Free';
  if (ware.pricing_model === 'patronage_only') return 'Patronage';
  if (ware.price === null || ware.price <= 0) return '—';
  const base = formatPrice(ware.price) ?? '—';
  return ware.pricing_model === 'pay_what_you_want' ? `${base}+` : base;
}

function firstImage(ware: WaresRow): string | undefined {
  return ware.cover_url || ware.media_urls?.[0] || undefined;
}

// ============================================================================
// GRID VARIANT
// ============================================================================

function ProductCardGrid({ product, onSelect }: { product: WaresRow; onSelect?: (product: WaresRow) => void }) {
  const image = firstImage(product);

  return (
    <Card
      data={{ id: product.id, title: product.name, type: 'product' }}
      variant="interactive"
      radius="lg"
      shadow="md"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="w-[300px]"
    >
      {product.status === 'draft' && <CardRibbon text="Draft" color="warning" />}

      {image && <CardMedia src={image} alt={product.name} />}

      <CardHeader
        title={product.name}
        subtitle={truncateTextWordBoundary(product.description || '', 80)}
        badge={
          <Badge variant={wareTypeBadgeVariants[product.ware_type] || 'cyan'} size="sm">
            {product.ware_type}
          </Badge>
        }
      />

      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[var(--color-star-dust)]">
            {priceLabel(product)}
          </span>
        </div>
      </CardContent>

      <CardFooter
        actions={[
          <Button key="acquire" variant="primary" size="sm" fullWidth>
            {product.pricing_model === 'free' ? 'Access Free' : 'Acquire'}
          </Button>,
        ]}
      />
    </Card>
  );
}

// ============================================================================
// LIST VARIANT
// ============================================================================

function ProductCardList({ product, onSelect }: { product: WaresRow; onSelect?: (product: WaresRow) => void }) {
  const image = firstImage(product);

  return (
    <Card
      data={{ id: product.id, title: product.name, type: 'product' }}
      variant="default"
      radius="lg"
      shadow="sm"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="flex flex-row items-center gap-4 w-full"
    >
      {image && (
        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
          <CardMedia src={image} alt={product.name} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <CardHeader
          title={product.name}
          subtitle={truncateTextWordBoundary(product.description || '', 100)}
          badge={
            <Badge variant={wareTypeBadgeVariants[product.ware_type] || 'cyan'} size="sm">
              {product.ware_type}
            </Badge>
          }
        />
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <span className="text-lg font-bold text-[var(--color-star-dust)]">
            {priceLabel(product)}
          </span>
        </div>
        <Button variant="glow" size="sm">View</Button>
      </div>
    </Card>
  );
}

// ============================================================================
// FEATURED VARIANT
// ============================================================================

function ProductCardFeatured({ product, onSelect }: { product: WaresRow; onSelect?: (product: WaresRow) => void }) {
  const image = firstImage(product);

  return (
    <Card
      data={{ id: product.id, title: product.name, type: 'product' }}
      variant="glow"
      radius="xl"
      shadow="lg"
      onClick={onSelect ? () => onSelect(product) : undefined}
      className="w-full max-w-[640px]"
    >
      {image && <CardMedia src={image} alt={product.name} />}

      <CardHeader
        title={product.name}
        subtitle={product.description}
        badge={
          <div className="flex gap-1">
            <Badge variant={wareTypeBadgeVariants[product.ware_type] || 'cyan'} size="md">
              {product.ware_type}
            </Badge>
            {product.status === 'draft' && <Badge variant="warning" size="md">Draft</Badge>}
          </div>
        }
      />

      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-[var(--color-star-dust)]">
            {priceLabel(product)}
          </span>
          {product.pricing_model === 'fixed' && (
            <Badge variant="ghost" size="sm">Solidarity pricing applied at checkout</Badge>
          )}
          {product.pricing_model === 'pay_what_you_want' && (
            <Badge variant="ghost" size="sm">Pay what you want</Badge>
          )}
        </div>

        {product.residual_pool_percent !== null && product.residual_pool_percent > 0 && (
          <div className="p-3 rounded-lg bg-[var(--color-surface)]/10 border border-[var(--color-star-dust)]/5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--color-sanctuary-green)]" />
              <span className="text-sm font-medium text-[var(--color-star-dust)]">
                {product.residual_pool_percent}% flows to the residual pool
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter
        actions={[
          <Button key="acquire" variant="primary" size="lg" fullWidth>
            {product.pricing_model === 'free' ? 'Access Free' : 'Acquire'}
          </Button>,
        ]}
      />
    </Card>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
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
