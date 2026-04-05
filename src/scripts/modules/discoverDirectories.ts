// src/scripts/modules/discoverDirectories.ts
// Phase: Discover all target directories (2 levels deep) with formula display

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '../shared/logger.js';
import { DEITY_GROUPS } from '../../config/deity-groups.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  modified: Date;
}

export interface DirectoryManifest {
  path: string;
  exists: boolean;
  createdAt?: Date;
  fileCount: number;
  files: string[];
  subdirectories: Map<string, DirectoryManifest>;  // RECURSIVE: 2 levels deep
}

export interface DiscoveryResult {
  // Constants directories
  constantsRoot: DirectoryManifest;
  constantsDeityGroups: Map<string, DirectoryManifest>;
  constantsUngrouped: DirectoryManifest[];  // NEW: folders not in deity groups
  
  // Types directories
  typesRoot: DirectoryManifest;
  typesDeityGroups: Map<string, DirectoryManifest>;
  typesUngrouped: DirectoryManifest[];  // NEW: folders not in deity groups
  
  // Utils directories
  utilsRoot: DirectoryManifest;
  utilsDeityGroups: Map<string, DirectoryManifest>;
  utilsUngrouped: DirectoryManifest[];  // NEW: folders not in deity groups
  
  // API directory (flat)
  apiRoot: DirectoryManifest;
  apiRoutes: string[];
  apiUngrouped: string[];  // NEW: API routes not matching table names
  
  // Summary with formulas
  summary: {
    totalExistingFiles: number;
    formula: string;
    components: {
      constantsFiles: number;
      typesFiles: number;
      utilsFiles: number;
      apiRoutes: number;
      otherFiles: number;
    };
    constantsFormula: string;
    typesFormula: string;
    utilsFormula: string;
    apiFormula: string;
  };
}

export interface DiscoverDirectoriesOptions {
  verbose?: boolean;
  constantsBase?: string;
  typesBase?: string;
  utilsBase?: string;
  apiBase?: string;
  maxDepth?: number;  // How deep to scan (default: 2)
}

/**
 * Recursively discover directories up to maxDepth
 */
function discoverRecursive(
  dirPath: string, 
  currentDepth: number = 0, 
  maxDepth: number = 2,
  verbose: boolean = false
): DirectoryManifest | null {
  if (!fs.existsSync(dirPath)) {
    return null;
  }
  
  const stats = fs.statSync(dirPath);
  const files: string[] = [];
  const subdirectories = new Map<string, DirectoryManifest>();
  let fileCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const itemStats = fs.statSync(itemPath);
      
      if (itemStats.isFile()) {
        files.push(item);
        fileCount++;
      } else if (itemStats.isDirectory() && currentDepth < maxDepth - 1) {
        // Recursively discover subdirectories (up to maxDepth)
        const subManifest = discoverRecursive(itemPath, currentDepth + 1, maxDepth, verbose);
        if (subManifest) {
          subdirectories.set(item, subManifest);
          fileCount += subManifest.fileCount;
        }
      } else if (itemStats.isDirectory()) {
        // At max depth, just record the directory exists without recursing
        subdirectories.set(item, {
          path: itemPath,
          exists: true,
          fileCount: 0,
          files: [],
          subdirectories: new Map()
        });
      }
    }
  } catch (error) {
    if (verbose) logDebug(`Could not read directory: ${dirPath}`);
  }
  
  return {
    path: dirPath,
    exists: true,
    createdAt: stats.birthtime,
    fileCount,
    files,
    subdirectories
  };
}

/**
 * Get all deity folder names
 */
export function getAllDeityFolderNames(): string[] {
  return DEITY_GROUPS.map(group => group.folderName);
}

/**
 * Get all table names from config (for API route matching)
 */
export function getAllTableNames(): string[] {
  return DEITY_GROUPS.flatMap(group => group.tables);
}

/**
 * Discover all directories with formulas
 */
