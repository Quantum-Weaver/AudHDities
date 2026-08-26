// @/scripts/core/file_reader.ts
// Handles encoding detection, BOM stripping, returns clean string

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { DB_TYPES_PATH } from './paths.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface FileReadResult {
  success: boolean;
  encoding: string;
  content: string;           // Clean content, BOM stripped
  rawContent: string;        // Original content with BOM (if needed)
  bomType: 'utf-8' | 'utf-16le' | 'utf-16be' | 'none';
  error?: string;
}

export function readDatabaseTypes(): FileReadResult {
  if (!fs.existsSync(DB_TYPES_PATH)) {
    return {
      success: false,
      encoding: 'unknown',
      content: '',
      rawContent: '',
      bomType: 'none',
      error: `File not found: ${DB_TYPES_PATH}`
    };
  }

  const buffer = fs.readFileSync(DB_TYPES_PATH);
  
  // Detect encoding from BOM
  let encoding: BufferEncoding = 'utf-8';
  let bomType: 'utf-8' | 'utf-16le' | 'utf-16be' | 'none' = 'none';
  let bomLength = 0;
  
  // UTF-16 LE BOM: FF FE
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    encoding = 'utf16le';
    bomType = 'utf-16le';
    bomLength = 2;
  }
  // UTF-16 BE BOM: FE FF
  else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    encoding = 'utf16le';
    bomType = 'utf-16be';
    bomLength = 2;
  }
  // UTF-8 BOM: EF BB BF
  else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    encoding = 'utf-8';
    bomType = 'utf-8';
    bomLength = 3;
  }
  
  const rawContent = buffer.toString(encoding);
  
  // Strip BOM from content for cleaner searching
  // For UTF-16 LE, the BOM is a character we need to slice
  let content = rawContent;
  if (bomType === 'utf-16le' || bomType === 'utf-16be') {
    // In UTF-16, the BOM is the first character (2 bytes)
    content = rawContent.slice(1);
  } else if (bomType === 'utf-8') {
    // In UTF-8, the BOM is the first character (3 bytes)
    content = rawContent.slice(1);
  }
  
  return {
    success: true,
    encoding,
    content,
    rawContent,
    bomType,
  };
}