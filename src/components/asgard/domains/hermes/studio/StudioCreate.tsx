// src/components/asgard/domains/hermes/studio/StudioCreate.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { ArrowLeft, Sparkles, Save, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCT_TYPES = [
  { value: 'digital_download', label: 'Digital Download' },
  { value: 'digital_course', label: 'Digital Course' },
  { value: 'physical_product', label: 'Physical Product' },
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

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function StudioCreate() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);

  const isCreator = profile?.is_creator === true;

  const handleSubmit = async (data: Record<string, any>) => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const body = {
        title: data.title,
        description: data.description || null,
        product_type: data.product_type || 'digital_download',
        price_community: data.price_community ? parseFloat(data.price_community) : null,
        price_ally: data.price_ally ? parseFloat(data.price_ally) : null,
        price_corporate: data.price_corporate ? parseFloat(data.price_corporate) : null,
        residual_pool_percent: data.residual_pool_percent ? parseInt(data.residual_pool_percent) : 30,
        is_published: !isDraft,
        active: !isDraft,
        creator_id: user.id,
        owner_type: 'creator',
        created_by: user.id,
      };

      const response = await fetch('/api/generated/plutus-economics/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        const productId = result.data?.products_id || result.data?.id;
        if (isDraft) {
          router.push(`/bazaar/studio/${productId}`);
        } else {
          router.push(`/bazaar/creations/${productId}`);
        }
      } else {
        setSaveMessage(result.error || 'Failed to create product');
      }
    } catch (err) {
      setSaveMessage('Failed to create product. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  // ─── Unauthenticated ─────────────────────────────────────────────────
  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Sign in to access the Loom.</p>
        </div>
      </main>
    );
  }

  // ─── Not a Creator ───────────────────────────────────────────────────
  if (!isCreator) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40 text-lg mb-2">The Loom awaits your application</p>
          <p className="text-star-dust/30 text-sm mb-6">Apply to become a creator to start weaving your offerings.</p>
          <Link href="/council/applications">
            <Button variant="primary">Apply to Create</Button>
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = {
    id: 'new-product',
    type: 'product',
    title: 'New Creation',
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/bazaar"
            className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Loom</h1>
          <p className="text-sm text-star-dust/40 mt-1">Every creation begins with a single thread</p>
        </div>

        {/* Form Card */}
        <Card
          data={cardData}
          variant="sanctuary"
          radius="xl"
          shadow="md"
          className="p-8"
        >
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <FormField label="Title" required>
              <Input
                name="title"
                placeholder="What are you creating?"
                disabled={isSaving}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description" optional helper="Tell buyers what this is and why it matters">
              <Input
                name="description"
                placeholder="Describe your creation..."
                disabled={isSaving}
              />
            </FormField>

            {/* Product Type */}
            <FormField label="Type" required>
              <Select
                name="product_type"
                options={PRODUCT_TYPES}
                placeholder="Select a type..."
                disabled={isSaving}
              />
            </FormField>

            {/* Pricing Section */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <h3 className="text-lg font-semibold text-star-dust mb-1">Tiered Pricing</h3>
              <p className="text-sm text-star-dust/40 mb-4">
                Set prices for each tier. Community tier can be lower or free. Ally is the standard price.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Community Price" optional helper="For community tier members">
                  <Input
                    name="price_community"
                    type="number"
                    placeholder="0.00"
                    disabled={isSaving}
                  />
                </FormField>
                <FormField label="Ally Price" required helper="Standard price">
                  <Input
                    name="price_ally"
                    type="number"
                    placeholder="19.99"
                    disabled={isSaving}
                  />
                </FormField>
                <FormField label="Corporate Price" optional helper="Premium tier pricing">
                  <Input
                    name="price_corporate"
                    type="number"
                    placeholder="49.99"
                    disabled={isSaving}
                  />
                </FormField>
              </div>
            </div>

            {/* Residual Pool */}
            <FormField
              label="Residual Pool"
              optional
              helper="Percentage of platform fee shared with contributors who helped create this product"
            >
              <Select
                name="residual_pool_percent"
                options={RESIDUAL_OPTIONS}
                placeholder="30% — Standard"
                defaultValue="30"
                disabled={isSaving}
              />
            </FormField>

            {/* Publish Toggle */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <FormField label="Publish Status" optional>
                <div className="flex items-center gap-4">
                  <Switch
                    label={isDraft ? 'Save as draft' : 'Publish immediately'}
                    size="md"
                    checked={!isDraft}
                    onChange={(checked) => setIsDraft(!checked)}
                    disabled={isSaving}
                  />
                  {isDraft ? (
                    <Badge variant="outline" size="sm" className="text-[10px] bg-amber-500/20 text-amber-400">Draft</Badge>
                  ) : (
                    <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/20 text-emerald-400">Public</Badge>
                  )}
                </div>
              </FormField>
            </div>

            {/* Actions */}
            <FormActions>
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSaving}
                >
                  {isDraft ? (
                    <Save className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {isDraft ? 'Save Draft' : 'Publish Creation'}
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

        {/* The Economics */}
        <Card
          data={{ id: 'studio-economics', type: 'value', title: 'How It Works', value: '' }}
          variant="glass"
          radius="lg"
          shadow="sm"
          className="mt-6 p-6"
        >
          <h3 className="text-sm font-semibold text-star-dust mb-3">The Economics</h3>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-neurospark font-bold">10%</p>
              <p className="text-star-dust/40 text-xs">Platform Fee</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold">90%</p>
              <p className="text-star-dust/40 text-xs">Your Earnings</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold">0-50%</p>
              <p className="text-star-dust/40 text-xs">Residual Pool</p>
            </div>
          </div>
          <p className="text-xs text-star-dust/30 mt-3 text-center">
            The residual pool comes from your chosen percentage of the 10% platform fee — rewarding contributors forever.
          </p>
        </Card>
      </div>
    </main>
  );
}