// src/components/products/ProductFormError.tsx
'use client';

import { AlertCircle } from 'lucide-react';

interface ProductFormErrorProps {
  error: string | null;
}

export function ProductFormError({ error }: ProductFormErrorProps) {
  if (!error) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
}