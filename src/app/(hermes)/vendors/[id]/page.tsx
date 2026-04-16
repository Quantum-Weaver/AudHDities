// app/(hermes)/vendors/[id]/page.tsx
// Vendor Sanctuary - Vendor profile page
// Feeling: Trustworthy, transparent, ethical

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { VendorProfile } from '@/components/bazaar/VendorProfile';
import { ProductCatalog } from '@/components/bazaar/ProductCatalog';
import { BusinessInfo } from '@/components/bazaar/BusinessInfo';
import { VerificationStatus } from '@/components/bazaar/VerificationStatus';
import { ContactForm } from '@/components/bazaar/ContactForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { createServerSupabase } from '@/lib/supabase/server';

interface VendorPageProps {
  params: Promise<{ id: string }>;
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  // Fetch vendor profile
  const { data: vendor, error } = await supabase
    .from('vendor_profiles')
    .select('*, user:profiles(*)')
    .eq('id', id)
    .single();
  
  if (error || !vendor) {
    notFound();
  }
  
  // Fetch vendor's products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', id)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(12);

  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Vendor Profile */}
          <VendorProfile vendor={vendor} />
          
          {/* Verification Status */}
          <div className="mb-8">
            <VerificationStatus vendor={vendor} />
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="products">
            <TabsList className="w-full">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6">
              <ProductCatalog products={products || []} />
            </TabsContent>
            
            <TabsContent value="business" className="mt-6">
              <BusinessInfo vendor={vendor} />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-6">
              <ContactForm vendorId={vendor.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Page>
  );
}