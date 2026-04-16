// @/components/hermes/ProductDetail.tsx
// Full product view with tiers and checkout

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/UnifiedCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MarkdownBio } from "@/components/hestia/MarkdownBio";
import type { ProductsRow } from "@/types/generated/plutus-economics/products";
import type { Profile } from "@/types/supabase/tables/profiles";

export interface ProductDetailProps {
  product: ProductsRow;
  creator?: Profile | null;
  onPurchase?: (tier: "community" | "ally" | "corporate") => void;
  className?: string;
}

export function ProductDetail({
  product,
  creator,
  onPurchase,
  className,
}: ProductDetailProps) {
  const [selectedTier, setSelectedTier] = useState<"community" | "ally" | "corporate">("ally");

  const tiers = [
    {
      id: "community" as const,
      label: "Community Tier",
      price: product.price_community,
      description: "For neurodivergent community members",
      color: "green",
    },
    {
      id: "ally" as const,
      label: "Ally Tier",
      price: product.price_ally,
      description: "Standard pricing for supporters",
      color: "purple",
    },
    {
      id: "corporate" as const,
      label: "Corporate Tier",
      price: product.price_corporate,
      description: "For organizations and businesses",
      color: "pink",
    },
  ].filter(tier => tier.price !== null && tier.price > 0);

  const selectedPrice = tiers.find(t => t.id === selectedTier)?.price || product.price_ally;
  const hasValidPrice = selectedPrice !== null && selectedPrice > 0;

  const productTypeLabel = product.product_type.split("_").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  return (
    <div className={cn("grid lg:grid-cols-2 gap-12", className)}>
      {/* Left Column - Images */}
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10">
          {product.media_urls?.[0] ? (
            <Image
              src={product.media_urls[0]}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">📦</span>
            </div>
          )}
        </div>
        {product.media_urls && product.media_urls.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.media_urls.slice(1, 5).map((url, idx) => (
              <div
                key={idx}
                className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/50 transition-colors"
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column - Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-cyan-400">
            {productTypeLabel}
          </Badge>
          {product.residual_pool_percent && product.residual_pool_percent > 0 && (
            <Badge variant="outline" className="text-purple-400">
              ✨ {product.residual_pool_percent}% to contributors
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {product.title}
        </h1>

        {creator && (
          <Link href={`/bazaar/creators/${creator.id}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
              {creator.avatar_url ? (
                <img src={creator.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg">👤</span>
              )}
            </div>
            <div>
              <p className="text-white/60 text-sm">Created by</p>
              <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                {creator.display_name || creator.username || "Anonymous"}
              </p>
            </div>
          </Link>
        )}

        {product.description && (
          <div className="prose prose-invert max-w-none">
            <MarkdownBio content={product.description} />
          </div>
        )}

        {tiers.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/60 text-sm">Choose your tier:</p>
            <div className="grid gap-3">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
                    selectedTier === tier.id
                      ? `bg-${tier.color}-500/10 border-${tier.color}-500/50 shadow-lg shadow-${tier.color}-500/10`
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{tier.label}</span>
                      {tier.id === "community" && (
                        <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
                          Subsidized
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-white/40">{tier.description}</p>
                  </div>
                  <div className={cn("text-xl font-bold", `text-${tier.color}-400`)}>
                    ${tier.price?.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          {hasValidPrice ? (
            <Button
              size="lg"
              className="w-full"
              onClick={() => onPurchase?.(selectedTier)}
            >
              {selectedPrice === 0 ? "Access Free" : `Purchase - $${selectedPrice?.toFixed(2)}`}
            </Button>
          ) : (
            <Button size="lg" className="w-full" disabled>
              Not Available for Purchase
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>🛡️</span>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>✨</span>
            <span>{product.residual_pool_percent || 30}% supports contributors</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>🔄</span>
            <span>14-day refund policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}