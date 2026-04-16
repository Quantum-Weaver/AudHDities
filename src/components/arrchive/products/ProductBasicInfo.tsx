// src/components/products/ProductBasicInfo.tsx
'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { PRODUCT_CATEGORIES } from '@/types/categories';

interface ProductBasicInfoProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watchProductType: string;
  setValue: UseFormSetValue<any>;
  mode: 'create' | 'edit';
  initialSlug?: string;
}

const productTypeOptions = PRODUCT_CATEGORIES.map(cat => ({
  value: cat.value,
  label: cat.label
}));

export function ProductBasicInfo({
  register,
  errors,
  watchProductType,
  setValue,
  mode,
  initialSlug
}: ProductBasicInfoProps) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <Input
        label="Product Title"
        placeholder="e.g., The Quantum Weaver's Guide"
        {...register('title')}
        required
        helperText="A clear, descriptive title helps people discover your work"
      />

      {/* Slug */}
      <Input
        label="URL Slug"
        placeholder="e.g., quantum-weaver-guide"
        {...register('slug')}
        required
        helperText="Used in the product URL. Use lowercase letters, numbers, and hyphens only."
      />

      {/* Product Type */}
      <Select
        label="Product Type"
        value={watchProductType}
        onChange={(e) => setValue('product_type', e.target.value)}
        options={productTypeOptions}
        required
      />

      {/* Description */}
      <TextArea
        label="Description"
        placeholder="Tell people about your product. What makes it special? What problem does it solve?"
        {...register('description')}
        rows={4}
        helperText="Markdown supported. You can use **bold**, *italic*, and [links]()."
      />
    </div>
  );
}