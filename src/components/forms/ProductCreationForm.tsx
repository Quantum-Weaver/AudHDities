// components/forms/ProductCreationForm.tsx
'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  AlertCircle, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Upload,
  X,
  Tag,
  FolderOpen,
  DollarSign,
  Percent,
  Globe,
  Users
} from 'lucide-react';

import { productCreateFormSchema, productTypeSchema } from '@/lib/validators/product';
import type { ProductCreateFormData } from '@/lib/validators/product';
import { useCreatorProducts } from '@/hooks/entities/useProducts';
import { PRODUCT_CATEGORIES } from '@/types/categories';

// Product type options for dropdown
const PRODUCT_TYPE_OPTIONS = productTypeSchema.options.map(type => ({
  value: type,
  label: type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}));

// Group product types by category
const PRODUCT_TYPE_GROUPS = {
  digital: PRODUCT_TYPE_OPTIONS.filter(p => 
    p.value.startsWith('digital_') || 
    ['audio', 'video', 'podcast', 'music', 'livestream'].includes(p.value)
  ),
  physical: PRODUCT_TYPE_OPTIONS.filter(p => 
    p.value.startsWith('physical_') || 
    ['clothing', 'accessory', 'fabric', 'pattern'].includes(p.value)
  ),
  services: PRODUCT_TYPE_OPTIONS.filter(p => 
    ['service', 'commission', 'contract', 'consultation', 'workshop', 'class', 'event_live', 'event_virtual'].includes(p.value)
  ),
  community: PRODUCT_TYPE_OPTIONS.filter(p => 
    ['mutual_aid', 'crowdfunding', 'tip', 'donation', 'sponsorship'].includes(p.value)
  ),
  bundles: PRODUCT_TYPE_OPTIONS.filter(p => 
    ['bundle', 'kit', 'subscription_box', 'digital_bundle'].includes(p.value)
  ),
};

interface ProductCreationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductCreationForm({ onSuccess, onCancel }: ProductCreationFormProps) {
  const router = useRouter();
  const { createProduct, loading: productLoading } = useCreatorProducts();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<keyof typeof PRODUCT_TYPE_GROUPS>('digital');

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProductCreateFormData>({
    resolver: zodResolver(productCreateFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      product_type: 'digital_download',
      price_community: 0,
      price_ally: 45,
      price_corporate: 145,
      bigot_tax_cents: 0,
      residual_pool_percent: 30,
      sanctuary_infrastructure_percent: 10,
      category: [],
      tags: [],
      media_urls: [],
      download_url: '',
      preview_image: '',
      is_published: false,
      is_recurring: false,
      recurring_interval: null,
    },
  });

