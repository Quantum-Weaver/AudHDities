// scripts/fix-insert-schemas.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Auto-generated fields that should remain optional in Insert
const AUTO_FIELDS = ['created_at', 'updated_at', 'deleted_at', 'created_by'];

// Fields that should NEVER be optional in Insert
const REQUIRED_FIELDS = ['id', 'email'];

function fixInsertSchema(content: string, tableName: string): { content: string; fixed: string[] } {
  const fixed: string[] = [];
  const lines = content.split('\n');
  const newLines: string[] = [];
  
  let inInsertSchema = false;
  let insertSchemaStart = -1;
  let insertSchemaEnd = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('InsertSchema = z.object({')) {
      inInsertSchema = true;
      insertSchemaStart = i;
    }
    if (inInsertSchema && lines[i].includes('});') && insertSchemaStart !== -1) {
      insertSchemaEnd = i;
      break;
    }
  }
  
  if (insertSchemaStart === -1) {
    return { content, fixed };
  }
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Only modify lines inside InsertSchema
    if (i > insertSchemaStart && i < insertSchemaEnd) {
      for (const field of REQUIRED_FIELDS) {
        const pattern = new RegExp(`(${field}: z\\.[a-zA-Z0-9_\\.]+\\(\\)(?:\\.nullable\\(\\))?)\\.optional\\(\\)`);
        if (pattern.test(line)) {
          line = line.replace(pattern, '$1');
          fixed.push(field);
        }
      }
      
      const fieldMatch = line.match(/^\s*(\w+):/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        if (!AUTO_FIELDS.includes(fieldName) && !REQUIRED_FIELDS.includes(fieldName)) {
          if (line.includes('.optional()')) {
            const basePattern = new RegExp(`(${fieldName}: z\\.[a-zA-Z0-9_\\.]+\\(\\)(?:\\.nullable\\(\\))?)\\.optional\\(\\)`);
            if (basePattern.test(line)) {
              line = line.replace(basePattern, '$1');
              fixed.push(fieldName);
            }
          }
        }
      }
    }
    
    newLines.push(line);
  }
  
  return { content: newLines.join('\n'), fixed };
}

function walkDirectory(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...walkDirectory(fullPath));
    } else if (item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function main() {
  console.log('🔧 Fixing Insert Schemas in Validators\n');
  console.log('='.repeat(60));
  
  const validatorsDir = path.join(PROJECT_ROOT, 'lib/validators/generated');
  
  if (!fs.existsSync(validatorsDir)) {
    console.error(`❌ Validators directory not found: ${validatorsDir}`);
    process.exit(1);
  }
  
  const validatorFiles = walkDirectory(validatorsDir);
  console.log(`📁 Found ${validatorFiles.length} validator files\n`);
  
  let totalFixed = 0;
  const fixedFiles: string[] = [];
  
  for (const filePath of validatorFiles) {
    const tableName = path.basename(filePath, '.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const { content: newContent, fixed } = fixInsertSchema(content, tableName);
    
    if (fixed.length > 0) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ ${tableName}: fixed ${fixed.join(', ')}`);
      totalFixed += fixed.length;
      fixedFiles.push(filePath);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 SUMMARY`);
  console.log('='.repeat(60));
  console.log(`Files modified: ${fixedFiles.length}`);
  console.log(`Fields fixed: ${totalFixed}`);
  
  if (fixedFiles.length > 0) {
    console.log('\n📝 Modified files:');
    fixedFiles.forEach(f => console.log(`  - ${path.relative(PROJECT_ROOT, f)}`));
  }
  
  console.log('\n✅ Done!');
}

main().catch(console.error);