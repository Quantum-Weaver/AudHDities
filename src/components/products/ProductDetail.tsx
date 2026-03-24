// src/components/products/ProductDetail.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Share2, Star, Users, Package, ArrowLeft, Shield, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MarkdownBio } from '@/components/profiles/MarkdownBio';
import { formatPrice } from '@/lib/stripe/formatting';

interface ProductDetailProps {
  product: any;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedTier, setSelectedTier] = useState<'community' | 'ally' | 'corporate'>('ally');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const creator = product.creator;
  const creatorProfile = creator?.creator_profiles;
  
  const tiers = [
    { id: 'community', label: 'Community Tier', price: product.price_community, description: 'For neurodivergent community members', color: 'green' },
    { id: 'ally', label: 'Ally Tier', price: product.price_ally, description: 'Standard pricing for supporters', color: 'purple' },
    { id: 'corporate', label: 'Corporate Tier', price: product.price_corporate, description: 'For organizations and businesses', color: 'pink' },
  ].filter(tier => tier.price !== null && tier.price > 0);
  
  const selectedPrice = tiers.find(t => t.id === selectedTier)?.price || product.price_ally;
  
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Stripe checkout will be implemented
    console.log('Add to cart:', { productId: product.id, tier: selectedTier });
    setTimeout(() => setIsAddingToCart(false), 1000);
  };
  
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left Column - Images */}
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10">
          {product.preview_image ? (
            <Image
              src={product.preview_image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={64} className="text-white/20" />
            </div>
          )}
        </div>
        
        {/* Thumbnails (if multiple images) */}
        {product.media_urls && product.media_urls.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.media_urls.slice(0, 4).map((url: string, idx: number) => (
              <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Right Column - Details */}
      <div className="space-y-6">
        {/* Product Type Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-cyan-400">
            {product.product_type?.replace(/_/g, ' ')}
          </Badge>
          {product.residual_pool_percent > 0 && (
            <Badge variant="outline" className="text-purple-400">
              <Star size={12} className="mr-1" />
              {product.residual_pool_percent}% to contributors
            </Badge>
          )}
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {product.title}
        </h1>
        
        {/* Creator Info */}
        {creator && (
          <Link href={`/creators/${creator.username || creator.id}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
              {creator.avatar_url ? (
                <img src={creator.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Users size={16} className="text-white/40" />
                </div>
              )}
            </div>
            <div>
              <p className="text-white/60 text-sm">Created by</p>
              <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                {creator.display_name || creator.username}
                {creatorProfile?.verified_badge && (
                  <CheckCircle size={14} className="inline ml-1 text-green-400" />
                )}
              </p>
            </div>
          </Link>
        )}
        
        {/* Description */}
        {product.description && (
          <div className="prose prose-invert max-w-none">
            <MarkdownBio content={product.description} />
          </div>
        )}
        
        {/* Pricing Tiers */}
        {tiers.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/60 text-sm">Choose your tier:</p>
            <div className="grid gap-3">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all text-left
                    ${selectedTier === tier.id 
                      ? `bg-${tier.color}-500/10 border-${tier.color}-500/50 shadow-lg shadow-${tier.color}-500/10`
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{tier.label}</span>
                      {tier.id === 'community' && (
                        <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
                          Subsidized
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-white/40">{tier.description}</p>
                  </div>
                  <div className={`text-xl font-bold text-${tier.color}-400`}>
                    {formatPrice(tier.price)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            size="lg"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? 'Adding...' : `Purchase ${formatPrice(selectedPrice)}`}
          </Button>
          <Button variant="outline" size="lg" className="aspect-square p-0 w-12">
            <Heart size={20} />
          </Button>
          <Button variant="outline" size="lg" className="aspect-square p-0 w-12">
            <Share2 size={20} />
          </Button>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Shield size={14} className="text-cyan-400" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Award size={14} className="text-purple-400" />
            <span>{product.residual_pool_percent}% supports contributors</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <AlertCircle size={14} className="text-yellow-400" />
            <span>14-day refund policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}