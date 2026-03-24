// src/components/products/ProductCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Edit, Package, Heart, DollarSign, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Database } from '@/types/supabase/database.types';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
  variant?: 'marketplace' | 'dashboard' | 'admin';
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onPublish?: (product: Product) => void;
  className?: string;
}

const productTypeIcons: Record<string, React.ReactNode> = {
  digital_course: <Package size={16} />,
  digital_download: <Package size={16} />,
  audio: <Package size={16} />,
  video: <Package size={16} />,
  music: <Package size={16} />,
  physical_product: <Package size={16} />,
  clothing: <Package size={16} />,
  accessory: <Package size={16} />,
  consultation: <Users size={16} />,
  service: <Users size={16} />,
  mutual_aid: <Heart size={16} />,
  donation: <Heart size={16} />,
  tip: <Heart size={16} />,
};

const productTypeLabels: Record<string, string> = {
  digital_course: 'Course',
  digital_download: 'Digital',
  audio: 'Audio',
  video: 'Video',
  music: 'Music',
  physical_product: 'Physical',
  clothing: 'Clothing',
  accessory: 'Accessory',
  consultation: 'Consultation',
  service: 'Service',
  mutual_aid: 'Mutual Aid',
  donation: 'Donation',
  tip: 'Tip',
};

const variantColors = {
  marketplace: 'from-cyan-500/20 to-purple-500/10 border-cyan-500/30',
  dashboard: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
  admin: 'from-pink-500/20 to-orange-500/10 border-pink-500/30',
};

const formatPrice = (price: number | null) => {
  if (price === null || price === 0) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

// Helper function to get valid price values array
const getValidPrices = (product: Product): number[] => {
  const prices: number[] = [];
  
  if (product.price_community !== null && product.price_community > 0) {
    prices.push(product.price_community);
  }
  if (product.price_ally !== null && product.price_ally > 0) {
    prices.push(product.price_ally);
  }
  if (product.price_corporate !== null && product.price_corporate > 0) {
    prices.push(product.price_corporate);
  }
  
  return prices;
};

export function ProductCard({ 
  product, 
  variant = 'marketplace',
  showActions = false,
  onEdit,
  onDelete,
  onPublish,
  className 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const Icon = productTypeIcons[product.product_type] || <Package size={16} />;
  const productLabel = productTypeLabels[product.product_type] || 'Product';
  
  // Get valid prices
  const validPrices = getValidPrices(product);
  const hasAnyPrice = validPrices.length > 0;
  const lowestPrice = hasAnyPrice ? Math.min(...validPrices) : null;
  const highestPrice = hasAnyPrice ? Math.max(...validPrices) : null;
  const hasPriceRange = hasAnyPrice && lowestPrice !== highestPrice;
  
  // Individual price flags for badges
  const hasCommunityPrice = product.price_community !== null && product.price_community > 0;
  const hasAllyPrice = product.price_ally !== null && product.price_ally > 0;
  const hasCorporatePrice = product.price_corporate !== null && product.price_corporate > 0;
  
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(product);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Delete "${product.title}"? This cannot be undone.`)) {
      onDelete?.(product);
    }
  };
  
  const handlePublish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPublish?.(product);
  };
  
  const productLink = variant === 'marketplace' 
    ? `/products/${product.id}` 
    : `/creator/products/${product.id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productLink} className="block">
        <Card className={cn(
          'overflow-hidden transition-all duration-300 h-full flex flex-col',
          variantColors[variant],
          isHovered && 'shadow-lg shadow-cyan-500/10 border-cyan-500/50',
          className
        )}>
          {/* Image Preview */}
          {product.preview_image && !imageError ? (
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <Image
                src={product.preview_image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              {product.is_published === false && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="outline" className="bg-black/80 text-yellow-400 border-yellow-500/50">
                    Draft
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video w-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                {Icon}
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40 flex items-center gap-1">
                  {Icon}
                  <span>{productLabel}</span>
                </span>
                {product.is_published ? (
                  <Badge variant="success" size="sm" className="bg-green-500/10 text-green-400 border-green-500/30">
                    Published
                  </Badge>
                ) : (
                  <Badge variant="outline" size="sm" className="text-yellow-400 border-yellow-500/30">
                    Draft
                  </Badge>
                )}
              </div>
              
              {/* Admin Actions */}
              {showActions && (
                <div className="flex gap-1">
                  {!product.is_published && onPublish && (
                    <button
                      onClick={handlePublish}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-green-500/20 text-white/40 hover:text-green-400 transition-colors"
                      title="Publish"
                    >
                      <Eye size={14} />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400 transition-colors"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 4V2h8v2" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {product.title}
            </h3>
            
            {/* Description */}
            {product.description && (
              <p className="text-white/40 text-sm mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>
            )}
            
            {/* Pricing */}
            <div className="mt-auto pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-cyan-400" />
                  {!hasAnyPrice ? (
                    <span className="text-green-400 font-medium">
                      Pay What You Want
                    </span>
                  ) : hasPriceRange ? (
                    <span className="text-white font-medium">
                      {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
                    </span>
                  ) : (
                    <span className="text-white font-medium">
                      {formatPrice(lowestPrice)}
                    </span>
                  )}
                </div>
                
                {/* Tier indicators */}
                <div className="flex gap-1">
                  {hasCommunityPrice && (
                    <span className="text-xs px-1.5 py-0.5 bg-cyan-500/20 rounded text-cyan-400">
                      ND
                    </span>
                  )}
                  {hasAllyPrice && (
                    <span className="text-xs px-1.5 py-0.5 bg-purple-500/20 rounded text-purple-400">
                      Ally
                    </span>
                  )}
                  {hasCorporatePrice && (
                    <span className="text-xs px-1.5 py-0.5 bg-pink-500/20 rounded text-pink-400">
                      Corp
                    </span>
                  )}
                </div>
              </div>
              
              {/* Residual indicator */}
              {product.residual_pool_percent && product.residual_pool_percent > 0 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-white/30">
                  <Star size={10} />
                  <span>{product.residual_pool_percent}% to contributors</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}