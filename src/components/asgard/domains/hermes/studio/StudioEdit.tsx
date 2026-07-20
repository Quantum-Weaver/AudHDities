// src/components/asgard/domains/hermes/studio/StudioEdit.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { Switch } from '@/components/forging/Switch';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCT_TYPES = [
  { value: 'digital_download', label: 'Digital Download' },
  { value: 'digital_course', label: 'Digital Course' },
  { value: 'physical_product', label: 'Physical' },
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'music', label: 'Music' },
  { value: 'event_live', label: 'Live Event' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'service', label: 'Service' },
  { value: 'mutual_aid', label: 'Mutual Aid' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessory', label: 'Accessory' },
  { value: 'bundle', label: 'Bundle' },
];

const RESIDUAL_OPTIONS = [
  { value: '0', label: '0% — No residual pool' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30% — Standard' },
  { value: '40', label: '40%' },
  { value: '50', label: '50% — Maximum' },
];

interface ProductItem {
  products_id: string;
  title: string;
  description: string | null;
  product_type: string;
  price_community: number | null;
  price_ally: number | null;
  price_corporate: number | null;
  residual_pool_percent: number | null;
  is_published: boolean | null;
  active: boolean | null;
  creator_id: string;
  slug: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function StudioEdit() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/generated/plutus-economics/products/${productId}`);
        const result = await response.json();
        if (result.success) {
          setProduct(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSave = async (data: Record<string, any>) => {
    if (!product || !user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: Record<string, any> = {};

      if (data.title && data.title !== product.title) updates.title = data.title;
      if (data.description !== undefined && data.description !== product.description) updates.description = data.description || null;
      if (data.product_type && data.product_type !== product.product_type) updates.product_type = data.product_type;
      if (data.price_community !== undefined) updates.price_community = data.price_community ? parseFloat(data.price_community) : null;
      if (data.price_ally !== undefined) updates.price_ally = data.price_ally ? parseFloat(data.price_ally) : null;
      if (data.price_corporate !== undefined) updates.price_corporate = data.price_corporate ? parseFloat(data.price_corporate) : null;
      if (data.residual_pool_percent !== undefined) updates.residual_pool_percent = parseInt(data.residual_pool_percent);
      if (data.is_published !== undefined) {
        updates.is_published = data.is_published;
        updates.active = data.is_published;
      }

      if (Object.keys(updates).length === 0) {
        setSaveMessage('Nothing changed.');
        setTimeout(() => setSaveMessage(null), 3000);
        return;
      }

      updates.updated_by = user.id;

      const response = await fetch(`/api/generated/plutus-economics/products/${product.products_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (result.success) {
        setSaveMessage('Work updated.');
        setTimeout(() => {
          router.push(`/bazaar/creations/${product.products_id}`);
        }, 800);
      } else {
        setSaveMessage(result.error || 'Failed to update');
      }
    } catch (err) {
      setSaveMessage('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
      if (saveMessage) setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/generated/plutus-economics/products/${product.products_id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        router.push('/bazaar');
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="text" className="h-10 w-64 mb-6" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  // ─── Not Found ────────────────────────────────────────────────────────
  if (!product) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">This work has been unwoven.</p>
          <Link href="/bazaar" className="text-neurospark hover:underline mt-4 inline-block">Return to the Bazaar</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = {
    id: product.products_id,
    type: 'product',
    title: product.title,
    description: product.description || '',
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href={`/bazaar/creations/${product.products_id}`}
              className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to work
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Refine Your Thread</h1>
            <p className="text-sm text-star-dust/40 mt-1">{product.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {product.is_published ? (
              <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/20 text-emerald-400">Published</Badge>
            ) : (
              <Badge variant="outline" size="sm" className="text-[10px] bg-amber-500/20 text-amber-400">Draft</Badge>
            )}
          </div>
        </div>

        {/* Form Card */}
        <Card
          data={cardData}
          variant="sanctuary"
          radius="xl"
          shadow="md"
          className="p-8"
        >
          <Form onSubmit={handleSave}>
            <FormField label="Title" required>
              <Input
                name="title"
                defaultValue={product.title}
                placeholder="What are you creating?"
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Description" optional>
              <Input
                name="description"
                defaultValue={product.description || ''}
                placeholder="Describe your work..."
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Type" required>
              <Select
                name="product_type"
                options={PRODUCT_TYPES}
                defaultValue={product.product_type}
                disabled={isSaving}
              />
            </FormField>

            {/* Pricing */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <h3 className="text-lg font-semibold text-star-dust mb-1">Tiered Pricing</h3>
              <p className="text-sm text-star-dust/40 mb-4">Set prices for each tier.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Community Price" optional>
                  <Input
                    name="price_community"
                    type="number"
                    defaultValue={product.price_community?.toString() || ''}
                    placeholder="0.00"
                    disabled={isSaving}
                  />
                </FormField>
                <FormField label="Ally Price" required>
                  <Input
                    name="price_ally"
                    type="number"
                    defaultValue={product.price_ally?.toString() || ''}
                    placeholder="19.99"
                    disabled={isSaving}
                  />
                </FormField>
                <FormField label="Corporate Price" optional>
                  <Input
                    name="price_corporate"
                    type="number"
                    defaultValue={product.price_corporate?.toString() || ''}
                    placeholder="49.99"
                    disabled={isSaving}
                  />
                </FormField>
              </div>
            </div>

            {/* Residual Pool */}
            <FormField label="Residual Pool" optional>
              <Select
                name="residual_pool_percent"
                options={RESIDUAL_OPTIONS}
                defaultValue={product.residual_pool_percent?.toString() || '30'}
                disabled={isSaving}
              />
            </FormField>

            {/* Publish Toggle */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <FormField label="Publish Status" optional>
                <div className="flex items-center gap-4">
                  <Switch
                    label="Published"
                    size="md"
                    defaultChecked={product.is_published === true}
                    onChange={(checked) => {
                      // handled in handleSave via form data
                    }}
                    disabled={isSaving}
                  />
                </div>
              </FormField>
            </div>

            {/* Delete Section */}
            {!showDeleteConfirm ? (
              <div className="border-t border-white/10 pt-6 mt-2 mb-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 text-sm text-error/60 hover:text-error transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Unweave this work
                </button>
              </div>
            ) : (
              <div className="border-t border-error/20 pt-6 mt-2 mb-4">
                <p className="text-sm text-star-dust/60 mb-3">
                  This work will be permanently unwoven. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    loading={isDeleting}
                    onClick={handleDelete}
                  >
                    Unweave
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Keep It
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <FormActions>
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                {saveMessage && (
                  <span className={cn(
                    'text-sm',
                    saveMessage.includes('Failed') ? 'text-error' : 'text-sanctuary-green'
                  )}>
                    {saveMessage}
                  </span>
                )}
              </div>
            </FormActions>
          </Form>
        </Card>
      </div>
    </main>
  );
}