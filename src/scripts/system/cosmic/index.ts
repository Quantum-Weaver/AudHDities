// ============================================================================
                                              /* @/scripts/system/cosmic.ts */
// COSMIC GENERATOR - MAIN ORCHESTRATOR
// ============================================================================
// Purpose: Run all generation modules in sequence
// Dependencies: All 8 generation modules in ./cosmic//
// Output: Generated CSS files + Tailwind config
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { 
  logSuccess, logError, logInfo, logWarning, 
  logSeparator, logHeader, logDebug 
} from '../../shared/logger';

import { generateCssVariables } from './generate_css_variables';
import { generateTailwindConfig } from './generate_tailwind_config';
import { generateDomainStyles } from './generate_domain_styles';
import { generateTextEffects } from './generate_text_effects';
import { generateAnimationVariants } from './generate_animation_variants';
import { generateTypographyClasses } from './generate_typography_classes';
import { generateZoomTargets } from './generate_zoom_targets';
import { generateParallaxClasses } from './generate_parallax_classes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface CosmicGeneratorOptions {
  dryRun?: boolean;
  verbose?: boolean;
  outputStylesDir?: string;
  outputTailwindPath?: string;
}

const DEFAULT_OPTIONS: Required<CosmicGeneratorOptions> = {
  dryRun: false,
  verbose: true,
  outputStylesDir: 'src/styles/generated',
  outputTailwindPath: 'tailwind.generated.config.mjs'
};

// ============================================================================
// RESULT TRACKING
// ============================================================================

export interface GenerationResult {
  moduleName: string;
  success: boolean;
  outputPath: string;
  error?: string;
  timestamp: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Ensure output directory exists
 */
function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    if (DEFAULT_OPTIONS.verbose) {
      logDebug(`Created directory: ${dirPath}`);
    }
  }
}

/**
 * Get current timestamp for file headers
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Generate header comment for generated files
 */
function generateFileHeader(moduleName: string, sourceFiles: string[]): string {
  const timestamp = getTimestamp();
  let header = `/* ============================================================================\n`;
  header += ` * GENERATED FILE - DO NOT EDIT DIRECTLY\n`;
  header += ` * Module: ${moduleName}\n`;
  header += ` * Generated: ${timestamp}\n`;
  header += ` * Source: ${sourceFiles.join(', ')}\n`;
  header += ` * ============================================================================ */\n\n`;
  return header;
}

/**
 * Write content to file with dry-run support
 */
