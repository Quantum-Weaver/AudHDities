// src/app/api/admin/scan-files/route.ts
import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import ignore from 'ignore';

// File type detection with emoji mapping
const fileTypeMap: Record<string, { emoji: string; type: string }> = {
  // Pages
  'page.tsx': { emoji: '📄', type: 'page' },
  'layout.tsx': { emoji: '📄', type: 'layout' },
  'route.ts': { emoji: '🌐', type: 'api' },
  
  // Components
  '.tsx': { emoji: '🧩', type: 'component' },
  
  // Utilities
  'utils.ts': { emoji: '🔧', type: 'utility' },
  'utils.tsx': { emoji: '🔧', type: 'utility' },
  
  // Types
  '.types.ts': { emoji: '🧠', type: 'type' },
  'types.ts': { emoji: '🧠', type: 'type' },
  
  // Data
  '-data.ts': { emoji: '📊', type: 'data' },
  'data.ts': { emoji: '📊', type: 'data' },
  
  // Hooks
  'use*.ts': { emoji: '🪝', type: 'hook' },
  'use*.tsx': { emoji: '🪝', type: 'hook' },
  
  // Styles
  '.css': { emoji: '🎨', type: 'style' },
  
  // Config
  'config.ts': { emoji: '⚙️', type: 'config' },
  '*.config.*': { emoji: '⚙️', type: 'config' },
  
  // Docs
  '.md': { emoji: '📚', type: 'doc' },
  
  // Database
  '.sql': { emoji: '🗄️', type: 'database' },
};

function detectFileType(fileName: string): { emoji: string; type: string } {
  for (const [pattern, mapping] of Object.entries(fileTypeMap)) {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      if (regex.test(fileName)) return mapping;
    } else if (fileName.endsWith(pattern) || fileName === pattern) {
      return mapping;
    }
  }
  return { emoji: '📄', type: 'unknown' };
}

export async function POST() {
  try {
    const ig = ignore();
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    
    // Load .gitignore
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf-8');
      ig.add(content.split('\n').filter(Boolean));
    }
    
    // Always exclude these
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
      'package-lock.json',
      'yarn.lock',
    ]);
    
    const files: any[] = [];
    
    function scan(dir: string, relativePath: string = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);
        
        if (ig.ignores(relPath)) continue;
        
        if (entry.isDirectory()) {
          scan(fullPath, relPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          const fileName = entry.name;
          
          // Only include relevant extensions
          const relevantExts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.md', '.sql'];
          if (!relevantExts.includes(ext)) continue;
          
          const { emoji, type } = detectFileType(fileName);
          
          files.push({
            file_path: relPath,
            file_name: fileName,
            file_type: type,
            emoji: emoji,
            category: type,
            purpose: null, // To be filled manually or via AI
            standards: null,
            is_active: true,
          });
        }
      }
    }
    
    scan(process.cwd());
    
    return NextResponse.json({ 
      success: true, 
      count: files.length,
      files 
    });
    
  } catch (error: any) {
    console.error('Scan failed:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}