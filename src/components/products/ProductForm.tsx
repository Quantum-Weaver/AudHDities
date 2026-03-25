// src/components/products/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatorProducts } from '@/hooks/commerce/useProducts';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

// Validation schema
const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  product_type: z.string().min(1, 'Please select a product type'),
  price_community: z.coerce.number().min(0, 'Price cannot be negative').optional(),
  price_ally: z.coerce.number().min(0, 'Price cannot be negative'),
  price_corporate: z.coerce.number().min(0, 'Price cannot be negative').optional(),
  residual_pool_percent: z.coerce.number().min(0, 'Cannot be negative').max(50, 'Maximum 50%'),
  sanctuary_infrastructure_percent: z.coerce.number().min(0).max(100).optional(),
  is_published: z.boolean().optional().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

// Product type options
const productTypeOptions = [
  { value: 'digital_download', label: 'Digital Download' },
  { value: 'digital_course', label: 'Digital Course' },
  { value: 'physical_product', label: 'Physical Product' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessory', label: 'Accessory' },
  { value: 'audio', label: 'Audio' },
  { value: 'music', label: 'Music' },
  { value: 'video', label: 'Video' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'service', label: 'Service' },
  { value: 'mutual_aid', label: 'Mutual Aid' },
  { value: 'donation', label: 'Donation' },
  { value: 'tip', label: 'Tip' },
];

interface ProductFormProps {
  mode?: 'create' | 'edit';
  initialData?: any;
  defaultResidualPool?: number;
  onSuccess?: () => void;
}

export default function ProductForm({ 
  mode = 'create', 
  initialData,
  defaultResidualPool = 30,
  onSuccess 
}: ProductFormProps) {
  const router = useRouter();
  const { createProduct, updateProduct, loading, error } = useCreatorProducts();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      product_type: 'digital_download',
      residual_pool_percent: defaultResidualPool,
      sanctuary_infrastructure_percent: 10,
      is_published: false,
    },
  });

  const watchProductType = watch('product_type');
  const watchResidualPool = watch('residual_pool_percent');

  // Auto-generate slug from title
  const watchTitle = watch('title');
  useEffect(() => {
    if (mode === 'create' && watchTitle && !initialData?.slug) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', generatedSlug);
    }
  }, [watchTitle, mode, initialData, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    setSubmitError(null);
    
    try {
      // Prepare data for submission
      const productData = {
        ...data,
        price_community: data.price_community || null,
        price_corporate: data.price_corporate || null,
      };
      
      let result;
      if (mode === 'create') {
        result = await createProduct(productData);
        if (result) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/creator/products');
            onSuccess?.();
          }, 1500);
        }
      } else if (mode === 'edit' && initialData?.id) {
        result = await updateProduct(initialData.id, productData);
        if (result) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/creator/products');
            onSuccess?.();
          }, 1500);
        }
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (success) {
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
        <Button onClick={() => router.push('/creator/products')}>
          Return to Products
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
      {(error || submitError) && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-400 text-sm">{error?.message || submitError}</p>
        </div>
      )}

      {/* Title */}
      <Input
        label="Product Title"
        placeholder="e.g., The Quantum Weaver's Guide"
        {...register('title')}
        error={errors.title?.message}
        required
        helperText="A clear, descriptive title helps people discover your work"
      />

      {/* Slug */}
      <Input
        label="URL Slug"
        placeholder="e.g., quantum-weaver-guide"
        {...register('slug')}
        error={errors.slug?.message}
        required
        helperText="Used in the product URL. Use lowercase letters, numbers, and hyphens only."
      />

      {/* Product Type */}
      <Select
        label="Product Type"
        value={watchProductType}
        onChange={(e) => setValue('product_type', e.target.value)}
        options={productTypeOptions}
        error={errors.product_type?.message}
        required
      />

      {/* Description */}
      <TextArea
        label="Description"
        placeholder="Tell people about your product. What makes it special? What problem does it solve?"
        {...register('description')}
        error={errors.description?.message}
        rows={4}
        helperText="Markdown supported. You can use **bold**, *italic*, and [links]()."
      />

      {/* Pricing Section */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Pricing</h3>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Info size={12} />
            <span>Tiered pricing based on Acid Test results</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="Community Tier (ND)"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price_community')}
            error={errors.price_community?.message}
            helperText="For neurodivergent users (can be $0)"
          />
          
          <Input
            label="Ally Tier"
            type="number"
            step="0.01"
            placeholder="25.00"
            {...register('price_ally')}
            error={errors.price_ally?.message}
            required
            helperText="Standard price for supporters"
          />
          
          <Input
            label="Corporate Tier"
            type="number"
            step="0.01"
            placeholder="100.00"
            {...register('price_corporate')}
            error={errors.price_corporate?.message}
            helperText="For businesses (optional)"
          />
        </div>
      </div>

      {/* Residual Settings */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Residual Sharing</h3>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Info size={12} />
            <span>Share earnings with contributors forever</span>
          </div>
        </div>

        <div className="space-y-2">
          <Slider
            label="Residual Pool Percentage"
            value={watchResidualPool}
            onChange={(val) => setValue('residual_pool_percent', val)}
            min={0}
            max={50}
            step={5}
            showValue={true}
            formatValue={(v) => `${v}%`}
            variant="purple"
            helperText="This percentage of the creator pool is shared with contributors"
          />
          
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-sm">
            <p className="text-purple-400">
              {watchResidualPool}% of your earnings will go to a pool shared with contributors
            </p>
            <p className="text-white/40 text-xs mt-1">
              You can add contributors after creating the product
            </p>
          </div>
        </div>
      </div>

      {/* Publish Option */}
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

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || loading}
          className="flex-1"
        >
          {isSubmitting || loading 
            ? (mode === 'create' ? 'Creating...' : 'Saving...') 
            : (mode === 'create' ? 'Create Product' : 'Save Changes')}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/creator/products')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}