/* @/scripts/generators/cosmic/generateDomainStyles.ts */
// ============================================================================
// GENERATE DOMAIN STYLES
// ============================================================================
// Purpose: Generate CSS classes for each domain (quantum, cosmic, pantheon, etc.)
// Source Files: colors.ts (DOMAIN_COLORS)
// Output: src/styles/generated/domains.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { DOMAIN_COLORS, QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { GRADIENTS } from '@/lib/constants/cosmic/effects';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DomainStyle {
  name: string;
  baseColor: string;
  darkColor: string;
  lightColor: string;
  statusColor: string;
  gradient?: string;
}

export interface DomainGradient {
  name: string;
  gradient: string;
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
 * Generate RGB values from hex color (for rgba variants)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// ============================================================================
// STYLE GENERATION FUNCTIONS
// ============================================================================

/**
 * Extract domain styles from DOMAIN_COLORS
 */
function extractDomainStyles(): DomainStyle[] {
  const domains: DomainStyle[] = [];
  
  for (const [name, colors] of Object.entries(DOMAIN_COLORS)) {
    if (typeof colors === 'object' && colors !== null) {
      domains.push({
        name: toKebabCase(name),
        baseColor: (colors as any).base || (colors as any).primary || '#6C5CE7',
        darkColor: (colors as any).dark || (colors as any).base || '#5B4CCE',
        lightColor: (colors as any).light || (colors as any).secondary || '#7D6CEA',
        statusColor: (colors as any).statusColor || (colors as any).base || '#6C5CE7'
      });
    } else {
      // Handle simple color strings
      domains.push({
        name: toKebabCase(name),
        baseColor: colors as string,
        darkColor: colors as string,
        lightColor: colors as string,
        statusColor: colors as string
      });
    }
  }
  
  return domains;
}

/**
 * Extract domain gradients from GRADIENTS
 */
function extractDomainGradients(): DomainGradient[] {
  const gradients: DomainGradient[] = [];
  
  // Look for gradient patterns that match domain names
  const domainGradientPatterns = [
    'quantumDomain', 'cosmicDomain', 'pantheonDomain', 'bifrostDomain',
    'libraryDomain', 'voidDomain', 'councilDomain', 'sandboxDomain',
    'musicDomain', 'communityDomain', 'supportDomain', 'architectureDomain'
  ];
  
  for (const pattern of domainGradientPatterns) {
    const gradientName = toKebabCase(pattern.replace('Domain', ''));
    const gradientValue = (GRADIENTS as any)[pattern];
    if (gradientValue) {
      gradients.push({
        name: gradientName,
        gradient: gradientValue
      });
    }
  }
  
  return gradients;
}

/**
 * Generate domain background class CSS
 */
function generateDomainBackgroundClass(domain: DomainStyle): string {
  return `.domain-${domain.name} {
  background-color: ${domain.baseColor};
  border-color: ${domain.lightColor};
  transition: all 0.3s ease;
}

.domain-${domain.name}:hover {
  background-color: ${domain.darkColor};
  border-color: ${domain.baseColor};
  box-shadow: 0 0 20px ${domain.baseColor}40;
}
`;
}

/**
 * Generate domain text class CSS
 */
function generateDomainTextClass(domain: DomainStyle): string {
  const rgb = hexToRgb(domain.baseColor);
  const glowColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)` : domain.baseColor;
  
  return `.domain-${domain.name}-text {
  color: ${domain.baseColor};
  transition: all 0.3s ease;
}

.domain-${domain.name}-text:hover {
  color: ${domain.lightColor};
  text-shadow: 0 0 10px ${glowColor};
}
`;
}

/**
 * Generate domain glow class CSS
 */
function generateDomainGlowClass(domain: DomainStyle): string {
  const rgb = hexToRgb(domain.baseColor);
  const glowColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : domain.baseColor;
  
  return `.domain-${domain.name}-glow {
  box-shadow: 0 0 20px ${glowColor}, 0 0 40px ${glowColor}80;
  transition: all 0.3s ease;
}

.domain-${domain.name}-glow:hover {
  box-shadow: 0 0 30px ${glowColor}, 0 0 60px ${glowColor}80;
}
`;
}

/**
 * Generate domain gradient class CSS
 */
function generateDomainGradientClass(gradient: DomainGradient): string {
  return `.domain-${gradient.name}-gradient {
  background: ${gradient.gradient};
  background-size: 200% 200%;
  transition: all 0.5s ease;
}

.domain-${gradient.name}-gradient:hover {
  background-position: 100% 100%;
}
`;
}

/**
 * Generate domain card class CSS (combined styles for cards)
 */
function generateDomainCardClass(domain: DomainStyle): string {
  const rgb = hexToRgb(domain.baseColor);
  const glowColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : domain.baseColor;
  
  return `.domain-${domain.name}-card {
  background: linear-gradient(135deg, ${domain.darkColor}20, ${domain.baseColor}10);
  border: 1px solid ${domain.lightColor}40;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.domain-${domain.name}-card:hover {
  border-color: ${domain.baseColor};
  box-shadow: 0 8px 32px ${glowColor};
  transform: translateY(-4px);
}
`;
}

/**
 * Generate domain badge class CSS
 */
function generateDomainBadgeClass(domain: DomainStyle): string {
  return `.domain-${domain.name}-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${domain.darkColor}20;
  color: ${domain.lightColor};
  border: 1px solid ${domain.baseColor}40;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.domain-${domain.name}-badge:hover {
  background: ${domain.baseColor}20;
  border-color: ${domain.baseColor};
}
`;
}

/**
 * Generate domain button class CSS
 */
function generateDomainButtonClass(domain: DomainStyle): string {
  return `.domain-${domain.name}-btn {
  background: linear-gradient(135deg, ${domain.baseColor}, ${domain.darkColor});
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.domain-${domain.name}-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px ${domain.baseColor}60;
}

.domain-${domain.name}-btn:active {
  transform: translateY(0);
}
`;
}

/**
 * Generate responsive variants for domain classes
 */
function generateResponsiveVariants(domain: DomainStyle): string {
  return `@media (min-width: 640px) {
  .sm\\:domain-${domain.name}-card {
    background: linear-gradient(135deg, ${domain.darkColor}20, ${domain.baseColor}10);
    border-color: ${domain.lightColor}40;
  }
}

@media (min-width: 768px) {
  .md\\:domain-${domain.name}-card {
    background: linear-gradient(135deg, ${domain.darkColor}20, ${domain.baseColor}10);
    border-color: ${domain.lightColor}40;
  }
}

@media (min-width: 1024px) {
  .lg\\:domain-${domain.name}-card {
    background: linear-gradient(135deg, ${domain.darkColor}20, ${domain.baseColor}10);
    border-color: ${domain.lightColor}40;
  }
}
`;
}

/**
 * Generate reduced motion safe variants
 */
function generateReducedMotionVariants(): string {
  return `@media (prefers-reduced-motion: reduce) {
  .domain-*-card,
  .domain-*-btn,
  .domain-*-glow {
    transition: none;
  }
  
  .domain-*-card:hover {
    transform: none;
  }
  
  .domain-*-gradient {
    background-size: 100% 100%;
  }
  
  .domain-*-gradient:hover {
    background-position: 0% 0%;
  }
}
`;
}

/**
 * Combine all domain styles into CSS string
 */
function combineDomainStyles(domains: DomainStyle[], gradients: DomainGradient[]): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * DOMAIN STYLES - Generated from DOMAIN_COLORS\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN BACKGROUND & BORDER CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainBackgroundClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN TEXT CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainTextClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN GLOW CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainGlowClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN GRADIENT CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const gradient of gradients) {
    css += generateDomainGradientClass(gradient);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN CARD CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainCardClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN BADGE CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainBadgeClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* DOMAIN BUTTON CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateDomainButtonClass(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* RESPONSIVE VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const domain of domains) {
    css += generateResponsiveVariants(domain);
    css += `\n`;
  }
  
  css += `/* ========================================================================== */\n`;
  css += `/* REDUCED MOTION VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += generateReducedMotionVariants();
  
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
 * Generate domain styles CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateDomainStyles(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = 'src/styles/generated/domains.css';
  
  if (verbose) {
    logInfo('Generating domain styles from DOMAIN_COLORS...');
  }
  
  try {
    // Extract domain styles and gradients
    const domains = extractDomainStyles();
    const gradients = extractDomainGradients();
    
    if (verbose) {
      logDebug(`Found ${domains.length} domains`);
      logDebug(`Found ${gradients.length} domain gradients`);
      for (const domain of domains.slice(0, 5)) {
        logDebug(`  - ${domain.name}: ${domain.baseColor}`);
      }
      if (domains.length > 5) {
        logDebug(`  ... and ${domains.length - 5} more`);
      }
    }
    
    // Generate CSS content
    const cssContent = combineDomainStyles(domains, gradients);
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Domain styles generated: ${outputPath}`);
      logInfo(`  Generated ${domains.length} domain style sets`);
      logInfo(`  Generated ${gradients.length} domain gradients`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate domain styles: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { DomainStyle as DomainStyleType, DomainGradient as DomainGradientType };