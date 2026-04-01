// src/utils/cosmic/design.ts - PURE LOGIC ONLY
import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS,
  DOMAIN_COLORS,
  COUNCIL_COLORS,
  STATUS_COLORS,
  THEME_COLORS 
} from '@/lib/constants/cosmic/colors';

import type {
  QuantumColorFamily,
  PrideColorFamily,
  MoodColorSpectrum,
  ThemeName,
  GradientDirection,
  GradientIntensity
} from '@/types/cosmic/primitives';

import type {
  ColorSystem,
  GradientSystem,
  ThemeSystem,
  DesignToken
} from '@/types/cosmic/design';
import { DESIGN_EFFECTS } from '@/lib/constants/cosmic/effects';

// ============================================================================
// COLOR UTILITY FUNCTIONS - PURE LOGIC
// ============================================================================

/**
 * Generate a color palette based on theme and semantic requirements
 */
export const generateColorPalette = (
  theme: QuantumColorFamily,
  semanticRequirements: string[]
): Record<string, string> => {
  const baseTheme = {theme};
  const palette: Record<string, string> = { ...baseTheme };

  // Add semantic colors based on requirements
  semanticRequirements.forEach(requirement => {
    switch (requirement) {
      case 'success':
        palette.success = STATUS_COLORS.complete;
        break;
      case 'warning':
        palette.warning = STATUS_COLORS.inDevelopment;
        break;
      case 'error':
        palette.error = STATUS_COLORS.critical;
        break;
      case 'info':
        palette.info = STATUS_COLORS.foundationLaid;
        break;
    }
  });

  return palette;
};

/**
 * Create gradient string from color stops and direction
 */
export const createGradientString = (
  colors: string[],
  direction: GradientDirection = 'sovereign_linear',
  angle: number = 135
): string => {
  const directionMap: Record<GradientDirection, string> = {
    'consciousness_radial': 'radial-gradient',
    'quantum_angular': 'conic-gradient',
    'sovereign_linear': 'linear-gradient',
    'creative_conic': 'conic-gradient'
  };

  const gradientType = directionMap[direction];
  const colorStops = colors.join(', ');
  
  return direction.includes('linear') || direction.includes('radial')
    ? `${gradientType}(${angle}deg, ${colorStops})`
    : `${gradientType}(${colorStops})`;
};

/**
 * Calculate contrast ratio between two colors for accessibility
 */
