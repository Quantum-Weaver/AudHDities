// src/components/asgard/domains/hermes/merchants/MerchantCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/runes/Card';
import { CardHeader } from '@/components/runes/cards/CardHeader';
import { CardContent } from '@/components/runes/cards/CardContent';
import { Badge } from '@/components/runes/Badge';
import { Shield, Package, Globe } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { CardProps } from '@/components/runes/Card';

interface VendorCardData {
  id: string;
  type: 'vendor';
  title: string;
  description?: string;
  image?: string;
  logo?: string;
  businessType?: string;
  productCount?: number;
  isVerified?: boolean;
  website?: string;
}

interface MerchantCardRendererProps {
  data: CardData;
  variant: CardProps['variant'];
  radius: CardProps['radius'];
  shadow: CardProps['shadow'];
  interactive?: boolean;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  sole_proprietor: 'Sole Proprietor', llc: 'LLC', nonprofit: 'Nonprofit',
  corporation: 'Corporation', partnership: 'Partnership',
};

export const MerchantCardRenderer: React.FC<MerchantCardRendererProps> = ({
  data,
  variant = 'interactive',
  radius = 'lg',
  shadow = 'sm',
  interactive = true,  
}) => {
  const vendor = data as VendorCardData;

  return (
    <Card data={data} variant={variant} interactive={interactive} radius={radius} shadow={shadow} className="p-5 h-full">
      <CardHeader
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-star-dust/60 text-lg font-bold">
              {vendor.title?.charAt(0)?.toUpperCase() || 'V'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-star-dust font-semibold">{vendor.title}</span>
                {vendor.isVerified && (
                  <Shield size={14} className="text-neurospark" />
                )}
              </div>
              {vendor.businessType && (
                <span className="text-xs text-star-dust/40">
                  {BUSINESS_TYPE_LABELS[vendor.businessType] || vendor.businessType}
                </span>
              )}
            </div>
          </div>
        }
      />
      {vendor.description && (
        <CardContent description={vendor.description} />
      )}
      <div className="flex items-center gap-3 mt-2 flex-wrap">
        {vendor.website && (
          <span className="flex items-center gap-1 text-xs text-star-dust/40">
            <Globe size={12} />{vendor.website}
          </span>
        )}
      </div>
    </Card>
  );
};

MerchantCardRenderer.displayName = 'MerchantCardRenderer';