// src/components/asgard/domains/cosmic/playground/Playground.tsx
'use client';

import { Beaker } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/vegvisir/Tabs';
import { GROUPINGS, REGISTRY, entriesIn, type Grouping, type RegistryEntry } from './registry';

const rendered = REGISTRY.filter((entry) => entry.render).length;
const nameOnly = REGISTRY.length - rendered;

function EntryCard({ entry }: { entry: RegistryEntry }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-star-dust">{entry.name}</h3>
        <code className="text-xs text-star-dust/50">{entry.importPath}</code>
      </div>

      {entry.render ? (
        // The transform keeps a fixed-position preview inside its own box.
        <div className="mt-4 max-h-96 overflow-hidden rounded-lg bg-black/30 p-4 transform-gpu">
          {entry.render()}
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline" size="sm">Name only</Badge>
          <p className="text-sm text-star-dust/60">{entry.note}</p>
        </div>
      )}
    </div>
  );
}

function GroupingPanel({ grouping }: { grouping: Grouping }) {
  const entries = entriesIn(grouping);
  const live = entries.filter((entry) => entry.render).length;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-star-dust">
        {grouping} — {entries.length} components, {live} rendered, {entries.length - live} name only
      </h2>
      <div className="grid gap-4">
        {entries.map((entry) => (
          <EntryCard key={`${entry.importPath}-${entry.name}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}

export function Playground() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
            <Beaker size={14} className="text-neurospark" />
            <span className="text-sm text-neurospark">The Sandbox</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-star-dust">Component Playground</h1>
          <p className="mx-auto max-w-xl text-lg text-star-dust/60">
            Every component outside asgard, in its Norse grouping: {REGISTRY.length} in all,
            {' '}{rendered} with a live example and {nameOnly} by name only.
          </p>
        </div>

        <Tabs defaultValue={GROUPINGS[0]}>
          <TabsList className="mb-8 flex-wrap">
            {GROUPINGS.map((grouping) => (
              <TabsTrigger key={grouping} value={grouping}>
                {grouping}
              </TabsTrigger>
            ))}
          </TabsList>

          {GROUPINGS.map((grouping) => (
            <TabsPanel key={grouping} value={grouping}>
              <GroupingPanel grouping={grouping} />
            </TabsPanel>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
