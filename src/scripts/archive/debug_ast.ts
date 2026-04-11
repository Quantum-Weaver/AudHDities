// @/scripts/debug-ast.ts
// Debug script to examine AST structure
// Run with: npx tsx src/scripts/debug-ast.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_TYPES_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');

// Simple function to get node kind as string
function getKindName(node: ts.Node): string {
  return ts.SyntaxKind[node.kind];
}

// Recursively print AST with depth limit
function printAST(node: ts.Node, depth: number = 0, maxDepth: number = 5): void {
  if (depth > maxDepth) return;
  
  const indent = '  '.repeat(depth);
  const kindName = getKindName(node);
  
  // Additional info for certain node types
  let extra = '';
  if (ts.isIdentifier(node)) {
    extra = ` "${node.text}"`;
  } else if (ts.isStringLiteral(node)) {
    extra = ` "${node.text}"`;
  } else if (ts.isVariableStatement(node)) {
    const declarations = node.declarationList.declarations;
    const names = declarations.map(d => ts.isIdentifier(d.name) ? d.name.text : '?').join(', ');
    extra = ` names: ${names}`;
  } else if (ts.isTypeAliasDeclaration(node)) {
    extra = ` name: ${node.name.text}`;
  } else if (ts.isPropertySignature(node) && ts.isIdentifier(node.name)) {
    extra = ` name: ${node.name.text}`;
  } else if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
    extra = ` name: ${node.name.text}`;
  }
  
  console.log(`${indent}📦 ${kindName}${extra}`);
  
  ts.forEachChild(node, child => printAST(child, depth + 1, maxDepth));
}

function main(): void {
  console.log('\n');
  console.log('═'.repeat(70));
  console.log('🔍 AST DEBUGGER - Raw TypeScript AST Structure');
  console.log('═'.repeat(70));
  console.log(`\n📁 File: ${DB_TYPES_PATH}\n`);
  
  // Check if file exists
  if (!fs.existsSync(DB_TYPES_PATH)) {
    console.error(`❌ File not found: ${DB_TYPES_PATH}`);
    process.exit(1);
  }
  
  console.log('✅ File found. Parsing...\n');
  console.log('─'.repeat(70));
  console.log('📜 AST STRUCTURE (first 5 levels deep):');
  console.log('─'.repeat(70));
  console.log('');
  
  // Read and parse
  const fileContent = fs.readFileSync(DB_TYPES_PATH, 'utf-8');
  const sourceFile = ts.createSourceFile(
    DB_TYPES_PATH,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );
  
  // Print full AST
  printAST(sourceFile, 0, 5);
  
  console.log('\n');
  console.log('─'.repeat(70));
  console.log('🔍 SEARCHING FOR SPECIFIC PATTERNS:');
  console.log('─'.repeat(70));
  console.log('');
  
  // Search for export const Constants
  let foundConstants = false;
  let foundGraphqlPublic = false;
  let foundEnums = false;
  let foundDatabase = false;
  let foundPublic = false;
  let foundTables = false;
  
  function search(node: ts.Node) {
    // Look for export const Constants
    if (ts.isVariableStatement(node)) {
      const hasExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
      const declarations = node.declarationList.declarations;
      for (const decl of declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === 'Constants' && hasExport) {
          foundConstants = true;
          console.log('✅ Found: export const Constants');
          console.log(`   Location: line ${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}`);
        }
      }
    }
    
    // Look for export type Database
    if (ts.isTypeAliasDeclaration(node)) {
      const hasExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
      if (node.name.text === 'Database' && hasExport) {
        foundDatabase = true;
        console.log('✅ Found: export type Database');
        console.log(`   Location: line ${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}`);
      }
    }
    
    ts.forEachChild(node, search);
  }
  
  search(sourceFile);
  
  console.log('');
  console.log('─'.repeat(70));
  console.log('📊 SEARCH SUMMARY:');
  console.log('─'.repeat(70));
  console.log(`  export const Constants: ${foundConstants ? '✅ FOUND' : '❌ NOT FOUND'}`);
  console.log(`  export type Database: ${foundDatabase ? '✅ FOUND' : '❌ NOT FOUND'}`);
  
  console.log('\n');
  console.log('─'.repeat(70));
  console.log('📝 FIRST 50 LINES OF FILE (for reference):');
  console.log('─'.repeat(70));
  console.log('');
  
  const lines = fileContent.split('\n');
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    console.log(`${String(i + 1).padStart(4)} | ${lines[i]}`);
  }
  
  console.log('\n');
  console.log('═'.repeat(70));
  console.log('🔍 Debug complete. Review output above.');
  console.log('═'.repeat(70));
  console.log('');
}

main();