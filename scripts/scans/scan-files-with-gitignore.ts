// scripts/scan-files-with-gitignore.ts
import fs from 'fs';
import path from 'path';
import ignore from 'ignore'; // npm install ignore

const ig = ignore();
const gitignorePath = path.join(process.cwd(), '.gitignore');

if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  ig.add(gitignoreContent);
}

// Always exclude these additional patterns
ig.add([
  'node_modules/',
  '.next/',
  '.git/',
  'dist/',
  '.vercel/',
  'coverage/',
  '.cache/',
  'out/',
  '*.log',
  '.env*',
]);

function scanDirectory(dir: string, relativePath: string = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);
    
    // Check if this path should be ignored
    if (ig.ignores(relPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, relPath);
    } else if (entry.isFile()) {
      // Process file
      console.log('Found:', relPath);
    }
  }
}

scanDirectory(process.cwd());