function writeGeneratedFile(
  filePath: string,
  content: string,
  options: CosmicGeneratorOptions,
  moduleName: string,
  sourceFiles: string[]
): boolean {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  const fullContent = generateFileHeader(moduleName, sourceFiles) + content;
  
  if (options.dryRun) {
    if (options.verbose) {
      logInfo(`[DRY RUN] Would write to: ${fullPath}`);
      logDebug(`  Content length: ${fullContent.length} characters`);
    }
    return true;
  }
  
  try {
    ensureDirectory(path.dirname(fullPath));
    fs.writeFileSync(fullPath, fullContent, 'utf-8');
    if (options.verbose) {
      logSuccess(`Written: ${fullPath}`);
    }
    return true;
  } catch (error) {
    logError(`Failed to write ${fullPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

/**
 * Create a generation result object
 */
function createResult(
  moduleName: string,
  success: boolean,
  outputPath: string,
  error?: string
): GenerationResult {
  return {
    moduleName,
    success,
    outputPath,
    error,
    timestamp: getTimestamp()
  };
}

/**
 * Print summary report of all generation results
 */
function printSummary(results: GenerationResult[]): void {
  console.log('\n');
  logSeparator();
  logHeader('COSMIC GENERATOR SUMMARY');
  logSeparator();
  console.log('');
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  for (const result of results) {
    if (result.success) {
      logSuccess(`✅ ${result.moduleName}: ${result.outputPath}`);
    } else {
      logError(`❌ ${result.moduleName}: ${result.error || 'Unknown error'}`);
    }
  }
  
  console.log('');
  logSeparator();
  logInfo(`Total: ${results.length} modules`);
  logSuccess(`Successful: ${successCount}`);
  if (failCount > 0) {
    logError(`Failed: ${failCount}`);
  }
  logSeparator();
  console.log('');
}

// ============================================================================
// PLACEHOLDER GENERATION FUNCTIONS (to be replaced with real imports)
// ============================================================================

async function placeholderGenerate(
  moduleName: string,
  options: CosmicGeneratorOptions,
  outputPath: string
): Promise<{ success: boolean; outputPath: string; error?: string }> {
  if (options.verbose) {
    logWarning(`⚠️ ${moduleName} not yet implemented - placeholder`);
  }
  // In dry-run, return success so we can test the flow
  return { success: true, outputPath, error: undefined };
}

// ============================================================================
// MAIN ORCHESTRATOR FUNCTION
// ============================================================================

/**
 * Run all generation modules in sequence
 */
export async function runCosmicGenerator(options: CosmicGeneratorOptions = {}): Promise<GenerationResult[]> {
  // Merge options with defaults
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const results: GenerationResult[] = [];
  
  console.log('\n');
  logSeparator();
  logHeader('🌌 COSMIC GENERATOR');
  logSeparator();
  console.log('');
  
  if (opts.dryRun) {
    logWarning('DRY RUN MODE - No files will be written');
    console.log('');
  }
  
  logInfo(`Output directory: ${opts.outputStylesDir}`);
  logInfo(`Tailwind config: ${opts.outputTailwindPath}`);
  console.log('');

  // =====================================================
  // PHASE 1: CSS Variables
  // =====================================================
  
  logInfo('Phase 1/8: Generating CSS Variables...');
  const cssVarsOutputPath = path.join(opts.outputStylesDir, 'variables.css');
  const cssVarsSuccess = await generateCssVariables(opts);
  results.push(createResult(
    'CSS Variables', 
    cssVarsSuccess !== null, 
    cssVarsOutputPath, 
    cssVarsSuccess === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 2: Tailwind Config
  // =====================================================
  
  logInfo('Phase 2/8: Generating Tailwind Config...');
  const tailwindResult = await generateTailwindConfig(opts);
  results.push(createResult(
    'Tailwind Config', 
    tailwindResult !== null, 
    tailwindResult || opts.outputTailwindPath, 
    tailwindResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 3: Domain Styles
  // =====================================================
  
  logInfo('Phase 3/8: Generating Domain Styles...');
  const domainResult = await generateDomainStyles(opts);
  results.push(createResult(
    'Domain Styles', 
    domainResult !== null, 
    domainResult || path.join(opts.outputStylesDir, 'domains.css'), 
    domainResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 4: Text Effects
  // =====================================================
  
  logInfo('Phase 4/8: Generating Text Effects...');
  const textResult = await generateTextEffects(opts);
  results.push(createResult(
    'Text Effects', 
    textResult !== null, 
    textResult || path.join(opts.outputStylesDir, 'text-effects.css'), 
    textResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 5: Animation Variants
  // =====================================================
  
  logInfo('Phase 5/8: Generating Animation Variants...');
  const animationResult = await generateAnimationVariants(opts);
  results.push(createResult(
    'Animation Variants', 
    animationResult !== null, 
    animationResult || path.join(opts.outputStylesDir, 'animations.css'), 
    animationResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 6: Typography Classes
  // =====================================================
  
  logInfo('Phase 6/8: Generating Typography Classes...');
  const typographyResult = await generateTypographyClasses(opts);
  results.push(createResult(
    'Typography Classes', 
    typographyResult !== null, 
    typographyResult || path.join(opts.outputStylesDir, 'typography.css'), 
    typographyResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 7: Zoom Targets
  // =====================================================
  
  logInfo('Phase 7/8: Generating Zoom Targets...');
  const zoomResult = await generateZoomTargets(opts);
  results.push(createResult(
    'Zoom Targets', 
    zoomResult !== null, 
    zoomResult || path.join(opts.outputStylesDir, 'zoom.css'), 
    zoomResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // PHASE 8: Parallax Classes
  // =====================================================
  
  logInfo('Phase 8/8: Generating Parallax Classes...');
  const parallaxResult = await generateParallaxClasses(opts);
  results.push(createResult(
    'Parallax Classes', 
    parallaxResult !== null, 
    parallaxResult || path.join(opts.outputStylesDir, 'parallax.css'), 
    parallaxResult === null ? 'Generation failed' : undefined
  ));
  
  // =====================================================
  // SUMMARY
  // =====================================================
  
  printSummary(results);
  
  return results;
}

// ============================================================================
// MAIN EXECUTION (when run directly)
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const verbose = !args.includes('--quiet') && !args.includes('-q');
  
  runCosmicGenerator({ dryRun, verbose })
    .then((results) => {
      const hasErrors = results.some(r => !r.success);
      if (hasErrors) {
        process.exit(1);
      }
    })
    .catch((error) => {
      logError(`Cosmic generator failed: ${error.message}`);
      process.exit(1);
    });
}