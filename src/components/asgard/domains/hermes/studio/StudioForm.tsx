// src/components/asgard/domains/hermes/studio/StudioForm.tsx
// THE LOOM — ONE FORM (SPEC §1, §3④).
//
// THE SHAPE IS THE CONDUCTOR'S ASSUMPTION, carried at KP's own question and
// not struck: "should there be a wares creation page and a works, or are they
// going to use the same form?" — one form, the KIND CHOSEN FIRST, the shared
// trunk drawn once, two doors on the street. KP may strike it at any point and
// the build follows the strike.
//
// The kind is first because the kind decides which table the row lands in and
// which fields follow. Then the shared trunk: name, description, status. Then
// the kind's own branch.
//
// Wares edition (2026-07-31): a ware carries one base price plus a
// pricing_model; solidarity pricing is computed server-side at the Exchange.
// The model defaults to 'free' — worth is not priced unless the maker chooses
// (the zero-default is the realm's own thesis), and the residual dial defaults
// to nothing pledged.
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

export type LoomKind = 'work' | 'ware';

const WARE_TYPES = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
  { value: 'service', label: 'Service' },
];

const WORK_TYPES = [
  { value: 'music', label: 'Music' },
  { value: 'writing', label: 'Writing' },
  { value: 'vision', label: 'Vision' },
  { value: 'performance', label: 'Performance' },
  { value: 'code', label: 'Code' },
  { value: 'other', label: 'Other' },
];

