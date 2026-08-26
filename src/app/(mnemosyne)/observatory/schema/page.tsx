// app/(mnemosyne)/obsevatory/schema/page.tsx

import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { SchemaHero } from '@/components/asgard/domains/mnemosyne/schema/SchemaHero';
import { SchemaTableCard } from '@/components/asgard/domains/mnemosyne/schema/SchemaTableCard';
import { SchemaEnumCard } from '@/components/asgard/domains/mnemosyne/schema/SchemaEnumCard';
import { SchemaFunctionCard } from '@/components/asgard/domains/mnemosyne/schema/SchemaFunctionCard';
import { SchemaExplorer } from '@/components/asgard/domains/mnemosyne/schema/SchemaExplorer';
import { parseDatabaseTypes } from '@/lib/schema/parseDatabaseTypes';
import { Heart, Shield, Sparkles, Infinity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Schema | Sovereign Sanctuary',
  description: 'The living blueprint of our sanctuary',
};

export default async function DatabaseSchemaPage() {
  const { tables, enums } = parseDatabaseTypes();

  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <SchemaHero />
        
        <div className="container max-w-5xl mx-auto px-6 pb-20 space-y-12">
          
          {/* Core Tables Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Core Tables
            </h2>
            <div className="space-y-4">
              {tables.map((table) => (
                <SchemaTableCard 
                  key={table.name} 
                  table={table}
                  defaultOpen={table.name === 'profiles' || table.name === 'products'}
                />
              ))}
            </div>
          </section>
          
          {/* Enums Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full" />
              Enumerated Types
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {enums.map((enumType) => (
                <SchemaEnumCard key={enumType.name} enumType={enumType} />
              ))}
            </div>
          </section>
          
          {/* Security Note */}
          <section className="mt-12 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center">
            <Shield />
            <h3 className="text-white font-bold mb-2">Row Level Security (RLS)</h3>
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              Every table has Row Level Security enabled. Vessels can only access their own data.
              Admins have elevated access. All policies are public and auditable.
            </p>
          </section>
        </div>
      </main>
    </Page>
  );
}