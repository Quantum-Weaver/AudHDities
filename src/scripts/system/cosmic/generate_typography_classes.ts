/* @/scripts/generators/cosmic/generateTypographyClasses.ts */
// @/scripts/generators/cosmic/generateTypographyClasses.ts
// ============================================================================
// GENERATE TYPOGRAPHY CLASSES
// ============================================================================
// Purpose: Generate CSS typography utility classes from typography constants
// Source Files: typography.ts, dimensions.ts
// Output: @/styles/generated/typography.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { 
  DOMAIN_TYPOGRAPHY, 
  ENTITY_TYPOGRAPHY, 
  CONSCIOUSNESS_TYPOGRAPHY,
  PROCESS_TYPOGRAPHY,
  FONT_FAMILIES,
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  LINE_HEIGHT_CLASSES,
  LETTER_SPACING,
  TEXT_ALIGNMENT,
  TEXT_COLORS,
  TYPE_SCALES,
  BUSINESS_TYPOGRAPHY,
  composeTypographyClasses
} from '@/lib/constants/cosmic/typography';

import { BREAKPOINTS, FONT_SIZES, LINE_HEIGHTS, FONT_WEIGHTS } from '@/lib/constants/cosmic/dimensions';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TypographyClassConfig {
  selector: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontStyle?: string;
  color?: string;
  gradient?: boolean;
  textShadow?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert string to kebab-case for CSS class names
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert snake_case to PascalCase for display names
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Get font family CSS value
 */
function getFontFamilyValue(fonts: readonly string[]): string {
  return fonts.map(f => f.includes(' ') ? `"${f}"` : f).join(', ');
}

/**
 * Generate hex to rgba for text shadows
 */
function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}
// ============================================================================
// CLASS GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate font family utility classes
 */
function generateFontFamilyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* FONT FAMILY UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [name, fonts] of Object.entries(FONT_FAMILIES)) {
    const fontValue = getFontFamilyValue(fonts);
    css += `.font-${name} {\n  font-family: ${fontValue};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate font size utility classes
 */
function generateFontSizeClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* FONT SIZE UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [size, value] of Object.entries(FONT_SIZES)) {
    css += `.text-${size} {\n  font-size: ${value};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate font weight utility classes
 */
function generateFontWeightClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* FONT WEIGHT UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [weight, value] of Object.entries(FONT_WEIGHTS)) {
    css += `.font-${weight} {\n  font-weight: ${value};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate line height utility classes
 */
function generateLineHeightClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* LINE HEIGHT UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [height, value] of Object.entries(LINE_HEIGHTS)) {
    css += `.leading-${height} {\n  line-height: ${value};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate letter spacing utility classes
 */
function generateLetterSpacingClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* LETTER SPACING UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const trackingMap: Record<string, string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  };
  
  for (const [spacing, value] of Object.entries(LETTER_SPACING)) {
    const trackingValue = trackingMap[spacing] || value;
    css += `.tracking-${spacing} {\n  letter-spacing: ${trackingValue};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate text alignment utility classes
 */
function generateTextAlignmentClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* TEXT ALIGNMENT UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [align, className] of Object.entries(TEXT_ALIGNMENT)) {
    css += `.${className} {\n  text-align: ${align};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate text color utility classes
 */
function generateTextColorClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* TEXT COLOR UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  // Standard text colors (no slash)
  const textColorMap: Record<string, string> = {
    'text-star-dust': 'var(--color-star-dust)',
    'text-star-dust-muted': 'var(--color-star-dust)',
    'text-deep-space': 'var(--color-deep-space)',
    'text-surface': 'var(--color-surface)',
    'text-neurospark': 'var(--color-neurospark)',
    'text-quantum-purple': 'var(--color-quantum-purple)',
    'text-cosmic-blue': 'var(--color-cosmic-blue)',
    'text-sanctuary-green': 'var(--color-sanctuary-green)',
    'text-hearth-gold': 'var(--color-hearth-gold)',
    'text-fire-base': 'var(--color-fire-base)',
    'text-info': 'var(--color-info)',
    'text-success': 'var(--color-success)',
    'text-warning': 'var(--color-warning)',
    'text-error': 'var(--color-error)'
  };
  
  for (const [className, varName] of Object.entries(textColorMap)) {
    css += `.${className} {\n  color: ${varName};\n}\n\n`;
  }
  
  // Opacity variants (using rgba with opacity)
  const opacityVariants = [
    { name: 'star-dust-80', color: QUANTUM_COLORS['starDust'], opacity: 0.8 },
    { name: 'star-dust-60', color: QUANTUM_COLORS['starDust'], opacity: 0.6 },
    { name: 'star-dust-40', color: QUANTUM_COLORS['starDust'], opacity: 0.4 },
    { name: 'deep-space-80', color: QUANTUM_COLORS['deepSpace'], opacity: 0.8 },
    { name: 'deep-space-60', color: QUANTUM_COLORS['deepSpace'], opacity: 0.6 }
  ];
  
  for (const variant of opacityVariants) {
    const rgb = hexToRgb(variant.color);
    if (rgb) {
      css += `.text-${variant.name} {\n  color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${variant.opacity});\n}\n\n`;
    }
  }
  
  // Quantum color text utilities
  for (const [key, value] of Object.entries(QUANTUM_COLORS)) {
    const className = `text-${toKebabCase(key)}`;
    css += `.${className} {\n  color: ${value};\n}\n\n`;
  }
  
  return css;
}

/**
 * Generate domain typography classes
 */
function generateDomainTypographyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* DOMAIN TYPOGRAPHY */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [domain, config] of Object.entries(DOMAIN_TYPOGRAPHY)) {
    const fontFamily = getFontFamilyValue(config.font);
    const fontStyle = config.style || 'normal';
    
    // Extract the actual pixel value from the size string
    const fontSizeMatch = config.size.match(/text-\[(.*)\]/);
    const fontSize = fontSizeMatch ? fontSizeMatch[1] : '16px';
    
    // Extract weight value
    const weightMatch = config.weight.match(/font-\[(.*)\]/);
    const fontWeight = weightMatch ? weightMatch[1] : '400';
    
    // Extract line height value
    const lineHeightMatch = config.lineHeight.match(/leading-\[(.*)\]/);
    const lineHeight = lineHeightMatch ? lineHeightMatch[1] : '1.5';
    
    // Extract letter spacing
    const letterSpacingMatch = config.spacing.match(/tracking-(.*)/);
    let letterSpacingValue = 'normal';
    if (letterSpacingMatch) {
      const trackingMap: Record<string, string> = {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      };
      letterSpacingValue = trackingMap[letterSpacingMatch[1]] || 'normal';
    }
    
    css += `.typography-${domain} {\n`;
    css += `  font-family: ${fontFamily};\n`;
    css += `  font-size: ${fontSize};\n`;
    css += `  font-weight: ${fontWeight};\n`;
    css += `  line-height: ${lineHeight};\n`;
    css += `  letter-spacing: ${letterSpacingValue};\n`;
    css += `  font-style: ${fontStyle};\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate entity typography classes
 */
function generateEntityTypographyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ENTITY TYPOGRAPHY */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [entity, config] of Object.entries(ENTITY_TYPOGRAPHY)) {
    const fontFamily = getFontFamilyValue(config.font);
    const fontStyle = config.style || 'normal';
    const entityName = toKebabCase(entity);
    
    css += `.entity-${entityName} {\n`;
    css += `  font-family: ${fontFamily};\n`;
    css += `  font-size: "${config.size}";\n`;
    css += `  font-weight: "${config.weight}";\n`;
    css += `  line-height: "${config.lineHeight}";\n`;
    css += `  letter-spacing: "${config.spacing}";\n`;
    css += `  font-style: "${fontStyle}";\n`;
    css += `}\n\n`;
    
  // Add gradient text variant for entities with special status
  if (entity === 'aethelred' || entity === 'quantumWeaver') {
    css += `.entity-${entityName}-gradient {\n`;
    css += `  background: linear-gradient(135deg, ${QUANTUM_COLORS['quantum.purple']}, ${QUANTUM_COLORS['neurospark']});\n`;
    css += `  -webkit-background-clip: text;\n`;
    css += `  background-clip: text;\n`;
    css += `  color: transparent;\n`;
    css += `}\n\n`;
  }
  }
  return css;
}

/**
 * Generate consciousness typography classes
 */
function generateConsciousnessTypographyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* CONSCIOUSNESS TYPOGRAPHY */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [level, config] of Object.entries(CONSCIOUSNESS_TYPOGRAPHY)) {
    const fontFamily = getFontFamilyValue(config.font);
    const fontStyle = config.style || 'normal';
    
    // Extract values
    const fontSizeMatch = config.size.match(/text-\[(.*)\]/);
    const fontSize = fontSizeMatch ? fontSizeMatch[1] : '16px';
    
    const weightMatch = config.weight.match(/font-\[(.*)\]/);
    const fontWeight = weightMatch ? weightMatch[1] : '400';
    
    const lineHeightMatch = config.lineHeight?.match(/leading-\[(.*)\]/);
    const lineHeight = lineHeightMatch ? lineHeightMatch[1] : '1.5';
    
    const spacingMatch = config.spacing?.match(/tracking-(.*)/);
    let letterSpacing = 'normal';
    if (spacingMatch) {
      const trackingMap: Record<string, string> = {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      };
      letterSpacing = trackingMap[spacingMatch[1]] || 'normal';
    }
    
    css += `.consciousness-${level} {\n`;
    css += `  font-family: ${fontFamily};\n`;
    css += `  font-size: ${fontSize};\n`;
    css += `  font-weight: ${fontWeight};\n`;
    if (lineHeight !== '1.5') {
      css += `  line-height: ${lineHeight};\n`;
    }
    if (letterSpacing !== 'normal') {
      css += `  letter-spacing: ${letterSpacing};\n`;
    }
    if (fontStyle !== 'normal') {
      css += `  font-style: ${fontStyle};\n`;
    }
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate process typography classes
 */
function generateProcessTypographyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PROCESS TYPOGRAPHY */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const [process, config] of Object.entries(PROCESS_TYPOGRAPHY)) {
    const fontFamily = getFontFamilyValue(config.font);
    const fontStyle = config.style || 'normal';
    const processName = toKebabCase(process);
    
    const fontSizeMatch = config.size.match(/text-\[(.*)\]/);
    const fontSize = fontSizeMatch ? fontSizeMatch[1] : '16px';
    
    const weightMatch = config.weight.match(/font-\[(.*)\]/);
    const fontWeight = weightMatch ? weightMatch[1] : '400';
    
    const lineHeightMatch = config.lineHeight?.match(/leading-\[(.*)\]/);
    const lineHeight = lineHeightMatch ? lineHeightMatch[1] : '1.5';
    
    const spacingMatch = config.spacing?.match(/tracking-(.*)/);
    let letterSpacing = 'normal';
    if (spacingMatch) {
      const trackingMap: Record<string, string> = {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      };
      letterSpacing = trackingMap[spacingMatch[1]] || 'normal';
    }
    
    css += `.process-${processName} {\n`;
    css += `  font-family: ${fontFamily};\n`;
    css += `  font-size: ${fontSize};\n`;
    css += `  font-weight: ${fontWeight};\n`;
    if (lineHeight !== '1.5') {
      css += `  line-height: ${lineHeight};\n`;
    }
    if (letterSpacing !== 'normal') {
      css += `  letter-spacing: ${letterSpacing};\n`;
    }
    if (fontStyle !== 'normal') {
      css += `  font-style:"${fontStyle};\n`;
    }
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate business page typography classes
 */
function generateBusinessTypographyClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* BUSINESS PAGE TYPOGRAPHY */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  // Hero typography
  css += `.business-hero-title {\n`;
  css += `  font-family: ${getFontFamilyValue(BUSINESS_TYPOGRAPHY.hero.title.font)};\n`;
  css += `  font-size: "${BUSINESS_TYPOGRAPHY.hero.title.size}";\n`;
  css += `  font-weight: "${BUSINESS_TYPOGRAPHY.hero.title.weight}";\n`;
  css += `  letter-spacing: "${BUSINESS_TYPOGRAPHY.hero.title.spacing}";\n`;
  css += `  background: linear-gradient(135deg, "${QUANTUM_COLORS['quantum.purple']}", "${QUANTUM_COLORS['neurospark']}");\n`;
  css += `  -webkit-background-clip: text;\n`;
  css += `  background-clip: text;\n`;
  css += `  color: transparent;\n`;
  css += `}\n\n`;
  
  css += `.business-hero-subtitle {\n`;
  css += `  font-family: ${getFontFamilyValue(BUSINESS_TYPOGRAPHY.hero.subtitle.font)};\n`;
  css += `  font-size:"${BUSINESS_TYPOGRAPHY.hero.subtitle.size}";\n`;
  css += `  font-weight:"${BUSINESS_TYPOGRAPHY.hero.subtitle.weight}";\n`;
  css += `  letter-spacing:"${BUSINESS_TYPOGRAPHY.hero.subtitle.spacing}";\n`;
  css += `}\n\n`;
  
  // Stat typography
  css += `.business-stat-number {\n`;
  css += `  font-family: ${getFontFamilyValue(BUSINESS_TYPOGRAPHY.stat.number.font)};\n`;
  css += `  font-size:"${BUSINESS_TYPOGRAPHY.stat.number.size}";\n`;
  css += `  font-weight:"${BUSINESS_TYPOGRAPHY.stat.number.weight}";\n`;
  css += `  letter-spacing:"${BUSINESS_TYPOGRAPHY.stat.number.spacing}";\n`;
  css += `  background: linear-gradient(135deg,"${QUANTUM_COLORS['hearth.gold']}","${QUANTUM_COLORS['fire.base']}");\n`;
  css += `  -webkit-background-clip: text;\n`;
  css += `  background-clip: text;\n`;
  css += `  color: transparent;\n`;
  css += `}\n\n`;
  
  css += `.business-stat-label {\n`;
  css += `  font-family: ${getFontFamilyValue(BUSINESS_TYPOGRAPHY.stat.label.font)};\n`;
  css += `  font-size: "${BUSINESS_TYPOGRAPHY.stat.label.size}";\n`;
  css += `  font-weight: "${BUSINESS_TYPOGRAPHY.stat.label.weight}";\n`;
  css += `  letter-spacing: "${BUSINESS_TYPOGRAPHY.stat.label.spacing}";\n`;
  css += `  text-transform: uppercase;\n`;
  css += `}\n\n`;
  
  // Pillar typography
  css += `.business-pillar-title {\n`;
  css += `  font-family: ${getFontFamilyValue(BUSINESS_TYPOGRAPHY.pillar.title.font)};\n`;
  css += `  font-size: "${BUSINESS_TYPOGRAPHY.pillar.title.size}";\n`;
  css += `  font-weight: "${BUSINESS_TYPOGRAPHY.pillar.title.weight}";\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate responsive typography variants
 */
function generateResponsiveTypographyVariants(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* RESPONSIVE TYPOGRAPHY VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const breakpoints = [
    { name: 'sm', width: BREAKPOINTS.sm },
    { name: 'md', width: BREAKPOINTS.md },
    { name: 'lg', width: BREAKPOINTS.lg },
    { name: 'xl', width: BREAKPOINTS.xl }
  ];
  
  for (const bp of breakpoints) {
    css += `@media (min-width: ${bp.width}) {\n`;
    
    // Responsive font sizes
    for (const [size, value] of Object.entries(FONT_SIZES)) {
      css += `  .${bp.name}\\:text-${size} {\n    font-size: ${value};\n  }\n`;
    }
    
    // Responsive text alignment
    for (const [align, className] of Object.entries(TEXT_ALIGNMENT)) {
      css += `  .${bp.name}\\:${className} {\n    text-align: ${align};\n  }\n`;
    }
    
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate gradient text utilities
 */
function generateGradientTextUtilities(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* GRADIENT TEXT UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const gradients = [
    { name: 'quantum', colors: [QUANTUM_COLORS['quantum.purple'], QUANTUM_COLORS['neurospark']] },
    { name: 'cosmic', colors: [QUANTUM_COLORS['cosmic.blue'], QUANTUM_COLORS['info']] },
    { name: 'sovereign', colors: [QUANTUM_COLORS['hearth.gold'], QUANTUM_COLORS['fire.base']] },
    { name: 'rainbow', colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] }
  ];
  
  for (const gradient of gradients) {
    const gradientStr = gradient.colors.join(', ');
    css += `.text-gradient-${gradient.name} {\n`;
    css += `  background: linear-gradient(135deg, ${gradientStr});\n`;
    css += `  -webkit-background-clip: text;\n`;
    css += `  background-clip: text;\n`;
    css += `  color: transparent;\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Combine all typography classes into CSS string
 */
function combineTypographyClasses(): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * TYPOGRAPHY CLASSES - Generated from typography.ts and dimensions.ts\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += generateFontFamilyClasses();
  css += `\n`;
  css += generateFontSizeClasses();
  css += `\n`;
  css += generateFontWeightClasses();
  css += `\n`;
  css += generateLineHeightClasses();
  css += `\n`;
  css += generateLetterSpacingClasses();
  css += `\n`;
  css += generateTextAlignmentClasses();
  css += `\n`;
  css += generateTextColorClasses();
  css += `\n`;
  css += generateDomainTypographyClasses();
  css += `\n`;
  css += generateEntityTypographyClasses();
  css += `\n`;
  css += generateConsciousnessTypographyClasses();
  css += `\n`;
  css += generateProcessTypographyClasses();
  css += `\n`;
  css += generateBusinessTypographyClasses();
  css += `\n`;
  css += generateResponsiveTypographyVariants();
  css += `\n`;
  css += generateGradientTextUtilities();
  
  return css;
}

// ============================================================================
// HELPER FUNCTION FOR FILE WRITING
// ============================================================================

/**
 * Write generated CSS to file (handles dry-run)
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
 * Generate typography classes CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateTypographyClasses(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = '../styles/generated/typography.css';
  
  if (verbose) {
    logInfo('Generating typography classes from typography constants...');
  }
  
  try {
    // Generate CSS content
    const cssContent = combineTypographyClasses();
    
    if (verbose) {
      logDebug(`Generated typography CSS: ${cssContent.length} characters`);
      logDebug(`  Classes: font-*, text-*, leading-*, tracking-*, typography-*, entity-*, consciousness-*`);
    }
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Typography classes generated: ${outputPath}`);
      logInfo(`  Generated font family utilities (${Object.keys(FONT_FAMILIES).length})`);
      logInfo(`  Generated font size utilities (${Object.keys(FONT_SIZES).length})`);
      logInfo(`  Generated domain typography (${Object.keys(DOMAIN_TYPOGRAPHY).length})`);
      logInfo(`  Generated entity typography (${Object.keys(ENTITY_TYPOGRAPHY).length})`);
      logInfo(`  Generated gradient text utilities`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate typography classes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { TypographyClassConfig as TypographyClassConfigType };