  const titleValue = watch('title');
  const productType = watch('product_type');

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);
  };

  const handleTitleBlur = () => {
    if (titleValue && !watch('slug')) {
      setValue('slug', generateSlug(titleValue));
    }
  };

  // Handle form submission
  const onSubmit = async (data: ProductCreateFormData) => {
    setSaveStatus('saving');
    setSaveError(null);

    try {
      // Convert pricing from dollars to cents for API
      const productData = {
        ...data,
        price_community_cents: Math.round(data.price_community * 100),
        price_ally_cents: Math.round(data.price_ally * 100),
        price_corporate_cents: Math.round(data.price_corporate * 100),
      };

      const result = await createProduct(productData);

      if (!result) {
        throw new Error('Failed to create product');
      }

      setSaveStatus('success');
      
      // Reset form
      setTimeout(() => {
        setSaveStatus('idle');
        if (onSuccess) onSuccess();
      }, 2000);
      
    } catch (err) {
      console.error('Error creating product:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to create product');
      setSaveStatus('error');
      
      setTimeout(() => {
        setSaveStatus('idle');
        setSaveError(null);
      }, 5000);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  if (productLoading && saveStatus === 'idle') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-white/60">Loading...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-cyan-400" />
          Basic Information
        </h2>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Product Title <span className="text-red-400">*</span>
              </label>
              <input
                {...field}
                type="text"
                onBlur={handleTitleBlur}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="e.g., The Quantum Autistic Zine"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
          )}
        />

        {/* Slug */}
        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                URL Slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">/products/</span>
                <input
                  {...field}
                  type="text"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="your-product-slug"
                />
              </div>
              {errors.slug && (
                <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Description
              </label>
              <textarea
                {...field}
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Describe your product..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          )}
        />
      </section>

      {/* Product Type Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-cyan-400" />
          Product Type
        </h2>

        {/* Type Group Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRODUCT_TYPE_GROUPS).map(([group, types]) => (
            types.length > 0 && (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group as keyof typeof PRODUCT_TYPE_GROUPS)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  selectedGroup === group
                    ? 'bg-cyan-600/40 text-cyan-400 border border-cyan-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {group}
              </button>
            )
          ))}
        </div>

        {/* Type Selection */}
        <Controller
          name="product_type"
          control={control}
          render={({ field }) => (
            <div>
              <select
                {...field}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="">Select a product type</option>
                {PRODUCT_TYPE_GROUPS[selectedGroup].map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.product_type && (
                <p className="text-red-400 text-sm mt-1">{errors.product_type.message}</p>
              )}
            </div>
          )}
        />
      </section>

      {/* Pricing Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cyan-400" />
          Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Community Price */}
          <Controller
            name="price_community"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Community Price <span className="text-green-400">(Free for ND)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                {errors.price_community && (
                  <p className="text-red-400 text-sm mt-1">{errors.price_community.message}</p>
                )}
              </div>
            )}
          />

          {/* Ally Price */}
          <Controller
            name="price_ally"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Ally Price <span className="text-blue-400">(Standard)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                {errors.price_ally && (
                  <p className="text-red-400 text-sm mt-1">{errors.price_ally.message}</p>
                )}
              </div>
            )}
          />

          {/* Corporate Price */}
          <Controller
            name="price_corporate"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Corporate Price <span className="text-purple-400">(Includes Bigot Tax)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                {errors.price_corporate && (
                  <p className="text-red-400 text-sm mt-1">{errors.price_corporate.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Residual Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Controller
            name="residual_pool_percent"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Residual Pool Percentage
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="100"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">%</span>
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Percentage of each sale distributed to contributors
                </p>
              </div>
            )}
          />

          <Controller
            name="sanctuary_infrastructure_percent"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Sanctuary Infrastructure
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="100"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">%</span>
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Supports platform maintenance and community programs
                </p>
              </div>
            )}
          />
        </div>
      </section>

      {/* Categories & Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-cyan-400" />
          Categories & Tags
        </h2>

        {/* Categories */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Categories
              </label>
              <select
                multiple
                value={field.value || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                  field.onChange(selected);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none min-h-[100px]"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          )}
        />

        {/* Tags */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={field.value?.join(', ') || ''}
                onChange={(e) => {
                  const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                  field.onChange(tags);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="autism, creativity, sovereignty"
              />
              {errors.tags && (
                <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>
              )}
            </div>
          )}
        />
      </section>

      {/* Media URLs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-cyan-400" />
          Media
        </h2>

        {/* Preview Image */}
        <Controller
          name="preview_image"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Preview Image URL
              </label>
              <input
                {...field}
                type="url"
                value={field.value || ''}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>
          )}
        />

        {/* Download URL */}
        <Controller
          name="download_url"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm text-white/60 mb-1">
                Download URL (for digital products)
              </label>
              <input
                {...field}
                type="url"
                value={field.value || ''}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>
          )}
        />
      </section>

      {/* Publishing Options */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          Publishing
        </h2>

        <div className="flex items-center gap-6">
          <Controller
            name="is_published"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-white">Publish immediately</span>
              </label>
            )}
          />

          <Controller
            name="is_recurring"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-white">Subscription (recurring payment)</span>
              </label>
            )}
          />
        </div>

        {watch('is_recurring') && (
          <Controller
            name="recurring_interval"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Billing Interval
                </label>
                <select
                  {...field}
                  value={field.value || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select interval</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            )}
          />
        )}
      </section>

      {/* Error Message */}
      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400 text-sm">{saveError}</p>
        </div>
      )}

      {/* Success Message */}
      {saveStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-400 text-sm">Product created successfully!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isDirty || saveStatus === 'saving' || isSubmitting}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-lg transition-all flex items-center gap-2"
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Create Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}