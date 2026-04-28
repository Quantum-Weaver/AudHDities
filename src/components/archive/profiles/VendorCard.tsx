// src/components/profiles/VendorCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Store, Star, Package, CheckCircle, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface VendorCardProps {
  vendor: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    vendor_profiles: {
      business_name: string;
      business_type: string | null;
      verified_badge: boolean;
      product_categories: string[];
      total_products: number;
      total_sales: number;
    };
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  const profile = vendor.vendor_profiles;
  const categories = profile?.product_categories || [];
  const displayCategories = categories.slice(0, 2);
  const verified = profile?.verified_badge === true;
  const productCount = profile?.total_products ?? 0;
  const salesCount = profile?.total_sales ?? 0;
  const businessName = profile?.business_name || vendor.display_name || vendor.username || 'Vendor';
  
  // Helper for business type display
  const getBusinessTypeDisplay = (type: string | null) => {
    if (!type) return null;
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/vendors/${vendor.username || vendor.id}`} className="block">
        <Card className="overflow-hidden hover:border-purple-500/30 transition-all h-full">
          <div className="p-6 text-center">
            {/* Business Logo / Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              {vendor.avatar_url ? (
                <Image
                  src={vendor.avatar_url}
                  alt={businessName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Store size={32} className="text-star-dust/40" />
                </div>
              )}
            </div>
            
            {/* Business Name */}
            <h3 className="text-lg font-bold text-star-dust mb-1 line-clamp-1">
              {businessName}
            </h3>
            
            {/* Verified Badge */}
            {verified && (
              <div className="flex items-center justify-center gap-1 text-xs text-green-400 mb-2">
                <CheckCircle size={12} />
                <span>Verified Vendor</span>
              </div>
            )}
            
            {/* Business Type */}
            {profile?.business_type && (
              <div className="flex items-center justify-center gap-1 text-xs text-star-dust/40 mb-2">
                <Building2 size={10} />
                <span>{getBusinessTypeDisplay(profile.business_type)}</span>
              </div>
            )}
            
            {/* Categories */}
            {displayCategories.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {displayCategories.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
                {categories.length > 2 && (
                  <Badge variant="outline">
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
            {vendor.bio && (
              <p className="text-star-dust/40 text-sm line-clamp-2 mb-4">
                {vendor.bio}
              </p>
            )}
            
            {/* View Button */}
            <Button variant="outline" size="sm" className="w-full">
              View Business
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}