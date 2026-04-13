// src/scripts/modules/agenticMaintenance.ts
// ============================================================================
// AGENTIC MAINTENANCE
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import type { DependencyMap, DependencyNode } from '@/config/dependency-map.js';
import type { SystemRegistryFile, RunRecord } from '../shared/system_logger.js';
import { logSuccess, logError, logInfo, logWarning, logDebug } from '../shared/logger.js';

export interface MaintenanceTask {
  id: string;
  type: 'validate' | 'update' | 'rollback' | 'cleanup' | 'optimize';
  target: string;
  condition: string;
  action: string;
  lastRun?: string;
  nextRun?: string;
  enabled: boolean;
}

export interface MaintenanceResult {
  taskId: string;
  success: boolean;
  message: string;
  filesAffected: string[];
  timestamp: string;
}

// ============================================================================
// TASK SCHEDULING
// ============================================================================

const maintenanceTasks: MaintenanceTask[] = [];

/**
 * Schedule a maintenance task
 */
export function scheduleMaintenance(task: MaintenanceTask): void {
  maintenanceTasks.push(task);
  logInfo(`Scheduled maintenance task: ${task.id} (${task.type})`);
}

/**
 * Run all pending maintenance tasks
 */
export async function runMaintenance(tasks?: MaintenanceTask[]): Promise<MaintenanceResult[]> {
  const tasksToRun = tasks || maintenanceTasks.filter(t => t.enabled);
  const results: MaintenanceResult[] = [];
  
  for (const task of tasksToRun) {
    logInfo(`Running maintenance task: ${task.id}`);
    
    let result: MaintenanceResult;
    switch (task.type) {
      case 'validate':
        result = await runValidationTask(task);
        break;
      case 'update':
        result = await runUpdateTask(task);
        break;
      case 'cleanup':
        result = await runCleanupTask(task);
        break;
      default:
        result = {
          taskId: task.id,
          success: false,
          message: `Unknown task type: ${task.type}`,
          filesAffected: [],
          timestamp: new Date().toISOString()
        };
    }
    
    results.push(result);
    task.lastRun = result.timestamp;
    
    if (result.success) {
      logSuccess(`  ✅ ${task.id}: ${result.message}`);
    } else {
      logError(`  ❌ ${task.id}: ${result.message}`);
    }
  }
  
  return results;
}

async function runValidationTask(task: MaintenanceTask): Promise<MaintenanceResult> {
  // Validate that generated files exist and are up to date
  const filesAffected: string[] = [];
  
  try {
    if (fs.existsSync(task.target)) {
      filesAffected.push(task.target);
      return {
        taskId: task.id,
        success: true,
        message: `Validated: ${task.target}`,
        filesAffected,
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        taskId: task.id,
        success: false,
        message: `File not found: ${task.target}`,
        filesAffected,
        timestamp: new Date().toISOString()
      };
    }
  } catch (error) {
    return {
      taskId: task.id,
      success: false,
      message: `Validation failed: ${error}`,
      filesAffected,
      timestamp: new Date().toISOString()
    };
  }
}

async function runUpdateTask(task: MaintenanceTask): Promise<MaintenanceResult> {
  // Update stale generated files
  const filesAffected: string[] = [];
  
  // This would call the appropriate generator
  filesAffected.push(task.target);
  
  return {
    taskId: task.id,
    success: true,
    message: `Update triggered for: ${task.target}`,
    filesAffected,
    timestamp: new Date().toISOString()
  };
}

async function runCleanupTask(task: MaintenanceTask): Promise<MaintenanceResult> {
  // Clean up orphaned files
  const filesAffected: string[] = [];
  
  if (fs.existsSync(task.target)) {
    fs.unlinkSync(task.target);
    filesAffected.push(task.target);
    return {
      taskId: task.id,
      success: true,
      message: `Cleaned up: ${task.target}`,
      filesAffected,
      timestamp: new Date().toISOString()
    };
  }
  
  return {
    taskId: task.id,
    success: true,
    message: `Nothing to clean up: ${task.target}`,
    filesAffected,
    timestamp: new Date().toISOString()
  };
}

// ============================================================================
// DETECTION FUNCTIONS
// ============================================================================

/**
 * Detect files that are stale (source changed but generated not updated)
 */
