// components/legal/PrivacyTable.tsx
'use client';

interface PrivacyTableProps {
  headers: string[];
  rows: string[][];
}

export function PrivacyTable({ headers, rows }: PrivacyTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((header, idx) => (
              <th key={idx} className="text-left py-3 px-4 text-white font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="py-3 px-4 text-white/70">
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