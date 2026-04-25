// scripts/audit/component-files.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    COMPONENT FILE AUDITOR                                 ║
// ║                    Discovers all components across the Nine Layers        ║
// ║                    Ignores archive/ folder                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Configuration ─────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '../../../');

const COMPONENT_DIRS = {
  constants: path.join(PROJECT_ROOT, 'src/lib/constants/components'),
  types: path.join(PROJECT_ROOT, 'src/types/components'),
  utils: path.join(PROJECT_ROOT, 'src/lib/utils/components'),
  components: path.join(PROJECT_ROOT, 'src/components'),
} as const;

/** Layers of the World Tree — in dependency order (lowest first) */
const LAYERS = [
  'yggdrasil',
  'hof',
  'vegvisir',
  'forging',
  'runes',
  'seidr',
  'bifrost',
] as const;

type Layer = (typeof LAYERS)[number];

/** Folders to skip during discovery */
const IGNORED_DIRS = ['archive', 'node_modules', '.git', '__tests__'];

/** Only .tsx files (not .ts — those are supporting files) */
const COMPONENT_EXTENSION = '.tsx';

/** Supporting file suffixes to detect */
const SUPPORTING_SUFFIXES = [
  '.constants.ts',
  '.variants.ts',
  '.types.ts',
  '.utils.ts',
] as const;

type SupportingSuffix = (typeof SUPPORTING_SUFFIXES)[number];

// ─── Types ─────────────────────────────────────────────────────────────────

interface FileEntry {
  name: string;
  path: string;
  exists: boolean;
  size?: number;
}

interface SupportingFiles {
  constants: FileEntry | null;
  variants: FileEntry | null;
  types: FileEntry | null;
  utils: FileEntry | null;
}

interface ComponentReport {
  component: string;
  layer: Layer;
  pascalName: string;
  supporting: SupportingFiles;
  componentFile: FileEntry | null;
  hasSubComponents: boolean;
  subComponentCount: number;
}

