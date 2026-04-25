// scripts/audit/component-files.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    COMPONENT FILE AUDITOR                                 ║
// ║                    Lists all constants, types, utils, and variants        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Configuration ─────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '../../../');

const COMPONENT_DIRS = {
  constants: path.join(PROJECT_ROOT, 'src/lib/constants/components'),
  types: path.join(PROJECT_ROOT, 'src/types/components'),
  utils: path.join(PROJECT_ROOT, 'src/utils/components'),
  components: path.join(PROJECT_ROOT, 'src/components'),
} as const;

const COMPONENT_CATEGORIES = ['ui', 'layout', 'shared', 'immersive', 'auth'] as const;
type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

// ─── Components to audit (underscore notation) ─────────────────────────────

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
  'searchbar',
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
 * Convert underscore_component_name to PascalCase filename.
 * Handles multi-word names correctly.
 */
function toPascalCase(underscoreName: string): string {
  return underscoreName
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Try multiple possible filenames for a component.
 * PascalCase is primary, but also checks for common aliases.
 */
function findComponentFile(
  categoryDir: string,
  underscoreName: string
): FileEntry | null {
  const pascalName = toPascalCase(underscoreName);

  // Primary: PascalCase
  const primary = checkFile(categoryDir, `${pascalName}.tsx`);
  if (primary) return primary;

  // Fallback: underscore notation (some components might use this)
  const fallback = checkFile(categoryDir, `${underscoreName}.tsx`);
  if (fallback) return fallback;

  // Fallback: index file in folder
  const indexFile = checkFile(
    path.join(categoryDir, pascalName),
    'index.tsx'
  );
  if (indexFile) return indexFile;

  return null;
}

/**
 * Find which category folder contains a component's files.
 * Searches constants, types, and utils directories.
 */
function findComponentCategory(
  underscoreName: string
): ComponentCategory | 'unknown' {
  // Check constants directory
  for (const category of COMPONENT_CATEGORIES) {
    const dir = path.join(COMPONENT_DIRS.constants, category);
    if (
      fs.existsSync(path.join(dir, `${underscoreName}.constants.ts`)) ||
      fs.existsSync(path.join(dir, `${underscoreName}.variants.ts`))
    ) {
      return category;
    }
  }

  // Check types directory
  for (const category of COMPONENT_CATEGORIES) {
    const dir = path.join(COMPONENT_DIRS.types, category);
    if (fs.existsSync(path.join(dir, `${underscoreName}.types.ts`))) {
      return category;
    }
  }

  // Check utils directory
  for (const category of COMPONENT_CATEGORIES) {
    const dir = path.join(COMPONENT_DIRS.utils, category);
    if (fs.existsSync(path.join(dir, `${underscoreName}.utils.ts`))) {
      return category;
    }
  }

  return 'unknown';
}

/**
 * Check all categories for a file pattern.
 * Returns the entry from the first category that has it.
 */
function findInCategories(
  baseDir: string,
  filename: string
): FileEntry | null {
  for (const category of COMPONENT_CATEGORIES) {
    const entry = checkFile(path.join(baseDir, category), filename);
    if (entry) return entry;
  }
  return null;
}

// ─── Scanner ───────────────────────────────────────────────────────────────

/**
 * Scan for all supporting files of a single component.
 */
function scanComponent(underscoreName: string): ComponentReport {
  const category = findComponentCategory(underscoreName);

  // Check constants and variants (categorized)
  let constantsEntry: FileEntry | null = null;
  let variantsEntry: FileEntry | null = null;

  if (category !== 'unknown') {
    const constantsDir = path.join(COMPONENT_DIRS.constants, category);
    constantsEntry = checkFile(
      constantsDir,
      FILE_PATTERNS.constants(underscoreName)
    );
    variantsEntry = checkFile(
      constantsDir,
      FILE_PATTERNS.variants(underscoreName)
    );
  }

  // Check types (categorized)
  let typesEntry: FileEntry | null = null;
  if (category !== 'unknown') {
    const typesDir = path.join(COMPONENT_DIRS.types, category);
    typesEntry = checkFile(typesDir, FILE_PATTERNS.types(underscoreName));
  }

  // Check utils (categorized — parallel to types)
  let utilsEntry: FileEntry | null = null;
  if (category !== 'unknown') {
    const utilsDir = path.join(COMPONENT_DIRS.utils, category);
    utilsEntry = checkFile(utilsDir, FILE_PATTERNS.utils(underscoreName));
  }

  // Check component file
  let componentEntry: FileEntry | null = null;
  if (category !== 'unknown') {
    const componentDir = path.join(PROJECT_ROOT, 'src/components', category);
    componentEntry = findComponentFile(componentDir, underscoreName);
  }

  return {
    component: underscoreName,
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
  if (bytes < 1024) return `${bytes}B`.padStart(5);
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
  console.log(
    '\n╔══════════════════════════════════════════════════════════════════════════════════════════════╗'
  );
  console.log(
    '║                         COMPONENT FILE AUDIT REPORT                                          ║'
  );
  console.log(
    '╚══════════════════════════════════════════════════════════════════════════════════════════════╝\n'
  );

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

  console.log(
    '┌──────────────────────────────────────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│                                         SUMMARY                                               │'
  );
  console.log(
    '├──────────────────────────────────────────────────────────────────────────────────────────────┤'
  );
  console.log(
    `│  Components audited:        ${String(reports.length).padStart(3)}                                                    │`
  );
  console.log(
    `│  With constants files:      ${String(totalConsts).padStart(3)}  ✅                                                  │`
  );
  console.log(
    `│  With variants files:       ${String(totalVars).padStart(3)}  ✅                                                  │`
  );
  console.log(
    `│  With types files:          ${String(totalTypes).padStart(3)}  ✅                                                  │`
  );
  console.log(
    `│  With utils files:          ${String(totalUtils).padStart(3)}  ✅                                                  │`
  );
  console.log(
    `│  With component files:      ${String(totalComponents).padStart(3)}  ✅                                                  │`
  );
  console.log(
    '└──────────────────────────────────────────────────────────────────────────────────────────────┘\n'
  );

  // Detailed table
  console.log(
    '┌────────────────────┬──────────┬───────────┬──────────┬──────────┬──────────┬───────────┐'
  );
  console.log(
    '│ Component          │ Category │ Constants │ Variants │ Types    │ Utils    │ Component │'
  );
  console.log(
    '├────────────────────┼──────────┼───────────┼──────────┼──────────┼──────────┼───────────┤'
  );

  for (const report of reports) {
    const name = report.component.padEnd(18);
    const cat = report.category.padEnd(8);
    const c = `${statusEmoji(report.constants)} ${formatSize(report.constants?.size)}`.padEnd(10);
    const v = `${statusEmoji(report.variants)} ${formatSize(report.variants?.size)}`.padEnd(9);
    const t = `${statusEmoji(report.types)} ${formatSize(report.types?.size)}`.padEnd(9);
    const u = `${statusEmoji(report.utils)} ${formatSize(report.utils?.size)}`.padEnd(9);
    const comp = `${statusEmoji(report.componentFile)} ${formatSize(report.componentFile?.size)}`.padEnd(10);

    console.log(
      `│ ${name} │ ${cat} │ ${c}│ ${v}│ ${t}│ ${u}│ ${comp}│`
    );
  }

  console.log(
    '└────────────────────┴──────────┴───────────┴──────────┴──────────┴──────────┴───────────┘\n'
  );

  // Missing files summary
  const missingConsts = reports.filter((r) => !r.constants);
  const missingVars = reports.filter((r) => !r.variants);
  const missingTypes = reports.filter((r) => !r.types);
  const missingUtils = reports.filter((r) => !r.utils);
  const missingComponents = reports.filter((r) => !r.componentFile);

  if (missingConsts.length > 0) {
    console.log(
      `❌ Missing constants (${missingConsts.length}): ${missingConsts.map((r) => r.component).join(', ')}`
    );
  }
  if (missingVars.length > 0) {
    console.log(
      `❌ Missing variants  (${missingVars.length}): ${missingVars.map((r) => r.component).join(', ')}`
    );
  }
  if (missingTypes.length > 0) {
    console.log(
      `❌ Missing types     (${missingTypes.length}): ${missingTypes.map((r) => r.component).join(', ')}`
    );
  }
  if (missingUtils.length > 0) {
    console.log(
      `❌ Missing utils     (${missingUtils.length}): ${missingUtils.map((r) => r.component).join(', ')}`
    );
  }
  if (missingComponents.length > 0) {
    console.log(
      `❌ Missing component (${missingComponents.length}): ${missingComponents.map((r) => r.component).join(', ')}`
    );
  }

  // Components with all supporting files but no component file
  const orphanedSupport = reports.filter(
    (r) =>
      (r.constants || r.variants || r.types || r.utils) && !r.componentFile
  );
  if (orphanedSupport.length > 0) {
    console.log(
      `\n⚠️  Support files exist but NO component: ${orphanedSupport.map((r) => r.component).join(', ')}`
    );
  }

  // Components with a component file but no supporting files
  const noSupport = reports.filter(
    (r) =>
      r.componentFile &&
      !r.constants &&
      !r.variants &&
      !r.types &&
      !r.utils
  );
  if (noSupport.length > 0) {
    console.log(
      `⚠️  Component exists but NO supporting files: ${noSupport.map((r) => r.component).join(', ')}`
    );
  }

  console.log('');
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