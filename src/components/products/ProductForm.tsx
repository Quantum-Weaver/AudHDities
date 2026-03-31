// src/components/products/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productCreateSchema, type ProductCreateInput } from '@/lib/validators/product';
import { useSupabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductPricingFields } from './ProductPricingFields';
import { ProductResidualSettings } from './ProductResidualSettings';
import { ProductPublishOption } from './ProductPublishOption';
import { ProductFormActions } from './ProductFormActions';
import { ProductFormError } from './ProductFormError';
import { ProductFormSuccess } from './ProductFormSuccess';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialData?: ProductCreateInput;
  productId?: string;
  onSuccess?: () => void;
}

export default function ProductForm({ mode, initialData, productId, onSuccess }: ProductFormProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [residualPercent, setResidualPercent] = useState(30);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateInput>({
    defaultValues: initialData || {
      title: '',
      slug: '',
      description: '',
      product_type: 'digital_download',
      owner_type: 'creator',
      is_published: false,
      is_recurring: false,
      active: true,
      price_community: 0,
      price_ally: 25,
      price_corporate: 100,
      residual_pool_percent: 30,
      sanctuary_infrastructure_percent: 10,
      category: [],
      tags: [],
      media_urls: [],
    },
  });

  const watchProductType = watch('product_type');

  const onSubmit = async (data: ProductCreateInput) => {
    setError(null);
    setLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to create a product');

      if (mode === 'create') {
        const { error: insertError } = await supabase
          .from('products')
          .insert({
            ...data,
            creator_id: user.id,
            owner_type: 'creator',
            residual_pool_percent: residualPercent,
          });

        if (insertError) throw insertError;
      } else if (mode === 'edit' && productId) {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            ...data,
            residual_pool_percent: residualPercent,
          })
          .eq('id', productId);

        if (updateError) throw updateError;
      }

      setSuccess(true);
      onSuccess?.();
      
      setTimeout(() => {
        router.push('/creator/products');
      }, 2000);
      
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <ProductFormSuccess mode={mode} onReturn={() => router.push('/creator/products')} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ProductFormError error={error} />
      
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
        value={residualPercent}
        onChange={setResidualPercent}
      />
      
      <ProductPublishOption register={register} />
      
      <ProductFormActions
        isSubmitting={isSubmitting}
        loading={loading}
        mode={mode}
        onCancel={() => router.back()}
      />
    </form>
  );
}