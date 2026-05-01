// scripts/audit/component_files.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    COMPONENT FILE AUDITOR                                 ║
// ║                    Lists all constants, types, utils, and variants        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Configuration ─────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '../../../');

const COMPONENT_DIRS = {
  constants: path.join(PROJECT_ROOT, 'src/lib/constants/components/'),
  components: path.join(PROJECT_ROOT, 'src/components/'),
  types: path.join(PROJECT_ROOT, 'src/types/components/'),
  utils: path.join(PROJECT_ROOT, 'src/utils/components/'),
} as const;

const COMPONENT_CATEGORIES = ['ui', 'layout', 'shared', 'immersive'] as const;
type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

// ─── Components to audit ───────────────────────────────────────────────────

const COMPONENTS = [
  'accordion',
  'alert',
  'aspect_ratio',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'checkbox',
  'container',
  'dialog',
  'divider',
  'drawer',
  'empty_state',
  'error_boundary',
  'filter_bar',
  'flex',
  'footer',
  'form_field',
  'form_validation',
  'form',
  'grid',
  'header',
  'inline',
  'input',
  'kbd',
  'label',
  'modal',
  'navigation',
  'pagination',
  'progress',
  'radio',
  'scroll_area',
  'search_bar',
  'select',
  'sidebar',
  'skeleton',
  'slider',
  'spacer',
  'spinner',
  'sort_dropdown',
  'stack',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'tooltip',
] as const;

// ─── File patterns to look for ─────────────────────────────────────────────

