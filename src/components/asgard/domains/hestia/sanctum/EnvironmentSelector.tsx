// src/components/asgard/domains/hestia/sanctum/EnvironmentSelector.tsx
'use client';

import { useState, useEffect, useRef  } from 'react';
import { Select } from '@/components/forging/Select';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────

type CoreEnvironment = keyof typeof EnvironmentPromptMap;

export interface EnvironmentSelectorProps {
  value?: string | null;
  onChange: (value: string, environment: CoreEnvironment, variant: number) => void;
  disabled?: boolean;
  className?: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const VARIANT_LABELS: Record<number, string> = {
  1: 'Warm',
  2: 'Mystical',
  3: 'Sacred',
  4: 'Ethereal',
};

const ENVIRONMENT_DISPLAY_NAMES: Record<CoreEnvironment, string> = {
  home: 'The Hearth',
  council: 'The Council Chamber',
  library: 'The Library',
  community: 'The Bazaar',
  music: 'The Stage',
  origin: 'The Origin Temple',
  support: 'The Healing Flame',
  observatory: 'The Observatory',
  architecture: 'The Architecture Realm',
  invitation: 'The Invitation Chamber',
  lounge: 'The Lounge',
};

const CORE_ENVIRONMENTS: CoreEnvironment[] = [
  'home', 'council', 'library', 'community', 'music',
  'origin', 'support', 'observatory', 'architecture',
  'invitation', 'lounge',
];

const ALL_VARIANTS = [1, 2, 3, 4] as const;

// ─── Utilities ─────────────────────────────────────────────────────────────

export function parseEnvironmentPreference(value: string | null | undefined): {
  environment: CoreEnvironment;
  variant: number;
} {
  if (!value) return { environment: 'home', variant: 1 };

  const [env, variantStr] = value.split(':');
  const variant = parseInt(variantStr || '1', 10);
  const validEnv = (env && env in EnvironmentPromptMap) ? env : 'home';

  return {
    environment: validEnv as CoreEnvironment,
    variant: Math.max(1, Math.min(4, isNaN(variant) ? 1 : variant)),
  };
}

export function buildEnvironmentPreference(
  environment: CoreEnvironment,
  variant: number
): string {
  return `${environment}:${variant}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function EnvironmentSelector({
  value,
  onChange,
  disabled = false,
  className,
}: EnvironmentSelectorProps) {
  const { setEnvironment } = useContinuityBeam();
  const isUserEditing = useRef(false);
  const parsed = parseEnvironmentPreference(value);
  const [selectedEnvironment, setSelectedEnvironment] = useState<CoreEnvironment>(parsed.environment);
  const [selectedVariant, setSelectedVariant] = useState<number>(parsed.variant);
  
  useEffect(() => {
    const parsed = parseEnvironmentPreference(value);
    setSelectedEnvironment(parsed.environment);
    setSelectedVariant(parsed.variant);
  }, [value]);

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    isUserEditing.current = true;
    const env = e.target.value as CoreEnvironment;
    setSelectedEnvironment(env);
    const newValue = buildEnvironmentPreference(env, selectedVariant);
    setEnvironment(env, selectedVariant);
    onChange(newValue, env, selectedVariant);
  };

  const handleVariantChange = (variant: number) => {
    isUserEditing.current = true;
    setSelectedVariant(variant);
    const newValue = buildEnvironmentPreference(selectedEnvironment, variant);
    setEnvironment(selectedEnvironment, variant);
    onChange(newValue, selectedEnvironment, variant);
  };

  useEffect(() => {
    if (isUserEditing.current) {
      isUserEditing.current = false;
      return;
    }
    const parsed = parseEnvironmentPreference(value);
    setSelectedEnvironment(parsed.environment);
    setSelectedVariant(parsed.variant);
  }, [value]);

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Environment Dropdown */}
      <Select
        label="Default Realm"
        value={selectedEnvironment}
        options={CORE_ENVIRONMENTS.map((env) => ({
          value: env,
          label: ENVIRONMENT_DISPLAY_NAMES[env],
        }))}
        onChange={handleEnvironmentChange}
        disabled={disabled}
      />

      {/* Variant Radio Buttons — same width as dropdown */}
      <div className="flex w-full mt-1">
        {ALL_VARIANTS.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => handleVariantChange(variant)}
            disabled={disabled}
            className={cn(
              'flex-1 py-2 text-xs font-medium border border-white/10 transition-all',
              'first:rounded-l-md last:rounded-r-md',
              variant === selectedVariant
                ? 'bg-neurospark/20 border-neurospark/40 text-neurospark'
                : 'bg-deep-space/40 text-star-dust/50 hover:text-star-dust/80 hover:bg-white/5'
            )}
          >
            {variant}
          </button>
        ))}
      </div>

      {/* Variant Label */}
      <p className="text-xs text-star-dust/40 mt-1 text-center">
        {VARIANT_LABELS[selectedVariant]}
      </p>
    </div>
  );
}