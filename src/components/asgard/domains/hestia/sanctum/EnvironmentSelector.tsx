// src/components/asgard/domains/hestia/sanctum/EnvironmentSelector.tsx
'use client';

import { useState } from 'react';
import { Select } from '@/components/forging/Select';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';
import type { EnvironmentKey } from '@/lib/constants/systems';

// ─── Types ─────────────────────────────────────────────────────────────────

type CoreEnvironment = keyof typeof EnvironmentPromptMap;

export interface EnvironmentSelectorProps {
  value?: string | null;
  onChange: (value: string, environment: CoreEnvironment, variant: number) => void;
  disabled?: boolean;
  className?: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const VARIANT_NAMES: Record<number, string> = {
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

const ENVIRONMENTS: CoreEnvironment[] = [
  'home', 'council', 'library', 'community', 'music',
  'origin', 'support', 'observatory', 'architecture',
  'invitation', 'lounge',
];

// ─── Parsers ───────────────────────────────────────────────────────────────

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
  const parsed = parseEnvironmentPreference(value);

  const [selectedEnvironment, setSelectedEnvironment] = useState<CoreEnvironment>(parsed.environment);
  const [selectedVariant, setSelectedVariant] = useState<number>(parsed.variant);

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const env = e.target.value as CoreEnvironment;
    setSelectedEnvironment(env);
    setEnvironment(env, selectedVariant);
    onChange(buildEnvironmentPreference(env, selectedVariant), env, selectedVariant);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = parseInt(e.target.value, 10);
    setSelectedVariant(variant);
    setEnvironment(selectedEnvironment, variant);
    onChange(buildEnvironmentPreference(selectedEnvironment, variant), selectedEnvironment, variant);
  };

  const environmentOptions = ENVIRONMENTS.map((env) => ({
    value: env,
    label: ENVIRONMENT_DISPLAY_NAMES[env],
  }));

  const variantOptions = [1, 2, 3, 4].map((v) => ({
    value: String(v),
    label: `${v} — ${VARIANT_NAMES[v]}`,
  }));

  return (
    <div className={className}>
      <Select
        label="Preferred Realm"
        defaultValue={selectedEnvironment}
        options={environmentOptions}
        onChange={handleEnvironmentChange}
        disabled={disabled}
      />
      <div className="mt-4">
        <Select
          label="Realm Variant"
          defaultValue={String(selectedVariant)}
          options={variantOptions}
          onChange={handleVariantChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}