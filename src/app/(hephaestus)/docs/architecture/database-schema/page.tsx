// app/(content)/docs/architecture/database-schema/page.tsx

import { Metadata } from 'next';
import { Page } from '@/components/shared/Page';
import { SchemaHero } from '@/components/hephaestus/supporting/schema/SchemaHero';
import { SchemaTableCard } from '@/components/hephaestus/supporting/schema/SchemaTableCard';
import { SchemaEnumCard } from '@/components/hephaestus/supporting//schema/SchemaEnumCard';
import { SchemaFunctionCard } from '@/components/hephaestus/supporting//schema/SchemaFunctionCard';
import { SchemaExplorer } from '@/components/hephaestus/supporting//schema/SchemaExplorer';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Database Schema | AUDHDITIES Architecture',
  description: 'The living blueprint of our sanctuary - every table, relationship, and column',
};

// This is a Server Component - data fetching happens here
async function getSchemaData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/schema`, {
      cache: 'no-store' // Fresh data on every request
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch schema');
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching schema:', error);
    return null;
  }
}

export default async function DatabaseSchemaPage() {
  const schemaData = await getSchemaData();
  
  // Group columns by table from the API response
  const tableMap = new Map<string, any[]>();
  if (schemaData?.tables) {
    for (const col of schemaData.tables) {
      if (!tableMap.has(col.table_name)) {
        tableMap.set(col.table_name, []);
      }
      tableMap.get(col.table_name)!.push({
        column_name: col.column_name,
        column_type: col.column_type,
        is_nullable: col.is_nullable,
        column_default: col.column_default,
        is_primary_key: col.is_primary_key,
        is_foreign_key: col.is_foreign_key,
        foreign_key_table: col.foreign_key_table,
        foreign_key_column: col.foreign_key_column,
      });
    }
  }
  
  // Group enum values
  const enumMap = new Map<string, string[]>();
  if (schemaData?.enums) {
    for (const enumItem of schemaData.enums) {
      if (!enumMap.has(enumItem.enum_name)) {
        enumMap.set(enumItem.enum_name, []);
      }
      enumMap.get(enumItem.enum_name)!.push(enumItem.enum_value);
    }
  }
  
  const enumsList = Array.from(enumMap.entries()).map(([name, values]) => ({
    enum_name: name,
    values,
  }));

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <SchemaHero />
        
        <div className="container max-w-6xl mx-auto px-6 pb-20 space-y-12">
          
          {/* Interactive Schema Explorer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Schema Explorer
            </h2>
            <SchemaExplorer />
          </section>
          
          {/* Core Tables Section - Detailed View */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Tables
            </h2>
            <div className="space-y-4">
              {Array.from(tableMap.entries()).map(([tableName, columns]) => (
                <SchemaTableCard 
                  key={tableName}
                  tableName={tableName}
                  columns={columns}
                  defaultOpen={tableName === 'profiles' || tableName === 'products'}
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
              {enumsList.map((enumType) => (
                <SchemaEnumCard 
                  enum_name={enumType.enum_name}
                  enumType={enumType}
                />
              ))}
            </div>
          </section>
          
          {/* Functions Section */}
          {schemaData?.functions && schemaData.functions.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-green-400 rounded-full" />
                Database Functions
              </h2>
              <div className="space-y-4">
                {schemaData.functions.map((func: any) => (
                  <SchemaFunctionCard 
                    key={func.function_name}
                    func={func}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Security Note */}
          <section className="mt-12 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center">
            <div className="flex justify-center mb-3">
              <Shield className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-white font-bold mb-2">Row Level Security (RLS)</h3>
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              Every table has Row Level Security enabled. Users can only access their own data.
              Admins have elevated access. All policies are public and auditable.
            </p>
          </section>
        </div>
      </main>
    </Page>
  );
}