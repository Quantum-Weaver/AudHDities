#!/usr/bin/env node
/**
 * Folder Content Scanner
 * 
 * Scans specified folders and outputs their complete contents
 * in compressed .ai.json format for AI analysis.
 * 
 * Usage: node scan-folders.js
 * Or: ts-node scan-folders.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface FileContent {
  path: string;
  relativePath: string;
  name: string;
  extension: string;
  size: number;
  lines: number;
  content: string;
}

interface FolderScan {
  folder: string;
  scannedAt: string;
  totalFiles: number;
  totalLines: number;
  totalSize: number;
  files: FileContent[];
}

// Folders to scan
const FOLDERS_TO_SCAN = [
  'app/constants',
  'app/data',
  'app/types',
  'app/utils'
];

// File extensions to include
const ALLOWED_EXTENSIONS = ['.ts', '.tsx'];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file);
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Read and process a single file
 */
function processFile(filePath: string, baseDir: string): FileContent {
  const content = fs.readFileSync(filePath, 'utf-8');
  const stats = fs.statSync(filePath);
  const lines = content.split('\n').length;
  const relativePath = path.relative(baseDir, filePath);

  return {
    path: filePath,
    relativePath: relativePath.replace(/\\/g, '/'), // Normalize path separators
    name: path.basename(filePath),
    extension: path.extname(filePath),
    size: stats.size,
    lines,
    content
  };
}

/**
 * Scan a folder and return all file contents
 */
function scanFolder(folderPath: string): FolderScan | null {
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️  Folder not found: ${folderPath}`);
    return null;
  }

  console.log(`📂 Scanning ${folderPath}...`);

  const files = getAllFiles(folderPath);
  const fileContents: FileContent[] = [];
  
  let totalLines = 0;
  let totalSize = 0;

  files.forEach((filePath) => {
    const fileContent = processFile(filePath, folderPath);
    fileContents.push(fileContent);
    totalLines += fileContent.lines;
    totalSize += fileContent.size;
  });

  // Sort files by path for consistent ordering
  fileContents.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  return {
    folder: folderPath,
    scannedAt: new Date().toISOString(),
    totalFiles: fileContents.length,
    totalLines,
    totalSize,
    files: fileContents
  };
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting folder scan...\n');

  const outputDir = 'ai-scans';
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let totalScanned = 0;
  let totalFailed = 0;

  FOLDERS_TO_SCAN.forEach((folder) => {
    const scanResult = scanFolder(folder);
    
    if (scanResult) {
      // Create filename from folder path
      const fileName = folder.replace(/\//g, '-') + '.ai.json';
      const outputPath = path.join(outputDir, fileName);
      
      // Write to file (minified JSON for compression)
      fs.writeFileSync(
        outputPath,
        JSON.stringify(scanResult, null, 0), // null, 0 for minified
        'utf-8'
      );
      
      totalScanned++;
      
      console.log(`✅ ${folder}`);
      console.log(`   Files: ${scanResult.totalFiles}`);
      console.log(`   Lines: ${scanResult.totalLines.toLocaleString()}`);
      console.log(`   Size: ${(scanResult.totalSize / 1024).toFixed(2)} KB`);
      console.log(`   Output: ${outputPath}\n`);
    } else {
      totalFailed++;
    }
  });

  // Create combined file with all scans
  const allScans: Record<string, FolderScan> = {};
  
  FOLDERS_TO_SCAN.forEach((folder) => {
    const fileName = folder.replace(/\//g, '-') + '.ai.json';
    const filePath = path.join(outputDir, fileName);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      allScans[folder] = JSON.parse(content);
    }
  });

  const combinedPath = path.join(outputDir, 'all-folders.ai.json');
  fs.writeFileSync(
    combinedPath,
    JSON.stringify({
      scannedAt: new Date().toISOString(),
      folders: allScans
    }, null, 0),
    'utf-8'
  );

  console.log('📊 Summary:');
  console.log(`   Scanned: ${totalScanned} folders`);
  console.log(`   Failed: ${totalFailed} folders`);
  console.log(`   Combined output: ${combinedPath}`);
  console.log('\n✨ Done!');
}

// Run the script
main();