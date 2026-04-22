/* src/scripts/modules/analyze_dependencies.ts */
// ============================================================================
// DEPENDENCY ANALYZER
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import type { DependencyMap, DependencyNode, DependencyEdge } from '@/config/generated/dependency_map.js';
import { logDebug, logInfo, logWarning, logSuccess } from '../shared/logger';

export interface AnalyzeOptions {
  paths: string[];
  recursive: boolean;
  maxDepth?: number;
  includeNodeModules?: boolean;
  verbose?: boolean;
}

export interface AnalyzeResult {
  success: boolean;
  nodesFound: number;
  edgesFound: number;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// MAIN ANALYZER FUNCTION
// ============================================================================

/**
 * Scan directories and build dependency map
 */
export async function analyzeDependencies(options: AnalyzeOptions): Promise<AnalyzeResult> {
  const { paths, recursive, maxDepth = 10, includeNodeModules = false, verbose = false } = options;
  const result: AnalyzeResult = {
    success: true,
    nodesFound: 0,
    edgesFound: 0,
    errors: [],
    warnings: []
  };
  
  const nodes: Map<string, DependencyNode> = new Map();
  const edges: DependencyEdge[] = [];
  
  if (verbose) {
    logInfo(`Analyzing dependencies in ${paths.length} paths...`);
  }
  
  for (const basePath of paths) {
    await walkDirectory(basePath, nodes, edges, { recursive, maxDepth, includeNodeModules, verbose, result });
  }
  
  result.nodesFound = nodes.size;
  result.edgesFound = edges.length;
  
  if (verbose) {
    logSuccess(`Found ${nodes.size} nodes and ${edges.length} edges`);
  }
  
  return result;
}

/**
 * Walk directory recursively to find TypeScript files
 */
async function walkDirectory(
  dirPath: string,
  nodes: Map<string, DependencyNode>,
  edges: DependencyEdge[],
  context: {
    recursive: boolean;
    maxDepth: number;
    includeNodeModules: boolean;
    verbose: boolean;
    result: AnalyzeResult;
  },
  currentDepth: number = 0
): Promise<void> {
  if (!fs.existsSync(dirPath)) return;
  if (currentDepth > context.maxDepth) return;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item === 'node_modules' && !context.includeNodeModules) continue;
      if (context.recursive) {
        await walkDirectory(fullPath, nodes, edges, context, currentDepth + 1);
      }
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      analyzeFile(fullPath, nodes, edges, context);
    }
  }
}

/**
 * Analyze a single TypeScript file
 */
function analyzeFile(
  filePath: string,
  nodes: Map<string, DependencyNode>,
  edges: DependencyEdge[],
  context: { verbose: boolean; result: AnalyzeResult }
): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports = extractImports(content);
    const exports = extractExports(content);
    const fileHash = generateFileHash(content);
    
    const nodeId = path.relative(process.cwd(), filePath);
    
    nodes.set(nodeId, {
      id: nodeId,
      type: determineNodeType(nodeId),
      exports,
      imports: imports.map(i => i.modulePath),
      usedBy: [],
      fileHash,
      lastModified: new Date().toISOString()
    });
    
    // Add edges for each import
    for (const imp of imports) {
      edges.push({
        from: nodeId,
        to: imp.modulePath,
        type: 'imports'
      });
    }
    
    if (context.verbose) {
      logDebug(`  Analyzed: ${nodeId} (${exports.length} exports, ${imports.length} imports)`);
    }
  } catch (error) {
    context.result.warnings.push(`Failed to analyze ${filePath}: ${error}`);
  }
}

/**
 * Extract import statements from file content
 */
function extractImports(content: string): { modulePath: string; importedNames: string[] }[] {
  const imports: { modulePath: string; importedNames: string[] }[] = [];
  
  // Match import statements
  const importRegex = /import\s+(?:(?:\{([^}]+)\})|(?:(\w+)))\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importedNames = match[1] ? match[1].split(',').map(s => s.trim()) : [match[2] || 'default'];
    imports.push({
      modulePath: match[3],
      importedNames
    });
  }
  
  // Match dynamic imports
  const dynamicRegex = /import\(['"]([^'"]+)['"]\)/g;
  while ((match = dynamicRegex.exec(content)) !== null) {
    imports.push({
      modulePath: match[1],
      importedNames: ['*']
    });
  }
  
  return imports;
}

/**
 * Extract export statements from file content
 */
function extractExports(content: string): string[] {
  const exports: string[] = [];
  
  // Match export const/function/class/interface/type
  const exportRegex = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }
  
  // Match export default
  const defaultRegex = /export\s+default\s+(\w+)/g;
  while ((match = defaultRegex.exec(content)) !== null) {
    exports.push(`default_${match[1]}`);
  }
  
  // Match export { ... }
  const namedRegex = /export\s+\{([^}]+)\}/g;
  while ((match = namedRegex.exec(content)) !== null) {
    const named = match[1].split(',').map(s => s.trim());
    exports.push(...named);
  }
  
  return exports;
}

/**
 * Determine node type based on file path
 */
function determineNodeType(filePath: string): DependencyNode['type'] {
  if (filePath.includes('/types/') || filePath.includes('/generated/types/')) return 'generated';
  if (filePath.includes('/constants/')) return 'generated';
  if (filePath.includes('/validators/')) return 'generated';
  if (filePath.includes('/utils/')) return 'generated';
  if (filePath.includes('/api/')) return 'generated';
  if (filePath.includes('/hooks/')) return 'generated';
  if (filePath.includes('/config/')) return 'config';
  if (filePath.includes('/node_modules/')) return 'external';
  return 'source';
}

/**
 * Generate a hash of file content for change detection
 */
export function generateFileHash(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex').substring(0, 16);
}

/**
 * Check if a file has changed since last analysis
 */
export function hasFileChanged(filePath: string, previousHash: string): boolean {
  if (!fs.existsSync(filePath)) return true;
  const content = fs.readFileSync(filePath, 'utf-8');
  const currentHash = generateFileHash(content);
  return currentHash !== previousHash;
}

// ============================================================================
// DEPENDENCY CHAIN FUNCTIONS
// ============================================================================

/**
 * Find all files that depend on a given file
 */
export function findDependents(map: DependencyMap, fileId: string): string[] {
  const dependents: string[] = [];
  for (const edge of map.edges) {
    if (edge.to === fileId && edge.type === 'imports') {
      dependents.push(edge.from);
    }
  }
  return dependents;
}

/**
 * Find all files that a given file depends on
 */
export function findDependencies(map: DependencyMap, fileId: string): string[] {
  const dependencies: string[] = [];
  for (const edge of map.edges) {
    if (edge.from === fileId && edge.type === 'imports') {
      dependencies.push(edge.to);
    }
  }
  return dependencies;
}

/**
 * Get the full dependency chain (both directions)
 */
export function getDependencyChain(map: DependencyMap, fileId: string): {
  upstream: string[];
  downstream: string[];
} {
  const visited = new Set<string>();
  const upstream: string[] = [];
  const downstream: string[] = [];
  
  function traverseUp(current: string) {
    if (visited.has(current)) return;
    visited.add(current);
    const deps = findDependencies(map, current);
    for (const dep of deps) {
      upstream.push(dep);
      traverseUp(dep);
    }
  }
  
  function traverseDown(current: string) {
    if (visited.has(current)) return;
    visited.add(current);
    const deps = findDependents(map, current);
    for (const dep of deps) {
      downstream.push(dep);
      traverseDown(dep);
    }
  }
  
  traverseUp(fileId);
  traverseDown(fileId);
  
  return { upstream, downstream };
}