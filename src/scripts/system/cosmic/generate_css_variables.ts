/* @/scripts/generators/cosmic/generateCssVariables.ts */
// ============================================================================
// GENERATE CSS VARIABLES
// ============================================================================
// Purpose: Generate :root CSS custom properties from cosmic constants
// Source Files: colors.ts, effects.ts, dimensions.ts
// Output: @/styles/generated/variables.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';

// Import cosmic constants
import { QUANTUM_COLORS, DOMAIN_COLORS, COUNCIL_COLORS, STATUS_COLORS, MOOD_COLORS, ENERGY_COLORS, PRIDE_COLORS } from 'src/lib/constants/cosmic/colors';
import { GLOW_EFFECTS, SHADOWS, GRADIENTS } from 'src/lib/constants/cosmic/effects';
import { SPACING_SCALE, BORDER_RADII, FONT_SIZES, LINE_HEIGHTS, BREAKPOINTS } from 'src/lib/constants/cosmic/dimensions';
import path from 'path';
import fs from 'fs';
// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CssVariable {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'radius' | 'glow' | 'shadow' | 'gradient' | 'typography' | 'breakpoint';
  description?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert camelCase or dot notation to kebab-case for CSS variables
 */
function toKebabCase(str: string): string {
  return str
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Format a color value as CSS variable value
 */
function formatColorValue(color: string | number): string {
  if (typeof color === 'number') return `${color}px`;
  return color;
}

// ============================================================================
// VARIABLE GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate color variables from QUANTUM_COLORS
 */
function generateColorVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  // Process QUANTUM_COLORS
  for (const [key, value] of Object.entries(QUANTUM_COLORS)) {
    const varName = `--color-${toKebabCase(key)}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'color',
      description: `Quantum color: ${key}`
    });
  }
  
  // Process DOMAIN_COLORS
  for (const [domain, colors] of Object.entries(DOMAIN_COLORS)) {
    if (typeof colors === 'object' && colors !== null) {
      for (const [shade, colorValue] of Object.entries(colors)) {
        const varName = `--color-${toKebabCase(domain)}-${toKebabCase(shade)}`;
        variables.push({
          name: varName,
          value: colorValue as string,
          category: 'color',
          description: `Domain color: ${domain}.${shade}`
        });
      }
    } else {
      const varName = `--color-${toKebabCase(domain)}`;
      variables.push({
        name: varName,
        value: colors as string,
        category: 'color',
        description: `Domain color: ${domain}`
      });
    }
  }
  
  // Process COUNCIL_COLORS
  for (const [entity, colorValue] of Object.entries(COUNCIL_COLORS)) {
    const varName = `--color-entity-${toKebabCase(entity)}`;
    variables.push({
      name: varName,
      value: colorValue as string,
      category: 'color',
      description: `Council entity color: ${entity}`
    });
  }
  
  // Process STATUS_COLORS
  for (const [status, colorValue] of Object.entries(STATUS_COLORS)) {
    const varName = `--color-status-${toKebabCase(status)}`;
    variables.push({
      name: varName,
      value: colorValue as string,
      category: 'color',
      description: `Status color: ${status}`
    });
  }
  
  // Process MOOD_COLORS
  for (const [mood, colorValue] of Object.entries(MOOD_COLORS)) {
    const varName = `--color-mood-${toKebabCase(mood)}`;
    variables.push({
      name: varName,
      value: colorValue as string,
      category: 'color',
      description: `Mood color: ${mood}`
    });
  }
  
  // Process ENERGY_COLORS
  for (const [energy, colorValue] of Object.entries(ENERGY_COLORS)) {
    const varName = `--color-energy-${toKebabCase(energy)}`;
    variables.push({
      name: varName,
      value: colorValue as string,
      category: 'color',
      description: `Energy color: ${energy}`
    });
  }
  
  // Process PRIDE_COLORS
  for (const [pride, colorValue] of Object.entries(PRIDE_COLORS)) {
    const varName = `--color-pride-${toKebabCase(pride)}`;
    variables.push({
      name: varName,
      value: colorValue as string,
      category: 'color',
      description: `Pride color: ${pride}`
    });
  }
  
  return variables;
}

/**
 * Generate spacing variables from SPACING_SCALE
 */
function generateSpacingVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(SPACING_SCALE)) {
    // Convert decimal keys to valid CSS variable names
    // 0.5 -> 0_5, 1.5 -> 1_5, 2.5 -> 2_5, etc.
    let sanitizedKey = key;
    if (key.includes('.')) {
      sanitizedKey = key.replace('.', '_');
    }
    
    const varName = `--spacing-${sanitizedKey}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'spacing',
      description: `Spacing scale: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate radius variables from BORDER_RADII
 */
function generateRadiusVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(BORDER_RADII)) {
    const varName = `--radius-${key}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'radius',
      description: `Border radius: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate typography variables from FONT_SIZES and LINE_HEIGHTS
 */
function generateTypographyVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  // Font sizes
  for (const [key, value] of Object.entries(FONT_SIZES)) {
    const varName = `--font-size-${key}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'typography',
      description: `Font size: ${key}`
    });
  }
  
  // Line heights
  for (const [key, value] of Object.entries(LINE_HEIGHTS)) {
    const varName = `--line-height-${key}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'typography',
      description: `Line height: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate breakpoint variables from BREAKPOINTS
 */
function generateBreakpointVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(BREAKPOINTS)) {
    const varName = `--breakpoint-${key}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'breakpoint',
      description: `Breakpoint: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate glow variables from GLOW_EFFECTS
 */
function generateGlowVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(GLOW_EFFECTS)) {
    const varName = `--glow-${toKebabCase(key)}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'glow',
      description: `Glow effect: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate shadow variables from SHADOWS
 */
function generateShadowVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(SHADOWS)) {
    const varName = `--shadow-${toKebabCase(key)}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'shadow',
      description: `Shadow effect: ${key}`
    });
  }
  
  return variables;
}

/**
 * Generate gradient variables from GRADIENTS
 */
function generateGradientVariables(): CssVariable[] {
  const variables: CssVariable[] = [];
  
  for (const [key, value] of Object.entries(GRADIENTS)) {
    const varName = `--gradient-${toKebabCase(key)}`;
    variables.push({
      name: varName,
      value: value as string,
      category: 'gradient',
      description: `Gradient: ${key}`
    });
  }
  
  return variables;
}

/**
 * Format variables as CSS :root block with organized sections
 */
function formatVariablesAsCss(variables: CssVariable[]): string {
  // Group variables by category
  const grouped: Record<string, CssVariable[]> = {
    color: [],
    spacing: [],
    radius: [],
    typography: [],
    breakpoint: [],
    glow: [],
    shadow: [],
    gradient: []
  };
  
  for (const variable of variables) {
    if (grouped[variable.category]) {
      grouped[variable.category].push(variable);
    }
  }
  
  let css = `:root {\n`;
  
  // Color variables section
  if (grouped.color.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* COLORS - Quantum Color System */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.color) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Spacing variables section
  if (grouped.spacing.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* SPACING - Derived from BASE_UNIT (4px grid) */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.spacing) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Radius variables section
  if (grouped.radius.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* BORDER RADIUS - Cosmic curvature */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.radius) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Typography variables section
  if (grouped.typography.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* TYPOGRAPHY - Font sizes, line heights */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.typography) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Breakpoint variables section
  if (grouped.breakpoint.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* BREAKPOINTS - Responsive design thresholds */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.breakpoint) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Glow variables section
  if (grouped.glow.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* GLOW EFFECTS - Quantum resonance */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.glow) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Shadow variables section
  if (grouped.shadow.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* SHADOW EFFECTS - Depth and elevation */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.shadow) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  // Gradient variables section
  if (grouped.gradient.length > 0) {
    css += `\n  /* ========================================================================== */\n`;
    css += `  /* GRADIENTS - Quantum flows */\n`;
    css += `  /* ========================================================================== */\n`;
    for (const variable of grouped.gradient) {
      css += `  ${variable.name}: ${variable.value};\n`;
    }
  }
  
  css += `\n}\n`;
  
  return css;
}

// ============================================================================
// HELPER FUNCTION FOR FILE WRITING
// ============================================================================

/**
 * Write generated CSS to file (used by cosmic.ts orchestrator)
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
 * Generate CSS variables file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateCssVariables(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = '../styles/generated/variables.css';
  
  if (verbose) {
    logInfo('Generating CSS variables from cosmic constants...');
  }
  
  try {
    // Generate all variable categories
    const colorVars = generateColorVariables();
    const spacingVars = generateSpacingVariables();
    const radiusVars = generateRadiusVariables();
    const typographyVars = generateTypographyVariables();
    const breakpointVars = generateBreakpointVariables();
    const glowVars = generateGlowVariables();
    const shadowVars = generateShadowVariables();
    const gradientVars = generateGradientVariables();
    
    // Combine all variables
    const allVariables = [
      ...colorVars,
      ...spacingVars,
      ...radiusVars,
      ...typographyVars,
      ...breakpointVars,
      ...glowVars,
      ...shadowVars,
      ...gradientVars
    ];
    
    if (verbose) {
      logDebug(`Generated ${allVariables.length} CSS variables`);
      logDebug(`  Colors: ${colorVars.length}`);
      logDebug(`  Spacing: ${spacingVars.length}`);
      logDebug(`  Radius: ${radiusVars.length}`);
      logDebug(`  Typography: ${typographyVars.length}`);
      logDebug(`  Breakpoints: ${breakpointVars.length}`);
      logDebug(`  Glows: ${glowVars.length}`);
      logDebug(`  Shadows: ${shadowVars.length}`);
      logDebug(`  Gradients: ${gradientVars.length}`);
    }
    
    // Format as CSS
    const cssContent = formatVariablesAsCss(allVariables);
    
    // Write to file (handles dry-run internally)
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`CSS variables generated: ${outputPath}`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate CSS variables: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { CssVariable as CssVariableType };