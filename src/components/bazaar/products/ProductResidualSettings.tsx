// src/components/products/ProductResidualSettings.tsx
'use client';

import { Slider } from '@/components/ui/Slider';
import { Info } from 'lucide-react';

interface ProductResidualSettingsProps {
  value: number;
  onChange: (value: number) => void;
}

export function ProductResidualSettings({ value, onChange }: ProductResidualSettingsProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-white">Residual Sharing</h3>
        <div className="flex items-center gap-1 text-xs text-white/40">
          <Info size={12} />
          <span>Share earnings with contributors forever</span>
        </div>
      </div>

      <div className="space-y-2">
        <Slider
          label="Residual Pool Percentage"
          value={value}
          onChange={onChange}
          min={0}
          max={50}
          step={5}
          showValue={true}
          formatValue={(v) => `${v}%`}
          variant="purple"
          helperText="This percentage of the creator pool is shared with contributors"
        />
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-sm">
          <p className="text-purple-400">
            {value}% of your earnings will go to a pool shared with contributors
          </p>
          <p className="text-white/40 text-xs mt-1">
            You can add contributors after creating the product
          </p>
        </div>
      </div>
    </div>
  );
}