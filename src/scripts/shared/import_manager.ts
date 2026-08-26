// src/scripts/shared/import_manager.ts
// ============================================================================
// ============================================================================
// Used by: All GAIA format generators
// ============================================================================

export interface ImportStatement {
  source: string;
  defaultImport?: string;
  namedImports: string[];
  typeImports: string[];
  isTypeOnly?: boolean;
}

export interface ImportManagerOptions {
  sortAlphabetically?: boolean;
  groupBySource?: boolean;
}

/**
 * ImportManager - Collects and deduplicates imports from multiple sources
 * Ensures each import appears once, with combined named imports
 */
export class ImportManager {
  private imports: Map<string, ImportStatement> = new Map();
  private options: ImportManagerOptions;
  
  constructor(options: ImportManagerOptions = {}) {
    this.options = {
      sortAlphabetically: true,
      groupBySource: true,
      ...options
    };
  }
  
  /**
   * Add a named import from a source
   * @param source - Module path (e.g., '@/lib/api/auth')
   * @param namedImport - Name to import (e.g., 'successResponse')
   * @param isType - Whether this is a type import
   */
  addImport(source: string, namedImport: string, isType: boolean = false): void {
    if (!this.imports.has(source)) {
      this.imports.set(source, {
        source,
        namedImports: [],
        typeImports: []
      });
    }
    
    const statement = this.imports.get(source)!;
    const targetArray = isType ? statement.typeImports : statement.namedImports;
    
    if (!targetArray.includes(namedImport)) {
      targetArray.push(namedImport);
    }
  }
  
  /**
   * Add multiple named imports from the same source
   * @param source - Module path
   * @param namedImports - Array of names to import
   * @param isType - Whether these are type imports
   */
  addImports(source: string, namedImports: string[], isType: boolean = false): void {
    for (const namedImport of namedImports) {
      this.addImport(source, namedImport, isType);
    }
  }
  
  /**
   * Add a default import
   * @param source - Module path
   * @param defaultName - Default import name (e.g., 'z' from 'zod')
   */
  addDefaultImport(source: string, defaultName: string): void {
    if (!this.imports.has(source)) {
      this.imports.set(source, {
        source,
        defaultImport: defaultName,
        namedImports: [],
        typeImports: []
      });
    } else {
      const statement = this.imports.get(source)!;
      statement.defaultImport = defaultName;
    }
  }
  
  /**
   * Check if a source has any imports
   */
  hasImports(source: string): boolean {
    const statement = this.imports.get(source);
    if (!statement) return false;
    return !!(
      statement.defaultImport ||
      statement.namedImports.length > 0 ||
      statement.typeImports.length > 0
    );
  }
  
  /**
   * Get the complete import block as a formatted string
   */
  getImportBlock(): string {
    if (this.imports.size === 0) return '';
    
    let statements = Array.from(this.imports.values());
    
    if (this.options.sortAlphabetically) {
      statements = statements.sort((a, b) => a.source.localeCompare(b.source));
    }
    
    const lines: string[] = [];
    
    for (const imp of statements) {
      const parts: string[] = [];
      
      if (imp.defaultImport) {
        parts.push(imp.defaultImport);
      }
      
      if (imp.namedImports.length > 0) {
        imp.namedImports.sort();
        parts.push(`{ ${imp.namedImports.join(', ')} }`);
      }
      
      if (imp.typeImports.length > 0) {
        imp.typeImports.sort();
        parts.push(`type { ${imp.typeImports.join(', ')} }`);
      }
      
      lines.push(`import ${parts.join(', ')} from '${imp.source}';`);
    }
    
    return lines.join('\n');
  }
  
  /**
   * Get import block with blank line separation between groups
   */
  getGroupedImportBlock(): string {
    const statements = Array.from(this.imports.values());
    
    // Group by source prefix
    const groups: Map<string, ImportStatement[]> = new Map();
    
    for (const imp of statements) {
      const prefix = imp.source.split('/')[0];
      if (!groups.has(prefix)) {
        groups.set(prefix, []);
      }
      groups.get(prefix)!.push(imp);
    }
    
    const groupLines: string[] = [];
    const groupOrder = ['@/', 'node:', '', '.', '..'];
    
    for (const prefix of groupOrder) {
      const group = groups.get(prefix);
      if (group && group.length > 0) {
        for (const imp of group.sort((a, b) => a.source.localeCompare(b.source))) {
          const parts: string[] = [];
          if (imp.defaultImport) parts.push(imp.defaultImport);
          if (imp.namedImports.length > 0) {
            imp.namedImports.sort();
            parts.push(`{ ${imp.namedImports.join(', ')} }`);
          }
          if (imp.typeImports.length > 0) {
            imp.typeImports.sort();
            parts.push(`type { ${imp.typeImports.join(', ')} }`);
          }
          groupLines.push(`import ${parts.join(', ')} from '${imp.source}';`);
        }
        groupLines.push('');
      }
    }
    
    return groupLines.join('\n').trim();
  }
  
  /**
   * Reset all imports
   */
  reset(): void {
    this.imports.clear();
  }
  
  /**
   * Get the number of unique import sources
   */
  getSourceCount(): number {
    return this.imports.size;
  }
  
  /**
   * Get all import statements (for debugging)
   */
  getAllImports(): ImportStatement[] {
    return Array.from(this.imports.values());
  }
}

/**
 * Helper function to create a formatted import block from an array of imports
 */
export function createImportBlock(imports: Array<{ source: string; names: string[]; isType?: boolean }>): string {
  const manager = new ImportManager();
  for (const imp of imports) {
    manager.addImports(imp.source, imp.names, imp.isType || false);
  }
  return manager.getImportBlock();
}