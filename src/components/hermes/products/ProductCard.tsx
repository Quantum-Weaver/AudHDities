// @/components/hermes/ProductCard.tsx
// Individual product display card

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ProductsRow } from "@/types/generated/plutus-economics/products";
import { PRODUCT_TYPE } from "@/lib/constants/generated/plutus-economics/product_type";

export interface ProductCardProps {
  product: ProductsRow;
  variant?: "marketplace" | "dashboard" | "admin";
  showActions?: boolean;
  onEdit?: (product: ProductsRow) => void;
  onDelete?: (product: ProductsRow) => void;
  className?: string;
}

const variantClasses = {
  marketplace: "hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10",
  dashboard: "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10",
  admin: "hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10",
};

const productTypeIcons: Record<string, string> = {
  digital_course: "📚",
  digital_download: "📥",
  digital_membership: "👑",
  digital_subscription: "🔄",
  audio: "🎵",
  video: "🎬",
  music: "🎸",
  physical_product: "📦",
  clothing: "👕",
  accessory: "💍",
  consultation: "💬",
  service: "⚙️",
  donation: "💖",
  tip: "💎",
};

export function ProductCard({
  product,
  variant = "marketplace",
  showActions = false,
  onEdit,
  onDelete,
  className,
}: ProductCardProps) {
  const productType = product.product_type;
  const productLabel = productType.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const Icon = productTypeIcons[productType] || "📦";
  
  const lowestPrice = Math.min(
    product.price_community ?? Infinity,
    product.price_ally ?? Infinity,
    product.price_corporate ?? Infinity
  );
  const hasPrice = lowestPrice !== Infinity && lowestPrice > 0;
  const hasCommunityPrice = (product.price_community ?? 0) > 0;
  const hasAllyPrice = (product.price_ally ?? 0) > 0;
  const hasCorporatePrice = (product.price_corporate ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/bazaar/creations/${product.id}`}>
        <Card
          className={cn(
            "h-full flex flex-col transition-all duration-300 cursor-pointer",
            variantClasses[variant],
            className
          )}
        >
          {/* Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black/40">
            {product.media_urls?.[0] ? (
              <Image
                src={product.media_urls[0]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl">{Icon}</span>
              </div>
            )}
            {!product.is_published && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="outline" className="bg-black/80 text-yellow-400">
                  Draft
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">{Icon}</span>
                <span className="text-xs text-white/40">{productLabel}</span>
              </div>
              {product.is_published ? (
                <Badge variant="success" size="sm" className="bg-green-500/10 text-green-400">
                  Published
                </Badge>
              ) : (
                <Badge variant="outline" size="sm" className="text-yellow-400">
                  Draft
                </Badge>
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
              <div className="flex items-center justify-between mb-2">
                {hasPrice ? (
                  <span className="text-white font-bold">
                    ${lowestPrice.toFixed(2)}
                    {product.price_ally && product.price_community && product.price_ally !== product.price_community && "+"}
                  </span>
                ) : (
                  <span className="text-green-400 font-medium">Pay What You Want</span>
                )}
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
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <span>✨</span>
                  <span>{product.residual_pool_percent}% to contributors</span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Actions */}
          {showActions && (
            <div className="absolute top-2 right-2 flex gap-1">
              {!product.is_published && onEdit && (
                <button
                  onClick={(e) => { e.preventDefault(); onEdit(product); }}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400 transition-colors"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => { e.preventDefault(); onDelete(product); }}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </Card>
      </Link>
    </motion.div>
  );
}