export function discoverDirectories(options: DiscoverDirectoriesOptions = {}): DiscoveryResult {
  const {
    verbose = false,
    constantsBase = 'src/lib/constants',
    typesBase = 'src/types',
    utilsBase = 'src/utils',
    apiBase = 'src/app/api',
    maxDepth = 2
  } = options;
  
  if (verbose) {
    logInfo('Discovering target directories (recursive, depth 2)...');
    logSeparator('─', 40);
  }
  
  const deityFolderNames = getAllDeityFolderNames();
  const allTableNames = getAllTableNames();
  const tableNameSet = new Set(allTableNames);
  
  // Root paths
  const constantsRootPath = path.join(PROJECT_ROOT, constantsBase);
  const typesRootPath = path.join(PROJECT_ROOT, typesBase);
  const utilsRootPath = path.join(PROJECT_ROOT, utilsBase);
  const apiRootPath = path.join(PROJECT_ROOT, apiBase);
  
  // Discover roots recursively
  const constantsRoot = discoverRecursive(constantsRootPath, 0, maxDepth, verbose) || {
    path: constantsRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const typesRoot = discoverRecursive(typesRootPath, 0, maxDepth, verbose) || {
    path: typesRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const utilsRoot = discoverRecursive(utilsRootPath, 0, maxDepth, verbose) || {
    path: utilsRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const apiRoot = discoverRecursive(apiRootPath, 0, maxDepth, verbose) || {
    path: apiRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  // Constants: separate deity groups from ungrouped
  const constantsDeityGroups = new Map<string, DirectoryManifest>();
  const constantsUngrouped: DirectoryManifest[] = [];
  
  for (const [folderName, manifest] of constantsRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      constantsDeityGroups.set(folderName, manifest);
    } else {
      constantsUngrouped.push(manifest);
    }
  }
  
  // Types: separate deity groups from ungrouped
  const typesDeityGroups = new Map<string, DirectoryManifest>();
  const typesUngrouped: DirectoryManifest[] = [];
  
  for (const [folderName, manifest] of typesRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      typesDeityGroups.set(folderName, manifest);
    } else {
      typesUngrouped.push(manifest);
    }
  }
  
  // Utils: separate deity groups from ungrouped
  const utilsDeityGroups = new Map<string, DirectoryManifest>();
  const utilsUngrouped: DirectoryManifest[] = [];
  
  for (const [folderName, manifest] of utilsRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      utilsDeityGroups.set(folderName, manifest);
    } else {
      utilsUngrouped.push(manifest);
    }
  }
  
  // API: flat routes (subdirectories)
  const apiRoutes: string[] = [];
  const apiUngrouped: string[] = [];
  
  for (const [routeName, manifest] of apiRoot.subdirectories) {
    if (tableNameSet.has(routeName)) {
      apiRoutes.push(routeName);
    } else {
      apiUngrouped.push(routeName);
    }
  }
  
  // Calculate totals with formulas
  let constantsFiles = 0;
  const constantsComponents: string[] = [];
  for (const [name, manifest] of constantsDeityGroups) {
    constantsFiles += manifest.fileCount;
    constantsComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let typesFiles = 0;
  const typesComponents: string[] = [];
  for (const [name, manifest] of typesDeityGroups) {
    typesFiles += manifest.fileCount;
    typesComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let utilsFiles = 0;
  const utilsComponents: string[] = [];
  for (const [name, manifest] of utilsDeityGroups) {
    utilsFiles += manifest.fileCount;
    utilsComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  const apiRouteCount = apiRoutes.length;
  
  // Other files (files directly in root directories, not in subfolders)
  const otherFiles = constantsRoot.files.length + typesRoot.files.length + utilsRoot.files.length + apiRoot.files.length;
  
  const totalExistingFiles = constantsFiles + typesFiles + utilsFiles + apiRouteCount + otherFiles;
  
  // Build formula strings
  const constantsFormula = `constants_files = sum(constantsDeityGroups.fileCount) = ${constantsComponents.join(' + ')} = ${constantsFiles}`;
  const typesFormula = `types_files = sum(typesDeityGroups.fileCount) = ${typesComponents.join(' + ')} = ${typesFiles}`;
  const utilsFormula = `utils_files = sum(utilsDeityGroups.fileCount) = ${utilsComponents.join(' + ')} = ${utilsFiles}`;
  const apiFormula = `api_routes = count(directories in src/app/api/ matching table names) = ${apiRouteCount}`;
  const otherFormula = `other_files = files directly in root directories (not in subfolders) = ${otherFiles}`;
  
  const formula = `${constantsFiles} (constants) + ${typesFiles} (types) + ${utilsFiles} (utils) + ${apiRouteCount} (api) + ${otherFiles} (other) = ${totalExistingFiles}`;
  
  if (verbose) {
    console.log('');
    logInfo('Directory Discovery Results (2 levels deep):');
    logInfo(`  Constants root: ${constantsRoot.exists ? '✅' : '❌'} ${constantsRootPath}`);
    logInfo(`    ├── Deity groups: ${constantsDeityGroups.size} (${constantsFiles} files)`);
    logInfo(`    ├── Ungrouped folders: ${constantsUngrouped.length}`);
    logInfo(`    └── Root files: ${constantsRoot.files.length}`);
    
    logInfo(`  Types root: ${typesRoot.exists ? '✅' : '❌'} ${typesRootPath}`);
    logInfo(`    ├── Deity groups: ${typesDeityGroups.size} (${typesFiles} files)`);
    logInfo(`    ├── Ungrouped folders: ${typesUngrouped.length}`);
    logInfo(`    └── Root files: ${typesRoot.files.length}`);
    
    logInfo(`  Utils root: ${utilsRoot.exists ? '✅' : '❌'} ${utilsRootPath}`);
    logInfo(`    ├── Deity groups: ${utilsDeityGroups.size} (${utilsFiles} files)`);
    logInfo(`    ├── Ungrouped folders: ${utilsUngrouped.length}`);
    logInfo(`    └── Root files: ${utilsRoot.files.length}`);
    
    logInfo(`  API root: ${apiRoot.exists ? '✅' : '❌'} ${apiRootPath}`);
    logInfo(`    ├── Matched routes: ${apiRoutes.length}`);
    logInfo(`    ├── Ungrouped routes: ${apiUngrouped.length}`);
    logInfo(`    └── Root files: ${apiRoot.files.length}`);
    
    console.log('');
    logInfo('📊 CALCULATED VALUES WITH FORMULAS:');
    logInfo(`  ${constantsFormula}`);
    logInfo(`  ${typesFormula}`);
    logInfo(`  ${utilsFormula}`);
    logInfo(`  ${apiFormula}`);
    logInfo(`  ${otherFormula}`);
    console.log('');
    logInfo(`  TOTAL: ${formula}`);
    
    if (constantsUngrouped.length > 0 || typesUngrouped.length > 0 || utilsUngrouped.length > 0 || apiUngrouped.length > 0) {
      console.log('');
      logInfo('📁 UNGROUPED FOLDERS (to integrate later):');
      for (const folder of constantsUngrouped) {
        logInfo(`  📁 src/lib/constants/${path.basename(folder.path)}/ (${folder.fileCount} files) - TO INTEGRATE`);
      }
      for (const folder of typesUngrouped) {
        logInfo(`  📁 src/types/${path.basename(folder.path)}/ (${folder.fileCount} files) - TO INTEGRATE`);
      }
      for (const folder of utilsUngrouped) {
        logInfo(`  📁 src/utils/${path.basename(folder.path)}/ (${folder.fileCount} files) - TO INTEGRATE`);
      }
      for (const route of apiUngrouped) {
        logInfo(`  🌐 src/app/api/${route}/ - TO INTEGRATE`);
      }
    }
    
    logSeparator('─', 40);
  }
  
  return {
    constantsRoot,
    constantsDeityGroups,
    constantsUngrouped,
    typesRoot,
    typesDeityGroups,
    typesUngrouped,
    utilsRoot,
    utilsDeityGroups,
    utilsUngrouped,
    apiRoot,
    apiRoutes,
    apiUngrouped,
    summary: {
      totalExistingFiles,
      formula,
      components: {
        constantsFiles,
        typesFiles,
        utilsFiles,
        apiRoutes: apiRouteCount,
        otherFiles
      },
      constantsFormula,
      typesFormula,
      utilsFormula,
      apiFormula
    }
  };
}

/**
 * Ensure all required directories exist
 */
export function ensureAllDirectories(options: DiscoverDirectoriesOptions = {}): DiscoveryResult {
  const {
    verbose = false,
    constantsBase = 'src/lib/constants',
    typesBase = 'src/types',
    utilsBase = 'src/utils',
    apiBase = 'src/app/api'
  } = options;
  
  const deityFolderNames = getAllDeityFolderNames();
  
  const constantsRootPath = path.join(PROJECT_ROOT, constantsBase);
  const typesRootPath = path.join(PROJECT_ROOT, typesBase);
  const utilsRootPath = path.join(PROJECT_ROOT, utilsBase);
  const apiRootPath = path.join(PROJECT_ROOT, apiBase);
  
  // Ensure root directories
  const ensure = (dir: string) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      if (verbose) logSuccess(`Created directory: ${dir}`);
    }
  };
  
  ensure(constantsRootPath);
  ensure(typesRootPath);
  ensure(utilsRootPath);
  ensure(apiRootPath);
  
  // Ensure deity group directories
  for (const folderName of deityFolderNames) {
    ensure(path.join(constantsRootPath, folderName));
    ensure(path.join(typesRootPath, folderName));
    ensure(path.join(utilsRootPath, folderName));
  }
  
  // API remains flat - no deity subdirectories
  
  return discoverDirectories(options);
}