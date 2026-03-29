// src/components/products/ProductFormSuccess.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

interface ProductFormSuccessProps {
  mode: 'create' | 'edit';
  onReturn: () => void;
}

export function ProductFormSuccess({ mode, onReturn }: ProductFormSuccessProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-green-400" size={32} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {mode === 'create' ? 'Product Created!' : 'Product Updated!'}
      </h3>
      <p className="text-white/60 mb-6">
        {mode === 'create' 
          ? 'Your product has been created. You can now add contributors and publish it.'
          : 'Your product has been updated.'}
      </p>
      <Button onClick={onReturn}>
        Return to Products
      </Button>
    </div>
  );
}