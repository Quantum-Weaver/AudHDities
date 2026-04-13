/* @/scripts/modules/system/object_checklist */
// Phase 2: Track progress of each object through the generation pipeline
// Provides status tracking, error collection, and reporting

import type { ChecklistProgress, ExtractedObject, ObjectType } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning, logProgress } from '@/scripts/shared/logger.js';

export interface ObjectCheckListOptions {
  verbose?: boolean;
  autoSave?: boolean;           // Save checkpoint after each phase
  checkpointFile?: string;      // Path to save checkpoint data
}

/**
 * ObjectCheckList - Tracks progress of objects through the pipeline
 */
export class ObjectCheckList {
  private items: Map<string, ChecklistProgress> = new Map();
  private options: ObjectCheckListOptions;
  private startTime: Date;
  private phaseOrder: string[] = [
    'extracted',
    'analyzed', 
    'typesGenerated',
    'constantsGenerated',
    'utilsGenerated',
    'apisGenerated'
  ];
  
  constructor(options: ObjectCheckListOptions = {}) {
    this.options = {
      verbose: false,
      autoSave: false,
      ...options
    };
    this.startTime = new Date();
  }
  
  /**
   * Register a new object in the checklist
   * 
   * @param object - ExtractedObject to track
   */
  registerObject(object: ExtractedObject): void {
    if (this.items.has(object.name)) {
      if (this.options.verbose) {
        logDebug(`Object "${object.name}" already registered, skipping`);
      }
      return;
    }
    
    const progress: ChecklistProgress = {
      objectName: object.name,
      objectType: object.type,
      extracted: true,
      analyzed: false,
      typesGenerated: false,
      constantsGenerated: false,
      utilsGenerated: false,
      apisGenerated: false,
      startTime: new Date(),
      errors: [],
      warnings: []
    };
    
    this.items.set(object.name, progress);
    
    if (this.options.verbose) {
      logDebug(`Registered object: ${object.name} (${object.type})`);
    }
  }
  
  /**
   * Register multiple objects at once
   * 
   * @param objects - Array of ExtractedObject to track
   */
  registerObjects(objects: ExtractedObject[]): void {
    for (const object of objects) {
      this.registerObject(object);
    }
    if (this.options.verbose) {
      logSuccess(`Registered ${objects.length} objects`);
    }
  }
  
  /**
   * Update progress for a specific phase
   * 
   * @param objectName - Name of the object
   * @param phase - Phase name ('extracted', 'analyzed', 'typesGenerated', etc.)
   * @param success - Whether the phase completed successfully
   * @param error - Optional error message if failed
   */
  updateProgress(objectName: string, phase: string, success: boolean, error?: string): void {
    const progress = this.items.get(objectName);
    
    if (!progress) {
      logWarning(`Object "${objectName}" not found in checklist`);
      return;
    }
    
    if (phase === 'analyzed') progress.analyzed = success;
    else if (phase === 'typesGenerated') progress.typesGenerated = success;
    else if (phase === 'constantsGenerated') progress.constantsGenerated = success;
    else if (phase === 'utilsGenerated') progress.utilsGenerated = success;
    else if (phase === 'apisGenerated') progress.apisGenerated = success;
    else if (phase === 'extracted') progress.extracted = success;
    
    if (!success && error) {
      progress.errors.push(error);
    }
    
    if (this.options.verbose) {
      const status = success ? '✅' : '❌';
      logDebug(`${status} ${objectName}: ${phase} = ${success}`);
    }
    
    if (this.options.autoSave) {
      this.saveCheckpoint();
    }
  }
  
  /**
   * Add a warning for an object
   * 
   * @param objectName - Name of the object
   * @param warning - Warning message
   */
  addWarning(objectName: string, warning: string): void {
    const progress = this.items.get(objectName);
    if (progress) {
      progress.warnings.push(warning);
      if (this.options.verbose) {
        logWarning(`${objectName}: ${warning}`);
      }
    }
  }
  