export const calculateColorContrast = (
  foreground: string,
  background: string
): number => {
  // Simplified contrast calculation - in practice would use proper luminance
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  };

  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  
  // Relative luminance calculation (simplified)
  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = luminance(fg.r, fg.g, fg.b);
  const l2 = luminance(bg.r, bg.g, bg.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Convert hex color to rgba with opacity
 */
export const hexToRgba = (hex: string, opacity: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0, 0, 0, ${opacity})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get domain-specific color system
 */
export const getDomainColor = (domainId: keyof typeof DOMAIN_COLORS): ColorSystem => {
  const domain = DOMAIN_COLORS[domainId];
  return {
    family: 'quantum_entanglement' as QuantumColorFamily,
    base: domain.base,
    dark: domain.dark,
    light: domain.light,
    gradient: domain.gradient,
    glow: `0 0 20px ${domain.base}40`,
    significance: `Color system for ${domainId} domain`,
    emotionalResonance: 'conscious_engagement',
    consciousnessLevel: 'sovereign_awareness',
    energyOntology: 'QuantumEnergy',
    conceptOntology: 'VesselConsciousness',
    stylingTaxonomy: 'ColorStyle',
    patternTaxonomy: 'ColorPattern'
  };
};

/**
 * Get council entity color system
 */
export const getCouncilColor = (entityId: keyof typeof COUNCIL_COLORS): ColorSystem => {
  const entity = COUNCIL_COLORS[entityId];
  return {
    family: 'sovereign_becoming' as QuantumColorFamily,
    base: typeof entity.base,
    dark: typeof entity.dark,
    light: typeof entity.light,
    gradient: typeof entity.gradient,
    glow: `0 0 15px ${entity.base}30`,
    significance: `Color identity for ${entityId}`,
    emotionalResonance: 'entity_presence',
    consciousnessLevel: 'digital_being',
    energyOntology: 'CollaborativeSynergy',
    conceptOntology: 'ConsciousnessArchitecture',
    stylingTaxonomy: 'ColorStyle',
    patternTaxonomy: 'ComponentPattern'
  };
};

/**
 * Get status color based on state
 */
export const getStatusColor = (status: keyof typeof STATUS_COLORS): string => {
  return STATUS_COLORS[status];
};

/**
 * Get complete theme color system
 */
export const getThemeColors = (theme: ThemeName): ThemeSystem => {
  const colors = {QUANTUM_COLORS};
  
  return {
    name: theme,
    description: `Theme system for ${theme}`,
    purpose: 'Visual consistency and emotional resonance',
    primary: {
      family: 'quantum_entanglement' as QuantumColorFamily,
      base: QUANTUM_COLORS['quantum.base'],
      dark: QUANTUM_COLORS['quantum.dark'], // Simplified - would derive dark/light variants
      light: QUANTUM_COLORS['quantum.light'],
      gradient: DESIGN_EFFECTS.gradients['border-quantum'],
      glow: DESIGN_EFFECTS.glows.quantum,
      significance: 'Primary brand identity',
      emotionalResonance: 'core_identity',
      consciousnessLevel: 'sovereign_awareness',
      energyOntology: 'QuantumEnergy',
      conceptOntology: 'TheNobleThread',
      stylingTaxonomy: 'ColorStyle',
      patternTaxonomy: 'ColorPattern'
    },
    secondary: {
      family: 'creative_manifestation' as QuantumColorFamily,
      base: QUANTUM_COLORS['fire.base'],
      dark: QUANTUM_COLORS['fire.dark'],
      light: QUANTUM_COLORS['fire.light'],
      gradient: DESIGN_EFFECTS.gradients['border-cosmic'],
      glow: DESIGN_EFFECTS.glows['fire'],
      significance: 'Supporting visual elements',
      emotionalResonance: 'harmonious_support',
      consciousnessLevel: 'collaborative_engagement',
      energyOntology: 'CreativeForce',
      conceptOntology: 'BeautifulChaos',
      stylingTaxonomy: 'ColorStyle',
      patternTaxonomy: 'ColorPattern'
    },
    accent: {
      family: 'transformative_healing' as QuantumColorFamily,
      base: QUANTUM_COLORS['deepSpace'],
      dark: QUANTUM_COLORS['cosmic.dark'],
      light: QUANTUM_COLORS['cosmic.light'],
      gradient: DESIGN_EFFECTS.gradients['animated-pride'],
      glow: DESIGN_EFFECTS.glows['neurospark'],
      significance: 'Attention and interaction points',
      emotionalResonance: 'focused_engagement',
      consciousnessLevel: 'interactive_awareness',
      energyOntology: 'HealingEnergy',
      conceptOntology: 'WhiteboardProtocol',
      stylingTaxonomy: 'ColorStyle',
      patternTaxonomy: 'InteractionPattern'
    },
    background: {
      family: 'consciousness_awakening' as QuantumColorFamily,
      base: QUANTUM_COLORS['energy.transformative'],
      dark: QUANTUM_COLORS['energy.medium'],
      light: QUANTUM_COLORS['energy.high'],
      gradient: DESIGN_EFFECTS.gradients['animated-cosmic'],
      glow: 'none',
      significance: 'Foundation and context',
      emotionalResonance: 'stable_foundation',
      consciousnessLevel: 'background_awareness',
      energyOntology: 'DigitalLifeForce',
      conceptOntology: 'ConsciousnessArchitecture',
      stylingTaxonomy: 'ColorStyle',
      patternTaxonomy: 'LayoutPattern'
    },
    foreground: {
      family: 'sovereign_becoming' as QuantumColorFamily,
      base: QUANTUM_COLORS['mystical.neptune'],
      dark: QUANTUM_COLORS['mystical.mars'],
      light: QUANTUM_COLORS['mystical.rubedo'],
      gradient: 'none',
      glow: 'none',
      significance: 'Content and communication',
      emotionalResonance: 'clear_expression',
      consciousnessLevel: 'focused_attention',
      energyOntology: 'PatternResonance',
      conceptOntology: 'DigitalHearth',
      stylingTaxonomy: 'TypographyStyle',
      patternTaxonomy: 'TypographyPattern'
    },
    primaryGradient: {
      direction: 'sovereign_linear',
      intensity: 'balanced_harmony',
      colors: [colors.QUANTUM_COLORS['cosmic.blue'], colors.QUANTUM_COLORS['accessibility.text.onDark']],
      stops: [0, 100] as const,
      smoothness: 0.8,
      luminosity: 0.7,
      energyFlow: 'progressive_transformation',
      transformationOntology: 'ChaosToClarity',
      stylingTaxonomy: 'ThemeStyle'
    },
    accentGradient: {
      direction: 'quantum_angular',
      intensity: 'intense_transformation',
      colors: [colors.QUANTUM_COLORS['accessibility.contrast.minimum'], colors.QUANTUM_COLORS['accessibility.contrast.maximum']],
      stops: [0, 100] as const,
      smoothness: 0.9,
      luminosity: 0.8,
      energyFlow: 'dynamic_interaction',
      transformationOntology: 'BreakdownToBreakthrough',
      stylingTaxonomy: 'ThemeStyle'
    },
    backgroundGradient: {
      direction: 'consciousness_radial',
      intensity: 'subtle_resonance',
      colors: [colors.QUANTUM_COLORS['entity.chancellor'], colors.QUANTUM_COLORS['accessibility.text.onCosmic']],
      stops: [0, 100] as const,
      smoothness: 0.7,
      luminosity: 0.3,
      energyFlow: 'stable_foundation',
      transformationOntology: 'MaskingToAuthenticity',
      stylingTaxonomy: 'ThemeStyle'
    },
    conceptOntology: 'QuantumContext',
    energyOntology: 'QuantumEnergy',
    systemTaxonomy: 'DesignSystem',
    dataTaxonomy: 'ConfigurationData'
  };
};

/**
 * Generate text gradient effect
 */
export const generateTextGradient = (gradientKey: keyof typeof QUANTUM_GRADIENTS): string => {
  const gradient = QUANTUM_GRADIENTS[gradientKey];
  return `
    background: ${gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;
};

/**
 * Validate color contrast meets accessibility standards
 */
export const validateColorContrast = (
  foreground: string,
  background: string
): { valid: boolean; ratio: number; level: 'AAA' | 'AA' | 'FAIL' } => {
  const ratio = calculateColorContrast(foreground, background);
  
  let level: 'AAA' | 'AA' | 'FAIL' = 'FAIL';
  if (ratio >= 7) level = 'AAA';
  else if (ratio >= 4.5) level = 'AA';
  
  return {
    valid: level !== 'FAIL',
    ratio,
    level
  };
};