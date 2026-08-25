// src/components/asgard/domains/hermes/studio/StudioCreate.tsx
// Wares edition (2026-07-31): the tier ladder (community/ally/corporate)
// died with the products table. A ware carries one base price plus a
// pricing_model; solidarity pricing is computed server-side at the
// Exchange. The model defaults to 'free' — worth is not priced unless
// the maker chooses (the zero-default is the realm's own thesis).
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
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
import type { TablesInsert } from '@/lib/generated/supabase/database.helpers.js';

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CONSTANTS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const WARE_TYPES = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
  { value: 'service', label: 'Service' },
];

const PRICING_MODELS = [
  { value: 'free', label: 'Free — given to anyone who receives it' },
  { value: 'fixed', label: 'Fixed — one base price, solidarity-adjusted at the Exchange' },
  { value: 'pay_what_you_want', label: 'Pay what you want — the price is a floor, not a wall' },
  { value: 'patronage_only', label: 'Patronage only — for patrons of your work' },
];

const RESIDUAL_OPTIONS = [
  { value: '0', label: '0%, nothing pledged (the default)' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
  { value: '40', label: '40%' },
  { value: '50', label: '50%, the maximum' },
];

function slugify(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${base}-${Date.now().toString(36)}`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// COMPONENT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function StudioCreate() {
  const router = useRouter();
  const { user, profile, isLoading: authLoading, roles } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);

  const isCreator = roles.includes('creator');

  const handleSubmit = async (data: Record<string, any>) => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const body: TablesInsert<'wares'> = {
        name: data.name,
        slug: slugify(data.name || 'work'),
        description: data.description || null,
        ware_type: data.ware_type || 'digital',
        pricing_model: data.pricing_model || 'free',
        price: data.price ? parseFloat(data.price) : null,
        residual_pool_percent: data.residual_pool_percent ? parseInt(data.residual_pool_percent) : 0,
        status: isDraft ? 'draft' : 'published',
        created_by: user.id,
      };

      const response = await fetch('/api/generated/plutus-economics/wares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        const wareId = result.data?.id;
        if (isDraft) {
          router.push(`/bazaar/studio/${wareId}`);
        } else {
          router.push(`/bazaar/wares/${wareId}`);
        }
      } else {
        setSaveMessage(result.error || 'Failed to create work');
      }
    } catch (err) {
      setSaveMessage('Failed to create work. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // â”€â”€â”€ Loading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // â”€â”€â”€ Unauthenticated â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Sign in to access the Loom.</p>
        </div>
      </main>
    );
  }

  // â”€â”€â”€ Not a Creator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!isCreator) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40 text-lg mb-2">The Loom awaits your application</p>
          <p className="text-star-dust/30 text-sm mb-6">Apply to become an artisan to start weaving your works.</p>
          <Link href="/council/applications">
            <Button variant="primary">Apply to Create</Button>
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = {
    id: 'new-ware',
    type: 'product',
    title: 'New Work',
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
          <p className="text-sm text-star-dust/40 mt-1">Every work begins with a single thread</p>
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
            {/* Name */}
            <FormField label="Name" required>
              <Input
                name="name"
                placeholder="What are you creating?"
                disabled={isSaving}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description" optional helper="Tell vessels what this is and why it matters">
              <Input
                name="description"
                placeholder="Describe your work..."
                disabled={isSaving}
              />
            </FormField>

            {/* Ware Type */}
            <FormField label="Type" required>
              <Select
                name="ware_type"
                options={WARE_TYPES}
                placeholder="Select a type..."
                disabled={isSaving}
              />
            </FormField>

            {/* Pricing Section */}
            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <h3 className="text-lg font-semibold text-star-dust mb-1">Pricing</h3>
              <p className="text-sm text-star-dust/40 mb-4">
                One base price, one model. Solidarity pricing is applied per person at the Exchange —
                the buyer always sees the full split before anything is charged.
              </p>

              <FormField label="Pricing Model" required>
                <Select
                  name="pricing_model"
                  options={PRICING_MODELS}
                  placeholder="Free — given to anyone who receives it"
                  defaultValue="free"
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
                  placeholder="0.00"
                  disabled={isSaving}
                />
              </FormField>
            </div>

            {/* Residual Pool */}
            <FormField
              label="Residual Pledge"
              optional
              helper="The share of this ware's profit, the 90% left after the platform fee, that you pledge to the residual pool, which pays every artisan on the platform. 0 to 50%, default 0, and the pool receives 30% of every sale's fee besides. What is left divides equally among this ware's contributors, you among them."
            >
              <Select
                name="residual_pool_percent"
                options={RESIDUAL_OPTIONS}
                placeholder="0%, nothing pledged (the default)"
                defaultValue="0"
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
                  {isDraft ? 'Save Draft' : 'Publish Work'}
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
              <p className="text-star-dust/40 text-xs">This Ware&apos;s Profit</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold">0-50%</p>
              <p className="text-star-dust/40 text-xs">Residual Pledge</p>
            </div>
          </div>
          <p className="text-xs text-star-dust/30 mt-3 text-center">
            30% of the 10% fee returns to the residual pool on every sale. Your pledge, if you set
            one, comes out of this ware&apos;s own 90% profit; what is left divides equally among
            this ware&apos;s contributors, you among them.
          </p>
        </Card>
      </div>
    </main>
  );
}
