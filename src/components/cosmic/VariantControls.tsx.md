// components/cosmic/VariantControls.tsx
// Controls for adjusting component variants

"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Label } from "../ui/Label";
import { Slider } from "../ui/Slider";
import { Switch } from "../ui/Switch";


export interface VariantControlsProps {
  component: string;
  className?: string;
}

interface ComponentVariants {
  variant?: string[];
  size?: string[];
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: boolean;
}

const componentVariantsMap: Record<string, ComponentVariants> = {
  button: {
    variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning'],
    size: ['xs', 'sm', 'md', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
    disabled: true,
    fullWidth: true,
    loading: true,
    icon: true,
  },
  badge: {
    variant: ['default', 'success', 'warning', 'error', 'info', 'quantum', 'cosmic', 'fire', 'outline'],
    size: ['sm', 'md', 'lg'],
  },
  card: {
    variant: ['default', 'interactive', 'glass', 'glow', 'elevated'],
    size: ['sm', 'md', 'lg', 'full'],
  },
  input: {
    variant: ['default', 'error', 'success', 'warning', 'disabled', 'filled'],
    size: ['sm', 'md', 'lg'],
    disabled: true,
  },
  switch: {
    variant: ['default', 'small', 'large'],
    disabled: true,
  },
  checkbox: {
    variant: ['default', 'rounded', 'card'],
    disabled: true,
  },
  radio: {
    variant: ['default', 'card', 'button'],
    disabled: true,
  },
  slider: {
    variant: ['default', 'range', 'discrete'],
    disabled: true,
  },
  modal: {
    variant: ['default', 'drawer', 'sheet', 'fullscreen'],
  },
  alert: {
    variant: ['default', 'destructive', 'success', 'warning'],
  },
  progress: {
    size: ['sm', 'md', 'lg'],
  },
};

export function VariantControls({ component, className }: VariantControlsProps) {
  const [variants, setVariants] = useState<ComponentVariants>({});
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasIcon, setHasIcon] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    const config = componentVariantsMap[component] || {};
    setVariants(config);
    
    // Set defaults
    if (config.variant?.length) setSelectedVariant(config.variant[0]);
    if (config.size?.length) setSelectedSize(config.size[0]);
    setIsDisabled(false);
    setIsFullWidth(false);
    setIsLoading(false);
    setHasIcon(false);
    setSliderValue(50);
  }, [component]);

  if (!variants.variant?.length && !variants.size?.length && !variants.disabled && !variants.fullWidth && !variants.loading && !variants.icon) {
    return (
      <Card className={cn("p-4", className)}>
        <h3 className="text-sm font-medium text-white/60 mb-3">Variants</h3>
        <p className="text-sm text-white/40 text-center py-4">
          No variants available for {component}
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4 space-y-4", className)}>
      <h3 className="text-sm font-medium text-white/60">Variants</h3>
      
      {/* Variant Selector */}
      {variants.variant && variants.variant.length > 0 && (
        <div>
          <label className="text-xs text-white/40 mb-2 block">Variant</label>
          <div className="flex flex-wrap gap-2">
            {variants.variant.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={cn(
                  "px-2 py-1 rounded-md text-xs transition-all capitalize",
                  selectedVariant === v
                    ? "bg-quantum-purple text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {variants.size && variants.size.length > 0 && (
        <div>
          <label className="text-xs text-white/40 mb-2 block">Size</label>
          <div className="flex flex-wrap gap-2">
            {variants.size.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={cn(
                  "px-2 py-1 rounded-md text-xs transition-all capitalize",
                  selectedSize === s
                    ? "bg-quantum-purple text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disabled Toggle */}
      {variants.disabled && (
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/40">Disabled</label>
          <Switch checked={isDisabled} onCheckedChange={setIsDisabled} />
        </div>
      )}

      {/* Full Width Toggle */}
      {variants.fullWidth && (
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/40">Full Width</label>
          <Switch checked={isFullWidth} onCheckedChange={setIsFullWidth} />
        </div>
      )}

      {/* Loading Toggle */}
      {variants.loading && (
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/40">Loading State</label>
          <Switch checked={isLoading} onCheckedChange={setIsLoading} />
        </div>
      )}

      {/* Icon Toggle */}
      {variants.icon && (
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/40">Show Icon</label>
          <Switch checked={hasIcon} onCheckedChange={setHasIcon} />
        </div>
      )}

      {/* Slider Value (for slider component) */}
      {component === 'slider' && (
        <div>
          <label className="text-xs text-white/40 mb-2 block">Value: {sliderValue}%</label>
          <Slider
            value={[sliderValue]}
            onValueChange={(val) => setSliderValue(Array.isArray(val) ? val[0] : val)}
            min={0}
            max={100}
            step={1}
          />
        </div>
      )}

      {/* Current Settings Summary */}
      <div className="pt-2 border-t border-white/10">
        <p className="text-xs text-white/30">
          {selectedVariant && <span className="inline-block mr-2">🎨 {selectedVariant}</span>}
          {selectedSize && <span className="inline-block mr-2">📏 {selectedSize}</span>}
          {isDisabled && <span className="inline-block mr-2">🚫 Disabled</span>}
          {isFullWidth && <span className="inline-block mr-2">📐 Full Width</span>}
          {isLoading && <span className="inline-block mr-2">⏳ Loading</span>}
          {hasIcon && <span className="inline-block">🔘 With Icon</span>}
        </p>
      </div>
    </Card>
  );
}