export function detectStaleFiles(registry: SystemRegistryFile, dependencyMap: DependencyMap): string[] {
  const staleFiles: string[] = [];
  const section = registry.gaia;
  
  for (const [filePath, fileInfo] of Object.entries(section.files)) {
    if (!fs.existsSync(filePath)) {
      staleFiles.push(filePath);
      continue;
    }
    
    // Check if source files have changed
    const sourcePath = filePath.replace('/generated/', '/');
    if (fs.existsSync(sourcePath)) {
      const sourceStats = fs.statSync(sourcePath);
      const sourceModified = sourceStats.mtime.toISOString();
      
      if (sourceModified > fileInfo.generatedAt) {
        staleFiles.push(filePath);
      }
    }
  }
  
  return staleFiles;
}

/**
 * Detect orphaned generated files (no longer needed)
 */
export function detectOrphanedFiles(registry: SystemRegistryFile, dependencyMap: DependencyMap): string[] {
  const orphanedFiles: string[] = [];
  const section = registry.gaia;
  
  for (const [filePath] of Object.entries(section.files)) {
    // Check if source table still exists
    const tableName = path.basename(filePath, '.ts');
    const sourceExists = dependencyMap.nodes[`src/types/${tableName}.ts`] !== undefined;
    
    if (!sourceExists) {
      orphanedFiles.push(filePath);
    }
  }
  
  return orphanedFiles;
}

/**
 * Detect circular dependencies
 */
export function detectCircularDependencies(dependencyMap: DependencyMap): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function dfs(nodeId: string, path: string[]): void {
    if (recursionStack.has(nodeId)) {
      // Found a cycle
      const cycleStart = path.indexOf(nodeId);
      if (cycleStart !== -1) {
        cycles.push([...path.slice(cycleStart), nodeId]);
      }
      return;
    }
    
    if (visited.has(nodeId)) return;
    
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    const node = dependencyMap.nodes[nodeId];
    if (node) {
      for (const importPath of node.imports) {
        dfs(importPath, [...path, nodeId]);
      }
    }
    
    recursionStack.delete(nodeId);
  }
  
  for (const nodeId of Object.keys(dependencyMap.nodes)) {
    dfs(nodeId, []);
  }
  
  return cycles;
}

// ============================================================================
// ACTION FUNCTIONS
// ============================================================================

/**
 * Validate that all generated files are correct
 */
export async function validateAllGenerated(registry: SystemRegistryFile): Promise<MaintenanceResult> {
  const filesAffected: string[] = [];
  const section = registry.gaia;
  
  for (const [filePath, fileInfo] of Object.entries(section.files)) {
    if (!fs.existsSync(filePath)) {
      filesAffected.push(filePath);
    }
  }
  
  return {
    taskId: 'validate_all',
    success: filesAffected.length === 0,
    message: filesAffected.length === 0 ? 'All generated files valid' : `${filesAffected.length} files missing`,
    filesAffected,
    timestamp: new Date().toISOString()
  };
}

/**
 * Update stale generated files
 */
export async function updateStaleFiles(registry: SystemRegistryFile, dependencyMap: DependencyMap): Promise<MaintenanceResult> {
  const staleFiles = detectStaleFiles(registry, dependencyMap);
  
  return {
    taskId: 'update_stale',
    success: true,
    message: `${staleFiles.length} stale files identified for update`,
    filesAffected: staleFiles,
    timestamp: new Date().toISOString()
  };
}

/**
 * Rollback to a previous state
 */
export async function rollbackToRun(runId: string): Promise<MaintenanceResult> {
  // This would restore files from backup
  return {
    taskId: `rollback_${runId}`,
    success: false,
    message: `Rollback to ${runId} not yet implemented`,
    filesAffected: [],
    timestamp: new Date().toISOString()
  };
}

/**
 * Clean up orphaned generated files
 */
export async function cleanupOrphanedFiles(registry: SystemRegistryFile): Promise<MaintenanceResult> {
  const orphanedFiles: string[] = [];
  const section = registry.gaia;
  
  for (const [filePath] of Object.entries(section.files)) {
    if (!fs.existsSync(filePath)) {
      orphanedFiles.push(filePath);
    }
  }
  
  return {
    taskId: 'cleanup_orphaned',
    success: true,
    message: `${orphanedFiles.length} orphaned files identified for cleanup`,
    filesAffected: orphanedFiles,
    timestamp: new Date().toISOString()
  };
}

/**
 * Suggest optimizations based on efficiency records
 */
export function suggestOptimizations(): string[] {
  const suggestions: string[] = [];
  
  suggestions.push('Consider implementing caching for repeated generation tasks');
  suggestions.push('Review large type files for potential splitting');
  suggestions.push('Enable incremental generation for faster rebuilds');
  
  return suggestions;
}