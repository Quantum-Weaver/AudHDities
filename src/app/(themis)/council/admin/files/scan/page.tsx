// app/(dashboard)/admin/files/scan/page.tsx
'use client';

import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/client';

export default function FileScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const supabase = useSupabase();

  const triggerScan = async () => {
    setScanning(true);
    
    // Call API route that runs the scanner
    const response = await fetch('/api/admin/scan-files', {
      method: 'POST',
    });
    
    const data = await response.json();
    setResults(data.files);
    setScanning(false);
  };

  const uploadToRegistry = async (files: any[]) => {
    const { error } = await supabase
      .from('file_registry')
      .upsert(files);
      
    if (error) console.error('Upload failed:', error);
  };

  return (
    <div>
      <button 
        onClick={triggerScan}
        disabled={scanning}
        className="px-4 py-2 bg-cyan-600 text-white rounded"
      >
        {scanning ? 'Scanning...' : 'Scan Repository'}
      </button>
      
      {results.length > 0 && (
        <button 
          onClick={() => uploadToRegistry(results)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Upload to Registry
        </button>
      )}
      
      <div className="mt-4">
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
}