  /**
   * Add an error for an object
   * 
   * @param objectName - Name of the object
   * @param error - Error message
   */
  addError(objectName: string, error: string): void {
    const progress = this.items.get(objectName);
    if (progress) {
      progress.errors.push(error);
      if (this.options.verbose) {
        logError(`${objectName}: ${error}`);
      }
    }
  }
  
  /**
   * Get progress for a specific object
   * 
   * @param objectName - Name of the object
   * @returns ChecklistProgress or undefined
   */
  getProgress(objectName: string): ChecklistProgress | undefined {
    return this.items.get(objectName);
  }
  
  /**
   * Get all objects
   * 
   * @returns Array of all ChecklistProgress items
   */
  getAllProgress(): ChecklistProgress[] {
    return Array.from(this.items.values());
  }
  
  /**
   * Get objects by status
   * 
   * @param phase - Phase to check
   * @param completed - Whether the phase is completed (true) or not (false)
   * @returns Array of object names
   */
  getObjectsByStatus(phase: string, completed: boolean = true): string[] {
    const results: string[] = [];
    
    for (const [name, progress] of this.items) {
      let status = false;
      if (phase === 'analyzed') status = progress.analyzed;
      else if (phase === 'typesGenerated') status = progress.typesGenerated;
      else if (phase === 'constantsGenerated') status = progress.constantsGenerated;
      else if (phase === 'utilsGenerated') status = progress.utilsGenerated;
      else if (phase === 'apisGenerated') status = progress.apisGenerated;
      else if (phase === 'extracted') status = progress.extracted;
      
      if (status === completed) {
        results.push(name);
      }
    }
    
    return results;
  }
  
  /**
   * Get summary statistics
   * 
   * @returns Object with counts for each phase
   */
  getSummary(): {
    total: number;
    extracted: number;
    analyzed: number;
    typesGenerated: number;
    constantsGenerated: number;
    utilsGenerated: number;
    apisGenerated: number;
    withErrors: number;
    withWarnings: number;
  } {
    let total = 0;
    let extracted = 0;
    let analyzed = 0;
    let typesGenerated = 0;
    let constantsGenerated = 0;
    let utilsGenerated = 0;
    let apisGenerated = 0;
    let withErrors = 0;
    let withWarnings = 0;
    
    for (const progress of this.items.values()) {
      total++;
      if (progress.extracted) extracted++;
      if (progress.analyzed) analyzed++;
      if (progress.typesGenerated) typesGenerated++;
      if (progress.constantsGenerated) constantsGenerated++;
      if (progress.utilsGenerated) utilsGenerated++;
      if (progress.apisGenerated) apisGenerated++;
      if (progress.errors.length > 0) withErrors++;
      if (progress.warnings.length > 0) withWarnings++;
    }
    
    return {
      total,
      extracted,
      analyzed,
      typesGenerated,
      constantsGenerated,
      utilsGenerated,
      apisGenerated,
      withErrors,
      withWarnings
    };
  }
  
  /**
   * Print full summary report
   */
  printSummary(): void {
    const summary = this.getSummary();
    const elapsed = (new Date().getTime() - this.startTime.getTime()) / 1000;
    
    console.log('\n');
    logInfo('='.repeat(50));
    logInfo('OBJECT CHECKLIST SUMMARY');
    logInfo('='.repeat(50));
    console.log('');
    
    logInfo(`Total objects: ${summary.total}`);
    logInfo(`Extracted: ${summary.extracted}/${summary.total}`);
    logInfo(`Analyzed: ${summary.analyzed}/${summary.total}`);
    logInfo(`Types Generated: ${summary.typesGenerated}/${summary.total}`);
    logInfo(`Constants Generated: ${summary.constantsGenerated}/${summary.total}`);
    logInfo(`Utils Generated: ${summary.utilsGenerated}/${summary.total}`);
    logInfo(`APIs Generated: ${summary.apisGenerated}/${summary.total}`);
    logInfo(`Objects with errors: ${summary.withErrors}`);
    logInfo(`Objects with warnings: ${summary.withWarnings}`);
    logInfo(`Time elapsed: ${elapsed.toFixed(2)} seconds`);
    
    if (summary.withErrors > 0) {
      console.log('\n');
      logError('Objects with errors:');
      for (const progress of this.items.values()) {
        if (progress.errors.length > 0) {
          console.log(`  ❌ ${progress.objectName}: ${progress.errors[0]}`);
        }
      }
    }
    
    console.log('');
    logInfo('='.repeat(50));
  }
  
