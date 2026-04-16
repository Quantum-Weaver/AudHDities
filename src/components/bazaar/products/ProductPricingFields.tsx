// src/components/products/ProductPricingFields.tsx
'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Info } from 'lucide-react';

interface ProductPricingFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function ProductPricingFields({ register, errors }: ProductPricingFieldsProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">Pricing</h3>
        <div className="flex items-center gap-1 text-xs text-white/40">
          <Info size={12} />
          <span>Tiered pricing based on Acid Test results</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="Community Tier (ND)"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('price_community')}
          helperText="For neurodivergent users (can be $0)"
        />
        
        <Input
          label="Ally Tier"
          type="number"
          step="0.01"
          placeholder="25.00"
          {...register('price_ally')}
          required
          helperText="Standard price for supporters"
        />
        
        <Input
          label="Corporate Tier"
          type="number"
          step="0.01"
          placeholder="100.00"
          {...register('price_corporate')}
          helperText="For businesses (optional)"
        />
      </div>
    </div>
  );
}