// src/components/asgard/domains/hermes/studio/StudioEdit.tsx
// Wares edition (2026-07-31): the tier ladder died with the products
// table â€” one base price + pricing_model, status enum instead of
// is_published/active. The publish switch is now genuinely wired (the
// old form's switch was decorative: no name, no state, never saved).
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
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables, TablesUpdate } from '@/lib/generated/supabase/database.helpers.js';

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CONSTANTS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const WARE_TYPES = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
  { value: 'service', label: 'Service' },
];

const PRICING_MODELS = [
  { value: 'free', label: 'Free â€” given to anyone who receives it' },
  { value: 'fixed', label: 'Fixed â€” one base price, solidarity-adjusted at the Exchange' },
  { value: 'pay_what_you_want', label: 'Pay what you want â€” the price is a floor, not a wall' },
  { value: 'patronage_only', label: 'Patronage only â€” for patrons of your work' },
];

const RESIDUAL_OPTIONS = [
  { value: '0', label: '0% â€” No residual pool' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30% â€” Standard' },
  { value: '40', label: '40%' },
  { value: '50', label: '50% â€” Maximum' },
];

type WareItem = Tables<'wares'>;

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// COMPONENT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function StudioEdit() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const wareId = params.id as string;

  const [ware, setWare] = useState<WareItem | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchWare = async () => {
      try {
        const response = await fetch(`/api/generated/plutus-economics/wares/${wareId}`);
        const result = await response.json();
        if (result.success) {
          setWare(result.data);
          setIsPublished(result.data?.status === 'published');
        }
      } catch (err) {
        console.error('Failed to fetch ware:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWare();
  }, [wareId]);

  const handleSave = async (data: Record<string, any>) => {
    if (!ware || !user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: TablesUpdate<'wares'> = {};

      if (data.name && data.name !== ware.name) updates.name = data.name;
      if (data.description !== undefined && data.description !== ware.description) updates.description = data.description || null;
      if (data.ware_type && data.ware_type !== ware.ware_type) updates.ware_type = data.ware_type;
      if (data.pricing_model && data.pricing_model !== ware.pricing_model) updates.pricing_model = data.pricing_model;
      if (data.price !== undefined) {
        const price = data.price ? parseFloat(data.price) : null;
        if (price !== ware.price) updates.price = price;
      }
      if (data.residual_pool_percent !== undefined) {
        const percent = parseInt(data.residual_pool_percent);
        if (percent !== ware.residual_pool_percent) updates.residual_pool_percent = percent;
      }
      const newStatus = isPublished ? 'published' : 'draft';
      if (newStatus !== ware.status) updates.status = newStatus;

      if (Object.keys(updates).length === 0) {
        setSaveMessage('Nothing changed.');
        setTimeout(() => setSaveMessage(null), 3000);
        return;
      }

      updates.updated_by = user.id;

      const response = await fetch(`/api/generated/plutus-economics/wares/${ware.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (result.success) {
        setSaveMessage('Work updated.');
        setTimeout(() => {
          router.push(`/bazaar/creations/${ware.id}`);
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
    if (!ware) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/generated/plutus-economics/wares/${ware.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        router.push('/bazaar');
      }
    } catch (err) {
      console.error('Failed to delete ware:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // â”€â”€â”€ Loading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // â”€â”€â”€ Not Found â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!ware) {
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
    id: ware.id,
    type: 'product',
    title: ware.name,
    description: ware.description || '',
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href={`/bazaar/creations/${ware.id}`}
              className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to work
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Refine Your Thread</h1>
            <p className="text-sm text-star-dust/40 mt-1">{ware.name}</p>
          </div>
          <div className="flex items-center gap-2">
            {ware.status === 'published' ? (
              <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/20 text-emerald-400">Published</Badge>
            ) : (
              <Badge variant="outline" size="sm" className="text-[10px] bg-amber-500/20 text-amber-400 capitalize">{ware.status}</Badge>
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
            <FormField label="Name" required>
              <Input
                name="name"
                defaultValue={ware.name}
                placeholder="What are you creating?"
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Description" optional>
              <Input
                name="description"
                defaultValue={ware.description || ''}
                placeholder="Describe your work..."
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Type" required>
              <Select
                name="ware_type"
                options={WARE_TYPES}
                defaultValue={ware.ware_type}
                disabled={isSaving}
              />
            </FormField>

            {/* Pricing */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <h3 className="text-lg font-semibold text-star-dust mb-1">Pricing</h3>
              <p className="text-sm text-star-dust/40 mb-4">
                One base price, one model. Solidarity pricing is applied per person at the Exchange.
              </p>

              <FormField label="Pricing Model" required>
                <Select
                  name="pricing_model"
                  options={PRICING_MODELS}
                  defaultValue={ware.pricing_model}
                  disabled={isSaving}
                />
              </FormField>

              <FormField
                label="Base Price"
                optional
                helper="Leave empty for free or patronage-only works. For pay-what-you-want, this is the suggested floor."
              >
                <Input
                  name="price"
                  type="number"
                  defaultValue={ware.price?.toString() || ''}
                  placeholder="0.00"
                  disabled={isSaving}
                />
              </FormField>
            </div>

            {/* Residual Pool */}
            <FormField label="Residual Pool" optional>
              <Select
                name="residual_pool_percent"
                options={RESIDUAL_OPTIONS}
                defaultValue={ware.residual_pool_percent?.toString() || '30'}
                disabled={isSaving}
              />
            </FormField>

            {/* Publish Toggle */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <FormField label="Publish Status" optional>
                <div className="flex items-center gap-4">
                  <Switch
                    label={isPublished ? 'Published' : 'Draft'}
                    size="md"
                    checked={isPublished}
                    onChange={(checked) => setIsPublished(checked)}
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
