// src/components/profiles/CreatorCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Star, Users, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CreatorCardProps {
  creator: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    creator_profiles: {
      verified_badge: boolean | null;
      creative_categories: string[] | null;
      total_products: number | null;
      total_sales: number | null;
    } | null;
  };
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const profile = creator.creator_profiles;
  const categories = profile?.creative_categories || [];
  const displayCategories = categories.slice(0, 2);
  const verified = profile?.verified_badge === true;
  const productCount = profile?.total_products || 0;
  const salesCount = profile?.total_sales || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/creators/${creator.username || creator.id}`} className="block">
        <Card className="overflow-hidden hover:border-cyan-500/30 transition-all h-full">
          <div className="p-6 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              {creator.avatar_url ? (
                <Image
                  src={creator.avatar_url}
                  alt={creator.display_name || creator.username || 'Creator'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Palette size={32} className="text-star-dust/40" />
                </div>
              )}
            </div>
            
            {/* Name */}
            <h3 className="text-lg font-bold text-star-dust mb-1">
              {creator.display_name || creator.username}
            </h3>
            
            {/* Verified Badge */}
            {verified && (
              <div className="flex items-center justify-center gap-1 text-xs text-green-400 mb-2">
                <CheckCircle size={12} />
                <span>Verified Creator</span>
              </div>
            )}
            
            {/* Categories */}
            {displayCategories.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {displayCategories.map((cat) => (
                  <Badge key={cat} variant="outline" size="sm">
                    {cat.replace(/_/g, ' ')}
                  </Badge>
                ))}
                {categories.length > 2 && (
                  <Badge variant="outline" size="sm">
                    +{categories.length - 2}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Stats */}
            <div className="flex justify-center gap-4 text-sm mb-4">
              <div className="text-center">
                <div className="text-star-dust font-bold">{productCount}</div>
                <div className="text-star-dust/40 text-xs">Products</div>
              </div>
              <div className="text-center">
                <div className="text-star-dust font-bold">{salesCount}</div>
                <div className="text-star-dust/40 text-xs">Sales</div>
              </div>
            </div>
            
            {/* Bio Preview */}
            {creator.bio && (
              <p className="text-star-dust/40 text-sm line-clamp-2 mb-4">
                {creator.bio}
              </p>
            )}
            
            {/* View Button */}
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}