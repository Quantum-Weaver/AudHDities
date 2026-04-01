import fs from 'fs';
import path from 'path';

export interface SQLStatement {
  type: 'CREATE' | 'DROP' | 'ALTER' | 'COMMENT';
  objectType: 'TYPE' | 'TABLE' | 'FUNCTION' | 'TRIGGER' | 'POLICY' | 'VIEW' | 'INDEX';
  name: string;
  fullStatement: string;
  lineNumber: number;
  filePath: string;
}

export interface Conflict {
  type: 'DUPLICATE' | 'MISSING_DEPENDENCY' | 'INCOMPATIBLE' | 'REFERENCE_ERROR';
  message: string;
  items: string[];
  files: string[];
}

export interface AnalysisResult {
  totalStatements: number;
  uniqueItems: Map<string, SQLStatement>;
  duplicates: Conflict[];
  conflicts: Conflict[];
  warnings: string[];
  filesProcessed: string[];
}

/**
 * Read all SQL files from a directory
 */
export function readSQLFilesFromDirectory(dirPath: string): { filePath: string; content: string }[] {
  const results: { filePath: string; content: string }[] = [];
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ Directory not found: ${dirPath}`);
    return results;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    if (file.endsWith('.sql')) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      results.push({ filePath, content });
    }
  }
  
  return results;
}

/**
 * Parse SQL content and extract CREATE statements
 */
export function parseSQLContent(content: string, filePath: string): SQLStatement[] {
  const lines = content.split('\n');
  const statements: SQLStatement[] = [];

  let currentStatement = '';
  let inComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip comment lines
    if (line.trim().startsWith('--') && !inComment) {
      continue;
    }
    
    currentStatement += line + '\n';
    
    // Check if statement ends with semicolon
    if (line.trim().endsWith(';')) {
      const trimmed = currentStatement.trim();
      
      // Check for CREATE statements
      if (trimmed.toUpperCase().startsWith('CREATE')) {
        const statement = parseCreateStatement(trimmed, i + 1, filePath);
        if (statement) {
          statements.push(statement);
        }
      }
      
      currentStatement = '';
    }
  }
  
  return statements;
}

/**
 * Parse a CREATE statement into structured data
 */
function parseCreateStatement(sql: string, lineNumber: number, filePath: string): SQLStatement | null {
  const upper = sql.toUpperCase();
  
  // CREATE TYPE (enum)
  if (upper.includes('CREATE TYPE') && !upper.includes('AS TABLE')) {
    const match = sql.match(/CREATE\s+TYPE\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (match) {
      return {
        type: 'CREATE',
        objectType: 'TYPE',
        name: match[1].toLowerCase(),
        fullStatement: sql,
        lineNumber,
        filePath,
      };
    }
  }
  
  // CREATE TABLE
  if (upper.includes('CREATE TABLE')) {
    const match = sql.match(/CREATE\s+TABLE\s+(?:IF NOT EXISTS\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (match) {
      return {
        type: 'CREATE',
        objectType: 'TABLE',
        name: match[1].toLowerCase(),
        fullStatement: sql,
        lineNumber,
        filePath,
      };
    }
  }
  
  // CREATE FUNCTION
  if (upper.includes('CREATE FUNCTION')) {
    const match = sql.match(/CREATE\s+FUNCTION\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (match) {
      return {
        type: 'CREATE',
        objectType: 'FUNCTION',
        name: match[1].toLowerCase(),
        fullStatement: sql,
        lineNumber,
        filePath,
      };
    }
  }
  
  // CREATE TRIGGER
  if (upper.includes('CREATE TRIGGER')) {
    const match = sql.match(/CREATE\s+TRIGGER\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (match) {
      return {
        type: 'CREATE',
        objectType: 'TRIGGER',
        name: match[1].toLowerCase(),
        fullStatement: sql,
        lineNumber,
        filePath,
      };
    }
  }
  
  // CREATE POLICY
  if (upper.includes('CREATE POLICY')) {
    const match = sql.match(/CREATE\s+POLICY\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (match) {
      return {
        type: 'CREATE',
        objectType: 'POLICY',
        name: match[1].toLowerCase(),
        fullStatement: sql,
        lineNumber,
        filePath,
      };
    }
  }
  
  return null;
}

/**
 * Extract enum values from a CREATE TYPE statement
 */
export function extractEnumValues(sql: string): string[] {
  const match = sql.match(/AS\s+ENUM\s*\(\s*([^)]+)\s*\)/i);
  if (!match) return [];
  
  return match[1]
    .split(',')
    .map(v => v.trim().replace(/'/g, ''))
    .filter(v => v.length > 0);
}