interface DiscoveryResult {
  layer: Layer;
  componentName: string;
  pascalName: string;
  basePath: string;
  isSubComponent: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Check if a file exists and return its info.
 */
function checkFile(baseDir: string, relativePath: string): FileEntry | null {
  const fullPath = path.join(baseDir, relativePath);

  try {
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) return null;
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
 * Convert underscore_component_name to PascalCase.
 */
function toPascalCase(underscoreName: string): string {
  return underscoreName
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Convert PascalCase back to underscore_name.
 */
function toUnderscore(pascalName: string): string {
  return pascalName
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * Extract component name from filename (without .tsx).
 */
function componentNameFromFile(filename: string): string {
  return filename.replace(/\.tsx$/, '');
}

// ─── Discovery ─────────────────────────────────────────────────────────────

/**
 * Discover all components in a single layer directory.
 * Returns both top-level .tsx files AND directories containing index.tsx.
 * Does NOT recurse into sub-component directories — those are separate.
 */
function discoverComponentsInLayer(
  componentsDir: string,
  layer: Layer
): DiscoveryResult[] {
  const layerDir = path.join(componentsDir, layer);

  if (!fs.existsSync(layerDir)) return [];

  const results: DiscoveryResult[] = [];
  const entries = fs.readdirSync(layerDir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip ignored directories
    if (entry.isDirectory() && IGNORED_DIRS.includes(entry.name)) {
      continue;
    }

    // Case 1: Top-level .tsx file → component
    if (entry.isFile() && entry.name.endsWith(COMPONENT_EXTENSION)) {
      const pascalName = componentNameFromFile(entry.name);
      results.push({
        layer,
        componentName: toUnderscore(pascalName),
        pascalName,
        basePath: '',
        isSubComponent: false,
      });
      continue;
    }

    // Case 2: Directory with index.tsx → component folder
    if (entry.isDirectory()) {
      const subDir = path.join(layerDir, entry.name);
      const indexFile = path.join(subDir, 'index.tsx');

      if (fs.existsSync(indexFile)) {
        // This directory IS a component
        results.push({
          layer,
          componentName: toUnderscore(entry.name),
          pascalName: entry.name,
          basePath: '',
          isSubComponent: false,
        });

        // Now check for sub-components inside this directory
        const subEntries = fs.readdirSync(subDir, { withFileTypes: true });
        for (const subEntry of subEntries) {
          // Sub-component .tsx files (not index.tsx — already handled)
          if (
            subEntry.isFile() &&
            subEntry.name.endsWith(COMPONENT_EXTENSION) &&
            subEntry.name !== 'index.tsx'
          ) {
            const subPascalName = componentNameFromFile(subEntry.name);
            results.push({
              layer,
              componentName: `${toUnderscore(entry.name)}/${toUnderscore(subPascalName)}`,
              pascalName: subPascalName,
              basePath: toUnderscore(entry.name),
              isSubComponent: true,
            });
          }

          // Sub-component directories (nested folders with their own index.tsx)
          if (subEntry.isDirectory() && !IGNORED_DIRS.includes(subEntry.name)) {
            const nestedDir = path.join(subDir, subEntry.name);
            const nestedIndex = path.join(nestedDir, 'index.tsx');
            if (fs.existsSync(nestedIndex)) {
              results.push({
                layer,
                componentName: `${toUnderscore(entry.name)}/${toUnderscore(subEntry.name)}`,
                pascalName: subEntry.name,
                basePath: toUnderscore(entry.name),
                isSubComponent: true,
              });
            }
          }
        }
      }
      // Directories without index.tsx are NOT components — skip them
    }
  }

  return results;
}

/**
 * Discover all components across all layers.
 */
function discoverAllComponents(): DiscoveryResult[] {
  const allResults: DiscoveryResult[] = [];

  for (const layer of LAYERS) {
    const discovered = discoverComponentsInLayer(
      COMPONENT_DIRS.components,
      layer
    );
    allResults.push(...discovered);
  }

  return allResults;
}

/**
 * Find which file pattern a filename matches.
 */
function categorizeSupportingFile(
  filename: string
): SupportingSuffix | null {
  for (const suffix of SUPPORTING_SUFFIXES) {
    if (filename.endsWith(suffix)) return suffix;
  }
  return null;
}

/**
 * Find supporting files for a component by scanning constants/types/utils dirs.
 */
function findSupportingFiles(
  layer: Layer,
  underscoreName: string
): SupportingFiles {
  const result: SupportingFiles = {
    constants: null,
    variants: null,
    types: null,
    utils: null,
  };

  // Constants & Variants
  const constantsDir = path.join(COMPONENT_DIRS.constants, layer);
  if (fs.existsSync(constantsDir)) {
    result.constants = checkFile(
      constantsDir,
      `${underscoreName}.constants.ts`
    );
    result.variants = checkFile(
      constantsDir,
      `${underscoreName}.variants.ts`
    );
  }

  // Types
  const typesDir = path.join(COMPONENT_DIRS.types, layer);
  if (fs.existsSync(typesDir)) {
    result.types = checkFile(typesDir, `${underscoreName}.types.ts`);
  }

  // Utils
  const utilsDir = path.join(COMPONENT_DIRS.utils, layer);
  if (fs.existsSync(utilsDir)) {
    result.utils = checkFile(utilsDir, `${underscoreName}.utils.ts`);
  }

  return result;
}

/**
 * Find the actual .tsx component file.
 */
function findComponentFile(
  layer: Layer,
  underscoreName: string,
  pascalName: string
): FileEntry | null {
  const componentDir = path.join(COMPONENT_DIRS.components, layer);

  // Primary: PascalCase.tsx
  const primary = checkFile(componentDir, `${pascalName}.tsx`);
  if (primary) return primary;

  // Fallback: underscore_name.tsx
  const fallback = checkFile(componentDir, `${underscoreName}.tsx`);
  if (fallback) return fallback;

  // Fallback: folder/index.tsx
  const indexFile = checkFile(
    path.join(componentDir, pascalName),
    'index.tsx'
  );
  if (indexFile) return indexFile;

  return null;
}

/**
 * Count sub-components for a given base component.
 */
function countSubComponents(
  allDiscovered: DiscoveryResult[],
  baseComponentPath: string
): number {
  // Sub-components have a basePath that starts with or equals the component path
  return allDiscovered.filter(
    (d) =>
      d.basePath === baseComponentPath ||
      d.basePath.startsWith(baseComponentPath + '/')
  ).length;
}

// ─── Scanner ───────────────────────────────────────────────────────────────

/**
 * Build a full report for a single discovered component.
 */
function scanDiscoveredComponent(
  discovered: DiscoveryResult,
  allDiscovered: DiscoveryResult[],
  baseComponents: Set<string>
): ComponentReport {
  const underscoreName = discovered.componentName
    .replace(/\//g, '_')
    .toLowerCase();

  // Only base components get supporting files checked at the top level.
  // Sub-components with their own directory (index.tsx) might have their own.
  const isTopLevel = !discovered.isSubComponent;

  let supporting: SupportingFiles;
  let componentFile: FileEntry | null;

  if (isTopLevel) {
    supporting = findSupportingFiles(discovered.layer, underscoreName);
    componentFile = findComponentFile(
      discovered.layer,
      underscoreName,
      discovered.pascalName
    );
  } else {
    // Sub-component — might have its own folder with index.tsx
    supporting = {
      constants: null,
      variants: null,
      types: null,
      utils: null,
    };
    componentFile = findComponentFile(
      discovered.layer,
      underscoreName,
      discovered.pascalName
    );
  }

  const subCount = countSubComponents(allDiscovered, discovered.componentName);

  return {
    component: discovered.componentName,
    layer: discovered.layer,
    pascalName: discovered.pascalName,
    supporting,
    componentFile,
    hasSubComponents: subCount > 1, // >1 because it counts itself
    subComponentCount: Math.max(0, subCount - 1), // exclude self
  };
}

// ─── Report Generation ─────────────────────────────────────────────────────

function formatSize(bytes?: number): string {
  if (bytes === undefined) return '    -';
  if (bytes < 1024) return `${bytes}B`.padStart(5);
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function statusEmoji(entry: FileEntry | null): string {
  if (!entry) return '❌';
  return '✅';
}

function printReport(reports: ComponentReport[]): void {
  console.log(
    '\n╔══════════════════════════════════════════════════════════════════════════════════════════════╗'
  );
  console.log(
    '║                    COMPONENT FILE AUDIT — THE NINE LAYERS                                    ║'
  );
  console.log(
    '╚══════════════════════════════════════════════════════════════════════════════════════════════╝\n'
  );

  // ─── Layer Summary ───────────────────────────────────────────────────────
  console.log(
    '┌──────────────────────────────────────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│                                 LAYER SUMMARY                                                  │'
  );
  console.log(
    '├────────────────┬──────────┬───────────┬──────────┬──────────┬──────────┬─────────────────────┤'
  );
  console.log(
    '│ Layer          │ Total    │ Constants │ Variants │ Types    │ Utils    │ Components          │'
  );
  console.log(
    '├────────────────┼──────────┼───────────┼──────────┼──────────┼──────────┼─────────────────────┤'
  );

  const byLayer = new Map<Layer, ComponentReport[]>();
  for (const report of reports) {
    if (!byLayer.has(report.layer)) byLayer.set(report.layer, []);
    byLayer.get(report.layer)!.push(report);
  }

  let grandTotalConsts = 0;
  let grandTotalVars = 0;
  let grandTotalTypes = 0;
  let grandTotalUtils = 0;
  let grandTotalComponents = 0;

  for (const layer of LAYERS) {
    const layerReports = byLayer.get(layer) || [];
    const total = layerReports.length;
    const consts = layerReports.filter((r) => r.supporting.constants).length;
    const vars = layerReports.filter((r) => r.supporting.variants).length;
    const types = layerReports.filter((r) => r.supporting.types).length;
    const utils = layerReports.filter((r) => r.supporting.utils).length;
    const comps = layerReports.filter((r) => r.componentFile).length;

    grandTotalConsts += consts;
    grandTotalVars += vars;
    grandTotalTypes += types;
    grandTotalUtils += utils;
    grandTotalComponents += comps;

    const layerName = layer.padEnd(14);
    console.log(
      `│ ${layerName} │ ${String(total).padStart(8)} │ ${String(consts).padStart(9)} │ ${String(vars).padStart(8)} │ ${String(types).padStart(8)} │ ${String(utils).padStart(8)} │ ${String(comps).padStart(19)} │`
    );
  }

  console.log(
    '├────────────────┼──────────┼───────────┼──────────┼──────────┼──────────┼─────────────────────┤'
  );
  console.log(
    `│ TOTAL          │ ${String(reports.length).padStart(8)} │ ${String(grandTotalConsts).padStart(9)} │ ${String(grandTotalVars).padStart(8)} │ ${String(grandTotalTypes).padStart(8)} │ ${String(grandTotalUtils).padStart(8)} │ ${String(grandTotalComponents).padStart(19)} │`
  );
  console.log(
    '└────────────────┴──────────┴───────────┴──────────┴──────────┴──────────┴─────────────────────┘\n'
  );

  // ─── Detailed by Layer ───────────────────────────────────────────────────
  for (const layer of LAYERS) {
    const layerReports = (byLayer.get(layer) || []).filter(
      (r) => !r.component.includes('/') // Only top-level in main table
    );

    if (layerReports.length === 0) continue;

    const layerIcons: Record<Layer, string> = {
      yggdrasil: '🌳',
      hof: '🏛️',
      vegvisir: '🧭',
      forging: '🗡️',
      runes: '📜',
      seidr: '🎭',
      bifrost: '🌈',
    };

    console.log(
      ` ${layerIcons[layer]} ${layer.toUpperCase()} (${layerReports.length} components)`
    );
    console.log(
      ' ┌──────────────────────────┬───────────┬──────────┬──────────┬──────────┬───────────┬──────────┐'
    );
    console.log(
      ' │ Component                │ Constants │ Variants │ Types    │ Utils    │ Component │ Sub-Comp │'
    );
    console.log(
      ' ├──────────────────────────┼───────────┼──────────┼──────────┼──────────┼───────────┼──────────┤'
    );

    for (const report of layerReports) {
      const name = report.component.substring(0, 24).padEnd(24);
      const c = `${statusEmoji(report.supporting.constants)} ${formatSize(report.supporting.constants?.size)}`.padEnd(10);
      const v = `${statusEmoji(report.supporting.variants)} ${formatSize(report.supporting.variants?.size)}`.padEnd(9);
      const t = `${statusEmoji(report.supporting.types)} ${formatSize(report.supporting.types?.size)}`.padEnd(9);
      const u = `${statusEmoji(report.supporting.utils)} ${formatSize(report.supporting.utils?.size)}`.padEnd(9);
      const comp = `${statusEmoji(report.componentFile)} ${formatSize(report.componentFile?.size)}`.padEnd(10);
      const sub = report.hasSubComponents
        ? `+${report.subComponentCount}`.padEnd(8)
        : '-'.padEnd(8);

      console.log(
        ` │ ${name} │ ${c}│ ${v}│ ${t}│ ${u}│ ${comp}│ ${sub} │`
      );
    }

    console.log(
      ' └──────────────────────────┴───────────┴──────────┴──────────┴──────────┴───────────┴──────────┘\n'
    );
  }

  // ─── Sub-Components ──────────────────────────────────────────────────────
  const subComponents = reports.filter((r) => r.component.includes('/'));
  if (subComponents.length > 0) {
    console.log(
      ` 📦 SUB-COMPONENTS (${subComponents.length} total)\n`
    );
    for (const sub of subComponents) {
      const comp = sub.componentFile
        ? `✅ ${formatSize(sub.componentFile.size)}`
        : '❌';
      console.log(`   ${sub.layer}/${sub.component}  ${comp}`);
    }
    console.log('');
  }

  // ─── Gaps ────────────────────────────────────────────────────────────────
  const topLevel = reports.filter((r) => !r.component.includes('/'));
  const missingConsts = topLevel.filter((r) => !r.supporting.constants);
  const missingVars = topLevel.filter((r) => !r.supporting.variants);
  const missingTypes = topLevel.filter((r) => !r.supporting.types);
  const missingUtils = topLevel.filter((r) => !r.supporting.utils);
  const missingComponents = topLevel.filter((r) => !r.componentFile);

  if (
    missingConsts.length > 0 ||
    missingVars.length > 0 ||
    missingTypes.length > 0 ||
    missingUtils.length > 0 ||
    missingComponents.length > 0
  ) {
    console.log(' ════════════════════════════════════════════════════════');
    console.log('  GAPS — Supporting files missing for top-level components');
    console.log(' ════════════════════════════════════════════════════════\n');

    if (missingConsts.length > 0) {
      console.log(` ❌ Missing constants (${missingConsts.length}):`);
      missingConsts.forEach((r) => console.log(`    - ${r.layer}/${r.component}`));
    }
    if (missingVars.length > 0) {
      console.log(`\n ❌ Missing variants  (${missingVars.length}):`);
      missingVars.forEach((r) => console.log(`    - ${r.layer}/${r.component}`));
    }
    if (missingTypes.length > 0) {
      console.log(`\n ❌ Missing types     (${missingTypes.length}):`);
      missingTypes.forEach((r) => console.log(`    - ${r.layer}/${r.component}`));
    }
    if (missingUtils.length > 0) {
      console.log(`\n ❌ Missing utils     (${missingUtils.length}):`);
      missingUtils.forEach((r) => console.log(`    - ${r.layer}/${r.component}`));
    }
    if (missingComponents.length > 0) {
      console.log(`\n ❌ Missing component (${missingComponents.length}):`);
      missingComponents.forEach((r) => console.log(`    - ${r.layer}/${r.component}`));
    }
    console.log('');
  }

  // ─── Orphans ─────────────────────────────────────────────────────────────
  const orphanedSupport = topLevel.filter(
    (r) =>
      (r.supporting.constants ||
        r.supporting.variants ||
        r.supporting.types ||
        r.supporting.utils) &&
      !r.componentFile
  );
  if (orphanedSupport.length > 0) {
    console.log(
      ` ⚠️  Support files exist but NO component (${orphanedSupport.length}):`
    );
    orphanedSupport.forEach((r) =>
      console.log(`    - ${r.layer}/${r.component}`)
    );
    console.log('');
  }
}

function printJsonReport(reports: ComponentReport[]): void {
  const output = reports.map((report) => ({
    component: report.component,
    layer: report.layer,
    pascalName: report.pascalName,
    isSubComponent: report.component.includes('/'),
    files: {
      constants: report.supporting.constants?.path ?? null,
      variants: report.supporting.variants?.path ?? null,
      types: report.supporting.types?.path ?? null,
      utils: report.supporting.utils?.path ?? null,
      component: report.componentFile?.path ?? null,
    },
    complete:
      !!report.supporting.constants &&
      !!report.supporting.variants &&
      !!report.supporting.types &&
      !!report.componentFile,
    subComponentCount: report.subComponentCount,
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

  // Discover all components from the filesystem
  const allDiscovered = discoverAllComponents();

  // Find base component paths (for sub-component counting)
  const baseComponentPaths = new Set<string>();
  for (const d of allDiscovered) {
    if (!d.isSubComponent) {
      baseComponentPaths.add(d.componentName);
    }
  }

  // Build reports
  const reports: ComponentReport[] = allDiscovered.map((d) =>
    scanDiscoveredComponent(d, allDiscovered, baseComponentPaths)
  );

  // Sort by layer, then by component name
  reports.sort((a, b) => {
    const layerOrder = LAYERS.indexOf(a.layer) - LAYERS.indexOf(b.layer);
    if (layerOrder !== 0) return layerOrder;
    return a.component.localeCompare(b.component);
  });

  if (useJson) {
    printJsonReport(reports);
  } else {
    printReport(reports);
  }
}

main();