const FILE_PATTERNS = {
  constants: (name: string) => `${name}.constants.ts`,
  variants: (name: string) => `${name}.variants.ts`,
  types: (name: string) => `${name}.types.ts`,
  utils: (name: string) => `${name}.utils.ts`,
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────

interface FileEntry {
  name: string;
  path: string;
  exists: boolean;
  size?: number;
}

interface ComponentReport {
  component: string;
  category: ComponentCategory | 'unknown';
  constants: FileEntry | null;
  variants: FileEntry | null;
  types: FileEntry | null;
  utils: FileEntry | null;
  componentFile: FileEntry | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Check if a file exists and return its info.
 */
function checkFile(baseDir: string, relativePath: string): FileEntry | null {
  const fullPath = path.join(baseDir, relativePath);

  try {
    const stat = fs.statSync(fullPath);
    return {
      name: path.basename(fullPath),
      path: fullPath,
      exists: true,
      size: stat.size,
    };
  } catch {
    return null;
  }
}

/**
 * Find which category folder contains a component's files.
 * Searches constants and types directories.
 */
function findComponentCategory(
  componentName: string
): ComponentCategory | 'unknown' {
  // Check constants directory
  for (const category of COMPONENT_CATEGORIES) {
    const dir = path.join(COMPONENT_DIRS.constants, category);
    if (
      fs.existsSync(path.join(dir, `${componentName}.constants.ts`)) ||
      fs.existsSync(path.join(dir, `${componentName}.variants.ts`))
    ) {
      return category;
    }
  }

  // Check types directory
  for (const category of COMPONENT_CATEGORIES) {
    const dir = path.join(COMPONENT_DIRS.types, category);
    if (fs.existsSync(path.join(dir, `${componentName}.types.ts`))) {
      return category;
    }
  }

  return 'unknown';
}

/**
 * Normalize component name for file lookup (kebab-case).
 */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// ─── Scanner ───────────────────────────────────────────────────────────────

/**
 * Scan for all supporting files of a single component.
 */
function scanComponent(componentName: string): ComponentReport {
  const normalized = normalizeName(componentName);
  const category = findComponentCategory(normalized);

  // Determine the category path for lookups
  const constantsCategoryDir =
    category !== 'unknown'
      ? path.join(COMPONENT_DIRS.constants, category)
      : null;

  const typesCategoryDir =
    category !== 'unknown'
      ? path.join(COMPONENT_DIRS.types, category)
      : null;

  // Check constants
  let constantsEntry: FileEntry | null = null;
  let variantsEntry: FileEntry | null = null;

  if (constantsCategoryDir) {
    constantsEntry = checkFile(
      constantsCategoryDir,
      FILE_PATTERNS.constants(normalized)
    );
    variantsEntry = checkFile(
      constantsCategoryDir,
      FILE_PATTERNS.variants(normalized)
    );
  }

  // Check types
  let typesEntry: FileEntry | null = null;
  if (typesCategoryDir) {
    typesEntry = checkFile(
      typesCategoryDir,
      FILE_PATTERNS.types(normalized)
    );
  }

  // Check utils (flat directory, not categorized)
  const utilsEntry = checkFile(
    COMPONENT_DIRS.utils,
    FILE_PATTERNS.utils(normalized)
  );

  // Check component file
  let componentEntry: FileEntry | null = null;
  if (category !== 'unknown') {
    const componentDir = path.join(
      PROJECT_ROOT,
      'src/components',
      category
    );
    const pascalName = normalized
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    // Try both kebab-case and PascalCase filenames
    componentEntry =
      checkFile(componentDir, `${normalized}.tsx`) ||
      checkFile(componentDir, `${pascalName}.tsx`);
  }

  return {
    component: normalized,
    category,
    constants: constantsEntry,
    variants: variantsEntry,
    types: typesEntry,
    utils: utilsEntry,
    componentFile: componentEntry,
  };
}

// ─── Report Generation ─────────────────────────────────────────────────────

/**
 * Format file size to human-readable string.
 */
function formatSize(bytes?: number): string {
  if (bytes === undefined) return '    -';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * Status emoji for a file entry.
 */
function statusEmoji(entry: FileEntry | null): string {
  if (!entry) return '❌';
  return '✅';
}

/**
 * Print a full report to the console.
 */
function printReport(reports: ComponentReport[]): void {
  console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                    COMPONENT FILE AUDIT REPORT                             ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

  // Summary counts
  let totalConsts = 0;
  let totalVars = 0;
  let totalTypes = 0;
  let totalUtils = 0;
  let totalComponents = 0;

  for (const report of reports) {
    if (report.constants) totalConsts++;
    if (report.variants) totalVars++;
    if (report.types) totalTypes++;
    if (report.utils) totalUtils++;
    if (report.componentFile) totalComponents++;
  }

  console.log('┌─────────────────────────────────────────────────────────────────────────────┐');
  console.log('│                              SUMMARY                                         │');
  console.log('├─────────────────────────────────────────────────────────────────────────────┤');
  console.log(`│  Components audited:        ${String(reports.length).padStart(3)}                                           │`);
  console.log(`│  With constants files:      ${String(totalConsts).padStart(3)}  ✅                                         │`);
  console.log(`│  With variants files:       ${String(totalVars).padStart(3)}  ✅                                         │`);
  console.log(`│  With types files:          ${String(totalTypes).padStart(3)}  ✅                                         │`);
  console.log(`│  With utils files:          ${String(totalUtils).padStart(3)}  ✅                                         │`);
  console.log(`│  With component files:      ${String(totalComponents).padStart(3)}  ✅                                         │`);
  console.log('└─────────────────────────────────────────────────────────────────────────────┘\n');

  // Detailed table
  console.log('┌──────────────────────┬──────────┬───────────┬──────────┬──────────┬──────────┬───────────┐');
  console.log('│ Component            │ Category │ Constants │ Variants │ Types    │ Utils    │ Component │');
  console.log('├──────────────────────┼──────────┼───────────┼──────────┼──────────┼──────────┼───────────┤');

  for (const report of reports) {
    const name = report.component.padEnd(20);
    const cat = report.category.padEnd(8);
    const c = `${statusEmoji(report.constants)} ${formatSize(report.constants?.size)}`.padEnd(9);
    const v = `${statusEmoji(report.variants)} ${formatSize(report.variants?.size)}`.padEnd(8);
    const t = `${statusEmoji(report.types)} ${formatSize(report.types?.size)}`.padEnd(8);
    const u = `${statusEmoji(report.utils)} ${formatSize(report.utils?.size)}`.padEnd(8);
    const comp = `${statusEmoji(report.componentFile)} ${formatSize(report.componentFile?.size)}`.padEnd(9);

    console.log(`│ ${name} │ ${cat} │ ${c} │ ${v} │ ${t} │ ${u} │ ${comp} │`);
  }

  console.log('└──────────────────────┴──────────┴───────────┴──────────┴──────────┴──────────┴───────────┘\n');

  // Missing files summary
  const missingConsts = reports.filter((r) => !r.constants);
  const missingVars = reports.filter((r) => !r.variants);
  const missingTypes = reports.filter((r) => !r.types);
  const missingUtils = reports.filter((r) => !r.utils);
  const missingComponents = reports.filter((r) => !r.componentFile);

  if (missingConsts.length > 0) {
    console.log(`❌ Missing constants (${missingConsts.length}): ${missingConsts.map((r) => r.component).join(', ')}`);
  }
  if (missingVars.length > 0) {
    console.log(`❌ Missing variants  (${missingVars.length}): ${missingVars.map((r) => r.component).join(', ')}`);
  }
  if (missingTypes.length > 0) {
    console.log(`❌ Missing types     (${missingTypes.length}): ${missingTypes.map((r) => r.component).join(', ')}`);
  }
  if (missingUtils.length > 0) {
    console.log(`❌ Missing utils     (${missingUtils.length}): ${missingUtils.map((r) => r.component).join(', ')}`);
  }
  if (missingComponents.length > 0) {
    console.log(`❌ Missing component (${missingComponents.length}): ${missingComponents.map((r) => r.component).join(', ')}`);
  }

  console.log('\n');
}

/**
 * Print a JSON report for piping to other tools.
 */
function printJsonReport(reports: ComponentReport[]): void {
  const output = reports.map((report) => ({
    component: report.component,
    category: report.category,
    files: {
      constants: report.constants?.path ?? null,
      variants: report.variants?.path ?? null,
      types: report.types?.path ?? null,
      utils: report.utils?.path ?? null,
      component: report.componentFile?.path ?? null,
    },
    complete:
      !!report.constants &&
      !!report.variants &&
      !!report.types &&
      !!report.componentFile,
  }));

  console.log(JSON.stringify(output, null, 2));
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);
  const useJson = args.includes('--json');

  // Verify directories exist
  for (const [name, dir] of Object.entries(COMPONENT_DIRS)) {
    if (!fs.existsSync(dir)) {
      console.error(`Error: ${name} directory not found: ${dir}`);
      process.exit(1);
    }
  }

  // Scan all components
  const reports: ComponentReport[] = COMPONENTS.map(scanComponent);

  // Sort by component name
  reports.sort((a, b) => a.component.localeCompare(b.component));

  // Output
  if (useJson) {
    printJsonReport(reports);
  } else {
    printReport(reports);
  }
}

main();