  /**
   * Print progress bar for current phase
   * 
   * @param phase - Current phase name
   * @param processedCount - Number of objects processed in this phase
   * @param totalCount - Total objects to process
   */
  printPhaseProgress(phase: string, processedCount: number, totalCount: number): void {
    logProgress({
      total: totalCount,
      current: processedCount,
      label: phase
    });
  }
  
  /**
   * Save checkpoint to file
   */
  saveCheckpoint(): void {
    if (!this.options.checkpointFile) return;
    
    const checkpoint = {
      timestamp: new Date().toISOString(),
      startTime: this.startTime.toISOString(),
      items: Array.from(this.items.entries()),
      options: this.options
    };
    
    try {
      const fs = require('fs');
      fs.writeFileSync(
        this.options.checkpointFile,
        JSON.stringify(checkpoint, null, 2),
        'utf-8'
      );
      if (this.options.verbose) {
        logDebug(`Checkpoint saved to ${this.options.checkpointFile}`);
      }
    } catch (error) {
      logError(`Failed to save checkpoint: ${error}`);
    }
  }
  
  /**
   * Load checkpoint from file
   * 
   * @param filePath - Path to checkpoint file
   * @returns ObjectCheckList instance with loaded data
   */
  static loadCheckpoint(filePath: string): ObjectCheckList | null {
    try {
      const fs = require('fs');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      const checklist = new ObjectCheckList(data.options);
      checklist.startTime = new Date(data.startTime);
      
      for (const [name, progress] of data.items) {
        checklist.items.set(name, progress);
      }
      
      return checklist;
    } catch (error) {
      logError(`Failed to load checkpoint: ${error}`);
      return null;
    }
  }
  
  /**
   * Reset all progress for a specific object
   * 
   * @param objectName - Name of the object to reset
   */
  resetObject(objectName: string): void {
    const progress = this.items.get(objectName);
    if (progress) {
      progress.analyzed = false;
      progress.typesGenerated = false;
      progress.constantsGenerated = false;
      progress.utilsGenerated = false;
      progress.apisGenerated = false;
      progress.errors = [];
      progress.warnings = [];
      if (this.options.verbose) {
        logDebug(`Reset progress for ${objectName}`);
      }
    }
  }
  
  /**
   * Reset all objects (start over)
   */
  resetAll(): void {
    for (const name of this.items.keys()) {
      this.resetObject(name);
    }
    this.startTime = new Date();
    if (this.options.verbose) {
      logInfo('Reset all object progress');
    }
  }
  
  /**
   * Check if all objects have completed a phase
   * 
   * @param phase - Phase to check
   * @returns True if all objects have completed the phase
   */
  isPhaseComplete(phase: string): boolean {
    for (const progress of this.items.values()) {
      let completed = false;
      if (phase === 'analyzed') completed = progress.analyzed;
      else if (phase === 'typesGenerated') completed = progress.typesGenerated;
      else if (phase === 'constantsGenerated') completed = progress.constantsGenerated;
      else if (phase === 'utilsGenerated') completed = progress.utilsGenerated;
      else if (phase === 'apisGenerated') completed = progress.apisGenerated;
      
      if (!completed) return false;
    }
    return true;
  }
}