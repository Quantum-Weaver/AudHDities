// src/scripts/shared/systemLogger.ts
// ============================================================================
// SYSTEM LOGGER - Shared logging for COSMIC and GAIA
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logWarning, logDebug } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const REGISTRY_PATH = path.join(PROJECT_ROOT, 'config/system_registry.ts');

export type SystemName = 'COSMIC' | 'GAIA';
export type LogLevel = 'info' | 'warning' | 'error' | 'success';

export interface LogEntry {
  timestamp: string;
  system: SystemName;
  level: LogLevel;
  module: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface RunRecord {
  id: string;
  system: SystemName;
  startTime: string;
  endTime: string;
  status: 'success' | 'partial' | 'failed';
  generatedFiles: string[];
  errors: string[];
  warnings: string[];
  notes: string[];
}

export interface SystemRegistryFile {
  version: string;
  updatedAt: string;
  cosmic: {
    lastRun: RunRecord | null;
    runs: RunRecord[];
    files: Record<string, { hash: string; generatedAt: string }>;
  };
  gaia: {
    lastRun: RunRecord | null;
    runs: RunRecord[];
    files: Record<string, { hash: string; generatedAt: string }>;
  };
  settings: {
    maxRunsToRetain: number;
    autoCorrectEnabled: boolean;
    useFileHashes: boolean;
  };
}

// ============================================================================
// SYSTEM LOGGER CLASS
// ============================================================================

export class SystemLogger {
  private system: SystemName;
  private currentRunId: string;
  private logs: LogEntry[];
  private currentRun: RunRecord | null;
  private registry: SystemRegistryFile;
  
  constructor(system: SystemName) {
    this.system = system;
    this.currentRunId = generateRunId();
    this.logs = [];
    this.currentRun = null;
    this.registry = loadRegistry();
  }
  
  /**
   * Start a new run
   */
  startRun(): void {
    this.currentRun = {
      id: this.currentRunId,
      system: this.system,
      startTime: new Date().toISOString(),
      endTime: '',
      status: 'success',
      generatedFiles: [],
      errors: [],
      warnings: [],
      notes: []
    };
    
    this.log('info', 'SystemLogger', `Starting ${this.system} run ${this.currentRunId}`);
    logInfo(`Starting ${this.system} run: ${this.currentRunId}`);
  }
  
  /**
   * End the current run
   */
  endRun(status: 'success' | 'partial' | 'failed'): void {
    if (!this.currentRun) return;
    
    this.currentRun.endTime = new Date().toISOString();
    this.currentRun.status = status;
    this.currentRun.errors = this.logs.filter(l => l.level === 'error').map(l => l.message);
    this.currentRun.warnings = this.logs.filter(l => l.level === 'warning').map(l => l.message);
    
    this.saveToRegistry();
    
    this.log('info', 'SystemLogger', `Completed ${this.system} run ${this.currentRunId} with status ${status}`);
    logInfo(`Completed ${this.system} run: ${status}`);
  }
  
  /**
   * Add a log entry
   */
  log(level: LogLevel, module: string, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      system: this.system,
      level,
      module,
      message,
      metadata
    };
    
    this.logs.push(entry);
    
    // Also output to console
    switch (level) {
      case 'success': logSuccess(`[${module}] ${message}`); break;
      case 'error': logError(`[${module}] ${message}`); break;
      case 'warning': logWarning(`[${module}] ${message}`); break;
      default: logInfo(`[${module}] ${message}`);
    }
  }
  
  /**
   * Add a generated file to the current run
   */
  addGeneratedFile(filePath: string): void {
    if (this.currentRun) {
      this.currentRun.generatedFiles.push(filePath);
      
      // Update registry file tracking
      const section = this.system === 'COSMIC' ? this.registry.cosmic : this.registry.gaia;
      section.files[filePath] = {
        hash: generateFileHash(filePath),
        generatedAt: new Date().toISOString()
      };
    }
  }
  
  /**
   * Add a note to the current run (human-readable)
   */
  addNote(note: string): void {
    if (this.currentRun) {
      this.currentRun.notes.push(note);
      logInfo(`📝 Note: ${note}`);
    }
  }
  
  /**
   * Get all logs for the current run
   */
  getLogs(): LogEntry[] {
    return this.logs;
  }
  
  /**
   * Get the current run record
   */
  getCurrentRun(): RunRecord | null {
    return this.currentRun;
  }
  
  /**
   * Save the current run to the system registry
   */
  saveToRegistry(): void {
    if (!this.currentRun) return;
    
    const section = this.system === 'COSMIC' ? this.registry.cosmic : this.registry.gaia;
    
    // Add to runs array
    section.runs.unshift(this.currentRun);
    
    // Prune old runs
    if (section.runs.length > this.registry.settings.maxRunsToRetain) {
      section.runs = section.runs.slice(0, this.registry.settings.maxRunsToRetain);
    }
    
    // Update lastRun
    section.lastRun = this.currentRun;
    
    // Update timestamp
    this.registry.updatedAt = new Date().toISOString();
    
    // Write to file
    writeRegistry(this.registry);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique run ID
 */
function generateRunId(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

/**
 * Generate a hash of file content (synchronous)
 */
function generateFileHash(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  } catch {
    return 'unknown';
  }
}

/**
 * Load previous registry state
 */
function loadRegistry(): SystemRegistryFile {
  if (!fs.existsSync(REGISTRY_PATH)) {
    return {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      cosmic: {
        lastRun: null,
        runs: [],
        files: {}
      },
      gaia: {
        lastRun: null,
        runs: [],
        files: {}
      },
      settings: {
        maxRunsToRetain: 100,
        autoCorrectEnabled: false,
        useFileHashes: true
      }
    };
  }
  
  try {
    const content = fs.readFileSync(REGISTRY_PATH, 'utf-8');
    // Extract the registry object from the exported constant
    const match = content.match(/export const SYSTEM_REGISTRY: SystemRegistryFile = ({[\s\S]*?});/);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (error) {
    logWarning(`Failed to load registry: ${error}`);
  }
  
  return {
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    cosmic: { lastRun: null, runs: [], files: {} },
    gaia: { lastRun: null, runs: [], files: {} },
    settings: { maxRunsToRetain: 100, autoCorrectEnabled: false, useFileHashes: true }
  };
}

/**
 * Write registry to file
 */
function writeRegistry(registry: SystemRegistryFile): void {
  const content = `// src/config/system_registry.ts
// ============================================================================
// SYSTEM REGISTRY - AUTOGENERATED - DO NOT EDIT MANUALLY
// ============================================================================
// Updated by COSMIC and GAIA on each run
// ============================================================================

export interface SystemRegistryFile {
  version: string;
  updatedAt: string;
  cosmic: {
    lastRun: RunRecord | null;
    runs: RunRecord[];
    files: Record<string, { hash: string; generatedAt: string }>;
  };
  gaia: {
    lastRun: RunRecord | null;
    runs: RunRecord[];
    files: Record<string, { hash: string; generatedAt: string }>;
  };
  settings: {
    maxRunsToRetain: number;
    autoCorrectEnabled: boolean;
    useFileHashes: boolean;
  };
}

export interface RunRecord {
  id: string;
  system: 'COSMIC' | 'GAIA';
  startTime: string;
  endTime: string;
  status: 'success' | 'partial' | 'failed';
  generatedFiles: string[];
  errors: string[];
  warnings: string[];
  notes: string[];
}

export const SYSTEM_REGISTRY: SystemRegistryFile = ${JSON.stringify(registry, null, 2)};
`;

  fs.writeFileSync(REGISTRY_PATH, content, 'utf-8');
}