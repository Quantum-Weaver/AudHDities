/* @/scripts/generators/cosmic/generateTailwindConfig.ts */
// ============================================================================
// GENERATE TAILWIND CONFIG
// ============================================================================
// Purpose: Generate Tailwind CSS configuration from cosmic constants
// Source Files: colors.ts, motion.ts, dimensions.ts, typography.ts, effects.ts
// Output: tailwind.generated.config.mjs
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { QUANTUM_COLORS, DOMAIN_COLORS, COUNCIL_COLORS, STATUS_COLORS, MOOD_COLORS, ENERGY_COLORS, PRIDE_COLORS } from '@/lib/constants/cosmic/colors';
import { tailwindAnimations, keyframes, durations, easing } from '@/lib/constants/cosmic/motion';
import { BREAKPOINTS, SPACING_SCALE, BORDER_RADII, FONT_SIZES, LINE_HEIGHTS } from '@/lib/constants/cosmic/dimensions';
import { FONT_FAMILIES, LETTER_SPACING } from '@/lib/constants/cosmic/typography';
import { SHADOWS, GLOW_EFFECTS, GRADIENTS } from '@/lib/constants/cosmic/effects';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TailwindColors {
  [key: string]: string | TailwindColors;
}

export interface TailwindConfig {
  theme: {
    extend: {
      colors: TailwindColors;
      animation: Record<string, string>;
      keyframes: Record<string, Record<string, unknown>>;
      screens: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      fontFamily: Record<string, string[]>;
      fontSize: Record<string, string>;
      lineHeight: Record<string, string>;
      letterSpacing: Record<string, string>;
      boxShadow: Record<string, string>;
      transitionDuration: Record<string, string>;
      transitionTimingFunction: Record<string, string>;
      backgroundImage: Record<string, string>;
    };
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert camelCase or dot notation to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Convert snake_case to camelCase for Tailwind config keys
 */
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Format duration in ms to Tailwind format (with 'ms' suffix)
 */
function formatDuration(ms: number): string {
  return `${ms}ms`;
}

// ============================================================================
// CONFIG GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate Tailwind colors from all color constants
 */
function generateTailwindColors(): TailwindColors {
  const colors: TailwindColors = {};
  
  // Process QUANTUM_COLORS - flatten dot notation into nested objects
  for (const [key, value] of Object.entries(QUANTUM_COLORS)) {
    if (key.includes('.')) {
      const parts = key.split('.');
      let current: TailwindColors = colors;
      for (let i = 0; i < parts.length; i++) {
        const part = toKebabCase(parts[i]);
        if (i === parts.length - 1) {
          current[part] = value as string;
        } else {
          if (!current[part]) current[part] = {};
          current = current[part] as TailwindColors;
        }
      }
    } else {
      colors[toKebabCase(key)] = value as string;
    }
  }
  
  // Add domain colors as separate top-level entries
  for (const [domain, domainColors] of Object.entries(DOMAIN_COLORS)) {
    if (typeof domainColors === 'object' && domainColors !== null) {
      colors[domain] = {};
      for (const [shade, colorValue] of Object.entries(domainColors)) {
        (colors[domain] as TailwindColors)[shade] = colorValue as string;
      }
    } else {
      colors[domain] = domainColors as string;
    }
  }
  
  // Add council entity colors
  colors['entity'] = {};
  for (const [entity, colorValue] of Object.entries(COUNCIL_COLORS)) {
    (colors['entity'] as TailwindColors)[toKebabCase(entity)] = colorValue as string;
  }
  
  // Add status colors
  colors['status'] = {};
  for (const [status, colorValue] of Object.entries(STATUS_COLORS)) {
    (colors['status'] as TailwindColors)[toKebabCase(status)] = colorValue as string;
  }
  
  // Add mood colors
  colors['mood'] = {};
  for (const [mood, colorValue] of Object.entries(MOOD_COLORS)) {
    (colors['mood'] as TailwindColors)[toKebabCase(mood)] = colorValue as string;
  }
  
  // Add energy colors
  colors['energy'] = {};
  for (const [energy, colorValue] of Object.entries(ENERGY_COLORS)) {
    (colors['energy'] as TailwindColors)[toKebabCase(energy)] = colorValue as string;
  }
  
  // Add pride colors
  colors['pride'] = {};
  for (const [pride, colorValue] of Object.entries(PRIDE_COLORS)) {
    (colors['pride'] as TailwindColors)[toKebabCase(pride)] = colorValue as string;
  }
  
  return colors;
}

/**
 * Generate animation config from tailwindAnimations and keyframes
 */
function generateAnimationConfig(): { animation: Record<string, string>; keyframes: Record<string, Record<string, unknown>> } {
  // Convert tailwindAnimations to animation object
  const animation: Record<string, string> = {};
  for (const [name, value] of Object.entries(tailwindAnimations)) {
    animation[name] = value;
  }
  
  // Convert keyframes from motion.ts format to Tailwind format
  const tailwindKeyframes: Record<string, Record<string, unknown>> = {};
  for (const [name, frames] of Object.entries(keyframes)) {
    tailwindKeyframes[name] = frames as Record<string, unknown>;
  }
  
  return { animation, keyframes: tailwindKeyframes };
}

/**
 * Generate screen breakpoints from BREAKPOINTS
 */
function generateScreens(): Record<string, string> {
  const screens: Record<string, string> = {};
  for (const [name, value] of Object.entries(BREAKPOINTS)) {
    screens[name] = value;
  }
  return screens;
}

/**
 * Generate spacing config from SPACING_SCALE
 */
function generateSpacing(): Record<string, string> {
  const spacing: Record<string, string> = {};
  for (const [key, value] of Object.entries(SPACING_SCALE)) {
    spacing[key] = value;
  }
  return spacing;
}

/**
 * Generate borderRadius config from BORDER_RADII
 */
function generateBorderRadius(): Record<string, string> {
  const borderRadius: Record<string, string> = {};
  for (const [key, value] of Object.entries(BORDER_RADII)) {
    borderRadius[key] = value;
  }
  return borderRadius;
}

/**
 * Generate fontFamily config from FONT_FAMILIES
 */
function generateFontFamily(): Record<string, string[]> {
  const fontFamily: Record<string, string[]> = {};
  for (const [name, fonts] of Object.entries(FONT_FAMILIES)) {
    fontFamily[name] = [...fonts];
  }
  return fontFamily;
}

/**
 * Generate fontSize config from FONT_SIZES
 */
function generateFontSize(): Record<string, string> {
  const fontSize: Record<string, string> = {};
  for (const [key, value] of Object.entries(FONT_SIZES)) {
    fontSize[key] = value;
  }
  return fontSize;
}

/**
 * Generate lineHeight config from LINE_HEIGHTS
 */
function generateLineHeight(): Record<string, string> {
  const lineHeight: Record<string, string> = {};
  for (const [key, value] of Object.entries(LINE_HEIGHTS)) {
    lineHeight[key] = value;
  }
  return lineHeight;
}

/**
 * Generate letterSpacing config from LETTER_SPACING
 */
function generateLetterSpacing(): Record<string, string> {
  const letterSpacing: Record<string, string> = {};
  for (const [key, value] of Object.entries(LETTER_SPACING)) {
    // Tailwind tracking classes map to specific values
    const trackingMap: Record<string, string> = {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    };
    letterSpacing[key] = trackingMap[key] || value;
  }
  return letterSpacing;
}

/**
 * Generate boxShadow config from SHADOWS and GLOW_EFFECTS
 */
function generateBoxShadow(): Record<string, string> {
  const boxShadow: Record<string, string> = {};
  
  // Add standard shadows
  for (const [key, value] of Object.entries(SHADOWS)) {
    boxShadow[key] = value;
  }
  
  // Add glow effects as box shadows
  for (const [key, value] of Object.entries(GLOW_EFFECTS)) {
    boxShadow[`glow-${toKebabCase(key)}`] = value;
  }
  
  return boxShadow;
}

/**
 * Generate transitionDuration config from durations
 */
function generateTransitionDuration(): Record<string, string> {
  const transitionDuration: Record<string, string> = {};
  for (const [key, value] of Object.entries(durations)) {
    transitionDuration[key] = formatDuration(value);
  }
  return transitionDuration;
}

/**
 * Generate transitionTimingFunction config from easing
 */
function generateTransitionTimingFunction(): Record<string, string> {
  const transitionTimingFunction: Record<string, string> = {};
  for (const [key, value] of Object.entries(easing)) {
    transitionTimingFunction[key] = value;
  }
  return transitionTimingFunction;
}

/**
 * Generate backgroundImage config from GRADIENTS
 */
function generateBackgroundImage(): Record<string, string> {
  const backgroundImage: Record<string, string> = {};
  for (const [key, value] of Object.entries(GRADIENTS)) {
    backgroundImage[`gradient-${toKebabCase(key)}`] = value;
  }
  return backgroundImage;
}

/**
 * Format Tailwind config as JavaScript module
 */
function formatConfigAsModule(config: TailwindConfig): string {
  const timestamp = new Date().toISOString();
  
  let content = `// ============================================================================\n`;
  content += `// GENERATED TAILWIND CONFIG - DO NOT EDIT DIRECTLY\n`;
  content += `// Generated: ${timestamp}\n`;
  content += `// Source: colors.ts, motion.ts, dimensions.ts, typography.ts, effects.ts\n`;
  content += `// ============================================================================\n\n`;
  
  content += `/** @type {import('tailwindcss').Config} */\n`;
  content += `export default {\n`;
  content += `  theme: {\n`;
  content += `    extend: {\n`;
  
  // Colors
  content += `      colors: ${JSON.stringify(config.theme.extend.colors, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Animation
  content += `      animation: ${JSON.stringify(config.theme.extend.animation, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Keyframes
  content += `      keyframes: ${JSON.stringify(config.theme.extend.keyframes, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Screens
  content += `      screens: ${JSON.stringify(config.theme.extend.screens, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Spacing
  content += `      spacing: ${JSON.stringify(config.theme.extend.spacing, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Border Radius
  content += `      borderRadius: ${JSON.stringify(config.theme.extend.borderRadius, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Font Family
  content += `      fontFamily: ${JSON.stringify(config.theme.extend.fontFamily, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Font Size
  content += `      fontSize: ${JSON.stringify(config.theme.extend.fontSize, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Line Height
  content += `      lineHeight: ${JSON.stringify(config.theme.extend.lineHeight, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Letter Spacing
  content += `      letterSpacing: ${JSON.stringify(config.theme.extend.letterSpacing, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Box Shadow
  content += `      boxShadow: ${JSON.stringify(config.theme.extend.boxShadow, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Transition Duration
  content += `      transitionDuration: ${JSON.stringify(config.theme.extend.transitionDuration, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Transition Timing Function
  content += `      transitionTimingFunction: ${JSON.stringify(config.theme.extend.transitionTimingFunction, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  // Background Image (Gradients)
  content += `      backgroundImage: ${JSON.stringify(config.theme.extend.backgroundImage, null, 2).replace(/\n/g, '\n      ')},\n`;
  
  content += `    },\n`;
  content += `  },\n`;
  content += `};\n`;
  
  return content;
}

// ============================================================================
// HELPER FUNCTION FOR FILE WRITING
// ============================================================================

/**
 * Write generated config to file (handles dry-run)
 */
function writeGeneratedFile(
  filePath: string,
  content: string,
  options: CosmicGeneratorOptions
): boolean {
  const { dryRun, verbose } = options;
  const fullPath = path.join(process.cwd(), filePath);
  
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would write to: ${fullPath}`);
      logDebug(`  Content length: ${content.length} characters`);
    }
    return true;
  }
  
  try {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logSuccess(`Written: ${fullPath}`);
    }
    return true;
  } catch (error) {
    logError(`Failed to write ${fullPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

/**
 * Generate Tailwind config file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateTailwindConfig(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = 'tailwind.generated.config.mjs';
  
  if (verbose) {
    logInfo('Generating Tailwind config from cosmic constants...');
  }
  
  try {
    // Generate all config sections
    const colors = generateTailwindColors();
    const { animation, keyframes: tailwindKeyframes } = generateAnimationConfig();
    const screens = generateScreens();
    const spacing = generateSpacing();
    const borderRadius = generateBorderRadius();
    const fontFamily = generateFontFamily();
    const fontSize = generateFontSize();
    const lineHeight = generateLineHeight();
    const letterSpacing = generateLetterSpacing();
    const boxShadow = generateBoxShadow();
    const transitionDuration = generateTransitionDuration();
    const transitionTimingFunction = generateTransitionTimingFunction();
    const backgroundImage = generateBackgroundImage();
    
    // Build complete config
    const config: TailwindConfig = {
      theme: {
        extend: {
          colors,
          animation,
          keyframes: tailwindKeyframes,
          screens,
          spacing,
          borderRadius,
          fontFamily,
          fontSize,
          lineHeight,
          letterSpacing,
          boxShadow,
          transitionDuration,
          transitionTimingFunction,
          backgroundImage
        }
      }
    };
    
    if (verbose) {
      logDebug(`Generated Tailwind config with:`);
      logDebug(`  Colors: ${Object.keys(colors).length} top-level entries`);
      logDebug(`  Animations: ${Object.keys(animation).length}`);
      logDebug(`  Keyframes: ${Object.keys(tailwindKeyframes).length}`);
      logDebug(`  Screens: ${Object.keys(screens).length}`);
      logDebug(`  Spacing: ${Object.keys(spacing).length}`);
      logDebug(`  Border Radius: ${Object.keys(borderRadius).length}`);
      logDebug(`  Font Families: ${Object.keys(fontFamily).length}`);
      logDebug(`  Font Sizes: ${Object.keys(fontSize).length}`);
      logDebug(`  Line Heights: ${Object.keys(lineHeight).length}`);
      logDebug(`  Letter Spacing: ${Object.keys(letterSpacing).length}`);
      logDebug(`  Box Shadows: ${Object.keys(boxShadow).length}`);
      logDebug(`  Transition Durations: ${Object.keys(transitionDuration).length}`);
      logDebug(`  Transition Timing: ${Object.keys(transitionTimingFunction).length}`);
      logDebug(`  Gradients: ${Object.keys(backgroundImage).length}`);
    }
    
    // Format as JavaScript module
    const configContent = formatConfigAsModule(config);
    
    // Write to file (handles dry-run internally)
    const writeSuccess = writeGeneratedFile(outputPath, configContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Tailwind config generated: ${outputPath}`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate Tailwind config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { TailwindColors as TailwindColorsType, TailwindConfig as TailwindConfigType };