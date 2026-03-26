#!/usr/bin/env node
"use strict";
/**
 * Folder Content Scanner - Simplified Version
 *
 * Scans specified folders and outputs their complete contents
 * in compressed .ai.json format for AI analysis.
 *
 * Usage: node scan-folders.js
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));

// =====================================================
// FOLDERS TO SCAN - UPDATE THESE PATHS
// =====================================================
const FOLDERS_TO_SCAN = [
    // Core Types
    'types/supabase/tables',
    'types/supabase',
    'types',
    
    // Hooks
    'hooks',
    
    // API Routes
    'app/api',
    
    // Components
    'components/products',
    'components/checkout',
    'components/profiles',
    'components/ui',
    
    // Pages
    'app/(marketplace)',
    'app/(dashboard)/creator',
    'app/(dashboard)/vendor',
    
    // Utilities
    'lib',
    
    // =====================================================
    // COMMENTED OUT - ADD BACK IF NEEDED
    // =====================================================
    // 'app/constants',
    // 'app/data',
    // 'app/contexts',
    // 'app/alchemy',
    // 'app/architecture',
    // 'app/community',
    // 'app/council',
    // 'app/invitation',
    // 'app/library',
    // 'app/music',
    // 'app/origin',
    // 'app/sandbox',
    // 'app/support',
    // 'app/components/environment',
    // 'app/components/transitions',
    // 'app/components/immersive',
    // 'app/components/domain',
    // 'app/components/ui/layout',
    // 'app/components/ui/icons',
    // 'app/components/ui/buttons',
    // 'app/components/ui/cards',
    // 'app/components/ui/displays',
    // 'app/components/ui/grids',
    // 'app/components/domain'
];

// File extensions to include
const ALLOWED_EXTENSIONS = ['.ts', '.tsx'];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;
    
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
 * Process a file - simplified to just path, name, extension
 */
function processFile(filePath, baseDir) {
    const relativePath = path.relative(baseDir, filePath);
    return {
        path: filePath,
        relativePath: relativePath.replace(/\\/g, '/'),
        name: path.basename(filePath),
        extension: path.extname(filePath)
    };
}

/**
 * Scan a folder and return all file names
 */
function scanFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.warn(`⚠️  Folder not found: ${folderPath}`);
        return null;
    }
    
    console.log(`📁 Scanning ${folderPath}...`);
    const files = getAllFiles(folderPath);
    
    const fileList = files.map((filePath) => {
        const stats = fs.statSync(filePath);
        return processFile(filePath, folderPath);
    });
    
    // Sort files by path
    fileList.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
    
    return {
        folder: folderPath,
        scannedAt: new Date().toISOString(),
        totalFiles: fileList.length,
        files: fileList
    };
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Starting folder scan...\n');
    
    const outputDir = 'ai-scans';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    let totalScanned = 0;
    let totalFailed = 0;
    const allScans = {};
    
    FOLDERS_TO_SCAN.forEach((folder) => {
        const scanResult = scanFolder(folder);
        if (scanResult) {
            const fileName = folder.replace(/\//g, '-') + '.json';
            const outputPath = path.join(outputDir, fileName);
            
            fs.writeFileSync(outputPath, JSON.stringify(scanResult, null, 2), 'utf-8');
            
            allScans[folder] = scanResult;
            totalScanned++;
            
            console.log(`   ✅ ${scanResult.totalFiles} files`);
        } else {
            totalFailed++;
        }
    });
    
    // Combined output
    const combinedPath = path.join(outputDir, 'all-folders.json');
    fs.writeFileSync(combinedPath, JSON.stringify({
        scannedAt: new Date().toISOString(),
        folders: allScans
    }, null, 2), 'utf-8');
    
    console.log('\n📊 Summary:');
    console.log(`   Scanned: ${totalScanned} folders`);
    console.log(`   Failed: ${totalFailed} folders`);
    console.log(`   Output: ${combinedPath}`);
    console.log('\n✨ Done!');
}

main();