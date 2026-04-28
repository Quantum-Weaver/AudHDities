// src/components/onboarding/InfoTable.tsx
'use client';

interface InfoTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  variant?: 'comparison' | 'pricing';
}

export function InfoTable({ headers, rows, variant = 'comparison' }: InfoTableProps) {
  const isPricing = variant === 'pricing';
  
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className={`border-b ${isPricing ? 'border-cyan-500/30' : 'border-white/10'}`}>
            {headers.map((header, idx) => (
              <th key={idx} className={`text-left py-3 px-4 text-star-dust font-medium ${isPricing && idx === 0 ? 'text-neurospark' : ''}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className={`py-3 px-4 text-star-dust/70 ${isPricing && cellIdx === 1 ? 'font-mono text-neurospark' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}