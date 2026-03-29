'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatorProducts } from '@/hooks/entities/useProducts';
import { PRODUCT_CATEGORIES } from '@/types/categories';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductPricingFields } from './ProductPricingFields';
import { ProductResidualSettings } from './ProductResidualSettings';
import { ProductPublishOption } from './ProductPublishOption';
import { ProductFormActions } from './ProductFormActions';
import { ProductFormSuccess } from './ProductFormSuccess';
import { ProductFormError } from './ProductFormError';

// Build product type options from source of truth
const productTypeValues = PRODUCT_CATEGORIES.map(cat => cat.value);

// Validation schema
const productSchema = z.object({
  creator_id: z.string(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  product_type: z.enum(productTypeValues as [string, ...string[]]),
  price_community: z.coerce.number().min(0, 'Price cannot be negative').optional().nullable(),
  price_ally: z.coerce.number().min(0, 'Price cannot be negative'),
  price_corporate: z.coerce.number().min(0, 'Price cannot be negative').optional().nullable(),
  residual_pool_percent: z.coerce.number().min(0, 'Cannot be negative').max(50, 'Maximum 50%'),
  sanctuary_infrastructure_percent: z.coerce.number().min(0).max(100).optional(),
  is_published: z.boolean().optional().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

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
  const watchTitle = watch('title');

  // Auto-generate slug from title
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
      const productData = {
        ...data,
        price_community: data.price_community || null,
        price_corporate: data.price_corporate || null,
      };
      
      if (mode === 'create') {
        const result = await createProduct(productData);
        if (result) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/creator/products');
            onSuccess?.();
          }, 1500);
        }
      } else if (mode === 'edit' && initialData?.id) {
        const result = await updateProduct(initialData.id, productData);
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
    return <ProductFormSuccess mode={mode} onReturn={() => router.push('/creator/products')} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProductFormError error={error?.message || submitError} />
      
      <ProductBasicInfo
        register={register}
        errors={errors}
        watchProductType={watchProductType}
        setValue={setValue}
        mode={mode}
        initialSlug={initialData?.slug}
      />
      
      <ProductPricingFields register={register} errors={errors} />
      
      <ProductResidualSettings
        value={watchResidualPool}
        onChange={(val) => setValue('residual_pool_percent', val)}
      />
      
      <ProductPublishOption register={register} />
      
      <ProductFormActions
        isSubmitting={isSubmitting}
        loading={loading}
        mode={mode}
        onCancel={() => router.push('/creator/products')}
      />
    </form>
  );
}