const PRICING_MODELS = [
  { value: 'free', label: 'Gifted — given to anyone who receives it' },
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

/** The shelf the bytes will rest on. KP creates it by his own hand; no lamp does. */
const WARES_BUCKET = 'wares';

function slugify(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${base}-${Date.now().toString(36)}`;
}

interface BodyRow {
  key: string;
  /** the file's own name — the version is read from it, never typed */
  name: string;
  storagePath: string;
}

interface StudioFormProps {
  /** The kind, already set when the vessel came through a named door. */
  initialKind?: LoomKind;
}

export function StudioForm({ initialKind }: StudioFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, roles } = useUser();

  const [kind, setKind] = useState<LoomKind | null>(initialKind ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [bodies, setBodies] = useState<BodyRow[]>([]);

  // "Give this work a body" pre-fills the ware form from the work's own row.
  // It RECORDS NOTHING: where a ware's descent from a work is written is
  // unwritten — his to rule. The ware stands on its own until he says.
  const fromWorkId = searchParams.get('from_work');
  const [prefill, setPrefill] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    if (!fromWorkId) return;
    let alive = true;
    fetch(`/api/generated/hermes-social/works/${fromWorkId}`)
      .then((r) => r.json())
      .then((result) => {
        if (!alive || !result?.success || !result.data) return;
        setPrefill({
          name: result.data.name ?? '',
          description: result.data.description ?? '',
        });
      })
      .catch(() => { /* the form simply opens empty */ });
    return () => { alive = false; };
  }, [fromWorkId]);

  const addBody = useCallback(() => {
    setBodies((rows) => [
      ...rows,
      { key: `${Date.now()}-${rows.length}`, name: '', storagePath: '' },
    ]);
  }, []);

  const removeBody = useCallback((key: string) => {
    setBodies((rows) => rows.filter((r) => r.key !== key));
  }, []);

  const updateBody = useCallback((key: string, patch: Partial<BodyRow>) => {
    setBodies((rows) => rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }, []);

  const isArtisan = roles.includes('creator');

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!user || !kind) return;
    setIsSaving(true);
    setSaveMessage(null);

    const name = String(data.name ?? '');
    const description = data.description ? String(data.description) : null;

    try {
      // THE ROW IS WRITTEN FIRST, AS A DRAFT (FIX 20). A form that may carry
      // three bodies is the realm's point of most loss; the bodies attach to a
      // row that already exists, never the other way round.
      let response: Response;
      if (kind === 'work') {
        const body: TablesInsert<'works'> = {
          name,
          slug: slugify(name || 'work'),
          description,
          work_type: (data.work_type as TablesInsert<'works'>['work_type']) || 'other',
          streaming_url: data.streaming_url ? String(data.streaming_url) : null,
          status: 'draft',
          created_by: user.id,
        };
        response = await fetch('/api/generated/hermes-social/works', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        const body: TablesInsert<'wares'> = {
          name,
          slug: slugify(name || 'ware'),
          description,
          ware_type: (data.ware_type as TablesInsert<'wares'>['ware_type']) || 'digital',
          pricing_model: (data.pricing_model as TablesInsert<'wares'>['pricing_model']) || 'free',
          price: data.price ? parseFloat(String(data.price)) : null,
          residual_pool_percent: data.residual_pool_percent
            ? parseInt(String(data.residual_pool_percent), 10)
            : 0,
          status: 'draft',
          created_by: user.id,
        };
        response = await fetch('/api/generated/plutus-economics/wares', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      const result = await response.json();

      if (!result.success) {
        setSaveMessage(
          result.error ||
            `The ${kind} was not created this time. It is safe to try again.`,
        );
        return;
      }

      const rowId: string | undefined = result.data?.id;

      // One body, one file_registry row. related_table + related_id is untyped
      // by design, which is why no schema change is needed to hang a body on a
      // ware. Written as drafts: the shelf the bytes rest on is KP's hand and
      // is not made yet, so nothing here is offered to anyone.
      if (kind === 'ware' && rowId) {
        const named = bodies.filter((b) => b.name.trim().length > 0);
        for (const b of named) {
          const registryRow: TablesInsert<'file_registry'> = {
            name: b.name.trim(),
            slug: slugify(b.name.trim()),
            bucket_name: WARES_BUCKET,
            storage_path: b.storagePath.trim() || b.name.trim(),
            related_table: 'wares',
            related_id: rowId,
            is_public: false,
            status: 'draft',
            created_by: user.id,
          };
          await fetch('/api/generated/hephaestus-infrastructure/file_registry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registryRow),
          }).catch(() => { /* the ware stands; the body can be added again */ });
        }
      }

      // Published only after the row exists, so a failure never loses typing.
      if (!isDraft && rowId) {
        const table = kind === 'work'
          ? 'hermes-social/works'
          : 'plutus-economics/wares';
        await fetch(`/api/generated/${table}/${rowId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'published' }),
        }).catch(() => { /* it stays a draft, and the shelf shows it */ });
      }

      router.push('/bazaar/studio');
    } catch {
      setSaveMessage(`The ${kind} was not created this time. It is safe to try again.`);
    } finally {
      setIsSaving(false);
    }
  };

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

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60 text-lg mb-2">Sign in to reach the Loom.</p>
          <p className="text-star-dust/40 text-sm mb-6">Your works stay where you left them.</p>
          <Link href="/login?redirect=/bazaar/studio">
            <Button variant="primary">Sign in</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!isArtisan) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/40 text-lg mb-2">The Loom awaits your application</p>
          <p className="text-star-dust/30 text-sm mb-6">Apply to become an artisan to start weaving your works.</p>
          <Link href="/council/applications">
            <Button variant="primary">Apply to Create</Button>
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: 'new-row', type: 'product', title: 'Begin a new one' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link
            href="/bazaar/studio"
            className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return to your loom
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Loom</h1>
          <p className="text-sm text-star-dust/40 mt-1">Every work begins with a single thread</p>
        </div>

        {/* THE KIND, FIRST — before any other field. */}
        <Card
          data={{ id: 'the-kind', type: 'value', title: 'What is it', value: '' }}
          variant="glass"
          radius="lg"
          shadow="sm"
          className="p-6 mb-6"
        >
          <fieldset>
            <legend className="text-sm font-semibold text-star-dust mb-1">What is it?</legend>
            <p className="text-sm text-star-dust/40 mb-4">
              A work is a thing you made. A ware is a thing on the stall. A work does not need to
              become a ware, and a ware does not need a work behind it.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setKind('work')}
                aria-pressed={kind === 'work'}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark',
                  kind === 'work'
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/60 border-white/10',
                )}
              >
                A work
              </button>
              <button
                type="button"
                onClick={() => setKind('ware')}
                aria-pressed={kind === 'ware'}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark',
                  kind === 'ware'
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/60 border-white/10',
                )}
              >
                A ware
              </button>
            </div>
          </fieldset>
        </Card>

        {kind && (
          <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
            {prefill && kind === 'ware' && (
              <p className="text-xs text-star-dust/40 mb-6">
                Started from a work of yours. Nothing is recorded between them yet — this ware
                stands on its own.
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              {/* ── the shared trunk, drawn once ── */}
              <FormField label="Name" required>
                <Input
                  name="name"
                  placeholder="What are you making?"
                  defaultValue={prefill?.name}
                  disabled={isSaving}
                />
              </FormField>

              <FormField label="Description" optional helper="Tell vessels what this is and why it matters">
                <Input
                  name="description"
                  placeholder="Describe your work..."
                  defaultValue={prefill?.description}
                  disabled={isSaving}
                />
              </FormField>

              {/* ── the kind's own branch ── */}
              {kind === 'work' ? (
                <>
                  <FormField label="Type" required>
                    <Select
                      name="work_type"
                      options={WORK_TYPES}
                      placeholder="Select a type..."
                      disabled={isSaving}
                    />
                  </FormField>

                  <FormField
                    label="Where it can be heard or seen"
                    optional
                    helper="A link to where this work already lives, if it lives somewhere."
                  >
                    <Input name="streaming_url" placeholder="https://..." disabled={isSaving} />
                  </FormField>
                </>
              ) : (
                <>
                  <FormField label="Type" required>
                    <Select
                      name="ware_type"
                      options={WARE_TYPES}
                      placeholder="Select a type..."
                      disabled={isSaving}
                    />
                  </FormField>

                  {/* Bodies */}
                  <div className="border-t border-white/10 pt-6 mt-2 mb-4">
                    <h3 className="text-lg font-semibold text-star-dust mb-1">Bodies</h3>
                    <p className="text-sm text-star-dust/40 mb-2">
                      The files a vessel receives. Add one for each machine this runs on. Mobile and
                      desktop both — many people cannot use a phone for this.
                    </p>
                    <p className="text-xs text-star-dust/30 mb-4">
                      The version is read from the file&apos;s own name. The shelf these rest on is
                      not made yet, so a body added here is a record and not yet a handover.
                    </p>

                    <ul className="space-y-3 mb-4" role="list">
                      {bodies.map((b) => (
                        <li key={b.key} className="flex flex-wrap items-end gap-3">
                          <div className="flex-1 min-w-[12rem]">
                            <label className="block text-xs text-star-dust/40 mb-1" htmlFor={`body-name-${b.key}`}>
                              File name
                            </label>
                            <input
                              id={`body-name-${b.key}`}
                              value={b.name}
                              onChange={(e) => updateBody(b.key, { name: e.target.value })}
                              placeholder="resonance-compass-v2.3.6.apk"
                              disabled={isSaving}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-star-dust text-sm placeholder-white/30 focus:border-neurospark focus:outline-none"
                            />
                          </div>
                          <div className="flex-1 min-w-[12rem]">
                            <label className="block text-xs text-star-dust/40 mb-1" htmlFor={`body-path-${b.key}`}>
                              Where it rests
                            </label>
                            <input
                              id={`body-path-${b.key}`}
                              value={b.storagePath}
                              onChange={(e) => updateBody(b.key, { storagePath: e.target.value })}
                              placeholder="compass/2.3.6/resonance-compass-v2.3.6.apk"
                              disabled={isSaving}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-star-dust text-sm placeholder-white/30 focus:border-neurospark focus:outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBody(b.key)}
                            disabled={isSaving}
                            className="px-3 py-2 rounded-lg text-sm text-star-dust/60 border border-white/10 hover:text-star-dust focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark"
                          >
                            Remove{b.name ? ` ${b.name}` : ' this body'}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <Button type="button" variant="ghost" size="sm" onClick={addBody} disabled={isSaving}>
                      Add a body
                    </Button>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-white/10 pt-6 mt-2 mb-4">
                    <h3 className="text-lg font-semibold text-star-dust mb-1">Pricing</h3>
                    <p className="text-sm text-star-dust/40 mb-4">
                      One base price, one model. Solidarity pricing is applied per person at the
                      Exchange — the buyer always sees the full split before anything is charged.
                    </p>

                    <FormField label="Pricing Model" required>
                      <Select
                        name="pricing_model"
                        options={PRICING_MODELS}
                        placeholder="Gifted — given to anyone who receives it"
                        defaultValue="free"
                        disabled={isSaving}
                      />
                    </FormField>

                    <FormField
                      label="Base Price"
                      optional
                      helper="Leave empty for gifted or patronage-only works. For pay-what-you-want, this is the suggested floor."
                    >
                      <Input name="price" type="number" placeholder="0.00" disabled={isSaving} />
                    </FormField>
                  </div>

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
                </>
              )}

              {/* Publish status */}
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
                      <Badge variant="outline" size="sm" className="text-[10px]">Draft</Badge>
                    ) : (
                      <Badge variant="outline" size="sm" className="text-[10px]">On the stall</Badge>
                    )}
                  </div>
                </FormField>
                <p className="text-xs text-star-dust/40 mt-2">
                  Published means it stands on the stall. Draft means only you can see it.
                </p>
              </div>

              <FormActions>
                <div className="flex items-center gap-4">
                  <Button type="submit" variant="primary" size="md" loading={isSaving}>
                    {isDraft ? (
                      <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                    )}
                    {isDraft ? 'Save Draft' : kind === 'work' ? 'Publish Work' : 'Publish Ware'}
                  </Button>
                  <Link href="/bazaar/studio" className="text-sm text-star-dust/60 hover:text-star-dust">
                    Not now
                  </Link>
                  {saveMessage && (
                    <span role="status" className="text-sm text-star-dust">
                      {saveMessage}
                    </span>
                  )}
                </div>
              </FormActions>
            </Form>
          </Card>
        )}

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
              <p className="text-quantum-purple font-bold">90%</p>
              <p className="text-star-dust/40 text-xs">This Ware&apos;s Profit</p>
            </div>
            <div>
              <p className="text-sanctuary-green font-bold">0-50%</p>
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
