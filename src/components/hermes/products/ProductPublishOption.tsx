// src/components/products/ProductPublishOption.tsx
'use client';

import { UseFormRegister } from 'react-hook-form';

interface ProductPublishOptionProps {
  register: UseFormRegister<any>;
}

export function ProductPublishOption({ register }: ProductPublishOptionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_published"
          {...register('is_published')}
          className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
        />
        <label htmlFor="is_published" className="text-white">
          Publish immediately
        </label>
      </div>
      <p className="text-xs text-white/40 ml-7">
        If unchecked, your product will be saved as a draft. You can publish it later.
      </p>
    </div>
  );
}