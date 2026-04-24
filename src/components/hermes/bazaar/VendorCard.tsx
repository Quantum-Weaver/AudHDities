// src/components/hermes/VendorCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardMedia, CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Store, Package } from 'lucide-react';
import type { CardData, VendorCardData } from '@/types/components/ui/card.types';

interface VendorCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

const businessTypeLabels: Record<string, string> = {
  sole_proprietor: 'Sole Proprietor',
  llc: 'LLC',
  nonprofit: 'Nonprofit',
  cooperative: 'Cooperative',
  partnership: 'Partnership',
  other: 'Business',
};

export const VendorCardRenderer: React.FC<VendorCardRendererProps> = ({
  data,
  variant = 'default',
  interactive = true,
}) => {
  const vendorData = data as VendorCardData;

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
    >
      {vendorData.image && (
        <CardMedia src={vendorData.image} alt={vendorData.title} />
      )}

      <CardHeader
        title={vendorData.title}
        subtitle={vendorData.description}
        badge={
          <div className="flex gap-1">
            {vendorData.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                <CheckCircle className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
        }
      />

      <CardContent
        metadata={[
          ...(vendorData.businessType ? [{
            label: 'Type',
            value: (
              <span className="flex items-center gap-1">
                <Store className="h-3 w-3" />
                {businessTypeLabels[vendorData.businessType] || vendorData.businessType}
              </span>
            )
          }] : []),
          ...(vendorData.productCount !== undefined ? [{
            label: 'Products',
            value: (
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {vendorData.productCount}
              </span>
            )
          }] : []),
        ]}
      />

      {vendorData.businessType && (
        <CardFooter
          actions={[
            <Badge key="type" variant="outline" size="sm">
              {businessTypeLabels[vendorData.businessType] || vendorData.businessType}
            </Badge>
          ]}
        />
      )}
    </Card>
  );
};

VendorCardRenderer.displayName = 'VendorCardRenderer';