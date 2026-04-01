// scripts/scan-files.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get all tracked files (git already excludes node_modules, .next, etc.)
const trackedFiles = execSync('git ls-files', { encoding: 'utf-8' })
  .split('\n')
  .filter(Boolean);

// Filter for specific extensions we care about
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.md', '.sql'];
const codeFiles = trackedFiles.filter(file => 
  extensions.some(ext => file.endsWith(ext))
);

console.log(`Found ${codeFiles.length} source files`);