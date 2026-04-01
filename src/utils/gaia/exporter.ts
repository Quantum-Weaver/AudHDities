// src/utils/gaia/exporters.ts

/**
 * Pure data export utilities for the quantum system
 */

export const exportMusicAnalysis = (analysisData: any, filename: string = 'music-analysis.json') => {
  const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportPlatformData = (platformData: any, filename: string = 'platform-data.json') => {
  const blob = new Blob([JSON.stringify(platformData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportConfiguration = (configData: any, filename: string = 'configuration.json') => {
  const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportDesignSystem = (designData: any, filename: string = 'design-system.json') => {
  const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportComponentLibrary = (componentsData: any, filename: string = 'component-library.json') => {
  const blob = new Blob([JSON.stringify(componentsData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportArchitectureReport = (architectureData: any, filename: string = 'architecture-report.json') => {
  const blob = new Blob([JSON.stringify(architectureData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportContentLibrary = (contentData: any, filename: string = 'content-library.json') => {
  const blob = new Blob([JSON.stringify(contentData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Additional export utilities from the legacy file
export const exportToCSV = (data: any[], filename: string = 'export.csv') => {
  const headers = Object.keys(data[0] || {});
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const createDataSnapshot = (data: any, name: string) => ({
  timestamp: new Date().toISOString(),
  name,
  data,
  version: '1.0'
});

export const createBatchExport = (exports: Record<string, any>) => ({
  timestamp: new Date().toISOString(),
  exports: Object.keys(exports).map(key => ({
    type: key,
    data: exports[key],
    count: Array.isArray(exports[key]) ? exports[key].length : 1
  }))
});

export function exportToJSON(data: any, filename: string = 'quantum-data') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `${filename}.json`);
}

export function exportQuantumContext(context: any) {
  return exportToJSON(context, `quantum-context-${Date.now()}`);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Consolidated exporter object for backward compatibility
 */
export const exporters = {
  json: exportMusicAnalysis, // Using music analysis as the default JSON exporter
  csv: exportToCSV,
  snapshot: createDataSnapshot,
  batch: createBatchExport,
  
  // Domain-specific exporters
  musicAnalysis: exportMusicAnalysis,
  platformData: exportPlatformData,
  configuration: exportConfiguration,
  designSystem: exportDesignSystem,
  componentLibrary: exportComponentLibrary,
  architectureReport: exportArchitectureReport,
  contentLibrary: exportContentLibrary
} as const;

// Type exports for the export system
export type ExportFormat = 'json' | 'csv' | 'snapshot' | 'batch';
export type ExportResult = {
  success: boolean;
  filename?: string;
  timestamp: string;
  size?: number;
};